# DESIGN.md

Extraído de `src/styles/global.css`. No inventado, valores reales del código.

## Color

```
--gold: #7A5C10        (acento principal, CTAs, links activos)
--gold-light: #956E18
--gold-warm: #A8842A   (detalles decorativos, corner brackets)
--cream: #F8F6F1       (fondo base)
--cream-deep: #F0EDE6
--cream-mid: #E8E4DB
--cream-dark: #D8D3C8
--ink: #1A1710         (texto principal)
--ink-soft: #2C2820
--ink-mid: #3A3428
--text-body: #58524A   (texto de cuerpo)
--text-dim: #968E84    (⚠ contraste insuficiente, ver DESIGN-DEBT abajo)
```

Estrategia de color: **Committed** hacia el dorado sobre base cream cálida. El dorado
lleva peso visual real (CTAs, bordes, badges, corner brackets decorativos), no es un
acento del 10%.

## Tipografía

- **Display**: Cormorant Garamond (serif), pesos 300–700, cursiva disponible.
- **Cuerpo**: Outfit (sans), pesos 300–600.
- Line-height base: 1.7. Peso de cuerpo por defecto: 300.

## Motion

- Curvas: `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`, `--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1)`
- Sistema de reveal on-scroll vía clase `.reveal` + custom property `--reveal-delay`.
- `prefers-reduced-motion: reduce` respetado en dos bloques del CSS.

## Componentes clave

- `.btn-primary` / `.btn-ghost`: jerarquía primario/secundario ya diferenciada.
- `.hero-badge`: badge flotante sobre foto para el "2x Premio".
- `.review-card`: scroll horizontal con snap para testimonios.
- `.nav-toggle`: menú hamburguesa con gestión de foco y Escape.

## Deuda de diseño conocida (pendiente de fix)

- `.article-body blockquote` usa `border-left: 2px solid var(--gold)`, patrón de
  acento lateral que la propia skill impeccable prohíbe explícitamente.
- `.nav-toggle` mide ~38×30px de touch target real. Por debajo del mínimo de 44px.

## Resuelto

- ~~`--text-dim` (#968E84) sobre `--cream` daba ~3:1 de contraste~~. Corregido a
  `#767068`, 4.53:1, cumple WCAG AA para el texto pequeño donde se usa.
- ~~El botón de valoración se podía activar por teclado saltándose el consentimiento
  RGPD~~. Corregido: el `click` handler ahora comprueba `aria-disabled` y hace
  `preventDefault()`, moviendo el foco al checkbox.
