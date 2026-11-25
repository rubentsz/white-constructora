# White — Arquitectura · Ingeniería (Landing Page)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frubentsz%2Fwhite-constructora)

Landing page corporativa construida con **HTML5 semántico**, **CSS Vanilla** y **JavaScript Vanilla**, diseñada a medida de la identidad visual oficial de **White Arquitectura · Ingeniería** (`@white.constructora`).

## Estructura del proyecto

- `index.html` — Estructura principal de la landing page (Hero, Estudio, Portafolio filtrable, Servicios, Metodología, Sección Instagram/Reels y Formulario de Contacto).
- `styles.css` — Sistema de diseño editorial en tonos obsidiana, piedra travertino y dorado metálico extraído del logotipo oficial.
- `script.js` — Filtros de proyectos, lightbox con ficha técnica, reproductor de Reels/Videos y validación del formulario.
- `assets/` — Logotipo recortado con fondo transparente (`logo-white-gold.png`) e imágenes arquitectónicas de muestra listas para reemplazar.

## Cómo reemplazar las imágenes y videos por los de `@white.constructora`

1. Guardá tus fotos reales en `assets/` (por ejemplo `obra-1.jpg`, `obra-2.jpg`, etc.) y actualizá las rutas en `index.html` y en el arreglo `PROJECTS` de `script.js`.
2. Para integrar **Reels/Videos reales en `.mp4`**, guardalos en `assets/` (por ejemplo `assets/reel-1.mp4`) y colocá su ruta en la propiedad `videoUrl` dentro del arreglo `REELS` en `script.js`. El reproductor detectará automáticamente el video y activará `<video controls>`.
3. Actualizá el correo electrónico, WhatsApp y horarios en la sección `#contacto` de `index.html`.
