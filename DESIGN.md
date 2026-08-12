# DESIGN.md

Extraído de `src/styles/global.css`. Valores reales del código, no inventados.
Última revisión: tras `/impeccable audit` + `/impeccable polish`.

## Color

```
--gold: #8B3A2B        Acento principal. Terracota volcánico.
--gold-light: #A34A36  Hover de botones primarios.
--gold-warm: #AB4C34   Acentos sobre fondo claro y texto grande sobre oscuro.
--gold-on-dark: #C4664D  Texto pequeño sobre fondos oscuros. 4.56:1 sobre --ink.
--gold-pale: rgba(139,58,43,0.06)
--gold-glow: rgba(139,58,43,0.15)

--cream: #F8F6F1       Fondo base.
--cream-deep: #F0EDE6  Tarjetas y secciones alternas.
--cream-grad: #F3EFE6  Paso intermedio, solo en gradientes de sección.
--cream-mid: #E8E4DB
--cream-dark: #D8D3C8  Texto sobre fondo oscuro.

--ink: #1A1710         Texto principal y fondos oscuros.
--ink-soft: #2C2820
--ink-mid: #3A3428
--text-body: #58524A   Cuerpo de texto.
--text-dim: #706A63    Metadatos. 4.57:1 sobre --cream-deep (el fondo más exigente).
```

**Estrategia: Committed.** El terracota carga peso real (CTAs, bordes, badges, numerales),
no es un acento decorativo del 10%.

**Regla de contraste:** sobre fondos oscuros, el texto pequeño (<24px) usa
`--gold-on-dark`, nunca `--gold-warm`. `--gold-warm` sobre `--ink` da 3.25:1,
suficiente solo para texto grande.

## Tipografía

- **Display**: Fraunces (serif variable). Pesos 300-700, cursiva 300-500.
- **Cuerpo**: Outfit (sans). Pesos 300-600.
- Carga por `<link>` en el head, no por `@import` (evita cascada serializada).

**Escala** (rem): 0.75 · 0.76 · 0.85 · 0.9 · 0.95 · 1 · 1.1 · 1.2 · 1.25 · 1.3 · 1.5 · 1.6 · 1.8 · 2.2

- `0.75` captions, tags, metadatos, labels. **Mínimo absoluto: 12px.**
- `0.76` texto de botón (las tres variantes).
- `0.9` descripciones de tarjeta y cuerpo secundario.
- `1.1` párrafos de entrada.
- `1.6`+ títulos de sección.

**Pesos**: 300 (cuerpo), 400, 500 (dominante, títulos y labels), 600, 700 (solo `.hero-badge-num`).

## Motion

- Curva única: `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`. **Todas** las
  transiciones la usan. Nada de `ease` por defecto: tiene componente ease-in y
  rompe la sensación del resto.
- Duraciones: 0.2s · 0.3s (hover) · 0.4s · 0.5s · 0.6s · 0.8s (reveals).
- `prefers-reduced-motion: reduce` cubierto con reset global más overrides.

## Accesibilidad (verificado, no asumido)

- Todos los pares texto/fondo pasan WCAG AA (4.5:1 normal, 3:1 grande).
- Ningún tamaño de fuente por debajo de 12px.
- Touch targets a 44px mínimo: nav móvil, CTAs, enlaces legales, campos de formulario.
- Patrón de foco: `:focus-visible` con outline de 2px. Ningún `outline: none` sin alternativa.

## Deuda pendiente

- Testimonios: solo compradores residenciales, ningún inversor NPL. Bloqueado a la
  espera de testimonios reales.
- El widget de newsletter (beehiiv) vive en un iframe cross-origin. Su estilo se
  configura en el panel de beehiiv, no aquí.
