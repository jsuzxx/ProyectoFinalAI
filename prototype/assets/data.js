/* Ruta U — Portal de trámites y servicios universitarios
   Conjunto de contenidos del prototipo (simulación del CMS).
   Caso de estudio: Universidad San Rafael (institución ficticia).
   Los contenidos son verosímiles pero no corresponden a una universidad real. */

window.RUTAU = {
  meta: {
    universidad: "Universidad San Rafael",
    producto: "Ruta U",
    version: "2.0 · media fidelidad",
    actualizado: "2026-11-16"
  },

  perfiles: [
    { id: "aspirante", nombre: "Aspirante", desc: "Aún no eres estudiante de la Universidad." },
    { id: "estudiante", nombre: "Estudiante", desc: "Estás matriculado en pregrado o posgrado." },
    { id: "egresado", nombre: "Egresado", desc: "Ya terminaste materias o te graduaste." },
    { id: "docente", nombre: "Docente y administrativo", desc: "Trabajas en la Universidad." }
  ],

  ciclos: [
    { id: "admision", nombre: "Ingreso y admisión", desc: "Desde la inscripción hasta el primer día de clases.", icono: "puerta" },
    { id: "academico", nombre: "Vida académica", desc: "Notas, matrícula, homologaciones y solicitudes de estudio.", icono: "libro" },
    { id: "financiero", nombre: "Pagos y financiación", desc: "Matrícula, becas, paz y salvo y devoluciones.", icono: "moneda" },
    { id: "grado", nombre: "Grado y titulación", desc: "Trabajo de grado, ceremonia y diplomas.", icono: "birrete" },
    { id: "bienestar", nombre: "Bienestar y apoyo", desc: "Salud, transporte, accesibilidad y acompañamiento.", icono: "corazon" }
  ],

  tramites: [
    {
      id: "certificado-notas", nombre: "Certificado de notas", ciclo: "academico",
      perfiles: ["estudiante", "egresado"], dependencia: "Registro Académico",
      sinonimos: ["constancia académica", "récord académico", "certificado de calificaciones", "notas"],
      resumen: "Documento oficial con las asignaturas cursadas, las calificaciones y el promedio acumulado. Sirve para becas, intercambios y procesos laborales.",
      requisitos: ["Estar al día con la matrícula del semestre en curso", "Documento de identidad vigente", "Correo institucional activo para la notificación"],
      costo: "Sin costo en PDF · $18.000 en físico", tiempo: "1 día hábil", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 3, destacado: true, actualizado: "2026-10-02",
      pasos: ["Ingresa a Ruta U con tu correo institucional.", "Abre Mi perfil y elige Certificado de notas.", "Selecciona el formato (PDF o físico) y el motivo.", "Descarga el certificado o reclíbelo en Registro Académico."],
      normativa: "Acuerdo 042 de 2019, artículo 58 · Reglamento estudiantil",
      nota: "El certificado en PDF incluye código de verificación válido por 90 días."
    },
    {
      id: "constancia-estudio", nombre: "Constancia de estudio", ciclo: "academico",
      perfiles: ["estudiante"], dependencia: "Registro Académico",
      sinonimos: ["certificado de alumno regular", "constancia de matrícula", "certificado de estudiante activo"],
      resumen: "Certifica que estás matriculado y activo en el periodo académico vigente. La piden bancos, EPS y empresas.",
      requisitos: ["Matrícula vigente en el periodo actual", "Sin sanciones académicas activas"],
      costo: "Sin costo", tiempo: "1 día hábil", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 2, actualizado: "2026-09-18",
      pasos: ["Entra a Ruta U y abre Mi perfil.", "Elige Constancia de estudio.", "Indica a quién va dirigida.", "Descarga el PDF firmado digitalmente."],
      normativa: "Acuerdo 042 de 2019, artículo 59",
      nota: ""
    },
    {
      id: "homologacion-materias", nombre: "Homologación de materias", ciclo: "academico",
      perfiles: ["estudiante", "aspirante"], dependencia: "Secretaría Académica",
      sinonimos: ["convalidación", "equivalencia de asignaturas", "homologar", "reconocimiento de estudios"],
      resumen: "Solicita que se reconozcan asignaturas cursadas en otra institución o en otro programa de la Universidad.",
      requisitos: ["Certificado de notas de la institución de origen, apostillado o validado", "Programas de las asignaturas con contenidos y créditos", "Carta de motivación del estudiante"],
      costo: "Sin costo", tiempo: "15 días hábiles", modalidad: "Virtual con entrega de documentos",
      canal: "Portal Ruta U", popular: 2, actualizado: "2026-08-30",
      pasos: ["Reúne el certificado de notas y los programas de las asignaturas.", "Radica la solicitud y adjunta los archivos en PDF.", "El comité curricular evalúa la equivalencia.", "Consulta la decisión en Mis radicados."],
      normativa: "Acuerdo 118 de 2021 · Política de homologación",
      nota: "Solo se evalúan asignaturas aprobadas con nota igual o superior a 3,5."
    },
    {
      id: "cambio-programa", nombre: "Cambio de programa académico", ciclo: "academico",
      perfiles: ["estudiante"], dependencia: "Admisiones y Registro",
      sinonimos: ["traslado interno", "cambio de carrera", "cambio de pregrados"],
      resumen: "Solicitud para pasar de un programa a otro dentro de la Universidad, sujeta a disponibilidad de cupos y promedio.",
      requisitos: ["Haber cursado al menos dos semestres", "Promedio acumulado igual o superior a 3,7", "Paz y salvo financiero"],
      costo: "Sin costo", tiempo: "20 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 1, actualizado: "2026-07-21",
      pasos: ["Verifica los requisitos del programa de destino.", "Radica la solicitud desde Ruta U.", "El programa de destino emite concepto.", "Recibe la decisión por correo institucional."],
      normativa: "Acuerdo 042 de 2019, artículos 24 a 27",
      nota: "Solo hay dos ventanas de solicitud al año: mayo y noviembre."
    },
    {
      id: "revision-nota", nombre: "Revisión de calificación", ciclo: "academico",
      perfiles: ["estudiante"], dependencia: "Decanatura de programa",
      sinonimos: ["reclamación de nota", "segundo examinador", "revisar nota", "queja por calificación"],
      resumen: "Solicita la revisión de una calificación cuando consideras que la evaluación no se ajustó a lo pactado en el programa del curso.",
      requisitos: ["Radicar dentro de los 5 días hábiles siguientes a la publicación", "Identificar la evaluación y el criterio del programa del curso", "No haber radicado otra revisión sobre la misma evaluación"],
      costo: "Sin costo", tiempo: "10 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 1, actualizado: "2026-09-05",
      pasos: ["Abre el curso en Ruta U y elige la evaluación.", "Describe el motivo con base en el programa del curso.", "El docente responde en 3 días hábiles.", "Si persiste, un segundo examinador revisa el caso."],
      normativa: "Acuerdo 042 de 2019, artículo 47",
      nota: ""
    },
    {
      id: "cancelacion-semestre", nombre: "Cancelación de semestre", ciclo: "academico",
      perfiles: ["estudiante"], dependencia: "Registro Académico",
      sinonimos: ["retiro voluntario", "aplazamiento", "cancelar matrícula", "pausar estudios"],
      resumen: "Interrumpe temporalmente tus estudios sin perder la calidad de estudiante, dentro del calendario académico.",
      requisitos: ["Estar matriculado en el periodo vigente", "Paz y salvo financiero o acuerdo de pago firmado", "Concepto de Bienestar si es por motivos de salud"],
      costo: "Sin costo", tiempo: "3 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 1, actualizado: "2026-06-14",
      pasos: ["Revisa las fechas límite en el calendario académico.", "Radica la solicitud y elige el motivo.", "Adjunta los soportes si aplica.", "Recibe la confirmación y las condiciones de reingreso."],
      normativa: "Acuerdo 042 de 2019, artículos 33 a 36",
      nota: "La cancelación después de la semana 12 puede generar pérdida de la condición de estudiante."
    },
    {
      id: "matricula-extemporanea", nombre: "Matrícula extemporánea", ciclo: "academico",
      perfiles: ["estudiante"], dependencia: "Registro Académico",
      sinonimos: ["matrícula fuera de plazo", "matrícula tardía", "no alcancé a matricular"],
      resumen: "Permite matricularte después del cierre ordinario, con un recargo y sujeto a disponibilidad de cupos.",
      requisitos: ["No tener matrícula registrada en el periodo", "Paz y salvo financiero del periodo anterior", "Cupo disponible en todas las asignaturas inscritas"],
      costo: "$45.000 de recargo", tiempo: "2 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 1, actualizado: "2026-08-01",
      pasos: ["Verifica que la ventana extemporánea esté abierta.", "Inscribe asignaturas y confirma el recargo.", "Paga en línea antes del cierre.", "Descarga el comprobante de matrícula."],
      normativa: "Calendario académico 2026-2 · Resolución 221 de 2026",
      nota: ""
    },
    {
      id: "duplicado-carne", nombre: "Duplicado de carné", ciclo: "academico",
      perfiles: ["estudiante"], dependencia: "Registro Académico",
      sinonimos: ["reposición de carné", "carné perdido", "carnetización"],
      resumen: "Solicita un nuevo carné cuando lo pierdes, te lo roban o cambias de datos personales.",
      requisitos: ["Denuncia o declaración de pérdida", "Foto reciente con fondo blanco", "Paz y salvo financiero"],
      costo: "$25.000", tiempo: "3 días hábiles", modalidad: "Presencial en el campus",
      canal: "Registro Académico, bloque A", popular: 0, actualizado: "2026-05-22",
      pasos: ["Radica la solicitud en Ruta U.", "Paga el costo en la pasarela.", "Recoge el carné en Registro Académico.", "Actívalo en los torniquetes de acceso."],
      normativa: "Resolución 077 de 2020",
      nota: "El primer carné es gratuito; los duplicados tienen costo."
    },
    {
      id: "certificado-materias", nombre: "Certificado de materias vistas", ciclo: "academico",
      perfiles: ["estudiante", "egresado"], dependencia: "Registro Académico",
      sinonimos: ["historial de asignaturas", "certificado para transferencia", "materias cursadas"],
      resumen: "Lista las asignaturas cursadas con su intensidad horaria y créditos, sin incluir calificaciones. Se usa para transferencias.",
      requisitos: ["Documento de identidad vigente", "Correo institucional activo"],
      costo: "Sin costo", tiempo: "5 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 0, actualizado: "2026-04-11",
      pasos: ["Radica la solicitud en Ruta U.", "Indica la institución de destino.", "Recibe el PDF firmado por correo.", "Verifica el código de autenticidad."],
      normativa: "Acuerdo 042 de 2019, artículo 58",
      nota: ""
    },
    {
      id: "movilidad-interna", nombre: "Cupo en asignatura de otro programa", ciclo: "academico",
      perfiles: ["estudiante"], dependencia: "Decanatura de programa",
      sinonimos: ["movilidad interna", "curso cruzado", "asignatura de otro pregrado", "electiva interprograma"],
      resumen: "Solicita cupo en una asignatura que pertenece a otro programa académico, como electiva o curso de interés.",
      requisitos: ["Promedio acumulado igual o superior a 3,5", "Cupo disponible en la asignatura", "Concepto favorable del director de programa"],
      costo: "Sin costo", tiempo: "5 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 0, actualizado: "2026-03-30",
      pasos: ["Busca la asignatura en el catálogo.", "Radica la solicitud con el código de la asignatura.", "La decanatura confirma disponibilidad.", "La asignatura aparece en tu matrícula."],
      normativa: "Acuerdo 118 de 2021, artículo 12",
      nota: "Máximo dos asignaturas por semestre por esta vía."
    },

    {
      id: "paz-y-salvo", nombre: "Paz y salvo financiero", ciclo: "financiero",
      perfiles: ["estudiante", "egresado"], dependencia: "Tesorería",
      sinonimos: ["certificado de deuda cero", "solvencia económica", "paz y salvo de pagos", "no debo nada"],
      resumen: "Certifica que no tienes obligaciones pendientes con la Universidad. Es requisito para grado, retiro y algunos trámites académicos.",
      requisitos: ["No tener cuotas vencidas", "No tener cheques devueltos ni acuerdos incumplidos"],
      costo: "Sin costo", tiempo: "1 día hábil", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 2, destacado: true, actualizado: "2026-10-10",
      pasos: ["Entra a Mi perfil y abre Estado de cuenta.", "Verifica que no haya saldos pendientes.", "Genera el certificado.", "Descarga el PDF con firma electrónica."],
      normativa: "Acuerdo 210 de 2018 · Reglamento financiero",
      nota: ""
    },
    {
      id: "beca-descuento", nombre: "Solicitud de beca o descuento", ciclo: "financiero",
      perfiles: ["aspirante", "estudiante"], dependencia: "Dirección de Bienestar",
      sinonimos: ["apoyo económico", "descuento de matrícula", "beca", "auxilio económico", "subsidio"],
      resumen: "Postúlate a los apoyos económicos de la Universidad: excelencia académica, vulnerabilidad socioeconómica, deporte y cultura.",
      requisitos: ["Formulario socioeconómico completo", "Soportes de ingresos del grupo familiar", "Promedio mínimo de 3,8 para becas académicas"],
      costo: "Sin costo", tiempo: "10 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 1, actualizado: "2026-09-25",
      pasos: ["Revisa las convocatorias abiertas.", "Completa el formulario socioeconómico.", "Adjunta los soportes en PDF.", "Consulta el resultado en Mis radicados."],
      normativa: "Acuerdo 095 de 2020 · Política de permanencia",
      nota: "Solo puedes tener un apoyo económico activo por semestre."
    },
    {
      id: "carta-icetex", nombre: "Carta de admisión para crédito educativo", ciclo: "financiero",
      perfiles: ["aspirante", "estudiante"], dependencia: "Admisiones y Registro",
      sinonimos: ["certificación para ICETEX", "carta para crédito", "crédito educativo", "matrícula financiada"],
      resumen: "Documento que acredita tu admisión o matrícula para solicitar un crédito educativo ante una entidad financiera.",
      requisitos: ["Estar admitido o matriculado", "Documento de identidad vigente", "Indicar la entidad y el periodo solicitado"],
      costo: "Sin costo", tiempo: "15 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 0, actualizado: "2026-02-19",
      pasos: ["Radica la solicitud indicando la entidad financiera.", "Admisiones valida tu condición.", "Recibe la carta firmada.", "Entrégala a la entidad en el plazo indicado."],
      normativa: "Resolución 310 de 2015",
      nota: ""
    },
    {
      id: "devolucion-saldo", nombre: "Devolución de saldo a favor", ciclo: "financiero",
      perfiles: ["estudiante", "egresado"], dependencia: "Tesorería",
      sinonimos: ["reembolso", "devolución de dinero", "saldo a favor", "me pagaron dos veces"],
      resumen: "Solicita la devolución de pagos en exceso o de saldos generados por cancelación de asignaturas.",
      requisitos: ["Certificado bancario a tu nombre", "Soporte del pago o del saldo", "Paz y salvo de otros conceptos"],
      costo: "Sin costo", tiempo: "20 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 0, actualizado: "2026-01-28",
      pasos: ["Radica la solicitud con el soporte del pago.", "Tesorería valida el saldo.", "Adjunta el certificado bancario.", "Recibe la transferencia en el periodo indicado."],
      normativa: "Acuerdo 210 de 2018, artículo 22",
      nota: "Solo se devuelven saldos superiores a $30.000."
    },
    {
      id: "acuerdo-pago", nombre: "Acuerdo de pago", ciclo: "financiero",
      perfiles: ["estudiante"], dependencia: "Tesorería",
      sinonimos: ["financiación", "cuotas", "aplazamiento de pago", "pagar por partes"],
      resumen: "Divide el saldo pendiente de matrícula en cuotas dentro del semestre, con condiciones de pago definidas.",
      requisitos: ["Saldo pendiente mayor a $500.000", "No tener acuerdos incumplidos", "Radicar antes de la semana 4 del semestre"],
      costo: "Sin costo", tiempo: "5 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 1, actualizado: "2026-07-07",
      pasos: ["Consulta tu saldo en Estado de cuenta.", "Elige el número de cuotas disponible.", "Firma el acuerdo de forma electrónica.", "Paga la primera cuota antes del vencimiento."],
      normativa: "Acuerdo 210 de 2018, artículo 17",
      nota: "El incumplimiento de una cuota activa el cobro del saldo total."
    },
    {
      id: "certificado-pagos", nombre: "Certificado de pagos y retenciones", ciclo: "financiero",
      perfiles: ["estudiante", "egresado"], dependencia: "Tesorería",
      sinonimos: ["certificado tributario", "pagos realizados", "retención en la fuente", "certificado para la DIAN"],
      resumen: "Certifica los pagos de matrícula y las retenciones practicadas en el año calendario. Se usa para la declaración de renta.",
      requisitos: ["Documento de identidad vigente", "Haber realizado pagos en el año solicitado"],
      costo: "Sin costo", tiempo: "5 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 0, actualizado: "2026-02-02",
      pasos: ["Radica la solicitud indicando el año.", "Tesorería genera el certificado.", "Recibe el PDF con firma electrónica.", "Verifica los valores con tus comprobantes."],
      normativa: "Estatuto Tributario, artículos 381 y 383",
      nota: ""
    },

    {
      id: "solicitud-grado", nombre: "Solicitud de grado", ciclo: "grado",
      perfiles: ["estudiante"], dependencia: "Registro Académico",
      sinonimos: ["graduación", "trámite de grado", "grado", "solicitar título"],
      resumen: "Inicia el proceso de grado: verifica requisitos académicos, financieros y de idioma antes de la ceremonia.",
      requisitos: ["Haber aprobado el 100% de los créditos del plan de estudios", "Paz y salvo académico y financiero", "Requisito de idioma extranjero aprobado", "Trabajo de grado aprobado y radicado en biblioteca"],
      costo: "$180.000 de derechos de grado", tiempo: "30 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 2, actualizado: "2026-10-15",
      pasos: ["Consulta la lista de verificación en Ruta U.", "Completa los requisitos pendientes.", "Radica la solicitud y paga los derechos.", "Inscríbete a la ceremonia en la fecha indicada."],
      normativa: "Acuerdo 042 de 2019, artículos 61 a 66",
      nota: "Las ventanas de grado se cierran 45 días antes de cada ceremonia."
    },
    {
      id: "duplicado-diploma", nombre: "Duplicado de diploma", ciclo: "grado",
      perfiles: ["egresado"], dependencia: "Registro Académico",
      sinonimos: ["reposición de diploma", "segundo título", "copia del diploma", "diploma perdido"],
      resumen: "Solicita una copia del diploma cuando el original se perdió, se deterioró o lo necesitas en otro formato.",
      requisitos: ["Acta de grado o número de resolución", "Declaración de pérdida o entrega del original deteriorado", "Documento de identidad vigente"],
      costo: "$95.000", tiempo: "20 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 1, actualizado: "2026-06-03",
      pasos: ["Radica la solicitud con el número de acta.", "Paga el costo en la pasarela.", "Registro elabora el duplicado.", "Recíbelo en el campus o solicita envío nacional."],
      normativa: "Resolución 145 de 2017",
      nota: "El duplicado incluye una nota que indica su condición de copia."
    },
    {
      id: "certificado-grado", nombre: "Certificado de grado", ciclo: "grado",
      perfiles: ["egresado"], dependencia: "Registro Académico",
      sinonimos: ["acta de grado", "constancia de titulación", "certificado de egresado", "prueba de que me gradué"],
      resumen: "Constancia oficial de que completaste el plan de estudios y obtuviste el título. La piden para visas, colegios profesionales y empleos.",
      requisitos: ["Haber culminado el proceso de grado", "Documento de identidad vigente"],
      costo: "Sin costo", tiempo: "3 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 2, destacado: true, actualizado: "2026-09-12",
      pasos: ["Ingresa a Ruta U como egresado.", "Solicita el certificado indicando el destinatario.", "Recibe el PDF firmado digitalmente.", "Verifica el código en el portal de validación."],
      normativa: "Acuerdo 042 de 2019, artículo 68",
      nota: "Si te graduaste antes de 2010, el trámite puede tardar 10 días hábiles."
    },
    {
      id: "ceremonia-grado", nombre: "Inscripción a ceremonia de grado", ciclo: "grado",
      perfiles: ["estudiante"], dependencia: "Registro Académico",
      sinonimos: ["asistir a graduación", "ceremonia", "invitados al grado"],
      resumen: "Confirma tu asistencia a la ceremonia, registra invitados y solicita los servicios del evento.",
      requisitos: ["Solicitud de grado aprobada", "Derechos de grado pagados", "Registro de invitados completo"],
      costo: "Sin costo", tiempo: "15 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 1, actualizado: "2026-10-20",
      pasos: ["Recibe la invitación por correo institucional.", "Confirma tu asistencia y la de tus invitados.", "Elige la talla de la toga si la requieres.", "Revisa la hora y el lugar en la confirmación."],
      normativa: "Resolución 145 de 2017, artículo 9",
      nota: "Cada graduando puede registrar hasta 6 invitados."
    },
    {
      id: "radicacion-trabajo-grado", nombre: "Radicación de trabajo de grado", ciclo: "grado",
      perfiles: ["estudiante"], dependencia: "Biblioteca y Decanatura",
      sinonimos: ["tesis", "proyecto de grado", "radicar monografía", "entrega final de tesis"],
      resumen: "Entrega la versión final del trabajo de grado, con aval del director y licencia de publicación en el repositorio.",
      requisitos: ["Aval escrito del director de trabajo de grado", "Versión final en PDF con normas de citación", "Licencia de publicación firmada", "Similitud menor al 15% en la herramienta institucional"],
      costo: "Sin costo", tiempo: "10 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 0, actualizado: "2026-08-22",
      pasos: ["Sube el PDF final y los anexos.", "Adjunta el aval del director.", "Autoriza la publicación en el repositorio.", "Recibe el paz y salvo de biblioteca."],
      normativa: "Acuerdo 063 de 2016 · Reglamento de trabajos de grado",
      nota: ""
    },

    {
      id: "inscripcion-pregrado", nombre: "Inscripción a pregrado", ciclo: "admision",
      perfiles: ["aspirante"], dependencia: "Admisiones y Registro",
      sinonimos: ["aplicar a la universidad", "admisión", "inscripción", "quiero estudiar"],
      resumen: "Registra tu aspiración a uno de los programas de pregrado y presenta las pruebas de admisión.",
      requisitos: ["Documento de identidad", "Resultado de pruebas de Estado (Saber 11)", "Foto reciente", "Pago de derechos de inscripción"],
      costo: "$115.000", tiempo: "30 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 2, actualizado: "2026-09-01",
      pasos: ["Crea tu cuenta de aspirante.", "Completa el formulario y sube los documentos.", "Paga los derechos de inscripción.", "Consulta la citación a pruebas."],
      normativa: "Acuerdo 088 de 2022 · Reglamento de admisiones",
      nota: "Hay descuento del 50% para inscripción anticipada."
    },
    {
      id: "resultados-admision", nombre: "Consulta de resultados de admisión", ciclo: "admision",
      perfiles: ["aspirante"], dependencia: "Admisiones y Registro",
      sinonimos: ["admitido", "listado de admitidos", "resultados", "me aceptaron"],
      resumen: "Consulta si fuiste admitido, tu posición en la lista y los pasos para formalizar la matrícula.",
      requisitos: ["Número de inscripción", "Documento de identidad"],
      costo: "Sin costo", tiempo: "Inmediato", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 2, actualizado: "2026-09-30",
      pasos: ["Ingresa con tu número de inscripción.", "Consulta el resultado del programa elegido.", "Descarga la carta de admisión.", "Sigue los pasos de matrícula en la fecha indicada."],
      normativa: "Acuerdo 088 de 2022, artículo 15",
      nota: ""
    },
    {
      id: "inscripcion-posgrado", nombre: "Inscripción a posgrado", ciclo: "admision",
      perfiles: ["aspirante"], dependencia: "Admisiones y Registro",
      sinonimos: ["maestría", "especialización", "doctorado", "aplicar a posgrado"],
      resumen: "Postúlate a un programa de especialización, maestría o doctorado y presenta los documentos de soporte.",
      requisitos: ["Título de pregrado o acta de grado", "Hoja de vida y carta de motivación", "Dos cartas de recomendación", "Pago de derechos de inscripción"],
      costo: "$150.000", tiempo: "25 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 0, actualizado: "2026-08-12",
      pasos: ["Elige el programa y revisa los énfasis.", "Completa el formulario y adjunta los soportes.", "Paga los derechos de inscripción.", "Agenda la entrevista con el comité."],
      normativa: "Acuerdo 091 de 2021 · Reglamento de posgrados",
      nota: ""
    },

    {
      id: "apoyo-socioeconomico", nombre: "Apoyo socioeconómico", ciclo: "bienestar",
      perfiles: ["estudiante"], dependencia: "Dirección de Bienestar",
      sinonimos: ["subsidio", "auxilio", "apoyo de alimentación", "ayuda económica"],
      resumen: "Accede a apoyos de alimentación, transporte y materiales para continuar tus estudios.",
      requisitos: ["Formulario socioeconómico vigente", "Sisbén o certificado de ingresos", "Promedio igual o superior a 3,2"],
      costo: "Sin costo", tiempo: "10 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 1, actualizado: "2026-09-08",
      pasos: ["Actualiza tu formulario socioeconómico.", "Selecciona el tipo de apoyo.", "Adjunta los soportes.", "Consulta el resultado en Mis radicados."],
      normativa: "Acuerdo 095 de 2020, artículos 8 a 14",
      nota: ""
    },
    {
      id: "cita-psicologia", nombre: "Cita de psicología", ciclo: "bienestar",
      perfiles: ["estudiante"], dependencia: "Dirección de Bienestar",
      sinonimos: ["apoyo psicológico", "orientación", "salud mental", "hablar con un psicólogo"],
      resumen: "Agenda una cita de acompañamiento psicológico, presencial o virtual, con reserva de la información.",
      requisitos: ["Ser estudiante activo", "Completar el formato de motivo de consulta"],
      costo: "Sin costo", tiempo: "2 días hábiles", modalidad: "Virtual o presencial",
      canal: "Portal Ruta U", popular: 1, actualizado: "2026-10-05",
      pasos: ["Elige modalidad y franja horaria.", "Completa el motivo de consulta.", "Confirma la cita.", "Recibe el enlace o la ubicación por correo."],
      normativa: "Ley 1616 de 2013 · Política de salud mental",
      nota: "La información de la consulta es confidencial."
    },
    {
      id: "interprete-senas", nombre: "Solicitud de intérprete de Lengua de Señas Colombiana", ciclo: "bienestar",
      perfiles: ["aspirante", "estudiante"], dependencia: "Unidad de Inclusión",
      sinonimos: ["accesibilidad", "intérprete LSC", "lengua de señas", "apoyo para persona sorda"],
      resumen: "Solicita acompañamiento de intérprete de Lengua de Señas Colombiana para clases, evaluaciones o trámites presenciales.",
      requisitos: ["Registro en la Unidad de Inclusión", "Indicar asignaturas, fechas y sedes", "Solicitar con al menos 5 días hábiles de anticipación"],
      costo: "Sin costo", tiempo: "5 días hábiles", modalidad: "Virtual o presencial",
      canal: "Portal Ruta U", popular: 0, actualizado: "2026-11-02",
      pasos: ["Regístrate en la Unidad de Inclusión si es tu primera solicitud.", "Indica asignaturas, fechas y sedes.", "Confirma el horario asignado.", "Recibe el nombre del intérprete asignado."],
      normativa: "Ley 982 de 2005 · Decreto 1421 de 2017",
      nota: "También puedes solicitar materiales en formato accesible y ajustes de evaluación."
    },
    {
      id: "ruta-transporte", nombre: "Inscripción a ruta de transporte", ciclo: "bienestar",
      perfiles: ["estudiante"], dependencia: "Dirección de Bienestar",
      sinonimos: ["bus universitario", "transporte", "ruta", "llegar al campus"],
      resumen: "Inscríbete en las rutas de transporte que conectan el campus con los principales sectores de la ciudad.",
      requisitos: ["Ser estudiante matriculado", "Documento de identidad", "Dirección de residencia actualizada"],
      costo: "Sin costo", tiempo: "3 días hábiles", modalidad: "Virtual",
      canal: "Portal Ruta U", popular: 0, actualizado: "2026-07-30",
      pasos: ["Consulta las rutas y horarios disponibles.", "Selecciona la ruta más cercana a tu residencia.", "Confirma tu inscripción.", "Recibe el pase digital en tu correo."],
      normativa: "Resolución 198 de 2023",
      nota: "Los cupos se asignan por orden de inscripción y cercanía."
    }
  ],

  servicios: [
    { id: "biblioteca", nombre: "Biblioteca", desc: "Préstamo, salas de estudio, bases de datos y préstamo interbibliotecario.", icono: "libro", enlace: "#" },
    { id: "correo", nombre: "Correo institucional", desc: "Activación, recuperación de contraseña y configuración en el celular.", icono: "sobre", enlace: "#" },
    { id: "software", nombre: "Licencias de software", desc: "Microsoft 365, SPSS, MATLAB y herramientas de diseño para estudiantes.", icono: "monitor", enlace: "#" },
    { id: "deportes", nombre: "Deportes y recreación", desc: "Selecciones, torneos internos y uso de escenarios deportivos.", icono: "balon", enlace: "#" },
    { id: "inclusion", nombre: "Unidad de Inclusión", desc: "Ajustes razonables, intérprete de Lengua de Señas y materiales accesibles.", icono: "accesibilidad", enlace: "tramite.html?id=interprete-senas" },
    { id: "egresados", nombre: "Oficina de egresados", desc: "Certificados, bolsa de empleo y red de egresados.", icono: "birrete", enlace: "#" }
  ],

  faq: [
    { p: "¿Cuánto tarda un certificado de notas?", r: "Un día hábil en formato PDF. Si lo necesitas impreso, se reclama en Registro Académico al día siguiente de la solicitud." },
    { p: "¿Puedo pedir un trámite sin estar matriculado?", r: "Sí, los egresados pueden solicitar certificados y duplicados de diploma. Algunos trámites académicos requieren matrícula vigente." },
    { p: "¿Qué hago si mi trámite lleva más tiempo del indicado?", r: "Consulta el estado en Mis radicados. Si supera el tiempo estimado, escribe a la dependencia responsable desde la ficha del trámite." },
    { p: "¿Cómo sé si me falta un requisito?", r: "Cada ficha indica los requisitos y el sistema te avisa si falta un documento antes de radicar." },
    { p: "¿Puedo autorizar a otra persona para reclamar?", r: "Sí, con un poder simple y copia del documento de identidad de ambas personas." },
    { p: "¿Los trámites tienen costo?", r: "La mayoría son gratuitos en formato digital. Los costos, cuando existen, aparecen en la ficha antes de iniciar la solicitud." },
    { p: "¿Qué pasa si radico el trámite equivocado?", r: "Puedes anularlo desde Mis radicados dentro de las 24 horas siguientes y radicar el correcto sin costo adicional." },
    { p: "¿El portal es accesible con lector de pantalla?", r: "Sí. Ruta U cumple WCAG 2.1 nivel AA y permite navegar todo el flujo con teclado. La declaración de accesibilidad detalla el alcance y las limitaciones conocidas." }
  ],

  radicados: [
    {
      id: "RAD-2026-014872", tramite: "certificado-notas", estado: "en-proceso", estadoTexto: "En proceso",
      fecha: "12 nov 2026", estimado: "17 nov 2026", dependencia: "Registro Académico", progreso: 2,
      etapas: [
        { nombre: "Radicado", fecha: "12 nov 2026, 09:14", estado: "hecho" },
        { nombre: "Verificación de datos", fecha: "13 nov 2026, 11:02", estado: "hecho" },
        { nombre: "Generación del documento", fecha: "En curso", estado: "actual" },
        { nombre: "Notificación y descarga", fecha: "Estimado 17 nov 2026", estado: "pendiente" }
      ],
      detalle: "Solicitaste el certificado en PDF con destino a la convocatoria de becas de la Facultad de Ingeniería."
    },
    {
      id: "RAD-2026-015220", tramite: "homologacion-materias", estado: "requiere-info", estadoTexto: "Requiere información",
      fecha: "14 nov 2026", estimado: "5 dic 2026", dependencia: "Secretaría Académica", progreso: 1,
      etapas: [
        { nombre: "Radicado", fecha: "14 nov 2026, 16:40", estado: "hecho" },
        { nombre: "Revisión de documentos", fecha: "15 nov 2026, 08:20", estado: "actual" },
        { nombre: "Evaluación del comité", fecha: "Pendiente", estado: "pendiente" },
        { nombre: "Decisión y notificación", fecha: "Estimado 5 dic 2026", estado: "pendiente" }
      ],
      detalle: "Falta el programa de la asignatura «Cálculo Multivariado» con contenidos y créditos. Tienes 5 días hábiles para adjuntarlo."
    },
    {
      id: "RAD-2026-013901", tramite: "paz-y-salvo", estado: "finalizado", estadoTexto: "Finalizado",
      fecha: "28 oct 2026", estimado: "29 oct 2026", dependencia: "Tesorería", progreso: 3,
      etapas: [
        { nombre: "Radicado", fecha: "28 oct 2026, 10:05", estado: "hecho" },
        { nombre: "Validación de saldo", fecha: "28 oct 2026, 15:30", estado: "hecho" },
        { nombre: "Generación del certificado", fecha: "29 oct 2026, 08:10", estado: "hecho" },
        { nombre: "Notificado", fecha: "29 oct 2026, 08:12", estado: "hecho" }
      ],
      detalle: "Certificado de paz y salvo financiero generado. Puedes descargarlo en cualquier momento."
    }
  ],

  glosario: [
    { t: "Acuerdo", d: "Norma interna de máximo nivel expedida por el Consejo Superior de la Universidad." },
    { t: "Acta de grado", d: "Documento que certifica la sesión en la que el Consejo Académico otorgó el título." },
    { t: "Crédito académico", d: "Unidad que mide el tiempo de trabajo del estudiante en una asignatura." },
    { t: "Homologación", d: "Reconocimiento de asignaturas aprobadas en otra institución o programa." },
    { t: "Paz y salvo", d: "Constancia de que no tienes obligaciones pendientes con la Universidad." },
    { t: "Radicado", d: "Número único que identifica una solicitud y permite seguir su estado." },
    { t: "Registro Académico", d: "Dependencia responsable de matrícula, notas, certificados y grados." },
    { t: "Resolución", d: "Norma interna que reglamenta un procedimiento específico." }
  ],

  /* Valores de referencia usados en la evaluación (ver docs/06-evaluacion.md).
     Son datos simulados para previsualizar el informe: reemplazar por los resultados reales. */
  metricas: {
    treeTest: { participantes: 6, tareas: 5, exitoDirecto: 0.71, exitoTotal: 0.83, tiempoPromedio: 38 },
    ronda1: { participantes: 5, tareas: 6, exito: 0.72, tiempo: 94, errores: 3.2, sus: 68 },
    ronda2: { participantes: 5, tareas: 6, exito: 0.92, tiempo: 51, errores: 1.1, sus: 84 }
  }
};
