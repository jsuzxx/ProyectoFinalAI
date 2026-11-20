"""Genera el kit de traspaso a Figma a partir de las fuentes reales del prototipo.

Uso:  python figma/build_kit.py

No modifica el prototipo. Solo escribe dentro de figma/:
  - tokens.json       tokens de color/tipografia/espaciado para Tokens Studio
  - icons/*.svg       los 30 iconos del set, como vectores importables
  - screens.json      inventario de las capturas de figma/screens/
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CSS = ROOT / "prototype" / "assets" / "styles.css"
ICONS_JS = ROOT / "prototype" / "assets" / "icons.js"
OUT = ROOT / "figma"


def build_tokens():
    css = CSS.read_text(encoding="utf-8")
    block = re.search(r":root\s*\{(.*?)\n\}", css, re.S).group(1)
    raw = dict(re.findall(r"--([\w-]+)\s*:\s*([^;]+);", block))

    def token(value, kind):
        value = value.strip()
        return {"value": value, "type": kind}

    groups = {"color": {}, "space": {}, "radius": {}, "shadow": {}, "font": {}, "size": {}}
    semantic = {
        "color": ["ink", "ink-2", "ink-3", "ink-4", "line", "line-2", "bg", "surface",
                  "surface-2", "brand", "brand-2", "brand-soft", "brand-soft-2", "ok",
                  "ok-soft", "warn", "warn-soft", "danger", "danger-soft", "focus"],
        "space": [f"s{i}" for i in range(1, 10)],
        "radius": ["r-sm", "r", "r-lg"],
        "shadow": ["shadow-sm", "shadow"],
        "font": ["font", "mono"],
        "size": ["max"],
    }
    for group, names in semantic.items():
        for name in names:
            if name not in raw:
                continue
            kind = {
                "color": "color",
                "space": "dimension",
                "radius": "dimension",
                "shadow": "boxShadow",
                "font": "fontFamily",
                "size": "dimension",
            }[group]
            value = raw[name]
            if group in {"space", "radius", "size"} and value.endswith("px"):
                value = {"value": value, "type": kind}
            elif group == "font":
                value = {"value": value.strip('"'), "type": kind}
            elif group == "shadow":
                value = {"value": value, "type": kind}
            else:
                value = token(value, kind)
            groups[group][name.replace("-", "-")] = value

    tokens = {
        "$description": "Ruta U · tokens extraidos de prototype/assets/styles.css (fuente unica).",
        "global": groups,
    }
    (OUT / "tokens.json").write_text(json.dumps(tokens, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def build_icons():
    js = ICONS_JS.read_text(encoding="utf-8")
    paths = dict(re.findall(r"^\s{4}([a-z]+):\s*'(.*)',?\s*$", js, re.M))
    folder = OUT / "icons"
    folder.mkdir(exist_ok=True)
    for name, body in paths.items():
        svg = (
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" '
            'viewBox="0 0 24 24" fill="none" stroke="#151a1f" stroke-width="1.8" '
            'stroke-linecap="round" stroke-linejoin="round">\n  ' + body + "\n</svg>\n"
        )
        (folder / f"{name}.svg").write_text(svg, encoding="utf-8")
    return len(paths)


def build_inventory():
    screens = []
    for path in sorted((OUT / "screens").glob("*.png")):
        name = path.stem
        size = "390x844" if name.endswith("-movil") else ("1440x2600" if "completo" in name else "1440x900")
        screens.append({"frame": name, "archivo": f"screens/{path.name}", "tamano": size})
    (OUT / "screens.json").write_text(json.dumps(screens, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return screens


if __name__ == "__main__":
    build_tokens()
    n_icons = build_icons()
    n_screens = len(build_inventory())
    print(f"tokens.json · {n_icons} iconos SVG · {n_screens} capturas inventariadas")
