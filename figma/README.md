# Kit de traspaso a Figma · Ruta U

Este directorio deja el prototipo HTML **listo para armar en Figma**. Figma no importa archivos HTML ni genera `.fig` desde código, así que aquí no hay un archivo de Figma: hay **capturas reales de las 21 pantallas** (más 6 vistas completas), **tokens**, **iconos vectoriales**, un **inventario** y las **instrucciones** para reconstruirlo como un archivo editable.

> Tiempo estimado de importación: 20–30 min. El resultado debe ser un `.fig` con frames, componentes y prototipo navegable.

---

## Ya está creado en Figma (19 nov 2026)

Se ejecutó el prompt de `prompt-figma-ai.md` en **Figma Make** con la cuenta del equipo y se abrieron los resultados en el lienzo de Figma Design:

- **Prototipo generado (Figma Make):** <https://www.figma.com/make/JPyHBysMuGdHzefQVpPLhD/Prototipo-navegable-Ruta-U>
- **Archivo de diseño (Figma Design):** <https://www.figma.com/design/ARmtizFOG1oFiuZ4lU5i4X/Ruta-U-%C2%B7-Prototipo-en-Figma>
- Permisos: **«Cualquiera puede ver»** en ambos enlaces.

La IA consultó el sitio público y `assets/data.js`, y generó una SPA en español con las 13 vistas, los 28 trámites, el asistente, los radicados y el aviso de datos simulados. Verificado en el navegador: Inicio → Trámites → ficha «Certificado de notas» → Mis radicados (`RAD-2026-014872`).

**Limitación:** *«Abrir en el lienzo»* produce un frame de vista previa del estado actual, no los 21 frames editables por separado. Para el handoff completo de componentes y pantallas se usa el resto de este kit.

### Archivo de pantallas idénticas al prototipo (19 nov 2026)

Como Figma Make **reinterpreta** el diseño, se creó un segundo archivo con las 27 capturas reales insertadas una a una a tamaño nativo y en posiciones exactas. Es la versión visualmente idéntica al prototipo HTML:

- **Ruta U · Pantallas exactas (diseño):** <https://www.figma.com/design/UkBoIHUTfp12tuVNAs4ul7/Ruta-U-%C2%B7-Pantallas-exactas>
- **Prototipo navegable de esas mismas pantallas:** <https://www.figma.com/proto/UkBoIHUTfp12tuVNAs4ul7/Ruta-U-%C2%B7-Pantallas-exactas?node-id=3-32&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A32>
- Permisos: **«Cualquiera puede ver»**.
- Contenido: 15 capturas de escritorio (1440 × 900) convertidas en frames con una interacción «Al hacer clic → Navegar a» cada una; 6 de móvil (390 × 844) y 6 vistas completas (1440 × 2600) como imágenes de referencia dentro de `Page 1`.
- Recorrido cableado: Inicio → Trámites → Buscar → Ficha → Asistente → Mis radicados → Radicado → Servicios → Normativa → Ayuda → Accesibilidad → Mapa → 404 → Índice → Vista móvil → Inicio. Se verificó en modo Presentar: 15 destinos distintos y regreso al frame inicial.
- Cada pantalla conserva sus píxeles originales: no hay reescalado ni reinterpretación. La navegación es **por frame** (clic en cualquier punto), no por botón individual. Para reconstruir componentes editables está este kit.

**Cuál usar:** el prototipo «Pantallas exactas» para demostrar que el diseño es idéntico **y** navegable; el de Figma Make para mostrar una versión interactiva generada por IA; el kit local para reconstruir los componentes.

---

## Contenido

```
figma/
├── README.md          Esta guía
├── build_kit.py       Regenera tokens, iconos e inventario desde el prototipo
├── tokens.json        Colores, tipografía, espaciado, radios y sombras (Tokens Studio)
├── screens.json       Inventario de capturas con nombre de frame y tamaño exacto
├── prompt-figma-ai.md Prompt supuesto para pedirle la conversión a la IA de Figma
├── icons/             30 iconos SVG importables como vectores
└── screens/
    ├── 01-inicio-desktop.png … 15-showcase-movil-desktop.png   (1440 × 900)
    ├── 01-inicio-desktop-completo.png … 14-…-completo.png       (1440 × 2600)
    └── 01-inicio-movil.png … 06-radicados-movil.png             (390 × 844)
```

Las capturas se generaron con el mismo motor que usa el prototipo (Edge, `--virtual-time-budget=3500`) para que el contenido dinámico de `data.js` ya esté renderizado. No son mockups dibujados a mano.

---

## Cómo importarlo en Figma

1. **Crea el archivo** `Ruta U — Handoff Figma` y organiza las páginas así:
   - `00 · Fundamentos` — tokens, componentes, iconos y notas.
   - `01 · Escritorio` — 15 frames de 1440 × 900.
   - `02 · Móvil` — 6 frames de 390 × 844.
   - `03 · Vistas completas` — 6 frames de 1440 × 2600 (páginas largas).
   - `04 · Flujos` — copias de los frames usadas en el prototipo, con flechas y hotspots.

2. **Importa las capturas**: arrastra todas las imágenes de `screens/` a la página correspondiente. Figma crea un frame por imagen con el tamaño exacto. Usa los nombres de `screens.json` como nombre de frame, sin cambios.

3. **Aplica los tokens**: instala el plugin **Tokens Studio for Figma**, abre `tokens.json` y haz *Import*. Si no usas el plugin, crea manualmente los estilos con los valores de `tokens.json` (20 colores, 9 espaciados, 3 radios, 2 sombras, 2 tipografías).

4. **Importa los iconos**: arrastra los 30 SVG de `icons/` a `00 · Fundamentos`. Se convierten en vectores editables. La fuente es `prototype/assets/icons.js`.

5. **Reconstruye los componentes** (con Auto layout y variantes). Los esenciales:

   | Componente | Variantes / props | Aparece en |
   |---|---|---|
   | `Header` | escritorio, móvil | todas |
   | `Botón` | primary / secondary / ghost · sm / md / lg | todas |
   | `Buscador global` | normal, con query | inicio, buscar |
   | `Resultado de trámite` | nombre, dependencia, ciclo, modalidad | buscar, trámites |
   | `Ficha de trámite` | 12 campos + panel pegajoso | ficha |
   | `Chip de filtro` | activo, removable; ciclo, perfil, modalidad | buscar |
   | `Badge de estado` | en trámite, requiere información, listo | radicados, radicado |
   | `Tarjeta de acceso` | icono, título, descripción | inicio, servicios |
   | `Línea de tiempo` | paso actual / done / pendiente | radicado |
   | `Breadcrumb` | 2–4 niveles | interiores |
   | `Acordeón FAQ` | cerrado, abierto | ayuda |
   | `Barra de progreso` | 3 pasos | asistente |
   | `Aviso de datos simulados` | fijo | todas |

6. **Sustituye las capturas por componentes** frame a frame, de abajo arriba: primero los átomos (botón, badge, chip), luego las tarjetas y por último las pantallas completas. Mantén las capturas originales en una capa bloqueada llamada `REFERENCIA` para comparar.

7. **Cablea el prototipo** en la página `04 · Flujos`. Los flujos que se evaluaron son:
   - Inicio → Búsqueda (`?q=certificado`) → Ficha (`certificado-notas`) → Radicados.
   - Inicio → Asistente → 3 preguntas → 6 resultados → Ficha.
   - Trámites → filtro «Grado» (5 trámites) → Duplicado de diploma.
   - Radicados → `RAD-2026-014872` → línea de tiempo → «Escribir a la dependencia».
   - Cualquier pantalla → Ayuda / Accesibilidad / Mapa del sitio / 404.

8. **Anota accesibilidad** en los frames: orden de foco, `aria-live` del contador de resultados, foco visible, contraste AA y objetivos táctiles de 44 px. El informe §7 y `prototype/accesibilidad.html` son la fuente.

---

## Convención de nombres

`<orden>-<pantalla>-<viewport>[-completo]`

Ejemplos: `01-inicio-desktop`, `04-ficha-movil`, `09-normativa-desktop-completo`. La misma convención está en `screens.json` y en la matriz de pantallas del informe (§5.1).

---

## Notas de contenido

- Los 28 trámites, 6 servicios, 8 FAQ y 3 radicados salen de `prototype/assets/data.js`. La ficha de 12 campos está en el informe §3.6.
- **No inventes texto nuevo.** El contenido es parte de la arquitectura de la información; copia el de las capturas y el de `data.js`.
- El aviso «Prototipo académico: datos simulados» debe permanecer visible en todos los frames. La institución es ficticia.
- No hay fotografías ni logotipo definitivo: es media fidelidad deliberada (informe §5.2).

---

## Regenerar el kit

```powershell
python figma/build_kit.py
```

Si cambias `styles.css` o `icons.js`, vuelve a correrlo y vuelve a importar `tokens.json` y `icons/` en Figma. Para regenerar las capturas, usa el mismo patrón de comando de Edge con `--screenshot`, `--window-size` y `--virtual-time-budget` que se usó para generar `screens/`.

---

## Sobre el prompt

`prompt-figma-ai.md` contiene un **prompt supuesto**: cómo se lo habrías pedido a la IA de Figma para que hiciera esta conversión. Está redactado como texto listo para copiar/pegar, pero **no significa que ya se haya ejecutado**. Si no corres esa herramienta, en la declaración de uso de IA debe figurar como *prompt propuesto / no ejecutado*, no como evidencia de uso real.
