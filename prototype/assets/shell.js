/* Ruta U — shell compartido (encabezado, pie y barra móvil)
   Mantiene una sola fuente de verdad para la navegación global del prototipo. */

(function () {
  "use strict";

  const NAV = [
    { id: "inicio", label: "Inicio", href: "index.html" },
    { id: "tramites", label: "Trámites", href: "tramites.html" },
    { id: "servicios", label: "Servicios", href: "servicios.html" },
    { id: "normativa", label: "Normativa", href: "normativa.html" },
    { id: "ayuda", label: "Ayuda", href: "ayuda.html" }
  ];

  const TABS = [
    { id: "inicio", label: "Inicio", href: "index.html", icon: "home" },
    { id: "tramites", label: "Trámites", href: "tramites.html", icon: "list" },
    { id: "buscar", label: "Buscar", href: "buscar.html", icon: "search" },
    { id: "radicados", label: "Radicados", href: "radicados.html", icon: "doc" },
    { id: "ayuda", label: "Ayuda", href: "ayuda.html", icon: "help" }
  ];

  function header(active) {
    const items = NAV.map(function (n) {
      return '<li><a href="' + n.href + '"' + (n.id === active ? ' aria-current="page"' : "") + ">" + n.label + "</a></li>";
    }).join("");

    return '' +
      '<a class="skip-link" href="#contenido">Saltar al contenido principal</a>' +
      '<div class="utility"><div class="container">' +
        '<span>Universidad San Rafael · Vicerrectoría Académica</span>' +
        '<div class="u-right">' +
          '<ul class="utility-list">' +
            '<li><a href="accesibilidad.html">Accesibilidad</a></li>' +
            '<li><a href="ayuda.html">Transparencia</a></li>' +
            '<li><a href="ayuda.html">Contacto</a></li>' +
          '</ul>' +
        '</div>' +
      '</div></div>' +
      '<div class="demo-banner"><div class="container">' +
        '<strong>Prototipo académico:</strong> media fidelidad, datos simulados. No es el sitio oficial de ninguna universidad.' +
      '</div></div>' +
      '<header class="site-header"><div class="container header-inner">' +
        '<a class="brand" href="index.html">' +
          '<span class="brand-mark" aria-hidden="true">RU</span>' +
          '<span><span class="brand-name">Ruta U</span><span class="brand-sub">Trámites y servicios</span></span>' +
        '</a>' +
        '<nav class="main-nav" id="nav-principal" aria-label="Navegación principal"><ul>' + items + '</ul></nav>' +
        '<div class="header-actions">' +
          '<a class="btn btn-secondary btn-sm hide-sm" href="buscar.html">' + window.icon("search") + ' Buscar</a>' +
          '<a class="btn btn-primary btn-sm" href="radicados.html">' + window.icon("user") + ' Mi perfil</a>' +
          '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-principal" aria-label="Abrir menú">' + window.icon("menu") + '</button>' +
        '</div>' +
      '</div></header>';
  }

  function footer() {
    return '' +
      '<footer class="site-footer"><div class="container">' +
        '<div class="footer-top">' +
          '<div>' +
            '<a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">RU</span><span><span class="brand-name">Ruta U</span><span class="brand-sub">Universidad San Rafael</span></span></a>' +
            '<p style="margin-top:16px;max-width:34ch">Un solo lugar para encontrar, solicitar y seguir tus trámites universitarios.</p>' +
            '<p class="small" style="color:#9aa8b5">Calle 72 n.º 10-34, Bogotá<br>Lunes a viernes, 7:00 a 18:00</p>' +
          '</div>' +
          '<div><h2>Trámites frecuentes</h2><ul>' +
            '<li><a href="tramite.html?id=certificado-notas">Certificado de notas</a></li>' +
            '<li><a href="tramite.html?id=paz-y-salvo">Paz y salvo financiero</a></li>' +
            '<li><a href="tramite.html?id=certificado-grado">Certificado de grado</a></li>' +
            '<li><a href="tramite.html?id=solicitud-grado">Solicitud de grado</a></li>' +
            '<li><a href="tramites.html">Todos los trámites</a></li>' +
          '</ul></div>' +
          '<div><h2>Universidad</h2><ul>' +
            '<li><a href="servicios.html">Servicios</a></li>' +
            '<li><a href="normativa.html">Normativa</a></li>' +
            '<li><a href="normativa.html">Calendario académico</a></li>' +
            '<li><a href="ayuda.html">Canales de atención</a></li>' +
            '<li><a href="mapa-sitio.html">Mapa del sitio</a></li>' +
          '</ul></div>' +
          '<div><h2>Ayuda</h2><ul>' +
            '<li><a href="ayuda.html">Preguntas frecuentes</a></li>' +
            '<li><a href="ayuda.html">Radicar una PQRS</a></li>' +
            '<li><a href="accesibilidad.html">Declaración de accesibilidad</a></li>' +
            '<li><a href="ayuda.html">Glosario</a></li>' +
            '<li><a href="asistente.html">Asistente de trámites</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© <span data-year>2026</span> Universidad San Rafael · Prototipo académico sin fines comerciales.</span>' +
          '<span><a href="ayuda.html">Protección de datos</a> · <a href="accesibilidad.html">Accesibilidad</a> · <a href="mapa-sitio.html">Mapa del sitio</a></span>' +
        '</div>' +
      '</div></footer>';
  }

  function tabbar(active) {
    return '<nav class="tabbar" aria-label="Navegación móvil">' + TABS.map(function (t) {
      return '<a href="' + t.href + '"' + (t.id === active ? ' aria-current="page"' : "") + '>' +
        '<span data-icon="' + t.icon + '"></span><span>' + t.label + '</span></a>';
    }).join("") + "</nav>";
  }

  const head = document.querySelector("[data-shell-header]");
  if (head) {
    const active = head.getAttribute("data-active") || "";
    head.innerHTML = header(active);
  }
  const foot = document.querySelector("[data-shell-footer]");
  if (foot) foot.innerHTML = footer();
  const tabs = document.querySelector("[data-shell-tabbar]");
  if (tabs) tabs.outerHTML = tabbar(tabs.getAttribute("data-active") || "");

  /* rellena los iconos insertados por el shell */
  document.querySelectorAll("[data-icon]").forEach(function (el) {
    if (!el.firstElementChild) el.innerHTML = window.icon(el.getAttribute("data-icon"));
  });
})();
