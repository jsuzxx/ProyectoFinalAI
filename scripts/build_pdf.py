"""
Construye los PDF de la entrega a partir del informe en Markdown, los
wireframes y la presentación.

Uso:  python scripts/build_pdf.py
Salidas:
  docs/informe-final.pdf
  wireframes/wireframes.pdf
  presentation/presentacion.pdf
  entrega/Informe-Final.pdf
  entrega/Wireframes.pdf
  entrega/Presentacion.pdf
  entrega/Mapa-del-sitio.svg

Requiere: markdown, pypdf, reportlab y Microsoft Edge (o Chrome) instalado.
"""

import os
import re
import shutil
import subprocess
import sys
import tempfile

import markdown

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

BROWSERS = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
]


def find_browser():
    for path in BROWSERS:
        if os.path.exists(path):
            return path
    raise SystemExit("No se encontró Edge ni Chrome en las rutas habituales.")


def file_url(path):
    return "file:///" + path.replace("\\", "/").replace(" ", "%20")


def print_pdf(browser, html_path, pdf_path, extra=None):
    if os.path.exists(pdf_path):
        os.remove(pdf_path)
    cmd = [
        browser,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--virtual-time-budget=15000",
        "--run-all-compositor-stages-before-draw",
    ]
    if extra:
        cmd.extend(extra)
    cmd.append("--print-to-pdf=" + pdf_path)
    cmd.append(file_url(html_path))
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
    if not os.path.exists(pdf_path):
        sys.stdout.write(result.stdout + "\n" + result.stderr + "\n")
        raise SystemExit("No se generó el PDF: " + pdf_path)
    return pdf_path


def stamp_page_numbers(pdf_path, label, landscape=False):
    """Añade pie de página con el nombre del documento y el número de página."""
    try:
        from pypdf import PdfReader, PdfWriter
        from reportlab.pdfgen import canvas
        from reportlab.lib.pagesizes import A4, landscape as land
    except Exception as exc:  # pragma: no cover
        print("  (sin numeración: falta pypdf/reportlab:", exc, ")")
        return

    reader = PdfReader(pdf_path)
    total = len(reader.pages)
    if total == 0:
        return
    margin_x = 46
    out = PdfWriter(clone_from=pdf_path)
    tmppdf = pdf_path + ".tmp.pdf"
    size = land(A4) if landscape else A4

    for i, page in enumerate(out.pages):
        overlay_path = pdf_path + ".overlay.pdf"
        c = canvas.Canvas(overlay_path, pagesize=size)
        c.setFont("Helvetica", 7.5)
        c.setFillColorRGB(0.48, 0.52, 0.56)
        c.drawString(margin_x, 26, label)
        c.drawRightString(size[0] - margin_x, 26, "%d / %d" % (i + 1, total))
        c.setStrokeColorRGB(0.85, 0.88, 0.90)
        c.setLineWidth(0.5)
        c.line(margin_x, 36, size[0] - margin_x, 36)
        c.save()
        overlay = PdfReader(overlay_path).pages[0]
        page.merge_page(overlay)
        os.remove(overlay_path)

    with open(tmppdf, "wb") as fh:
        out.write(fh)
    os.replace(tmppdf, pdf_path)


# ----------------------------------------------------------------------------
# Informe
# ----------------------------------------------------------------------------

CSS_REPORT = r"""
  @page { size: A4; margin: 19mm 17mm 17mm 17mm; }
  @page :first { margin: 0; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    font-size: 9.45pt; line-height: 1.46; color: #1d2733;
  }
  /* ---------- portada ---------- */
  .cover {
    width: 210mm; height: 297mm; padding: 30mm 24mm 22mm;
    display: flex; flex-direction: column; position: relative;
    background: #ffffff; overflow: hidden;
  }
  .cover .bar { position: absolute; left: 0; top: 0; bottom: 0; width: 9mm; background: #0f4c5c; }
  .cover .mark {
    width: 19mm; height: 19mm; border-radius: 4mm; background: #0f4c5c; color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 20pt; font-weight: 800; letter-spacing: -.02em; margin-bottom: 16mm;
  }
  .cover .eyebrow {
    font-size: 8.6pt; letter-spacing: .18em; text-transform: uppercase;
    color: #14708a; font-weight: 700; margin-bottom: 6mm;
  }
  .cover h1 { font-size: 34pt; line-height: 1.02; letter-spacing: -.035em; margin: 0 0 5mm; color: #0f1720; }
  .cover .sub { font-size: 14pt; line-height: 1.34; color: #33404d; margin: 0 0 12mm; max-width: 115mm; }
  .cover .rule { width: 38mm; height: 1.6mm; background: #14708a; margin-bottom: 12mm; }
  .cover .meta { display: grid; grid-template-columns: 34mm 1fr; row-gap: 3.2mm; font-size: 9.6pt; }
  .cover .meta dt { color: #6b7684; }
  .cover .meta dd { margin: 0; color: #1d2733; font-weight: 600; }
  .cover .foot { margin-top: auto; font-size: 8.4pt; color: #6b7684; border-top: .4pt solid #d9e0e6; padding-top: 4mm; }
  .cover .warn {
    margin-top: 6mm; font-size: 8.4pt; color: #7a4a00;
    background: #fff6e3; border: .4pt solid #e9c97f; border-radius: 2mm; padding: 3.4mm 4mm;
  }
  /* ---------- índice ---------- */
  .toc-page { page-break-after: always; padding-top: 2mm; }
  .toc-page h2 { font-size: 17pt; margin: 0 0 6mm; color: #0f4c5c; letter-spacing: -.02em; }
  .toc { list-style: none; margin: 0; padding: 0; columns: 2; column-gap: 12mm; }
  .toc li { break-inside: avoid; margin-bottom: 1.5mm; line-height: 1.32; }
  .toc a { color: #1d2733; text-decoration: none; }
  .toc .lvl2 { font-size: 8.9pt; font-weight: 700; margin-top: 2.4mm; color: #0f4c5c; }
  .toc .lvl2 a { color: #0f4c5c; }
  .toc .lvl3 { font-size: 8.2pt; padding-left: 3.4mm; color: #4a5562; }
  .toc .lvl3 a { color: #4a5562; }
  /* ---------- cuerpo ---------- */
  main { }
  h2 {
    font-size: 15.5pt; line-height: 1.16; letter-spacing: -.02em; color: #0f4c5c;
    margin: 0 0 3.4mm; padding-bottom: 2mm; border-bottom: 1.2pt solid #0f4c5c;
    page-break-before: always; page-break-after: avoid;
  }
  h2:first-of-type { page-break-before: auto; }
  h3 {
    font-size: 11.1pt; color: #12333d; margin: 5.2mm 0 1.6mm;
    page-break-after: avoid; letter-spacing: -.01em;
  }
  h4 { font-size: 10pt; margin: 4mm 0 1.5mm; color: #1d2733; page-break-after: avoid; }
  p { margin: 0 0 2.2mm; orphans: 2; widows: 2; text-align: justify; }
  a { color: #0f4c5c; }
  strong { color: #0f1720; }
  ul, ol { margin: 0 0 2.6mm; padding-left: 5.2mm; }
  li { margin-bottom: 1.1mm; }
  hr { border: 0; border-top: .4pt solid #dfe5ea; margin: 6mm 0; }
  blockquote {
    margin: 0 0 4mm; padding: 3.6mm 4.4mm; background: #fff6e3;
    border: .4pt solid #e9c97f; border-left: 2.4mm solid #b8860b; border-radius: 1.6mm;
    font-size: 9pt; color: #5c4300;
  }
  blockquote p { margin: 0; text-align: left; }
  code {
    font-family: "Cascadia Mono", Consolas, monospace; font-size: 8.5pt;
    background: #eef2f5; padding: .3mm 1.1mm; border-radius: 1mm; color: #0f3a45;
  }
  pre {
    background: #f5f8fa; border: .4pt solid #dfe5ea; border-left: 1.6mm solid #0f4c5c;
    border-radius: 1.4mm; padding: 3mm 3.6mm; overflow: hidden;
    page-break-inside: avoid; margin: 0 0 4mm;
  }
  pre code { background: none; padding: 0; font-size: 8pt; line-height: 1.42; color: #223140; }
  table {
    width: 100%; border-collapse: collapse; margin: 0 0 4.4mm;
    font-size: 8.05pt; line-height: 1.32; page-break-inside: auto;
  }
  thead { display: table-header-group; }
  tr { page-break-inside: avoid; }
  th {
    background: #0f4c5c; color: #ffffff; text-align: left; font-weight: 600;
    padding: 1.5mm 1.7mm; border: .4pt solid #0f4c5c; vertical-align: bottom;
  }
  td { padding: 1.3mm 1.7mm; border: .4pt solid #cfd8de; vertical-align: top; }
  tbody tr:nth-child(even) td { background: #f6f9fa; }
  figure { margin: 0 0 4mm; page-break-inside: avoid; text-align: center; }
  figure img { width: 100%; max-height: 226mm; object-fit: contain; border: .4pt solid #dfe5ea; border-radius: 1.4mm; }
  figcaption { font-size: 8pt; color: #6b7684; margin-top: 1.6mm; text-align: left; }
"""

COVER_HTML = """
<section class="cover">
  <div class="bar"></div>
  <div class="mark">RU</div>
  <div class="eyebrow">Arquitectura de la Información · Proyecto final</div>
  <h1>Ruta U</h1>
  <p class="sub">Diseño y evaluación de la arquitectura de la información de un portal de trámites universitarios</p>
  <div class="rule"></div>
  <dl class="meta">
    <dt>Institución</dt><dd>Universidad San Rafael (caso ficticio)</dd>
    <dt>Equipo</dt><dd>Alejandro Aguilar · Alejandro Cabrera · Jesús Ramírez</dd>
    <dt>Docente</dt><dd>Paul Sanmartin</dd>
    <dt>Materia</dt><dd>Arquitectura de la Información</dd>
    <dt>Versión</dt><dd>2.0 · noviembre de 2026</dd>
    <dt>Entregables</dt><dd>Informe · wireframes · prototipo · presentación</dd>
  </dl>
  <div class="warn">
    <b>Prototipo académico.</b> Los datos de investigación, las métricas y los nombres de
    participantes son simulaciones declaradas. Los contenidos institucionales son ficticios.
    Ver §D y <code>docs/00-declaracion-uso-ia.md</code>.
  </div>
  <div class="foot">
    Documento generado desde <code>docs/informe-final.md</code> · 28 trámites · 10 wireframes · 13 pantallas · 2 rondas de evaluación
  </div>
</section>
"""


def build_report(browser):
    src = os.path.join(ROOT, "docs", "informe-final.md")
    html_out = os.path.join(ROOT, "docs", "informe-final.html")
    pdf_out = os.path.join(ROOT, "docs", "informe-final.pdf")

    with open(src, encoding="utf-8") as fh:
        raw = fh.read()

    # Separar la nota de integridad (blockquote inicial) del cuerpo
    idx_note = raw.index("> **Nota sobre los datos.**")
    idx_body = raw.index("## Resumen ejecutivo")
    note_md = raw[idx_note:idx_body].strip()
    body_md = raw[idx_body:]

    md = markdown.Markdown(
        extensions=["tables", "fenced_code", "toc", "sane_lists", "attr_list", "md_in_html"],
        extension_configs={"toc": {"permalink": ""}},
    )
    body_html = md.convert(body_md)

    # Figura del mapa del sitio
    body_html = body_html.replace(
        "<!--MAPA-->",
        '<figure><img src="ia/mapa-del-sitio.svg" alt="Mapa del sitio de Ruta U con cinco secciones de primer nivel y tres niveles de detalle">'
        '<figcaption>Figura 1. Mapa del sitio. Cinco secciones de primer nivel, profundidad máxima de cuatro niveles '
        'y 37 nodos. Versión navegable en <code>prototype/mapa-sitio.html</code>.</figcaption></figure>',
    )

    # Índice a partir de los encabezados ya convertidos
    heads = re.findall(r'<h([23])\s+id="([^"]+)"[^>]*>(.*?)</h\1>', body_html, flags=re.S)
    toc_items = []
    for level, hid, inner in heads:
        label = re.sub(r"<[^>]+>", "", inner).strip()
        label = label.replace("¶", "").strip()
        toc_items.append('<li class="lvl%s"><a href="#%s">%s</a></li>' % (level, hid, label))
    toc_html = '<ul class="toc">%s</ul>' % "".join(toc_items)

    note_html = markdown.markdown(note_md, extensions=["tables"])

    doc = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Ruta U — Informe final</title>
<style>%s</style>
</head>
<body>
%s
<section class="toc-page">
  <h2 style="page-break-before:auto">Contenido</h2>
  %s
</section>
<main>
%s
%s
</main>
</body>
</html>
""" % (CSS_REPORT, COVER_HTML, toc_html, note_html, body_html)

    with open(html_out, "w", encoding="utf-8") as fh:
        fh.write(doc)

    print("Informe HTML:", html_out)
    print_pdf(browser, html_out, pdf_out)
    stamp_page_numbers(pdf_out, "Ruta U · Informe final · Arquitectura de la Información")
    print("Informe PDF:", pdf_out)
    return pdf_out


# ----------------------------------------------------------------------------
# Wireframes y presentación (HTML ya diseñados para impresión)
# ----------------------------------------------------------------------------

def build_simple(browser, src, dst, landscape, label):
    print_pdf(browser, src, dst)
    if label:
        stamp_page_numbers(dst, label, landscape=landscape)
    print("PDF:", dst)
    return dst


def main():
    browser = find_browser()
    print("Navegador:", browser)

    report = build_report(browser)

    wf_src = os.path.join(ROOT, "wireframes", "wireframes.html")
    wf_pdf = build_simple(
        browser, wf_src, os.path.join(ROOT, "wireframes", "wireframes.pdf"),
        True, "Ruta U · Wireframes de baja fidelidad",
    )

    deck_src = os.path.join(ROOT, "presentation", "presentacion.html")
    deck_pdf = build_simple(
        browser, deck_src, os.path.join(ROOT, "presentation", "presentacion.pdf"),
        True, None,
    )

    entrega = os.path.join(ROOT, "entrega")
    os.makedirs(entrega, exist_ok=True)
    shutil.copyfile(report, os.path.join(entrega, "Informe-Final.pdf"))
    shutil.copyfile(wf_pdf, os.path.join(entrega, "Wireframes.pdf"))
    shutil.copyfile(deck_pdf, os.path.join(entrega, "Presentacion.pdf"))
    shutil.copyfile(
        os.path.join(ROOT, "docs", "ia", "mapa-del-sitio.svg"),
        os.path.join(entrega, "Mapa-del-sitio.svg"),
    )
    print("Copias en:", entrega)


if __name__ == "__main__":
    main()
