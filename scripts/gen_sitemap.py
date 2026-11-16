import os, html

# Genera el mapa del sitio (SVG) a partir de la jerarquía del portal Ruta U.
# Layout: árbol horizontal, hojas apiladas verticalmente, padres centrados.
OUT = os.path.join(os.path.dirname(__file__), "..", "docs", "ia", "mapa-del-sitio.svg")

TREE = {
    "Inicio": [
        ("Trámites", [
            ("Por perfil", [("Aspirante", []), ("Estudiante", []), ("Egresado", []), ("Docente y administrativo", [])]),
            ("Por momento académico", [
                ("Ingreso y admisión", []),
                ("Vida académica", []),
                ("Pagos y financiación", []),
                ("Grado y titulación", []),
                ("Bienestar y apoyo", []),
            ]),
            ("Asistente de trámites", []),
            ("Buscador y filtros", []),
            ("Ficha de trámite (plantilla ×28)", []),
        ]),
        ("Servicios", [
            ("Biblioteca", []), ("Correo institucional", []), ("Licencias de software", []),
            ("Deportes y recreación", []), ("Unidad de Inclusión", []), ("Oficina de egresados", []),
        ]),
        ("Normativa", [("Reglamentos y acuerdos", []), ("Calendario académico", []), ("Políticas institucionales", [])]),
        ("Ayuda", [("Preguntas frecuentes", []), ("Canales de atención", []), ("PQRS", []), ("Glosario", []), ("Accesibilidad", [])]),
        ("Mi perfil", [("Mis radicados", []), ("Mis datos", []), ("Notificaciones", [])]),
    ]
}

ROOT_W, ROOT_H = 170, 46
NODE_W, NODE_H = 200, 38
GAP_Y = 14
COL_X = 250

nodes = []
edges = []
leaf_y = [40]

def walk(label, children, depth):
    x = 30 + depth * COL_X
    if not children:
        y = leaf_y[0]
        leaf_y[0] += NODE_H + GAP_Y
        nodes.append(dict(label=label, x=x, y=y, depth=depth, leaf=True))
        return y + NODE_H / 2
    ys = [walk(c[0], c[1], depth + 1) for c in children]
    y = (min(ys) + max(ys)) / 2
    nodes.append(dict(label=label, x=x, y=y - NODE_H / 2, depth=depth, leaf=False))
    for (lab, ch), cy in zip(children, ys):
        child = [n for n in nodes if n["label"] == lab and n["x"] == x + COL_X and abs(n["y"] + NODE_H/2 - cy) < 1]
        if child:
            edges.append((x + NODE_W, y, x + COL_X, cy))
    return y + NODE_H / 2

walk("Inicio", TREE["Inicio"], 0)

maxy = max(n["y"] for n in nodes) + NODE_H + 70
W = 30 + 3 * COL_X + NODE_W + 60
H = int(maxy)

def esc(s):
    return html.escape(s, quote=True)

parts = []
parts.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="Segoe UI, system-ui, sans-serif" role="img" aria-label="Mapa del sitio de Ruta U">')
parts.append('<defs><style><![CDATA[')
parts.append('''
  .bg{fill:#ffffff}
  .edge{stroke:#c9d2dc;stroke-width:1.4;fill:none}
  .n0{fill:#0f4c5c}
  .n1{fill:#e7f1f3;stroke:#0f4c5c;stroke-width:1.6}
  .n2{fill:#ffffff;stroke:#c9d2dc;stroke-width:1.2}
  .n3{fill:#f7f9fb;stroke:#dfe5ec;stroke-width:1}
  .t0{fill:#ffffff;font-size:15px;font-weight:700}
  .t1{fill:#0f4c5c;font-size:13.5px;font-weight:700}
  .t2{fill:#1b2630;font-size:12px;font-weight:600}
  .t3{fill:#4a5562;font-size:11.5px}
  .lbl{fill:#7b8492;font-size:10.5px;letter-spacing:.08em}
''')
parts.append(']]></style></defs>')
parts.append(f'<rect class="bg" width="{W}" height="{H}"/>')
parts.append('<text class="lbl" x="30" y="20">NIVEL 1</text>')
parts.append(f'<text class="lbl" x="{30+COL_X}" y="20">NIVEL 2</text>')
parts.append(f'<text class="lbl" x="{30+2*COL_X}" y="20">NIVEL 3</text>')
parts.append(f'<text class="lbl" x="{30+3*COL_X}" y="20">NIVEL 4</text>')

for (x1, y1, x2, y2) in edges:
    mx = (x1 + x2) / 2
    parts.append(f'<path class="edge" d="M{x1:.1f} {y1:.1f} H{mx:.1f} V{y2:.1f} H{x2:.1f}"/>')

for n in nodes:
    w = ROOT_W if n["depth"] == 0 else NODE_W
    h = ROOT_H if n["depth"] == 0 else NODE_H
    cls = f'n{min(n["depth"],3)}'
    parts.append(f'<rect class="{cls}" x="{n["x"]}" y="{n["y"]:.1f}" width="{w}" height="{h}" rx="7"/>')
    tcls = f't{min(n["depth"],3)}'
    ty = n["y"] + h / 2 + 4.5
    parts.append(f'<text class="{tcls}" x="{n["x"]+12}" y="{ty:.1f}">{esc(n["label"])}</text>')

parts.append('</svg>')
svg = "\n".join(parts)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w", encoding="utf-8") as f:
    f.write(svg)
print("ok", OUT, W, H, "nodes", len(nodes))
