# Guion de prueba de usabilidad (2 rondas)

**Objetivo:** medir éxito, tiempo y errores en seis tareas clave; detectar problemas y verificar correcciones.
**Participantes:** 5 por ronda, moderada, presencial o videollamada con pantalla compartida.
**Duración:** 30 min por sesión.

## Preparación
- Consentimiento firmado y permiso de grabación.
- Prototipo abierto en la pantalla de inicio (`prototype/index.html`).
- Cronómetro, hoja de registro y dos roles: moderador y observador.
- Frase de encuadre: «Estamos evaluando el portal, no a ti. No hay forma de equivocarse.»

## Tareas (leer en voz alta, sin dar pistas)

| # | Tarea | Criterio de éxito | Errores que se registran |
|---|---|---|---|
| T1 | «Necesitas un certificado de notas para una beca. Encuéntralo y dime cuánto tarda.» | Llega a la ficha y menciona 1 día hábil | Buscar en Servicios; confundir con constancia de estudio |
| T2 | «Vas a homologar una materia. ¿Qué documentos debes llevar?» | Menciona certificado de notas y programas de asignaturas | Abrir «Ingreso»; no encontrar requisitos |
| T3 | «Averigua cuánto cuesta un duplicado de diploma y si se puede hacer sin ir al campus.» | $95.000 y modalidad virtual | Confundir con certificado de grado |
| T4 | «Consulta en qué va tu radicado de homologación.» | Abre el radicado correcto y lee «requiere información» | Ir a Ayuda; llamar (simulado) |
| T5 | «Radica una queja porque un trámite se demoró más de lo prometido.» | Envía el formulario completo | Dejar campos vacíos; no aceptar política |
| T6 | «Encuentra el reglamento que respalda una revisión de calificación.» | Llega a Normativa o a la norma citada en la ficha | Buscar en Servicios; usar el buscador con «reglamento» |

## Registro por tarea
- Éxito: **completa (1)** / parcial (0,5) / fracaso (0).
- Tiempo en segundos (desde que termina la consigna hasta el logro o abandono).
- Número de errores o clics innecesarios (definir: clic en una rama que no lleva al objetivo).
- Ayudas del moderador: **cero**; si hay que ayudar, la tarea cuenta como fracaso.
- Cita textual y expresión de frustración.

## Después de las tareas
1. SUS (ver `sus.md`).
2. Tres preguntas abiertas: ¿qué fue lo más confuso?, ¿qué te faltó?, ¿qué cambiarías?
3. Agradecimiento y cierre.

## Resultado de referencia (simulado)

| Métrica | Ronda 1 | Ronda 2 |
|---|---|---|
| Éxito | 72 % | 92 % |
| Tiempo promedio | 94 s | 51 s |
| Errores/tarea | 3,2 | 1,1 |
| SUS | 68 | 84 |

> Registrar en `research/datos/tareas.csv` y `research/datos/sus.csv`.
