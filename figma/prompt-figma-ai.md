# Prompt supuesto para la IA de Figma

> Texto redactado **como si se lo hubiéramos pedido** al asistente de Figma (Figma Make / IA de Figma) para convertir el prototipo web en un archivo de Figma editable.
> Es un **supuesto**: no implica que la herramienta se haya ejecutado. Si no se ejecutó, decláralo como *prompt propuesto*, no como uso real.

---

## Prompt principal (copiar y pegar)

```text
Hola. Tengo un prototipo académico terminado en HTML/CSS/JavaScript puro (sin frameworks)
y quiero que lo conviertas en un archivo de Figma totalmente editable, no en una imagen
ni en una maqueta plana.

CONTEXTO
Proyecto: "Ruta U", rediseño de la arquitectura de la información del portal de trámites
de la Universidad San Rafael (institución ficticia, caso académico). Materia: Arquitectura
de la Información. Es media fidelidad: paleta neutra con un solo color institucional, sin
fotografías y sin logotipo definitivo.

FUENTES DISPONIBLES
- Prototipo en vivo: https://jsuzxx.github.io/ProyectoFinalAI/
- Repositorio: https://github.com/jsuzxx/ProyectoFinalAI
- 13 pantallas HTML en /prototype/ (index, tramites, buscar, tramite?id=, asistente,
  radicados, radicado?id=, servicios, normativa, ayuda, accesibilidad, mapa-sitio, 404),
  más pantallas.html e movil.html.
- Fuentes de verdad: /prototype/assets/data.js (28 trámites, 6 servicios, 8 FAQ,
  3 radicados), /prototype/assets/styles.css (tokens) y /prototype/assets/icons.js
  (30 iconos SVG).
- En /figma/ ya preparé capturas reales de cada pantalla en escritorio (1440×900),
  móvil (390×844) y vistas completas (1440×2600), un tokens.json con colores,
  tipografía, espaciado, radios y sombras, los 30 iconos en SVG y un screens.json
  con el inventario y la convención de nombres.

LO QUE QUIERO QUE HAGAS
1. Crea un archivo .fig con estas páginas:
   "00 · Fundamentos" (tokens, estilos de texto, iconos y componentes),
   "01 · Escritorio", "02 · Móvil", "03 · Vistas completas", "04 · Flujos".
2. Recrea las 21 pantallas como FRAMES editables con Auto layout, usando los nombres
   exactos de screens.json y los tamaños exactos de cada viewport. No incrustes las
   capturas como imagen definitiva: úsalas solo como referencia en una capa bloqueada
   llamada REFERENCIA.
3. Aplica los tokens de /figma/tokens.json como color styles, text styles, spacing,
   corner radius y effects. Respeta estos valores clave:
   - Marca: #0F4C5C / #14708A / suave #E7F1F3
   - Texto: #151A1F, #3B4552, #5B6573 · Líneas #D3DAE2 / #E6EBF0
   - Fondo #F4F6F8, superficie #FFFFFF
   - Estados: ok #17603A, warn #7D4A00, danger #9C2020, foco #0B7FA3
   - Tipografía Segoe UI / system-ui · radios 6/10/14 px · espaciado 4-8-12-16-24-32-48-64-88
4. Construye una librería de componentes con variantes y propiedades:
   Header (escritorio/móvil), Botón (primary/secondary/ghost × sm/md/lg), Buscador global,
   Resultado de trámite, Ficha de trámite (12 campos + panel de resumen pegajoso),
   Chip de filtro, Badge de estado, Tarjeta de acceso, Línea de tiempo, Breadcrumb,
   Acordeón FAQ, Barra de progreso del asistente y Aviso de datos simulados.
5. Usa la información real de data.js para los 28 trámites: nombres, dependencias,
   ciclos, costos, tiempos y modalidades. No escribas "lorem ipsum" ni inventes textos.
6. Cablea el prototipo de Figma con estos flujos:
   - Inicio → Búsqueda con query "certificado" → Ficha "certificado-notas" → Radicados.
   - Inicio → Asistente → 3 preguntas → 6 resultados → Ficha.
   - Trámites → filtro "Grado" (5 trámites) → "duplicado-diploma".
   - Radicados → RAD-2026-014872 → línea de tiempo → "Escribir a la dependencia".
   - Desde cualquier pantalla → Ayuda, Accesibilidad, Mapa del sitio y 404.
7. Añade anotaciones de accesibilidad WCAG 2.1 AA en los frames principales: orden de
   foco, foco visible, contraste, aria-live del contador de resultados, reflujo a 320 px
   y objetivos táctiles mínimos de 44 px.
8. Mantén visible en TODOS los frames el aviso "Prototipo académico: datos simulados".

RESTRICCIONES
- Sin fotografías, sin gradientes decorativos, sin ilustraciones nuevas.
- Sin cambiar la redacción: el texto es parte de la arquitectura de la información.
- Sin inventar secciones nuevas que no estén en el prototipo ni en el mapa del sitio.
- La institución y las personas son ficticias; no presentes el archivo como sitio oficial.

ENTREGABLE
Un archivo .fig organizado, con frames nombrados, componentes reutilizables, estilos
aplicados, flujos navegables y una página "00 · Fundamentos" que sirva como handoff.
Si algo no puedes hacerlo automáticamente, dime qué queda pendiente y cómo hacerlo a mano.
```

---

## Versión corta (para un chat rápido)

```text
Convierte mi prototipo de Ruta U (https://jsuzxx.github.io/ProyectoFinalAI/) en un archivo
de Figma editable: 21 frames (escritorio 1440×900, móvil 390×844 y vistas completas),
con Auto layout, componentes con variantes (botones, buscador, ficha de 12 campos, chips,
badges de estado, timeline, header), colores y text styles desde /figma/tokens.json,
iconos SVG desde /figma/icons/, los datos reales de /prototype/assets/data.js y los flujos
búsqueda→ficha→radicado y asistente→resultados→ficha. Media fidelidad, sin fotos,
WCAG 2.1 AA, aviso de datos simulados visible y nombres de frame según screens.json.
Usa las capturas de /figma/screens/ solo como referencia, no como resultado final.
```

---

## Checklist para verificar lo que devuelva la IA

- [ ] Los 21 frames existen y miden exactamente 1440×900, 390×844 o 1440×2600.
- [ ] Los nombres coinciden con `screens.json`.
- [ ] Los componentes son reutilizables (no texto y rectángulos sueltos).
- [ ] Los 20 colores de `tokens.json` están como estilos, no como valores sueltos.
- [ ] Las 28 fichas salen de `data.js` y no hay texto de relleno.
- [ ] Los 5 flujos están cableados y se pueden recorrer en modo presentación.
- [ ] El aviso de datos simulados aparece en todas las pantallas.
- [ ] No hay secciones nuevas fuera del mapa del sitio (`docs/ia/mapa-del-sitio.svg`).
