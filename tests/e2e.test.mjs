// Pruebas en navegador sobre dist/. Necesita Playwright instalado en el entorno;
// si no está, se omiten (no es dependencia del proyecto).
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { chromium = null; }
const skip = chromium ? false : 'Playwright no disponible';

const root = new URL('../dist/', import.meta.url).pathname;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.xml': 'application/xml' };
let server, base, browser;

before(async () => {
  if (skip) return;
  server = createServer(async (req, res) => {
    let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
    let file = join(root, p);
    try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); }
    catch { file = join(root, '404.html'); res.statusCode = 404; }
    try { res.setHeader('content-type', types[extname(file)] ?? 'application/octet-stream'); res.end(await readFile(file)); }
    catch { res.statusCode = 404; res.end('404'); }
  });
  await new Promise((r) => server.listen(0, r));
  base = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch();
});
after(async () => { await browser?.close(); server?.close(); });

// Bloquea terceros para que la prueba no dependa de la red.
async function page(opts = {}) {
  const ctx = await browser.newContext(opts);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  return ctx.newPage();
}

test('#2 sin privacidad no navega y avisa; con privacidad abre Lystos', { skip }, async () => {
  const p = await page({ viewport: { width: 375, height: 812 } });
  await p.goto(base + '/');
  const btn = p.locator('#valoracion button[type="submit"]');
  await btn.scrollIntoViewIfNeeded();
  assert.equal(await btn.isEnabled(), true);
  const popups = [];
  p.context().on('page', (np) => popups.push(np));
  await btn.click();
  await p.waitForTimeout(300);
  assert.equal(popups.length, 0, 'no debe abrir Lystos sin aceptar la privacidad');
  const invalid = await p.locator('#valoracion input[required]').evaluate((el) => !el.checkValidity());
  assert.equal(invalid, true);
  assert.equal(await p.locator('#privacy-error').isVisible(), true, 'debe verse el aviso en español');
  assert.equal(await p.evaluate(() => document.activeElement?.id), 'privacy-consent');
  await p.locator('#valoracion input[required]').check();
  // La red de terceros está bloqueada: se comprueba la petición que sale hacia Lystos.
  const [popup, req] = await Promise.all([
    p.context().waitForEvent('page'),
    p.context().waitForEvent('request', (r) => r.url().includes('lystos.com')),
    btn.click(),
  ]);
  assert.ok(popup, 'debe abrir Lystos en una pestaña nueva');
  assert.match(req.url(), /^https:\/\/valuation\.lystos\.com\/\?clientId=2f57af09-10e9-47ce-a505-281fa60511e3$/);
  await p.context().close();
});

test('#6 etiquetas del pie con contraste ≥ 4,5:1', { skip }, async () => {
  const p = await page();
  await p.goto(base + '/');
  const ratio = await p.locator('.footer-contact-label').first().evaluate((el) => {
    const rgb = (s) => s.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number);
    const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    let bgEl = el; let bg = 'rgba(0, 0, 0, 0)';
    while (bgEl && /rgba\(0, 0, 0, 0\)|transparent/.test(bg)) { bg = getComputedStyle(bgEl).backgroundColor; bgEl = bgEl.parentElement; }
    const a = lum(rgb(getComputedStyle(el).color)), b = lum(rgb(bg));
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  });
  assert.ok(ratio >= 4.5, `contraste ${ratio.toFixed(2)}:1`);
  await p.context().close();
});

test('#8 a 375×812 el titular y los dos botones caben en la primera pantalla', { skip }, async () => {
  const p = await page({ viewport: { width: 375, height: 812 } });
  await p.goto(base + '/');
  await p.waitForTimeout(1500); // animaciones de entrada
  for (const sel of ['.hero-headline', '.hero-actions a[href="#inversores"]', '.hero-actions a[href="#valoracion"]']) {
    const box = await p.locator(sel).boundingBox();
    assert.ok(box && box.y + box.height <= 812, `${sel} termina en ${box && Math.round(box.y + box.height)} px`);
  }
  await p.context().close();
});

test('#9 sin JavaScript todas las secciones se ven', { skip }, async () => {
  const p = await page({ javaScriptEnabled: false });
  await p.goto(base + '/');
  const hidden = await p.$$eval('h2, .reveal', (els) => els.filter((e) => getComputedStyle(e).opacity === '0').length);
  assert.equal(hidden, 0);
  await p.context().close();
});

test('#11 la tarjeta destacada del blog no deja hueco vacío a 1440', { skip }, async () => {
  const p = await page({ viewport: { width: 1440, height: 900 } });
  await p.goto(base + '/');
  const { card, content } = await p.locator('.blog-card--feat').evaluate((el) => {
    // Altura real del texto de cada bloque (el extracto crece con flex y ocultaría el hueco).
    const kids = [...el.children].reduce((s, c) => {
      const r = document.createRange(); r.selectNodeContents(c);
      const cs = getComputedStyle(c);
      return s + r.getBoundingClientRect().height + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    }, 0);
    return { card: el.getBoundingClientRect().height, content: kids };
  });
  assert.ok(card - content < 120, `hueco de ${Math.round(card - content)} px (tarjeta ${Math.round(card)} px)`);
  await p.context().close();
});
