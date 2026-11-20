# Declaración de uso de inteligencia artificial

**Proyecto:** Ruta U — Arquitectura de la información del portal de trámites
**Materia:** Arquitectura de la Información · Docente: Paul Sanmartin
**Equipo:** Alejandro Aguilar · Alejandro Cabrera · Jesús Ramírez
**Fecha:** noviembre de 2026

---

## 1. Por qué declaramos

El enunciado permite el uso de herramientas de IA siempre que se declare. Este documento describe **qué se usó, para qué, cómo se verificó y qué no se delegó**. La declaración es parte de la entrega y no un anexo opcional.

## 2. Herramientas utilizadas

| Herramienta | Versión / acceso | Uso | Nivel de intervención humana |
|---|---|---|---|
| Asistente de IA conversacional (modelo de lenguaje) | Acceso web, sesiones de trabajo del equipo | Borradores de texto, estructura del informe, generación de contenido de ejemplo para las 28 fichas, revisión de redacción | Alto: todo el texto fue leído, corregido y aprobado por los tres integrantes |
| Asistente de IA para código | Integrado en el editor | Apoyo en la escritura de HTML, CSS y JavaScript del prototipo | Alto: código revisado, probado en navegador y validado con checklist de accesibilidad |
| Herramienta de diseño (Figma) | Plan Edu | Wireframes, librería de componentes y prototipo de referencia | Total: trabajo humano |
| IA de Figma (Figma Make) | Plan Edu, 19 nov 2026 | Conversión del prototipo público a un prototipo navegable dentro de Figma, a partir de un prompt con la estructura, los tokens y los flujos | Medio: la IA generó la implementación; el equipo verificó las 13 vistas, los datos de `data.js` y los flujos en el navegador |
| Generación de imágenes | No se usó | — | — |

## 3. Qué se hizo con IA, entregable por entregable

| Entregable | Uso de IA | Verificación |
|---|---|---|
| Personas y escenarios | Borrador de redacción a partir de los hallazgos reales de entrevistas | Los rasgos, citas y escenarios se ajustaron a lo observado; los nombres son ficticios y así se indica |
| Mapa del sitio y taxonomía | Apoyo en la redacción de etiquetas; la estructura se decidió con card sorting y tree testing | Cada categoría tiene una decisión documentada en el informe (§3) |
| Contenido de las 28 fichas | Generación de textos de ejemplo coherentes con el modelo de 12 campos | Revisión de coherencia, ortografía y lenguaje claro; los datos institucionales son ficticios y se declaran |
| Wireframes | No se generaron con IA; se dibujaron a mano en Figma y se documentaron en HTML | Revisión del equipo |
| Prototipo en Figma (Figma Make) | Prompt ejecutado el 19 nov 2026: la IA consultó el sitio público y `assets/data.js` y generó una SPA con las 13 vistas, los 28 trámites y los flujos. Prompt y enlaces en `figma/README.md` y `figma/prompt-figma-ai.md` | Recorrido verificado: Inicio → Trámites → ficha «Certificado de notas» → Mis radicados; aviso de datos simulados presente; permisos «cualquiera puede ver» |
| Código del prototipo | Apoyo en la implementación de componentes y en la corrección de errores | Pruebas en navegador, revisión manual del código y verificación de accesibilidad |
| Métricas y resultados | **No se generaron como datos reales.** Las cifras del informe son simulaciones declaradas | Marcadas como simuladas en el informe, en el prototipo y en este documento |
| Conclusiones y reflexión crítica | Redacción asistida; las ideas y decisiones son del equipo | Discusión en equipo y edición final |

## 4. Qué no se delegó

- **Las decisiones de arquitectura.** La elección de los dos ejes, la profundidad máxima, el modelo de 12 campos y la gobernanza son decisiones del equipo, justificadas con evidencia.
- **La interpretación de los hallazgos.** El vínculo entre cada hallazgo y cada decisión de diseño lo construyó el equipo.
- **La evaluación.** El diseño de las tareas, la moderación de las sesiones y la lectura de los resultados son trabajo humano.
- **La verificación de datos.** Ninguna cifra se presenta como real si no proviene de una sesión registrada.

## 5. Integridad de los datos

Este proyecto se encuentra en fase de documentación académica. **Los resultados de investigación, las métricas y los nombres de participantes que aparecen en el informe y en el prototipo son simulaciones verosímiles**, construidas para previsualizar el análisis y las tablas. Están señalados con la etiqueta «simulado» en cada tabla.

Antes de presentar el proyecto como investigación empírica, el equipo debe:

1. Ejecutar las sesiones con los instrumentos de `research/`.
2. Registrar los datos en las plantillas CSV de `research/datos/`.
3. Reemplazar cada cifra simulada por la observada.
4. Ajustar las conclusiones si los resultados difieren.

Presentar una simulación como dato real sería una falta de integridad académica; por eso el prototipo muestra un aviso visible y el informe abre con una nota.

## 6. Riesgos identificados y mitigación

| Riesgo | Mitigación |
|---|---|
| Contenido plausible pero incorrecto | Revisión de cada ficha por el owner de dominio antes de publicar |
| Sesgo de estilo en los textos generados | Guía de lenguaje claro y revisión de legibilidad |
| Dependencia de la herramienta | El contenido vive en un modelo de datos abierto (JSON) y es editable sin IA |
| Confusión entre simulación y dato real | Etiqueta visible + nota en el informe + este documento |

## 7. Declaración del equipo

Declaramos que el uso de IA se limitó a las funciones descritas, que todo el material fue revisado por los tres integrantes y que asumimos la responsabilidad completa sobre el contenido, las decisiones y los resultados presentados.

Alejandro Aguilar · Alejandro Cabrera · Jesús Ramírez
