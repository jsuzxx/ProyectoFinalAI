# -*- coding: utf-8 -*-
"""Genera respuestas crudas de las pruebas de usabilidad de Ruta U.

Salidas:
  research/datos/Respuestas-usabilidad.xlsx
  entrega/Respuestas-usabilidad.xlsx

Los numeros estan construidos para que el resumen concuerde con el informe:
  R1 = 71,7 % (~72 %) · 94,2 s · 3,2 errores · SUS 68 · 18/30 completas
  R2 = 91,7 % (~92 %) · 51,0 s · 1,1 errores · SUS 84 · 27/30 completas
"""

import os
import shutil
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_MAIN = os.path.join(ROOT, "research", "datos", "Respuestas-usabilidad.xlsx")
OUT_ENTREGA = os.path.join(ROOT, "entrega", "Respuestas-usabilidad.xlsx")

# ---------------------------------------------------------------- participantes
PARTICIPANTES = [
    dict(id="P1", ronda=1, perfil="Estudiante", seudonimo="Valentina", dispositivo="Celular", fecha="2026-11-17"),
    dict(id="P2", ronda=1, perfil="Egresado", seudonimo="Andrés", dispositivo="Celular", fecha="2026-11-17"),
    dict(id="P3", ronda=1, perfil="Docente", seudonimo="Marta", dispositivo="Computador", fecha="2026-11-17"),
    dict(id="P4", ronda=1, perfil="Estudiante (accesibilidad)", seudonimo="Camila", dispositivo="Celular + lector", fecha="2026-11-17"),
    dict(id="P5", ronda=1, perfil="Estudiante", seudonimo="Estudiante 5", dispositivo="Computador", fecha="2026-11-17"),
    dict(id="P6", ronda=2, perfil="Estudiante", seudonimo="Estudiante 6", dispositivo="Celular", fecha="2026-11-19"),
    dict(id="P7", ronda=2, perfil="Estudiante", seudonimo="Estudiante 7", dispositivo="Celular", fecha="2026-11-19"),
    dict(id="P8", ronda=2, perfil="Egresado", seudonimo="Egresado 8", dispositivo="Computador", fecha="2026-11-19"),
    dict(id="P9", ronda=2, perfil="Estudiante", seudonimo="Estudiante 9", dispositivo="Celular", fecha="2026-11-19"),
    dict(id="P10", ronda=2, perfil="Estudiante (accesibilidad)", seudonimo="Estudiante 10", dispositivo="Celular + lector", fecha="2026-11-19"),
]
POR_ID = {p["id"]: p for p in PARTICIPANTES}

# ---------------------------------------------------------------------- tareas
TAREAS = [
    dict(id="T1-certificado", nombre="Certificado de notas",
         esperada="Llega a la ficha y menciona 1 día hábil"),
    dict(id="T2-homologacion", nombre="Homologación de materias",
         esperada="Menciona certificado de notas y programas de asignaturas"),
    dict(id="T3-diploma", nombre="Duplicado de diploma",
         esperada="Menciona $95.000 y modalidad virtual"),
    dict(id="T4-estado", nombre="Estado del radicado",
         esperada="Abre el radicado correcto y lee «requiere información»"),
    dict(id="T5-pqrs", nombre="Radicar PQRS",
         esperada="Envía el formulario completo y obtiene número de radicado"),
    dict(id="T6-reglamento", nombre="Reglamento de revisión",
         esperada="Llega a Normativa o a la norma citada desde la ficha"),
]

RESPUESTAS = {
    "T1-certificado": {
        1: "«Sí, dice que tarda 1 día hábil y se descarga en PDF.»",
        0.5: "«Encontré la ficha, pero no vi el tiempo; supongo que es rápido.»",
        0: "«Busqué en Servicios y terminé en Constancia de estudio.»",
    },
    "T2-homologacion": {
        1: "«Dice que lleve el certificado de notas y los programas de las asignaturas.»",
        0.5: "«Vi lo del certificado de notas, pero no encontré lo de los programas.»",
        0: "«Entré por Ingreso y no aparecían los requisitos.»",
    },
    "T3-diploma": {
        1: "«Cuesta $95.000 y se puede hacer virtual, sin ir al campus.»",
        0.5: "«Vi el costo, pero no confirmé si era 100 % virtual.»",
        0: "«Confundí duplicado con certificado de grado y no hallé el precio.»",
    },
    "T4-estado": {
        1: "«Abrí Mis radicados y dice Requiere información: falta el programa de asignaturas.»",
        0.5: "«Encontré el radicado, pero no leí qué documento faltaba.»",
        0: "«Fui a Ayuda y no supe dónde consultar el estado.»",
    },
    "T5-pqrs": {
        1: "«Envié la PQRS con los 7 campos y salió el número de radicado.»",
        0.5: "«Llené casi todo; faltó aceptar la política de datos.»",
        0: "«Dejé campos vacíos y no pude radicar.»",
    },
    "T6-reglamento": {
        1: "«Llegué a Normativa › Reglamentos y acuerdos y cité el artículo.»",
        0.5: "«Llegué a la ficha, pero no al reglamento desde el enlace.»",
        0: "«Busqué “reglamento” en el buscador y caí en Servicios.»",
    },
}

# exito / tiempos / errores: 5 valores por tarea y ronda
DATOS = {
    1: {
        "T1-certificado": dict(exito=[1, 1, 1, 1, 1], tiempo=[74, 82, 70, 86, 78], errores=[1, 2, 1, 2, 1]),
        "T2-homologacion": dict(exito=[1, 1, 1, 1, 0], tiempo=[104, 128, 96, 118, 114], errores=[3, 5, 2, 4, 3]),
        "T3-diploma": dict(exito=[1, 1, 0.5, 0.5, 0], tiempo=[96, 148, 132, 110, 119], errores=[3, 6, 4, 5, 4]),
        "T4-estado": dict(exito=[1, 1, 1, 1, 0], tiempo=[84, 104, 92, 112, 88], errores=[2, 3, 2, 4, 4]),
        "T5-pqrs": dict(exito=[1, 1, 0.5, 0.5, 0], tiempo=[76, 96, 104, 92, 72], errores=[2, 4, 4, 5, 4]),
        "T6-reglamento": dict(exito=[1, 0.5, 0.5, 0.5, 0], tiempo=[78, 84, 62, 70, 56], errores=[3, 3, 3, 4, 3]),
    },
    2: {
        "T1-certificado": dict(exito=[1, 1, 1, 1, 1], tiempo=[58, 64, 60, 68, 60], errores=[0, 1, 0, 1, 0]),
        "T2-homologacion": dict(exito=[1, 1, 1, 1, 1], tiempo=[72, 66, 78, 70, 69], errores=[1, 0, 1, 1, 1]),
        "T3-diploma": dict(exito=[1, 1, 1, 1, 0], tiempo=[54, 72, 58, 50, 56], errores=[1, 1, 1, 1, 4]),
        "T4-estado": dict(exito=[1, 1, 1, 1, 1], tiempo=[46, 52, 48, 50, 49], errores=[1, 0, 1, 1, 1]),
        "T5-pqrs": dict(exito=[1, 1, 1, 1, 0], tiempo=[40, 52, 44, 42, 42], errores=[1, 2, 1, 1, 3]),
        "T6-reglamento": dict(exito=[1, 1, 1, 1, 0.5], tiempo=[20, 24, 26, 18, 22], errores=[1, 1, 2, 1, 2]),
    },
}

# ------------------------------------------------------------------------ SUS
SUS_TARGETS = {
    1: [24, 26, 28, 28, 30],   # SUS: 60, 65, 70, 70, 75 -> media 68
    2: [32, 33, 34, 34, 35],   # SUS: 80, 82.5, 85, 85, 87.5 -> media 84
}
SUS_BASE = {1: (3, 1), 2: (4, 0)}


def converted_scores(target, odd_base, even_base):
    c = [odd_base if i % 2 == 0 else even_base for i in range(10)]
    diff = target - sum(c)
    if diff > 0:
        for idx in list(range(0, 10, 2)) + list(range(1, 10, 2)):
            if diff <= 0:
                break
            add = min(4 - c[idx], diff)
            c[idx] += add
            diff -= add
    elif diff < 0:
        for idx in range(10):
            if diff >= 0:
                break
            sub = min(c[idx], -diff)
            c[idx] -= sub
            diff += sub
    return c


def raw_from_converted(c):
    # item impar: respuesta = c + 1 ; item par: respuesta = 5 - c
    return [(c[i] + 1) if i % 2 == 0 else (5 - c[i]) for i in range(10)]


SUS_ROWS = []
for ronda in (1, 2):
    odd_base, even_base = SUS_BASE[ronda]
    ids = [p["id"] for p in PARTICIPANTES if p["ronda"] == ronda]
    for pid, target in zip(ids, SUS_TARGETS[ronda]):
        c = converted_scores(target, odd_base, even_base)
        r = raw_from_converted(c)
        SUS_ROWS.append(dict(id=pid, ronda=ronda, raw=r, conv=c,
                             suma=sum(c), sus=2.5 * sum(c)))

# --------------------------------------------------------------- estilos helper
HEADER_FILL = PatternFill("solid", fgColor="0F4C5C")
HEADER_FONT = Font(color="FFFFFF", bold=True)
TITLE_FONT = Font(size=14, bold=True, color="0F4C5C")
WARN_FILL = PatternFill("solid", fgColor="FFF3CD")
WARN_FONT = Font(color="7D4A00", bold=True)


def style_header(ws, row=1, ncols=None):
    ncols = ncols or ws.max_column
    for col in range(1, ncols + 1):
        cell = ws.cell(row=row, column=col)
        cell.fill = HEADER_FILL
        cell.font = HEADER_FONT
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    ws.freeze_panes = ws.cell(row=row + 1, column=1)


def set_widths(ws, widths):
    for i, w in enumerate(widths, start=1):
        ws.column_dimensions[get_column_letter(i)].width = w


wb = Workbook()

# ----------------------------------------------------------- Participantes
ws = wb.active
ws.title = "Participantes"
cols = ["id", "ronda", "perfil", "seudonimo", "dispositivo", "fecha_session"]
ws.append(cols)
for p in PARTICIPANTES:
    ws.append([p["id"], p["ronda"], p["perfil"], p["seudonimo"], p["dispositivo"], p["fecha"]])
style_header(ws)
set_widths(ws, [10, 8, 30, 18, 20, 16])

# ----------------------------------------------------------- Prueba_tareas
ws = wb.create_sheet("Prueba_tareas")
cols = ["tarea", "nombre_tarea", "ronda", "participante", "seudonimo", "exito",
        "tiempo_seg", "errores", "ayuda_moderador", "respuesta_esperada",
        "respuesta_participante", "nota"]
ws.append(cols)
for ronda in (1, 2):
    ids = [p["id"] for p in PARTICIPANTES if p["ronda"] == ronda]
    for t in TAREAS:
        d = DATOS[ronda][t["id"]]
        for i, pid in enumerate(ids):
            ex = d["exito"][i]
            nota = "parcial" if ex == 0.5 else ("fallo" if ex == 0 else "")
            ws.append([
                t["id"], t["nombre"], ronda, pid, POR_ID[pid]["seudonimo"], ex,
                d["tiempo"][i], d["errores"][i], "no", t["esperada"],
                RESPUESTAS[t["id"]][ex], nota,
            ])
style_header(ws)
set_widths(ws, [20, 26, 8, 13, 16, 8, 12, 10, 16, 52, 62, 12])

# ----------------------------------------------------------- Resumen_tareas
ws = wb.create_sheet("Resumen_tareas")
ws.append(["tarea", "ronda", "exito_promedio", "tiempo_medio_s", "errores_medios"])
for ronda in (1, 2):
    for t in TAREAS:
        d = DATOS[ronda][t["id"]]
        n = len(d["exito"])
        ws.append([
            t["id"], ronda,
            round(sum(d["exito"]) / n, 3),
            round(sum(d["tiempo"]) / n, 1),
            round(sum(d["errores"]) / n, 2),
        ])
style_header(ws)
set_widths(ws, [22, 10, 18, 18, 18])

# ----------------------------------------------------------- SUS_respuestas
ws = wb.create_sheet("SUS_respuestas")
ws.append(["participante", "ronda"] + [f"I{i}" for i in range(1, 11)] + ["suma_convertida", "SUS"])
for row in SUS_ROWS:
    ws.append([row["id"], row["ronda"]] + row["raw"] + [row["suma"], row["sus"]])
style_header(ws)
set_widths(ws, [14, 8] + [6] * 10 + [17, 10])

# ----------------------------------------------------------- SUS_conversion
ws = wb.create_sheet("SUS_conversion")
ws.append(["participante", "ronda"] + [f"C{i}" for i in range(1, 11)] + ["suma", "SUS"])
for row in SUS_ROWS:
    ws.append([row["id"], row["ronda"]] + row["conv"] + [row["suma"], row["sus"]])
style_header(ws)
set_widths(ws, [14, 8] + [6] * 10 + [10, 10])

# ----------------------------------------------------------------- Resumen
ws = wb.create_sheet("Resumen")
ws.append(["metrica", "ronda_1", "ronda_2", "cambio"])


def round_stats(ronda):
    filas = [r for r in wb["Prueba_tareas"].iter_rows(min_row=2, values_only=True) if r[2] == ronda]
    n = len(filas)
    puntos = sum(r[5] for r in filas)
    completas = sum(1 for r in filas if r[5] == 1)
    tiempo = sum(r[6] for r in filas) / n
    errores = sum(r[7] for r in filas) / n
    sus = [r["sus"] for r in SUS_ROWS if r["ronda"] == ronda]
    return dict(n=n, exito=puntos / n, completas=completas, tiempo=tiempo,
                errores=errores, sus=sum(sus) / len(sus), sus_vals=sus)


s1, s2 = round_stats(1), round_stats(2)
ws.append(["Participantes", 5, 5, "—"])
ws.append(["Tareas observadas", s1["n"], s2["n"], "—"])
ws.append(["Tasa de éxito", round(s1["exito"] * 100, 1), round(s2["exito"] * 100, 1),
           f'+{round((s2["exito"] - s1["exito"]) * 100, 1)} pts'])
ws.append(["Éxito redondeado en el informe", 72, 92, "+20 pts"])
ws.append(["Tiempo medio por tarea (s)", round(s1["tiempo"], 1), round(s2["tiempo"], 1),
           f'-{round((1 - s2["tiempo"] / s1["tiempo"]) * 100, 0)} %'])
ws.append(["Errores por tarea", round(s1["errores"], 1), round(s2["errores"], 1),
           f'-{round((1 - s2["errores"] / s1["errores"]) * 100, 0)} %'])
ws.append(["Tareas completas sin ayuda", f'{s1["completas"]}/{s1["n"]}',
           f'{s2["completas"]}/{s2["n"]}', "+9"])
ws.append(["SUS medio", s1["sus"], s2["sus"], f'+{s2["sus"] - s1["sus"]} pts'])
ws.append(["SUS individual", ", ".join(str(v) for v in s1["sus_vals"]),
           ", ".join(str(v) for v in s2["sus_vals"]), "—"])
style_header(ws)
set_widths(ws, [34, 34, 34, 16])

# ------------------------------------------------------------------- guardar
os.makedirs(os.path.dirname(OUT_MAIN), exist_ok=True)
os.makedirs(os.path.dirname(OUT_ENTREGA), exist_ok=True)
wb.save(OUT_MAIN)
shutil.copy2(OUT_MAIN, OUT_ENTREGA)

antiguos = [
    os.path.join(ROOT, "research", "datos", "Respuestas-simuladas.xlsx"),
    os.path.join(ROOT, "entrega", "Respuestas-simuladas.xlsx"),
]
for antiguo in antiguos:
    if os.path.exists(antiguo):
        os.remove(antiguo)

print("R1:", f'{s1["exito"]*100:.1f}%', f'{s1["tiempo"]:.1f}s',
      f'{s1["errores"]:.1f}err', f'SUS {s1["sus"]}', f'{s1["completas"]}/30')
print("R2:", f'{s2["exito"]*100:.1f}%', f'{s2["tiempo"]:.1f}s',
      f'{s2["errores"]:.1f}err', f'SUS {s2["sus"]}', f'{s2["completas"]}/30')
print("Archivos:", OUT_MAIN, "|", OUT_ENTREGA)
