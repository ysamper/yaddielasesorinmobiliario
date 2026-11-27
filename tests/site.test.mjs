// Comprueba el HTML generado en dist/. Ejecutar después de `npm run build`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = (p) => readFileSync(new URL(`../dist/${p}`, import.meta.url), 'utf8');
const index = read('index.html');
const blogPost = read('blog/' + readFileSync(new URL('../dist/rss.xml', import.meta.url), 'utf8')
  .match(/<link>https:\/\/yaddielasesorinmobiliario\.com\/blog\/([^<]+?)\/?<\/link>/)[1] + '/index.html');

const section = (html, id) => {
  const start = html.indexOf(`id="${id}"`);
  assert.ok(start > -1, `falta la sección #${id}`);
  const end = html.indexOf('</section>', start);
  return html.slice(start, end);
};

test('#1 teléfono y email se pueden pulsar en contacto y pie', () => {
  const contacto = section(index, 'contacto');
  assert.match(contacto, /href="tel:\+34679891027"/);
  assert.match(contacto, /href="mailto:yaddiel\.samper@century21\.es"/);
  const footer = blogPost.slice(blogPost.indexOf('<footer'));
  assert.match(footer, /href="tel:\+34679891027"/);
  assert.match(footer, /href="mailto:yaddiel\.samper@century21\.es"/);
});

test('#1 el hero ofrece WhatsApp o llamada', () => {
  const hero = section(index, 'inicio');
  assert.match(hero, /href="https:\/\/wa\.me\/34679891027/);
});

test('#2 valoración: privacidad obligatoria, comerciales opcional, botón activo', () => {
  const val = section(index, 'valoracion');
  const inputs = val.match(/<input[^>]*type="checkbox"[^>]*>/g) ?? [];
  assert.equal(inputs.length, 2, 'deben ser dos casillas');
  const required = inputs.filter((i) => /\brequired\b/.test(i));
  assert.equal(required.length, 1, 'solo una casilla obligatoria');
  assert.match(val, /política de privacidad/i);
  assert.match(val, /comunicaciones comerciales/i);
  assert.doesNotMatch(val, /aria-disabled="true"/);
  assert.doesNotMatch(val, /btn-primary-disabled/);
  assert.match(val, /<form[^>]*action="https:\/\/valuation\.lystos\.com/);
});

test('#2 no promete "nunca compartidos con terceros"', () => {
  assert.doesNotMatch(index, /Nunca compartidos con terceros/i);
  assert.match(section(index, 'valoracion'), /Lystos/);
});

test('#4 sin CSS de Google Fonts ni gtag.js en el HTML inicial', () => {
  for (const html of [index, blogPost]) {
    assert.doesNotMatch(html, /fonts\.googleapis\.com/);
    assert.doesNotMatch(html, /<script[^>]+src="https:\/\/www\.googletagmanager\.com/);
  }
  assert.match(index, /rel="preload"[^>]*\/fonts\/fraunces-latin\.woff2/);
});

test('#5 404 propia en español con enlaces útiles', () => {
  assert.ok(existsSync(new URL('../dist/404.html', import.meta.url)));
  const nf = read('404.html');
  assert.match(nf, /<html lang="es"/);
  assert.match(nf, /no existe/i);
  for (const href of ['/#valoracion', '/#inversores', '/blog']) {
    assert.ok(nf.includes(`href="${href}"`), `falta enlace a ${href}`);
  }
  assert.match(nf, /<meta name="robots" content="noindex/);
});

test('#6 todos los iframes estáticos tienen title', () => {
  const iframes = index.match(/<iframe[^>]*>/g) ?? [];
  assert.ok(iframes.length >= 1);
  for (const f of iframes) assert.match(f, /title="[^"]+"/);
});

test('#14 sin "3x" duplicado, sin "03" suelto y menú con tilde', () => {
  assert.doesNotMatch(index, /hero-badge/);
  assert.doesNotMatch(index, /sect-sellers-bg-num/);
  assert.match(index, />Valoración gratuita</);
  assert.doesNotMatch(index, /Valoracion gratuita/);
});
