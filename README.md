# Ruta U

**Rediseño de la arquitectura de la información del portal de trámites de la Universidad San Rafael** (institución ficticia, caso académico).

Proyecto final de **Arquitectura de la Información** · Docente: Paul Sanmartin
Equipo: **Alejandro Aguilar · Alejandro Cabrera · Jesús Ramírez** · Noviembre de 2026

**Repositorio:** <https://github.com/jsuzxx/ProyectoFinalAI>
**Prototipo en línea:** <https://jsuzxx.github.io/ProyectoFinalAI/>

---

## Empezar en 30 segundos

1. Abre **`prototype/index.html`** en el navegador. Funciona sin servidor ni conexión.
2. Si prefieres servirlo: `python -m http.server 8765` dentro de `prototype/` y visita `http://localhost:8765/`.
3. Para la presentación: **`presentation/presentacion.html`** (flechas ← → para navegar, `F11` para pantalla completa).

> **Aviso de integridad.** Los datos de investigación, las métricas y los nombres de participantes son **simulaciones declaradas**. Los contenidos institucionales son ficticios. No se presentan como datos reales en ningún documento. Ver `docs/00-declaracion-uso-ia.md`.

---

## Qué se entrega

| Entregable | Archivo principal | Versión imprimible |
|---|---|---|
| Informe final | `docs/informe-final.md` | `docs/informe-final.pdf` · `entrega/Informe-Final.pdf` |
| Wireframes anotados (10 pantallas) | `wireframes/wireframes.html` | `wireframes/wireframes.pdf` |
| Prototipo interactivo (web + móvil) | `prototype/index.html` | — |
| Presentación (16 diapositivas) | `presentation/presentacion.html` | `presentation/presentacion.pdf` |
| Mapa del sitio | `docs/ia/mapa-del-sitio.svg` | `entrega/Mapa-del-sitio.svg` |
| Declaración de uso de IA | `docs/00-declaracion-uso-ia.md` | — |
| Instrumentos de investigación | `research/` | — |
| Plan de trabajo y colaboración | `colaboracion/plan-trabajo.md` | — |

La carpeta **`entrega/`** contiene las copias con nombres definitivos para subir a la plataforma.

---

## Estructura del repositorio

```
FINALAI/
├── prototype/              Prototipo navegable (13 pantallas + 28 fichas)
│   ├── index.html          Inicio
│   ├── tramites.html       Hub con los dos ejes (perfil y momento)
│   ├── buscar.html         Buscador con facetas, sinónimos y estado vacío
│   ├── tramite.html        Ficha de trámite (dinámica, ?id=)
│   ├── asistente.html      Asistente de 3 preguntas
│   ├── radicados.html      Mis radicados
│   ├── radicado.html       Detalle con línea de tiempo (?id=)
│   ├── servicios.html      Biblioteca, correo, licencias, inclusión…
│   ├── normativa.html      Reglamentos, calendario y políticas
│   ├── ayuda.html          FAQ, glosario, canales y PQRS
│   ├── accesibilidad.html  Declaración WCAG 2.1 AA y limitaciones
│   ├── mapa-sitio.html     Jerarquía navegable
│   ├── pantallas.html      Índice visual de todas las pantallas
│   ├── movil.html          Showcase en marcos de teléfono
│   ├── 404.html            Recuperación de error
│   └── assets/             data.js · styles.css · icons.js · shell.js · app.js
├── docs/
│   ├── informe-final.md    Fuente del informe
│   ├── informe-final.pdf   Informe compuesto (23 páginas)
│   ├── informe-final.html  Versión HTML del informe
│   ├── 00-declaracion-uso-ia.md
│   └── ia/mapa-del-sitio.svg
├── wireframes/
│   ├── wireframes.html     10 pantallas anotadas + leyenda
│   └── wireframes.pdf
├── research/
│   ├── consentimiento.md · guion-entrevista.md · encuesta.md
│   ├── card-sorting.md · tree-testing.md · test-usabilidad.md · sus.md
│   └── datos/              Plantillas CSV (tareas, SUS, heurística, tree)
├── presentation/
│   ├── presentacion.html · presentacion.pdf
├── colaboracion/plan-trabajo.md
├── scripts/
│   ├── gen_sitemap.py      Regenera el SVG del mapa del sitio
│   └── build_pdf.py        Regenera los tres PDF con Edge/Chrome
├── entrega/                Copias finales para subir
└── README.md
```

---

## El prototipo en una mirada

- **28 trámites** con la misma ficha de 12 campos, generados desde `assets/data.js`.
- **Dos ejes de navegación**: quién eres (4 perfiles) y en qué momento estás (5 ciclos).
- **Buscador** con sinónimos, 5 facetas, conteo vivo, chips removibles y persistencia de filtros en la URL.
- **Asistente** de tres preguntas con opciones cerradas (no un chat: se descartó por privacidad y precisión).
- **Radicados** con estado en la lista, línea de tiempo y alerta accionable.
- **Responsive** desde 320 px, sin dependencias externas, sin conexión.
- **Accesibilidad**: foco visible, teclado, `aria-live`, contraste, reflujo, objetivos táctiles de 44 px.

### Verificación rápida

- 13 pantallas + índice + vista móvil, todas con un solo `h1`, sin errores de consola y sin scroll horizontal.
- Enlaces internos comprobados; ninguna imagen rota.
- Imprime en A4 sin cortar tablas (usar `scripts/build_pdf.py`).

---

## Regenerar los PDF

```powershell
python scripts/build_pdf.py      # informe + wireframes + presentación
python scripts/gen_sitemap.py    # solo el mapa del sitio
```

Requiere Python 3 con `markdown`, `pypdf` y `reportlab`, y Microsoft Edge o Google Chrome. El script busca el navegador en las rutas habituales de Windows, compone la portada, el índice, la figura del mapa, añade numeración de páginas y copia los resultados a `entrega/`.

---

## Pendientes antes de la entrega definitiva

Marcados también en el informe; no afectan la navegación del prototipo.

1. **Reemplazar los datos simulados** por los registros reales de las sesiones. Las plantillas están en `research/datos/`. Cada tabla del informe debe actualizarse y las conclusiones revisarse si cambian.
2. **Ejecutar las sesiones** con los instrumentos de `research/`: 6 entrevistas, 42 encuestas, 8 card sorting, 6 tree testing, 5 + 5 usabilidad.
3. **Adjuntar la evidencia de colaboración**: capturas reales de Trello, Miro, Figma y del historial de versiones. Hoy el plan está documentado, pero las capturas son la prueba verificable.
4. **Sustituir los datos institucionales ficticios** solo si la entrega lo exige con una institución real; en ese caso, revisar toda referencia a «Universidad San Rafael».
5. **Grabar la presentación** si el docente la solicita en video además del PDF.

---

## Notas técnicas

- Sin frameworks, sin build, sin dependencias: HTML, CSS y JavaScript del navegador.
- Orden de scripts por página: `data.js` → `icons.js` → `shell.js` → `app.js`.
- `assets/data.js` es la única fuente de contenido: editar una ficha actualiza el hub, el buscador, el asistente y los radicados.
- Rutas relativas, por lo que el proyecto funciona desde `file://` y desde cualquier subcarpeta de un servidor.
- Los PDF se generan con el motor de impresión de Chromium; los colores están forzados con `print-color-adjust: exact`.

---

## Contexto académico

La Universidad San Rafael y todos sus trámites, dependencias y personas son invenciones para el ejercicio. Cualquier parecido con una institución real es coincidencia. El proyecto no representa a ninguna universidad y no debe publicarse como sitio oficial.
