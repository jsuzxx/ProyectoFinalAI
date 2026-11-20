# Guion de tree testing

**Objetivo:** medir si la jerarquía propuesta se entiende **sin diseño visual**.
**Participantes:** 6 (recomendado 10) · **Duración:** 15 min · **Herramienta:** Optimal Workshop, Treejack o un árbol en Miro o en una hoja de cálculo compartida, sin estilos.

## Montaje
Árbol solo con texto: Inicio → 5 secciones → ciclos → fichas. Sin colores, sin íconos, sin descripciones.

## Tareas
Para cada tarea, el participante debe indicar **dónde haría clic** para encontrar la respuesta, sin buscar en Google.

| # | Tarea | Respuesta correcta |
|---|---|---|
| T1 | Necesitas un certificado con tus notas para una beca | Trámites › Vida académica › Certificado de notas |
| T2 | Quieres que reconozcan materias que cursaste en otra universidad | Trámites › Vida académica › Homologación de materias |
| T3 | Necesitas el reglamento que explica cómo se solicita el grado | Normativa › Reglamentos y acuerdos |
| T4 | Perdiste tu diploma y necesitas una copia | Trámites › Grado y titulación › Duplicado de diploma |
| T5 | Eres sordo y necesitas un intérprete para una clase | Trámites › Bienestar y apoyo › Intérprete LSC (o Servicios › Unidad de Inclusión) |

## Métricas
- **Éxito directo:** primer clic en la rama correcta.
- **Éxito total:** llega al destino, con o sin retroceso.
- **Tiempo a primer clic.**
- **Ruta recorrida:** para identificar atajos y callejones.
- **Justificación:** «¿por qué entraste por ahí?» (dato cualitativo clave).

## Resultado de referencia (simulado)

| Tarea | Éxito directo | Éxito total | Tiempo |
|---|---|---|---|
| T1 | 100 % | 100 % | 18 s |
| T2 | 83 % | 100 % | 41 s |
| T3 | 67 % | 83 % | 52 s |
| T4 | 67 % | 83 % | 39 s |
| T5 | 50 % | 67 % | 45 s |
| **Promedio** | **73 %** | **87 %** | **39 s** |

## Correcciones derivadas
1. «Reglamentos y acuerdos» como primera opción de Normativa + enlace desde cada ficha.
2. «Unidad de Inclusión» como acceso directo en Servicios, además de la ficha en Bienestar.
3. Sinónimos en el buscador: diploma, título, acta, constancia.

> Registrar clics y rutas en `research/datos/tree-testing.csv`.
