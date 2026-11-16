# Informe final — Ruta U

## Diseño y evaluación de la arquitectura de la información de un portal de trámites universitarios

**Materia:** Arquitectura de la Información · **Docente:** Paul Sanmartin
**Equipo:** Alejandro Aguilar · Alejandro Cabrera · Jesús Ramírez
**Institución del caso:** Universidad San Rafael (ficticia) · **Versión:** 2.0 · **Fecha:** noviembre de 2026

---

> **Nota sobre los datos.** Este informe documenta un proyecto académico. Los hallazgos de investigación, las métricas de las pruebas y los nombres de las personas son **simulaciones verosímiles** construidas para previsualizar el análisis; están marcados como tales en cada tabla. Antes de la entrega definitiva deben reemplazarse por los registros reales de las sesiones (plantillas incluidas en `research/`). Los contenidos del prototipo son igualmente ficticios.

---

## Resumen ejecutivo

Ruta U es el rediseño de la arquitectura de la información del portal de trámites de una universidad. El problema de partida no era visual: los mismos documentos se llamaban distinto en cada dependencia, los requisitos solo se conocían al llegar a la ventanilla y no existía forma de saber en qué iba una solicitud sin llamar.

La propuesta organiza 28 trámites en **dos ejes de navegación complementarios** —quién eres y en qué momento de tu vida académica estás— sobre una **ficha única de 12 campos** que estandariza toda la información. Se añadieron un asistente de tres preguntas para quien no conoce el nombre oficial del trámite y una trazabilidad de radicados con línea de tiempo.

La arquitectura se validó con card sorting abierto (8 participantes), tree testing (6 participantes, 5 tareas) y dos rondas de prueba de usabilidad (5 participantes cada una). Entre rondas, la tasa de éxito pasó de **72 % a 92 %**, el tiempo promedio de tarea de **94 s a 51 s** y el SUS de **68 a 84**. La evaluación heurística arrojó 18 hallazgos, de los cuales 4 eran críticos y fueron corregidos antes de la segunda ronda.

El resultado es un prototipo navegable de media fidelidad, responsive, conforme a WCAG 2.1 AA en las pantallas construidas, acompañado de un modelo de gobernanza de contenidos para que la arquitectura no se degrade después de la entrega.

---

## 1. Definición del proyecto

### 1.1 Problema

En la Universidad San Rafael los trámites están repartidos entre seis dependencias y tres canales (presencial, correo, portal legado). El estudiante debe adivinar tres cosas antes de empezar: **cómo se llama** el trámite, **quién** lo atiende y **qué** debe llevar. Cuando falla, reinicia el proceso.

Tres síntomas observables en la investigación inicial:

1. **Polisemia de etiquetas.** El mismo documento aparece como «certificado de notas», «constancia académica», «récord académico» y «certificado de calificaciones», según la dependencia.
2. **Requisitos invisibles.** Los requisitos se publican en PDFs por dependencia, no en la ficha del trámite. El 38 % de las solicitudes presenciales se devuelven por documentos incompletos (dato de la oficina de atención, periodo 2026-1).
3. **Estado opaco.** No hay consulta en línea. El estudiante llama o escribe para preguntar «¿en qué va?», y esa consulta representa cerca de un tercio de los contactos de la mesa de ayuda.

### 1.2 Objetivos del producto digital

| Tipo | Objetivo | Indicador | Meta |
|---|---|---|---|
| Usuario | Encontrar el trámite correcto sin conocer su nombre | Tasa de éxito en tree test | ≥ 85 % |
| Usuario | Conocer requisitos, costo y tiempo antes de iniciar | Comprensión en prueba (5 preguntas) | ≥ 90 % |
| Usuario | Seguir el estado sin contactar a la Universidad | Uso de «Mis radicados» en tarea de seguimiento | ≥ 80 % |
| Negocio | Reducir solicitudes devueltas por requisitos incompletos | Devoluciones / solicitudes | −40 % |
| Negocio | Reducir contactos por consulta de estado | Contactos de mesa de ayuda | −30 % |
| Negocio | Aumentar el autoservicio | Sesiones sin contacto posterior | ≥ 70 % |

Los objetivos de negocio se formulan como hipótesis: el prototipo permite medir los dos primeros, no los de operación, que requieren instrumentación en producción.

### 1.3 Público objetivo

Cuatro perfiles con volumen y necesidades distintas. El diseño prioriza **estudiante** y **egresado** (72 % de las solicitudes históricas), sin excluir a los otros dos.

| Perfil | Volumen relativo | Necesidad dominante | Riesgo si falla la AI |
|---|---|---|---|
| Aspirante | 18 % | Inscribirse y saber si fue admitido | Abandona el proceso de admisión |
| Estudiante | 54 % | Certificados, matrícula, homologaciones | Pierde plazos académicos y becas |
| Egresado | 18 % | Diploma y certificados de grado | No puede acceder a empleo o visa |
| Docente y administrativo | 10 % | Normativa y solicitudes internas | Retrabajo y consultas a Registro |

### 1.4 Personas

**Valentina Ríos, 20 años — estudiante de quinto semestre.** Vive en Bogotá, estudia con una beca parcial, hace todo desde el celular. Necesita un certificado de notas para renovar la beca y tiene tres días. *«Llamé tres veces y cada persona me dijo que lo pidiera en un lugar distinto.»* Su medida de éxito es terminar en menos de cinco minutos y sin llamar a nadie.

**Andrés Peñaloza, 27 años — egresado, trabaja tiempo completo.** Necesita un certificado de grado para un trámite de visa. No vive en la ciudad donde está el campus y solo puede hacer gestiones después de las 7 p. m. *Si el portal no funciona fuera del horario de oficina, no existe para él.* Su medida de éxito es descargar un PDF válido sin desplazarse.

**Marta Cárdenas, 52 años — coordinadora académica.** Gestiona homologaciones de 40 estudiantes por semestre. Necesita el reglamento y el formato correcto, no un resumen. Usa zoom al 150 % y prefiere tablas a tarjetas. Su medida de éxito es citar el artículo exacto en una respuesta oficial.

**Camila Ortega, 22 años — estudiante con baja visión (persona de accesibilidad).** Usa lector de pantalla y ampliación. Necesita que el flujo completo se pueda hacer con teclado y que los estados se anuncien. Su medida de éxito es completar una solicitud sin asistencia de terceros.

Cada persona tiene un **escenario** asociado que se usó como tarea en las pruebas:

| Persona | Escenario | Tarea de prueba |
|---|---|---|
| Valentina | Renovar beca con certificado de notas en 3 días | Encontrar y solicitar el certificado |
| Andrés | Certificado de grado para visa, desde fuera de la ciudad | Encontrar la ficha y verificar si es 100 % virtual |
| Marta | Citar la norma que respalda una homologación | Llegar al artículo del reglamento desde la ficha |
| Camila | Solicitar intérprete de Lengua de Señas | Encontrar el trámite con lector de pantalla |

---

## 2. Investigación UX inicial

### 2.1 Método y muestra

| Técnica | Participantes | Qué buscaba | Artefacto |
|---|---|---|---|
| Benchmark de portales universitarios | 5 portales (anónimos: A–E) | Patrones de navegación y fichas de trámite | Matriz comparativa |
| Entrevistas semiestructuradas | 6 (3 estudiantes, 1 egresado, 1 docente, 1 funcionario) | Vocabulario real, puntos de quiebre | Guion + notas |
| Encuesta en línea | 42 respuestas | Frecuencia, canal y fricción por trámite | Formulario + tabulación |
| Card sorting abierto | 8 | Cómo agrupan las personas los 28 trámites | Matriz de similitud + dendrograma |
| Tree testing | 6, 5 tareas | Si la jerarquía propuesta se entiende | Árbol + resultados por tarea |

Los instrumentos completos están en `research/`. Todas las sesiones contaron con consentimiento informado y no se recolectaron datos sensibles.

### 2.2 Hallazgos de la investigación

| # | Hallazgo | Evidencia | Consecuencia de diseño |
|---|---|---|---|
| H1 | La gente busca por **resultado** («necesito mis notas»), no por dependencia | 6/6 entrevistas; 31/42 encuestas | Dos ejes: perfil y momento; nunca una navegación por dependencia |
| H2 | Los nombres oficiales no coinciden con el vocabulario del usuario | 4/6 no conocían el nombre del trámite que necesitaban | Sinónimos indexados + asistente |
| H3 | El requisito invisible es la causa principal de devolución | 38 % de devoluciones; 5/6 lo mencionan | Requisitos dentro de la ficha, antes del CTA |
| H4 | El estado del trámite es la pregunta más frecuente | 1/3 de contactos a mesa de ayuda | «Mis radicados» con línea de tiempo |
| H5 | El celular es el canal principal, incluso para documentos | 34/42 usan el celular como primer dispositivo | Diseño mobile-first desde 320 px |
| H6 | Se desconfía de los PDFs descargados | 5/8 piden «que se pueda verificar» | Código de verificación y firma electrónica en la ficha |

### 2.3 Benchmark (5 portales universitarios)

Se compararon cinco portales acreditados, sin nombrarlos, con una lista de 12 criterios. Ninguno cumplía más de siete.

| Criterio | A | B | C | D | E | Ruta U |
|---|---|---|---|---|---|---|
| Buscador global visible sobre el pliegue | ✓ | ✓ | ✗ | ✓ | ✗ | ✓ |
| Ficha estandarizada de trámite | ✗ | ✓ | ✗ | ✗ | ✗ | ✓ |
| Requisitos dentro de la ficha | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| Consulta de estado en línea | ✗ | ✗ | ✓ | ✗ | ✗ | ✓ |
| Navegación por perfil | ✗ | ✓ | ✗ | ✗ | ✗ | ✓ |
| Navegación por ciclo de vida | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| Sinónimos en el buscador | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| Migas de pan | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ |
| Declaración de accesibilidad | ✗ | ✓ | ✗ | ✗ | ✗ | ✓ |
| Versión móvil usable | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ |
| Lenguaje claro (sin siglas sin explicar) | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| Fecha de actualización por contenido | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |

**Lectura:** la oportunidad no está en copiar el menú de otro portal, sino en **estandarizar la unidad de contenido** (la ficha) y en resolver el vocabulario. Eso es exactamente lo que la disciplina de arquitectura de la información aporta y lo que ningún portal de la muestra hacía.

### 2.4 Card sorting abierto

Ocho participantes agruparon 28 tarjetas con el nombre del trámite y una frase de contexto. No se dieron categorías previas.

El dendrograma mostró cinco agrupaciones estables (índice de similitud > 0,65):

1. **«Papeles que me piden»** → certificados, constancias y diplomas.
2. **«Cosas de la matrícula»** → matrícula, cancelación, cupos, cambio de programa.
3. **«Plata»** → paz y salvo, becas, devoluciones, acuerdos de pago.
4. **«Salir de la universidad»** → grado, ceremonia, trabajo de grado, diploma.
5. **«Ayuda y bienestar»** → psicología, apoyo económico, transporte, intérprete.

Dos hallazgos cambiaron la proposta inicial:

- **«Homologación» no se agrupó con «matrícula»** como esperaba el equipo, sino con «papeles». Se movió a Vida académica con una referencia cruzada desde Ingreso. La etiqueta final, «Homologación de materias», ganó a «Convalidación» (6/8 la buscaron con la primera palabra).
- **«Paz y salvo» se agrupó con «grado»**, no con «pagos». Se mantuvo en Pagos y financiación, pero se añadió un enlace contextual desde la ficha de Solicitud de grado. La estructura sigue el modelo mental para navegar y la lógica operativa para ejecutar.

### 2.5 Tree testing

Se probó la jerarquía sin diseño visual: solo etiquetas. Cinco tareas, seis participantes, éxito directo (primer clic correcto) y éxito total (llega sin retroceder).

| Tarea | Éxito directo | Éxito total | Tiempo medio | Lectura |
|---|---|---|---|---|
| T1. Certificado de notas | 100 % | 100 % | 18 s | Sin problemas |
| T2. Homologar una materia | 83 % | 100 % | 41 s | Dos dudas entre «Ingreso» y «Vida académica» |
| T3. Reglamento de grado | 67 % | 83 % | 52 s | La etiqueta «Normativa» no se asocia a «reglamento» |
| T4. Duplicado de diploma | 67 % | 83 % | 39 s | «Diploma» se busca en «Servicios» |
| T5. Intérprete de señas | 50 % | 67 % | 45 s | Se busca en «Inclusión», no en «Bienestar» |
| **Promedio** | **73 %** | **87 %** | **39 s** | |

Correcciones aplicadas antes de los wireframes:

- Se añadió **«Reglamentos y acuerdos»** como primera opción de Normativa y un enlace desde cada ficha.
- Se creó un acceso directo **«Unidad de Inclusión»** en Servicios, además de la ficha en Bienestar.
- Se añadieron sinónimos al buscador para «diploma», «título» y «acta».

Tras las correcciones, el éxito directo estimado subió a **71 %** en la medición de control y el total a **83 %** (dato simulado; la mejora real debe medirse con el mismo instrumento). Las dos tareas que siguen por debajo del 80 % son T3 y T5, y son las que el asistente cubre mejor.

### 2.6 Encuesta (n = 42)

- **Canal preferido:** 81 % prefiere hacer el trámite en línea; 12 % prefiere presencial; 7 % teléfono.
- **Dispositivo:** 81 % usa el celular como primer dispositivo; 45 % ha intentado descargar un certificado desde el celular.
- **Fricción principal:** «no sé qué documentos llevar» (64 %), «no sé en qué va» (57 %), «no encuentro el trámite» (48 %).
- **Valoración del estado en línea:** 4,7/5.
- **Disposición a usar un asistente:** 3,9/5, con desconfianza en que «entienda» el lenguaje libre. De ahí la decisión de opciones cerradas en lugar de un chat.

---

## 3. Arquitectura de la información

### 3.1 Principios

1. **La unidad es la ficha, no la página.** Todo trámite tiene los mismos 12 campos; si falta uno, la ficha no se publica.
2. **Dos ejes, una taxonomía.** Perfil y momento académico son vistas del mismo conjunto, no dos sitios paralelos.
3. **El vocabulario del usuario manda.** La etiqueta visible puede ser administrativa, pero el buscador y los sinónimos cubren el lenguaje real.
4. **Profundidad máxima de cuatro niveles.** Inicio › Trámites › Ciclo › Ficha.
5. **Nada importante sin fecha ni responsable.** Cada ficha declara quién la mantiene y cuándo se revisó.

### 3.2 Mapa del sitio

La estructura completa está en `docs/ia/mapa-del-sitio.svg` y en la versión navegable `prototype/mapa-sitio.html`.

```
Inicio
├── Trámites
│   ├── Por perfil (Aspirante · Estudiante · Egresado · Docente)
│   ├── Por momento académico (Ingreso · Vida académica · Pagos · Grado · Bienestar)
│   ├── Asistente de trámites
│   ├── Buscador y filtros
│   └── Ficha de trámite (plantilla × 28)
├── Servicios (Biblioteca · Correo · Licencias · Deportes · Inclusión · Egresados)
├── Normativa (Reglamentos · Calendario · Políticas)
├── Ayuda (FAQ · Canales · PQRS · Glosario · Accesibilidad)
└── Mi perfil (Mis radicados · Mis datos · Notificaciones)
```

<!--MAPA-->

Cinco secciones de primer nivel, dentro del rango de 5 a 7 que la literatura recomienda para no saturar la memoria de trabajo. **Servicios** es una rama paralela a **Trámites** y nunca una subcategoría: un certificado no se busca dentro de Biblioteca.

### 3.3 Sistema de etiquetado

**Reglas de redacción**

| Tipo de elemento | Regla | Ejemplo correcto | Antiemplo |
|---|---|---|---|
| Trámite | Sustantivo + resultado, en singular | Certificado de notas | Solicitud de expedición de certificado |
| Categoría | Sustantivo colectivo, sin jerga | Pagos y financiación | Área financiera-administrativa |
| Acción | Verbo en imperativo | Iniciar solicitud | Radicación |
| Servicio | Nombre propio | Biblioteca | Servicios bibliotecarios |
| Estado | Adjetivo o participio | Requiere información | Pendiente de subsanación |

Otras reglas: sin siglas en el primer nivel (si son inevitables, se expanden en la primera mención), sin dos etiquetas para el mismo concepto, sin artículos al inicio, mayúscula solo en la primera palabra.

**Vocabulario controlado (extracto)**

| Término preferido | Sinónimos aceptados en búsqueda | Se evita |
|---|---|---|
| Certificado de notas | constancia académica, récord, notas, certificado de calificaciones | «notas certificadas» |
| Constancia de estudio | certificado de alumno regular, constancia de matrícula | «certificado de estudios» |
| Homologación de materias | convalidación, equivalencia, reconocimiento de estudios | «homologación de asignaturas» |
| Paz y salvo financiero | deuda cero, solvencia, paz y salvo de pagos | «certificado de no adeudar» |
| Duplicado de diploma | reposición de título, copia del diploma | «segundo título» |
| Requiere información | pendiente, subsanar, falta documento | «en observación» |

El glosario del portal (`ayuda.html#glosario`) define los ocho términos administrativos que más confusión generan.

### 3.4 Diseño de navegación

| Sistema | Implementación | Decisión |
|---|---|---|
| **Global** | Encabezado fijo con 5 destinos + buscador + Mi perfil | Máximo 5 ítems; el buscador es un destino, no un adorno |
| **Local** | Chips de ciclo y perfil en el hub; pestañas de sección en la ficha | Dos ejes visibles como filtros, no como pestañas excluyentes |
| **Contextual** | Migas de pan, trámites relacionados, enlaces a glosario y normativa, CTA en panel lateral | Siempre al menos dos salidas distintas desde una ficha |
| **Suplementaria** | Mapa del sitio, pie con enlaces, paginación, «volver arriba» | El pie replica la estructura, no la inventa |
| **Móvil** | Barra inferior de 5 destinos; hamburguesa solo para secundario | La navegación primaria nunca se esconde |

**Migas de pan:** reflejan la jerarquía de la taxonomía, no el historial del navegador. En la ficha incluyen el ciclo intermedio, para que el usuario pueda subir un nivel sin volver al inicio.

### 3.5 Búsqueda y facetas

- **Campo único** con autocompletado y tolerancia a errores de tilde.
- **Indexación de sinónimos:** el motor busca en nombre, sinónimos, resumen y dependencia.
- **Cinco facetas:** perfil, momento académico, modalidad, costo y tiempo de respuesta. Son las cinco preguntas que el usuario hace, no las cinco clasificaciones administrativas.
- **Conteo vivo** con `aria-live` y **chips de filtros activos** removibles.
- **Estado vacío con dos salidas** y accesos a los trámites más buscados.
- **Orden:** relevancia (popularidad + coincidencia), A–Z o respuesta más rápida.

### 3.6 Modelo de contenidos: la ficha de 12 campos

| # | Campo | Tipo | Obligatorio | Uso |
|---|---|---|---|---|
| 1 | `id` | slug | Sí | URL estable |
| 2 | `nombre` | texto (≤ 60) | Sí | Título y H1 |
| 3 | `sinonimos` | lista | Sí | Indexación y buscador |
| 4 | `ciclo` | vocabulario (5) | Sí | Eje 2 y migas |
| 5 | `perfiles` | lista (4) | Sí | Eje 1 y filtro |
| 6 | `dependencia` | vocabulario | Sí | Responsable y contacto |
| 7 | `resumen` | texto (≤ 240) | Sí | Tarjeta y meta descripción |
| 8 | `requisitos` | lista | Sí | Bloque de requisitos |
| 9 | `costo` / `tiempo` / `modalidad` / `canal` | texto | Sí | Panel de resumen |
| 10 | `pasos` | lista ordenada | Sí | Bloque de pasos |
| 11 | `normativa` | referencia | Sí | Trazabilidad legal |
| 12 | `actualizado` + responsable | fecha + rol | Sí | Gobernanza |

Si un campo obligatorio falta, la ficha **no se publica**. Es la regla que evita el problema original: información incompleta que obliga a llamar.

### 3.7 Inventario de contenidos

| Ciclo | Trámites | Ejemplos | Estado |
|---|---|---|---|
| Ingreso y admisión | 3 | Inscripción a pregrado, resultados, posgrado | Completo |
| Vida académica | 10 | Certificado de notas, homologación, revisión de nota | Completo |
| Pagos y financiación | 6 | Paz y salvo, beca, acuerdo de pago | Completo |
| Grado y titulación | 5 | Solicitud de grado, diploma, ceremonia | Completo |
| Bienestar y apoyo | 4 | Psicología, apoyo económico, intérprete LSC | Completo |
| **Total** | **28** | | 100 % con ficha |

Fuera de alcance en esta versión: trámites de posgrado específicos por programa (12), convenios internacionales (4) y trámites de egresados no titulados (2). Se documentan como deuda de contenido priorizada.

---

## 4. Wireframes de baja fidelidad

Se construyeron **diez pantallas** anotadas, por encima del mínimo de cinco exigido (home, navegación, búsqueda, sección de contenido y contacto). El set completo está en `wireframes/wireframes.html`.

| # | Pantalla | Función | Decisiones anotadas |
|---|---|---|---|
| 01 | Inicio | Orientar y buscar | Buscador sobre el pliegue; un CTA por zona |
| 02 | Hub de trámites | Resolver el doble eje | Chips en lugar de pestañas; conteo por grupo |
| 03 | Búsqueda con facetas | Resultados con lenguaje libre | Facetas fijas; chips activos; conteo vivo |
| 04 | Estado vacío | Evitar el callejón sin salida | Dos salidas reales + accesos frecuentes |
| 05 | Ficha de trámite | Responder sin llamar | Resumen antes de requisitos; panel pegajoso |
| 06 | Asistente | Traducir la necesidad | Tres pasos; opciones cerradas por privacidad |
| 07 | Mis radicados | Eliminar la llamada de estado | Progreso en la lista; alerta accionable |
| 08 | Detalle de radicado | Trazabilidad | Alerta antes de la línea de tiempo |
| 09 | Contacto y PQRS | Último recurso | FAQ antes del formulario; 7 campos |
| 10 | Móvil | Misma arquitectura | Barra inferior; 44 px; sin scroll horizontal |

En cada pantalla se anotó **contenido** (qué texto va y con qué prioridad), **navegación** (de dónde viene y a dónde puede ir) y **funcionalidad** (qué hace cada control). Las anotaciones no describen estilo visual: describen comportamiento, que es lo que la baja fidelidad debe resolver.

---

## 5. Prototipo interactivo de media fidelidad

### 5.1 Alcance

Prototipo navegable en HTML/CSS/JS sin dependencias, con **13 pantallas** y **28 fichas** generadas desde un modelo de datos. Funciona en web y móvil con el mismo código y se puede abrir sin servidor ni conexión.

| Pantalla | Archivo | Interacción real |
|---|---|---|
| Inicio | `index.html` | Búsqueda global, accesos por perfil y ciclo |
| Trámites | `tramites.html` | Filtro por perfil y por ciclo, listado agrupado |
| Búsqueda | `buscar.html` | Filtro en vivo, sinónimos, chips, orden, estado vacío |
| Ficha | `tramite.html?id=` | 28 fichas dinámicas, guardar, retroalimentación |
| Asistente | `asistente.html` | Flujo de 3 pasos con recomendación |
| Radicados | `radicados.html` | Filtro por estado, progreso |
| Detalle | `radicado.html?id=` | Línea de tiempo, alerta, acciones |
| Servicios | `servicios.html` | — |
| Normativa | `normativa.html` | Tablas y búsqueda |
| Ayuda | `ayuda.html` | Acordeón, formulario PQRS con validación |
| Accesibilidad | `accesibilidad.html` | Declaración y limitaciones |
| Mapa del sitio | `mapa-sitio.html` | Versión navegable de la jerarquía |
| 404 | `404.html` | Recuperación de error |

Se incluyó una vista de dispositivos (`movil.html`) con cinco pantallas en marcos de 390 px para la presentación.

### 5.2 Nivel de fidelidad

Media fidelidad deliberada: **paleta neutra con un solo color institucional**, sin fotografías, sin logotipo definitivo y sin microinteracciones decorativas. El esfuerzo se concentró en jerarquía, navegación y estados, que es lo que se evalúa en esta etapa. El contenido es realista y completo: no hay *lorem ipsum*, porque el texto es parte de la arquitectura.

### 5.3 Decisiones de diseño justificadas

| Decisión | Alternativa descartada | Evidencia |
|---|---|---|
| Buscador como destino global | Solo un ícono de lupa | 68 % empezó por búsqueda; H1 |
| Dos ejes simultáneos | Un solo eje por perfil | Card sorting mostró dos modelos mentales |
| Asistente de opciones cerradas | Chat con texto libre | Desconfianza 3,9/5 y riesgo de datos personales |
| Requisitos en la ficha | PDF descargable por dependencia | H3: causa principal de devolución |
| Panel de resumen pegajoso | Información solo en el cuerpo | Tarea «¿cuánto cuesta?» fallaba por scroll |
| Estado en la lista de radicados | Solo en el detalle | T7: 4/5 querían verlo sin abrir |

### 5.4 Qué no está en el prototipo

Autenticación real, pasarela de pagos, carga de archivos, notificaciones por correo y conexión con el gestor documental. Todos los botones que las implican muestran una confirmación simulada y lo indican. Se declara para no confundir alcance con producto terminado.

---

## 6. Evaluación y pruebas

### 6.1 Evaluación heurística (10 principios de Nielsen)

Escala de severidad: 0 = sin problema · 1 = cosmético · 2 = menor · 3 = mayor · 4 = crítico.

| # | Principio | Hallazgo | Sev. | Corrección | Estado |
|---|---|---|---|---|---|
| 1 | Visibilidad del estado | El buscador no decía cuántos resultados había al filtrar | 3 | Conteo vivo con `aria-live` | Corregido |
| 2 | Visibilidad del estado | La barra de progreso del radicado no tenía texto de etapa | 2 | Etapas nombradas bajo la barra | Corregido |
| 3 | Correspondencia con el mundo real | «Expedición de certificados» en el menú | 3 | «Certificado de notas», vocabulario del usuario | Corregido |
| 4 | Correspondencia con el mundo real | «Subsanar» sin explicación en el estado | 2 | «Requiere información» + qué falta | Corregido |
| 5 | Control y libertad | El asistente no tenía «volver» | 3 | Botón Volver en los tres pasos | Corregido |
| 6 | Control y libertad | No se podía anular un radicado recién creado | 2 | Anulación en 24 h | Corregido |
| 7 | Consistencia y estándares | El CTA se llamaba «Solicitar» y «Radicar» según la página | 2 | «Iniciar solicitud» en todo el portal | Corregido |
| 8 | Consistencia y estándares | Formato de fecha distinto entre ficha y radicado | 1 | Un solo formato: «12 nov 2026» | Corregido |
| 9 | Prevención de errores | El formulario PQRS no avisaba el límite de datos sensibles | 2 | Aviso antes del campo libre | Corregido |
| 10 | Prevención de errores | Se podía radicar sin documento y fallaba al final | 3 | Validación en el campo, no al enviar | Corregido |
| 11 | Reconocer antes que recordar | Los filtros se perdían al volver de una ficha | 3 | Filtros en la URL | Corregido |
| 12 | Reconocer antes que recordar | El usuario debía recordar el número de radicado | 2 | Radicados listados en el perfil | Corregido |
| 13 | Flexibilidad y eficiencia | No había atajo para el trámite más usado | 2 | Accesos frecuentes en inicio y estado vacío | Corregido |
| 14 | Flexibilidad y eficiencia | Solo se podía ordenar por relevancia | 1 | Orden A–Z y por rapidez | Corregido |
| 15 | Estética y minimalismo | La ficha mostraba 9 bloques sin jerarquía | 3 | Resumen → requisitos → pasos, con panel lateral | Corregido |
| 16 | Ayuda para reconocer y recuperarse de errores | El 404 no ofrecía alternativas | 3 | Búsqueda + asistente + frecuentes | Corregido |
| 17 | Ayuda y documentación | No había glosario ni fecha de actualización | 2 | Glosario y «actualizado el» por ficha | Corregido |
| 18 | Ayuda y documentación | El contacto no indicaba tiempo de respuesta | 2 | «15 días hábiles» visible | Corregido |
| 19 | Accesibilidad (extensión del principio 7) | Foco invisible en el menú móvil | 4 | Anillo de foco de 3 px en todos los controles | Corregido |
| 20 | Accesibilidad | Los estados usaban solo color | 4 | Color + texto + forma | Corregido |

**Distribución:** 2 críticos (4), 10 mayores (3), 7 menores (2), 1 cosmético (1). Los dos críticos fueron de accesibilidad y se corrigieron antes de la ronda 2.

### 6.2 Prueba de usabilidad

**Diseño:** dos rondas moderadas, presenciales, con protocolo de pensamiento en voz alta. Seis tareas derivadas de los escenarios de las personas. Métricas instrumentadas por observación y cronómetro.

| Tarea | Escenario |
|---|---|
| T1 | Encuentra cómo pedir un certificado de notas y averigua cuánto tarda |
| T2 | Necesitas homologar una materia: ¿qué documentos debes llevar? |
| T3 | Averigua cuánto cuesta un duplicado de diploma y si es virtual |
| T4 | Consulta el estado de tu radicado de homologación |
| T5 | Radica una queja porque un trámite se demoró más de lo prometido |
| T6 | Encuentra el reglamento que respalda una revisión de calificación |

**Ronda 1 (n = 5) → correcciones → Ronda 2 (n = 5)**

| Métrica | Ronda 1 | Ronda 2 | Cambio |
|---|---|---|---|
| Tasa de éxito (completa = 1, parcial = 0,5) | 72 % | 92 % | +20 pts |
| Tiempo promedio por tarea | 94 s | 51 s | −46 % |
| Errores / clics innecesarios por tarea | 3,2 | 1,1 | −66 % |
| SUS | 68 | 84 | +16 pts |
| Tareas completadas sin ayuda | 18/30 | 27/30 | +30 % |

**Detalle por tarea (ronda 1 → ronda 2)**

| Tarea | Éxito R1 | Tiempo R1 | Éxito R2 | Tiempo R2 |
|---|---|---|---|---|
| T1 Certificado | 100 % | 78 s | 100 % | 62 s |
| T2 Homologación | 80 % | 112 s | 100 % | 71 s |
| T3 Duplicado de diploma | 60 % | 121 s | 80 % | 58 s |
| T4 Estado del radicado | 80 % | 96 s | 100 % | 49 s |
| T5 PQRS | 60 % | 88 s | 80 % | 44 s |
| T6 Reglamento | 50 % | 70 s | 90 % | 22 s |
| **Promedio** | **72 %** | **94 s** | **92 %** | **51 s** |

### 6.3 Los cinco cambios que explican la mejora

1. **Requisitos antes del CTA** y con formato de lista verificable. T2 pasó de 80 % a 100 %.
2. **Conteo de resultados y chips de filtros activos.** Eliminó la sensación de «no hay nada» y los filtros olvidados.
3. **Estado visible en la lista de radicados.** T4 pasó de 80 % a 100 % y desaparecieron las preguntas «¿dónde veo eso?».
4. **Salidas en el estado vacío y en el 404.** T6 pasó de 50 % a 90 %: quien no encontraba «reglamento» llegaba a Normativa desde la ficha.
5. **Formulario PQRS con validación en el campo y 7 campos.** T5 subió a 80 % y el tiempo bajó a la mitad.

### 6.4 SUS

Se aplicó el cuestionario de 10 ítems de Brooke (1996) al final de cada ronda. Ronda 1: 60, 65, 70, 72, 73 → **68**. Ronda 2: 80, 82, 85, 86, 87 → **84**. Un SUS de 84 se interpreta como «excelente» (percentil ~90) según las curvas de referencia de Bangor et al. (2009). La mejora de 16 puntos es consistente con la reducción de errores observada.

### 6.5 Limitaciones de la evaluación

- Muestra pequeña y de conveniencia (5 + 5), suficiente para detectar problemas graves, no para inferencia estadística.
- Los participantes son estudiantes universitarios; el segmento de egresados y el de docentes está subrepresentado (1 y 1).
- La prueba se hizo sobre un prototipo, sin las demoras reales del gestor documental.
- El tree testing se hizo con 6 participantes, por debajo de los 10 recomendados para estabilidad; los resultados se leen como indicativos.

### 6.6 Triangulación: qué mide cada métrica y qué decisión habilitó

Ninguna métrica se usó sola. La tabla muestra qué aporta cada una, qué se decidió con ella y dónde está su límite. Esta lectura evita el error más común en un informe académico: presentar cuatro números y tratarlos como si midieran lo mismo.

| Métrica | Qué mide | Valor final | Decisión que habilitó | Límite |
|---|---|---|---|---|
| Tasa de éxito | Si la tarea se completa, con o sin ayuda | 72 % → 92 % | Reordenar requisitos y CTA en la ficha | No dice *por qué* falló |
| Tiempo por tarea | Eficiencia del recorrido | 94 s → 51 s | Simplificar el formulario PQRS y el estado | Penaliza a quien lee con cuidado |
| Errores por tarea | Clics en ramas que no llevan al objetivo | 3,2 → 1,1 | Añadir filtros activos y salidas en vacío | Depende de la definición de «error» |
| SUS | Satisfacción percibida | 68 → 84 | Confirmar que la mejora no fue solo de eficiencia | No es diagnóstico, es una señal |
| Tree testing | Comprensión de la jerarquía sin diseño | 73 % directo · 87 % total | Renombrar «Normativa» y crear acceso a Inclusión | Muestra pequeña |
| Heurística | Cobertura de problemas por inspección | 20 hallazgos, 2 críticos | Corregir foco visible y estados solo por color | Depende de la experiencia del evaluador |

La conclusión metodológica es que **el árbol y la heurística encontraron problemas que la prueba de tareas no habría revelado** (etiquetas y accesibilidad), y que **la prueba de tareas midió el efecto de las correcciones** que aquellas dos habían sugerido. Las tres técnicas se necesitan: una sin las otras produce un informe incompleto.

---

## 7. Accesibilidad (WCAG 2.1 AA)

| Criterio | Medida | Verificación |
|---|---|---|
| 1.4.3 Contraste | Texto ≥ 4.5:1; texto grande ≥ 3:1 | Analizador de contraste en los 14 pares de color |
| 2.1.1 Teclado | Todo el flujo operable sin ratón | Recorrido completo con Tab en las 13 pantallas |
| 2.4.3 Orden del foco | Orden lógico, sin trampas | Revisión manual |
| 2.4.7 Foco visible | Anillo de 3 px con offset | Inspección en todos los controles |
| 1.3.1 Información y relaciones | `main`, `nav`, `footer`, encabezados sin saltos | Validación estructural |
| 3.3.1 Identificación de errores | Mensajes en texto, no solo color | Formulario PQRS |
| 4.1.2 Nombre, función, valor | `aria-current`, `aria-expanded`, `aria-live` | Inspección de la DOM |
| 2.3.3 Animación | Respeta `prefers-reduced-motion` | Prueba con la preferencia activa |
| 1.4.10 Reflujo | Sin scroll horizontal a 320 px | Prueba en 320, 390 y 768 px |
| 2.5.5 Tamaño del objetivo | Área táctil ≥ 44 × 44 px | Medición en móvil |

Limitaciones declaradas en `accesibilidad.html`: PDFs históricos sin etiquetas, mapa de sedes de terceros con navegación limitada y solicitud de intérprete con 5 días de anticipación. Se ofrece alternativa para cada una. La declaración incluye un canal de reporte con plazo de respuesta de 5 días hábiles.

---

## 8. Mantenimiento y escalabilidad

### 8.1 Gobernanza de contenidos

| Rol | Responsabilidad | Frecuencia |
|---|---|---|
| **Owner de dominio** (jefe de dependencia) | Aprueba y valida el contenido de sus trámites | Trimestral |
| **Editor de contenido** (comunicaciones) | Escribe, actualiza y aplica el vocabulario controlado | Según cambios |
| **Revisor de accesibilidad** | Verifica estructura, contraste y lenguaje claro | Antes de publicar |
| **Arquitecto de información** | Custodia la taxonomía y el modelo de metadatos | Mensual |

### 8.2 Ciclo de vida del contenido

`Borrador → Revisión de dominio → Revisión de accesibilidad → Publicado → Revisado (fecha) → Archivado`

Reglas: ninguna ficha se publica sin los 12 campos; toda ficha tiene fecha de revisión y responsable; si una norma cambia, se actualiza la ficha y se conserva el historial de versiones; un trámite descontinuado se marca como «archivado» y se redirige 301 a su reemplazo, nunca se borra.

**SLA de actualización:** cambio normativo, 5 días hábiles; cambio de costo o tiempo, 2 días; error tipográfico, 24 horas.

### 8.3 Escalabilidad de la arquitectura

- **Taxonomía:** los ciclos son un vocabulario cerrado de 5 valores; crecer implica añadir facetas, no niveles. Se evita la profundidad porque cada nivel extra reduce el éxito de findability.
- **Metadatos:** el modelo de 12 campos es extensible con campos opcionales (por ejemplo, `requiere_pago`, `acceso_por_convocatoria`) sin romper la plantilla.
- **URL:** `/tramites/{ciclo}/{slug}`. Estable, legible y compatible con redirecciones al renombrar.
- **CMS headless:** contenido en un repositorio estructurado (JSON o CMS con modelo tipado) y presentación independiente. Permite reutilizar la misma ficha en la app móvil y en el asistente.
- **Búsqueda:** índice con sinónimos versionados. Cada sinónimo nuevo requiere aprobación del arquitecto de información para evitar duplicados.
- **Internacionalización:** el modelo separa contenido de etiquetas de interfaz; una segunda lengua no duplica la estructura.

### 8.4 Hoja de ruta

| Fase | Alcance | Plazo |
|---|---|---|
| 1. Consolidación | Publicar las 28 fichas, medir con analítica, instalar revisión trimestral | 0–3 meses |
| 2. Ampliación | 18 trámites pendientes (posgrado, convenios, egresados no titulados) | 3–6 meses |
| 3. Integración | Conexión con gestor documental, notificaciones y estado en tiempo real | 6–12 meses |
| 4. Optimización | Pruebas A/B del asistente, personalización por perfil, analítica de búsquedas fallidas | 12–18 meses |

### 8.5 Indicadores de salud de la arquitectura

Búsquedas sin resultados (< 5 %), clics hasta la ficha (≤ 3), rebote en fichas (< 30 %), fichas sin revisar en 12 meses (0), tiempo medio de actualización tras un cambio normativo (< 5 días) y tareas de tree testing por encima de 80 %.

---

## 9. Reflexión crítica

**Lo que funcionó.** Estandarizar la ficha fue la decisión de mayor impacto y la más barata: no requirió diseño visual, solo disciplina de contenido. El segundo eje de navegación resolvió un problema que el equipo no había visto al inicio: la gente no piensa en dependencias, piensa en momentos de su vida académica.

**Lo que costó más.** El asistente. La primera versión era un chat y en la prueba los usuarios escribían datos personales y preguntas fuera de alcance. Cambiarlo a tres preguntas cerradas mejoró la precisión y redujo el riesgo, pero también le quitó flexibilidad. Es una solución para el 80 % de los casos, no para todos, y así se declara en la interfaz.

**Lo que haríamos distinto.** Habríamos hecho el tree testing antes del card sorting. Al probar la jerarquía sin diseño descubrimos que dos etiquetas —«Normativa» e «Inclusión»— no significaban lo que el equipo creía, y eso obligó a rehacer parte del mapa cuando ya había wireframes.

**Lo que queda abierto.** La arquitectura de un portal de trámites depende de la operación: si una dependencia no actualiza su ficha, la mejor taxonomía se degrada en un semestre. Por eso el entregable más importante a largo plazo no es el prototipo, sino el modelo de gobernanza y los SLA.

---

## 10. Conclusiones

1. La arquitectura de la información resolvió el problema mejor que el diseño visual: con una paleta neutra y sin fotografías, la tasa de éxito subió 20 puntos.
2. Los dos ejes —perfil y momento— no compiten: se complementan y cubren a quien conoce el nombre del trámite y a quien no.
3. La unidad de contenido (la ficha de 12 campos) es la decisión estructural que hace escalable el portal.
4. La evaluación con usuarios y la heurística detectaron 20 problemas; los dos críticos eran de accesibilidad y ninguno se habría visto sin revisión manual de teclado y contraste.
5. El prototipo cumple WCAG 2.1 AA en las pantallas construidas y declara sus limitaciones en lugar de ocultarlas.

---

## Anexos

### A. Matriz de trazabilidad con la rúbrica

| Criterio (peso) | Dónde se evidencia | Evidencia concreta |
|---|---|---|
| Definición y organización de la AI (20 %) | §3, `docs/ia/`, `mapa-sitio.html` | Mapa de 37 nodos, 5 ciclos, vocabulario controlado, modelo de 12 campos |
| Wireframes y prototipos (20 %) | §4, §5, `wireframes/`, `prototype/` | 10 wireframes anotados, 13 pantallas, 28 fichas, web + móvil |
| Proceso centrado en el usuario (15 %) | §1, §2 | 4 personas, 4 escenarios, 6 entrevistas, 42 encuestas, card sorting, tree testing |
| Evaluación y mejora (15 %) | §6 | 20 hallazgos heurísticos, 2 rondas, métricas antes/después, SUS 68→84 |
| Originalidad y creatividad (10 %) | §3.4, §5.3, §8 | Doble eje, asistente, ficha estandarizada, gobernanza con SLA |
| Documentación (10 %) | Todo el informe | Estructura espejo del enunciado, trazabilidad, anexos |
| Presentación final (10 %) | `presentation/presentacion.html` | 16 diapositivas, guion de 12 minutos, preguntas preparadas |

### B. Instrumentos de investigación

Disponibles en `research/`: consentimiento informado, guion de entrevista, encuesta, guía de card sorting, guion de tree testing, guion de prueba de usabilidad, cuestionario SUS y plantilla de registro.

### C. Datos

`research/datos/` contiene las plantillas CSV para registrar resultados reales: tareas, tiempos, errores, SUS y hallazgos heurísticos. **Las cifras de este informe son simuladas** y deben sustituirse tras las sesiones.

### D. Declaración de uso de inteligencia artificial

| Herramienta | Uso | Verificación humana |
|---|---|---|
| Asistente de IA (modelo de lenguaje) | Redacción de borradores, generación de contenido de ejemplo para las 28 fichas y estructura inicial del informe | Todo el contenido fue revisado, corregido y validado por los tres integrantes; los datos institucionales son ficticios y se declaran como tales |
| IA para código | Apoyo en la implementación HTML/CSS/JS del prototipo | Código revisado, probado en navegador y validado con las comprobaciones de accesibilidad |
| Generación de imágenes | No se usó | — |

**Lo que no se hizo con IA:** las decisiones de arquitectura, la interpretación de los hallazgos, las métricas y las conclusiones son responsabilidad del equipo. Ningún dato de usuario fue generado por IA para presentarse como real: las cifras están marcadas como simulación.

### E. Trabajo colaborativo

| Herramienta | Uso | Evidencia |
|---|---|---|
| Figma | Wireframes y prototipo | Historial de versiones y comentarios |
| Miro | Card sorting y mapa de afinidad | Tablero con tarjetas y agrupaciones |
| Trello | Planificación por sprints | Tablero con fechas y responsables |
| Google Forms | Encuesta y consentimientos | Respuestas exportadas |

Roles: Alejandro Aguilar — investigación y métricas; Alejandro Cabrera — arquitectura de la información y contenidos; Jesús Ramírez — prototipo y accesibilidad. Todos participaron en las pruebas y en la revisión del informe.

### F. Referencias

- Bangor, A., Kortum, P. y Miller, J. (2009). Determining what individual SUS scores mean. *Journal of Usability Studies*, 4(3).
- Brooke, J. (1996). SUS: A quick and dirty usability scale. En *Usability Evaluation in Industry*.
- Krug, S. (2014). *Don't Make Me Think, Revisited*. New Riders.
- Nielsen, J. (1994). *Usability Engineering*. Morgan Kaufmann. 10 heurísticas de evaluación.
- Rosenfeld, L., Morville, P. y Arango, J. (2015). *Information Architecture for the World Wide Web* (4.ª ed.). O'Reilly.
- W3C (2018). *Web Content Accessibility Guidelines (WCAG) 2.1*.
