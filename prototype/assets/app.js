/* Ruta U — comportamiento del prototipo
   Vanilla JS, sin dependencias. Funciona abriendo los archivos con file:// */

(function () {
  "use strict";

  const D = window.RUTAU || { tramites: [], ciclos: [], perfiles: [] };

  /* ---------------- Iconos (definidos en icons.js) ---------------- */
  const icon = window.icon;
  window.fillIcons(document);

  /* ---------------- Encabezado móvil ---------------- */
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------------- Utilidades ---------------- */
  const qs = new URLSearchParams(location.search);
  const norm = function (s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  const cicloNombre = function (id) {
    const c = (D.ciclos || []).find(function (x) { return x.id === id; });
    return c ? c.nombre : id;
  };
  const perfilNombre = function (id) {
    const p = (D.perfiles || []).find(function (x) { return x.id === id; });
    return p ? p.nombre : id;
  };
  window.RUTAU_UTIL = { qs: qs, norm: norm, cicloNombre: cicloNombre, perfilNombre: perfilNombre, icon: icon };

  function toast(msg) {
    let t = document.querySelector(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      t.setAttribute("role", "status");
      t.setAttribute("aria-live", "polite");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove("show"); }, 3200);
  }
  window.toast = toast;

  /* ---------------- Buscador global del encabezado ---------------- */
  document.querySelectorAll("[data-search-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = form.querySelector("input");
      const q = input ? input.value.trim() : "";
      location.href = "buscar.html" + (q ? "?q=" + encodeURIComponent(q) : "");
    });
  });

  /* ---------------- Buscador de trámites ---------------- */
  function buscar(query, filtros) {
    filtros = filtros || {};
    const q = norm(query);
    return (D.tramites || []).filter(function (t) {
      if (filtros.ciclo && t.ciclo !== filtros.ciclo) return false;
      if (filtros.perfil && t.perfiles.indexOf(filtros.perfil) === -1) return false;
      if (filtros.modalidad && norm(t.modalidad).indexOf(norm(filtros.modalidad)) === -1) return false;
      if (filtros.gratis && !/^Sin costo/.test(t.costo)) return false;
      if (filtros.rapido && !/(1 día|2 días|3 días|Inmediato)/.test(t.tiempo)) return false;
      if (!q) return true;
      const heno = norm([t.nombre, t.resumen, t.dependencia, (t.sinonimos || []).join(" "), cicloNombre(t.ciclo)].join(" "));
      return q.split(/\s+/).every(function (w) { return heno.indexOf(w) !== -1; });
    });
  }
  window.RUTAU_BUSCAR = buscar;

  function tarjetaResultado(t) {
    const href = "tramite.html?id=" + encodeURIComponent(t.id);
    return '' +
      '<article class="result-item">' +
        '<div>' +
          '<h3><a href="' + href + '">' + t.nombre + '</a></h3>' +
          '<p>' + t.resumen + '</p>' +
          '<div class="result-meta">' +
            '<span>' + icon("building") + t.dependencia + '</span>' +
            '<span>' + icon("clock") + t.tiempo + '</span>' +
            '<span>' + icon("money") + t.costo + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="result-aside">' +
          '<span class="tag tag-neutral">' + cicloNombre(t.ciclo) + '</span>' +
          '<a class="btn btn-secondary btn-sm" href="' + href + '">Ver ficha</a>' +
        '</div>' +
      '</article>';
  }
  window.RUTAU_TARJETA = tarjetaResultado;

  /* ---------------- Página de búsqueda ---------------- */
  const resultsWrap = document.querySelector("[data-results]");
  if (resultsWrap) {
    const qInput = document.querySelector("[data-q]");
    const countEl = document.querySelector("[data-count]");
    const chipsEl = document.querySelector("[data-active-filters]");
    const form = document.querySelector("[data-filters]");
    const orderSel = document.querySelector("[data-order]");
    if (orderSel && qs.get("orden")) orderSel.value = qs.get("orden");

    if (qInput && qs.get("q")) qInput.value = qs.get("q");
    if (qs.get("ciclo")) {
      const f = document.querySelector('input[name="ciclo"][value="' + qs.get("ciclo") + '"]');
      if (f) f.checked = true;
    }
    if (qs.get("perfil")) {
      const f = document.querySelector('input[name="perfil"][value="' + qs.get("perfil") + '"]');
      if (f) f.checked = true;
    }
    if (qs.get("gratis") === "1") {
      const f = document.querySelector('input[name="gratis"]');
      if (f) f.checked = true;
    }
    if (qs.get("rapido") === "1") {
      const f = document.querySelector('input[name="rapido"]');
      if (f) f.checked = true;
    }
    if (qs.get("modalidad")) {
      const f = document.querySelector('input[name="modalidad"][value="' + qs.get("modalidad") + '"]');
      if (f) f.checked = true;
    }

    function leerFiltros() {
      const ciclo = document.querySelector('input[name="ciclo"]:checked');
      const perfil = document.querySelector('input[name="perfil"]:checked');
      const modalidad = document.querySelector('input[name="modalidad"]:checked');
      const gratis = document.querySelector('input[name="gratis"]');
      const rapido = document.querySelector('input[name="rapido"]');
      return {
        ciclo: ciclo ? ciclo.value : "",
        perfil: perfil ? perfil.value : "",
        modalidad: modalidad ? modalidad.value : "",
        gratis: gratis && gratis.checked,
        rapido: rapido && rapido.checked
      };
    }

    function pintar() {
      const f = leerFiltros();
      let list = buscar(qInput ? qInput.value : "", f);

      // Los filtros viven en la URL: al volver desde una ficha se conservan.
      try {
        const params = new URLSearchParams();
        const qv = qInput ? qInput.value.trim() : "";
        if (qv) params.set("q", qv);
        if (f.ciclo) params.set("ciclo", f.ciclo);
        if (f.perfil) params.set("perfil", f.perfil);
        if (f.modalidad) params.set("modalidad", f.modalidad);
        if (f.gratis) params.set("gratis", "1");
        if (f.rapido) params.set("rapido", "1");
        if (orderSel && orderSel.value && orderSel.value !== "relevancia") params.set("orden", orderSel.value);
        const qsUrl = params.toString();
        history.replaceState(null, "", location.pathname + (qsUrl ? "?" + qsUrl : ""));
      } catch (e) { /* file:// puede bloquear replaceState en algunos navegadores */ }

      const orden = orderSel ? orderSel.value : "relevancia";
      if (orden === "az") list = list.slice().sort(function (a, b) { return a.nombre.localeCompare(b.nombre, "es"); });
      if (orden === "rapido") list = list.slice().sort(function (a, b) { return a.tiempo.localeCompare(b.tiempo, "es"); });
      if (orden === "relevancia") list = list.slice().sort(function (a, b) { return (b.popular || 0) - (a.popular || 0); });

      if (countEl) {
        countEl.innerHTML = list.length === 0
          ? "No encontramos trámites con esos criterios"
          : "<strong>" + list.length + "</strong> " + (list.length === 1 ? "trámite encontrado" : "trámites encontrados");
      }

      if (chipsEl) {
        const parts = [];
        if (f.ciclo) parts.push('<button class="chip" type="button" data-clear="ciclo"><span>' + cicloNombre(f.ciclo) + '</span><span class="x" aria-hidden="true">×</span></button>');
        if (f.perfil) parts.push('<button class="chip" type="button" data-clear="perfil"><span>' + perfilNombre(f.perfil) + '</span><span class="x" aria-hidden="true">×</span></button>');
        if (f.modalidad) parts.push('<button class="chip" type="button" data-clear="modalidad"><span>' + f.modalidad + '</span><span class="x" aria-hidden="true">×</span></button>');
        if (f.gratis) parts.push('<button class="chip" type="button" data-clear="gratis"><span>Sin costo</span><span class="x" aria-hidden="true">×</span></button>');
        if (f.rapido) parts.push('<button class="chip" type="button" data-clear="rapido"><span>Hasta 3 días</span><span class="x" aria-hidden="true">×</span></button>');
        chipsEl.innerHTML = parts.join("");
        chipsEl.setAttribute("aria-label", f.ciclo || f.perfil || f.modalidad || f.gratis || f.rapido ? "Filtros activos" : "");
      }

      if (list.length === 0) {
        resultsWrap.innerHTML = '' +
          '<div class="empty">' +
            '<div class="empty-icon" aria-hidden="true">' + icon("search") + '</div>' +
            '<h2>No encontramos ese trámite</h2>' +
            '<p>Revisa la ortografía, prueba con otra palabra o cuéntanos qué necesitas con el asistente. También puedes ver todos los trámites ordenados por ciclo de vida.</p>' +
            '<div class="stack mt5">' +
              '<a class="btn btn-primary" href="asistente.html">Usar el asistente</a>' +
              '<a class="btn btn-secondary" href="tramites.html">Ver todos los trámites</a>' +
            '</div>' +
          '</div>';
      } else {
        resultsWrap.innerHTML = list.map(tarjetaResultado).join("");
      }
    }

    if (form) {
      form.addEventListener("change", pintar);
      form.addEventListener("submit", function (e) { e.preventDefault(); pintar(); });
    }
    if (qInput) {
      let t;
      qInput.addEventListener("input", function () { clearTimeout(t); t = setTimeout(pintar, 180); });
    }
    if (orderSel) orderSel.addEventListener("change", pintar);
    if (chipsEl) {
      chipsEl.addEventListener("click", function (e) {
        const b = e.target.closest("[data-clear]");
        if (!b) return;
        const key = b.getAttribute("data-clear");
        if (key === "gratis") document.querySelector('input[name="gratis"]').checked = false;
        else if (key === "rapido") document.querySelector('input[name="rapido"]').checked = false;
        else document.querySelectorAll('input[name="' + key + '"]').forEach(function (r) { r.checked = false; });
        pintar();
      });
    }

    const clearAll = document.querySelector("[data-clear-all]");
    if (clearAll) clearAll.addEventListener("click", function () {
      document.querySelectorAll('[data-filters] input[type="checkbox"], [data-filters] input[type="radio"]').forEach(function (r) { r.checked = false; });
      if (qInput) qInput.value = "";
      pintar();
    });

    pintar();
  }

  /* ---------------- Ficha de trámite ---------------- */
  const ficha = document.querySelector("[data-ficha]");
  if (ficha) {
    const id = qs.get("id") || "certificado-notas";
    const t = (D.tramites || []).find(function (x) { return x.id === id; });

    if (!t) {
      ficha.innerHTML = '<div class="container section"><div class="empty"><div class="empty-icon">' + icon("alert") + '</div><h2>No encontramos ese trámite</h2><p>El enlace puede estar desactualizado. Consulta el listado completo o usa el asistente.</p><div class="stack mt5"><a class="btn btn-primary" href="tramites.html">Ver todos los trámites</a></div></div></div>';
    } else {
      document.title = t.nombre + " · Ruta U";
      const rel = (D.tramites || [])
        .filter(function (x) { return x.id !== t.id && (x.ciclo === t.ciclo || x.dependencia === t.dependencia); })
        .slice(0, 3);
      const perfiles = t.perfiles.map(perfilNombre);
      const relacionados = rel.map(function (r) {
        return '<div class="mini-list" style="margin-top:8px"><div style="border-top:1px solid var(--line-2);padding-top:10px"><a href="tramite.html?id=' + r.id + '" style="padding:0;border:0"><span><strong style="display:block;font-size:.9375rem;font-weight:600">' + r.nombre + '</strong><span class="small muted">' + r.dependencia + '</span></span>' + icon("arrow") + '</a></div></div>';
      }).join("");

      ficha.innerHTML = '' +
        '<div class="breadcrumb"><div class="container"><ol>' +
          '<li><a href="index.html">Inicio</a></li>' +
          '<li><a href="tramites.html">Trámites</a></li>' +
          '<li><a href="buscar.html?ciclo=' + t.ciclo + '">' + cicloNombre(t.ciclo) + '</a></li>' +
          '<li><span aria-current="page">' + t.nombre + '</span></li>' +
        '</ol></div></div>' +
        '<header class="tramite-head"><div class="container">' +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:16px 0 12px">' +
            '<span class="tag">' + cicloNombre(t.ciclo) + '</span>' +
            (t.popular >= 2 ? '<span class="tag tag-neutral">' + icon("star") + ' Muy solicitado</span>' : '') +
            (t.costo.indexOf("Sin costo") === 0 ? '<span class="tag tag-ok">Sin costo</span>' : '') +
          '</div>' +
          '<h1>' + t.nombre + '</h1>' +
          '<p class="lead">' + t.resumen + '</p>' +
          '<div class="result-meta mt4" style="font-size:.875rem">' +
            '<span>' + icon("building") + t.dependencia + '</span>' +
            '<span>' + icon("clock") + ' ' + t.tiempo + '</span>' +
            '<span>' + icon("monitor") + ' ' + t.modalidad + '</span>' +
            '<span>' + icon("calendar") + ' Actualizado: ' + t.actualizado + '</span>' +
          '</div>' +
        '</div></header>' +
        '<div class="container"><div class="tramite-layout">' +
          '<div class="tramite-body">' +
            (t.nota ? '<div class="alert alert-info" style="margin-bottom:24px">' + icon("info") + '<div><strong>Antes de empezar</strong>' + t.nota + '</div></div>' : '') +
            '<section><h2>¿Para qué sirve?</h2><p>' + t.resumen + '</p>' +
              '<h3 class="mt5">¿Quién puede solicitarlo?</h3><p>' + perfiles.join(" · ") + '</p></section>' +
            '<section><h2>Requisitos</h2><ul class="req-list">' +
              t.requisitos.map(function (r) { return '<li><span class="checkmark" aria-hidden="true">✓</span><span>' + r + '</span></li>'; }).join("") +
            '</ul></section>' +
            '<section><h2>Pasos</h2><ol class="steps">' +
              t.pasos.map(function (p) { return '<li><span>' + p + '</span></li>'; }).join("") +
            '</ol></section>' +
            '<section><h2>Normativa</h2><p class="small">' + t.normativa + '</p>' +
              '<p class="small muted">Si detectas un error en esta ficha, repórtalo desde <a href="ayuda.html">Ayuda</a>. Cada ficha tiene un responsable de contenido y una fecha de última revisión.</p></section>' +
            '<section aria-labelledby="feedback"><h2 id="feedback">¿Te sirvió esta información?</h2>' +
              '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
                '<button class="btn btn-secondary" type="button" data-feedback="si">Sí, resolvió mi duda</button>' +
                '<button class="btn btn-secondary" type="button" data-feedback="no">No, necesito más ayuda</button>' +
              '</div>' +
              '<p class="small muted mt4">Tu respuesta se envía al equipo responsable del contenido. No pedimos datos personales.</p>' +
            '</section>' +
          '</div>' +
          '<aside>' +
            '<div class="side-card">' +
              '<h2>Resumen</h2>' +
              '<dl class="dl">' +
                '<div><dt>Costo</dt><dd>' + t.costo + '</dd></div>' +
                '<div><dt>Tiempo</dt><dd>' + t.tiempo + '</dd></div>' +
                '<div><dt>Modalidad</dt><dd>' + t.modalidad + '</dd></div>' +
                '<div><dt>Canal</dt><dd>' + t.canal + '</dd></div>' +
                '<div><dt>Dependencia</dt><dd>' + t.dependencia + '</dd></div>' +
              '</dl>' +
              '<a class="btn btn-primary btn-block mt4" href="radicados.html">Iniciar solicitud</a>' +
              '<button class="btn btn-ghost btn-block mt4" type="button" data-save="' + t.id + '">Guardar para después</button>' +
            '</div>' +
            '<div class="side-card" style="position:static">' +
              '<h2>Trámites relacionados</h2>' + relacionados +
            '</div>' +
            '<div class="side-card" style="position:static">' +
              '<h2>¿Necesitas ayuda?</h2>' +
              '<p class="small muted">Si tu caso es particular, escribe a la dependencia responsable o radica una PQRS.</p>' +
              '<a class="btn btn-secondary btn-block" href="ayuda.html">Ir a Ayuda</a>' +
            '</div>' +
          '</aside>' +
        '</div></div>';

      ficha.querySelectorAll("[data-feedback]").forEach(function (b) {
        b.addEventListener("click", function () {
          toast(b.getAttribute("data-feedback") === "si"
            ? "Gracias. Registramos que la ficha resolvió tu duda."
            : "Gracias. Te llevamos a Ayuda para que puedas escribirnos.");
          if (b.getAttribute("data-feedback") === "no") setTimeout(function () { location.href = "ayuda.html"; }, 900);
        });
      });
      const save = ficha.querySelector("[data-save]");
      if (save) save.addEventListener("click", function () {
        let saved = [];
        try { saved = JSON.parse(localStorage.getItem("rutau:guardados") || "[]"); } catch (e) { saved = []; }
        if (saved.indexOf(t.id) === -1) saved.push(t.id);
        localStorage.setItem("rutau:guardados", JSON.stringify(saved));
        toast("Guardamos «" + t.nombre + "» en tu perfil.");
      });
    }
  }

  /* ---------------- Asistente ---------------- */
  const wizard = document.querySelector("[data-wizard]");
  if (wizard) {
    let step = 1;
    const total = 3;
    const state = { perfil: "", necesidad: "", tiempo: "" };

    const steps = wizard.querySelectorAll("[data-step]");
    const bars = wizard.querySelectorAll(".progress-step");

    function show() {
      steps.forEach(function (s) { s.hidden = Number(s.getAttribute("data-step")) !== step; });
      bars.forEach(function (b, i) {
        b.classList.toggle("done", i + 1 < step);
        b.classList.toggle("current", i + 1 === step);
      });
      const h = wizard.querySelector("[data-step-title]");
      if (h) h.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    wizard.addEventListener("change", function (e) {
      const n = e.target.name;
      if (n) state[n] = e.target.value;
    });

    wizard.addEventListener("click", function (e) {
      const next = e.target.closest("[data-next]");
      const back = e.target.closest("[data-back]");
      if (next) {
        if (step === 1 && !state.perfil) { toast("Elige un perfil para continuar."); return; }
        if (step === 2 && !state.necesidad) { toast("Elige qué necesitas hacer."); return; }
        if (step === 3 && !state.tiempo) { toast("Elige cuánto tiempo tienes."); return; }
        if (step < total) { step++; show(); } else { render(); }
      }
      if (back && step > 1) { step--; show(); }
    });

    function render() {
      const mapa = {
        notas: ["certificado-notas", "certificado-materias", "revision-nota"],
        matricula: ["matricula-extemporanea", "cancelacion-semestre", "acuerdo-pago"],
        grado: ["certificado-grado", "solicitud-grado", "duplicado-diploma"],
        dinero: ["paz-y-salvo", "beca-descuento", "devolucion-saldo"],
        apoyo: ["cita-psicologia", "apoyo-socioeconomico", "interprete-senas"],
        admision: ["inscripcion-pregrado", "resultados-admision", "inscripcion-posgrado"]
      };
      const ids = mapa[state.necesidad] || ["certificado-notas", "paz-y-salvo", "certificado-grado"];
      const list = ids.map(function (id) { return (D.tramites || []).find(function (t) { return t.id === id; }); }).filter(Boolean);

      const res = wizard.querySelector("[data-wizard-result]");
      if (!res) return;
      res.innerHTML = '' +
        '<div class="alert alert-ok" style="margin-bottom:20px">' + icon("check") + '<div><strong>Estos son los trámites que más se ajustan</strong>Según tu perfil (' + perfilNombre(state.perfil) + ') y lo que necesitas hacer. Puedes abrir la ficha de cada uno.</div></div>' +
        '<div class="result-list">' + list.map(tarjetaResultado).join("") + '</div>' +
        '<div class="note-box mt5">¿No es lo que buscabas? <a href="buscar.html">Explora los 28 trámites</a> o <a href="ayuda.html">escribe a la mesa de ayuda</a>.</div>';
      steps.forEach(function (s) { s.hidden = Number(s.getAttribute("data-step")) !== 4; });
      bars.forEach(function (b) { b.classList.add("done"); b.classList.remove("current"); });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    show();
  }

  /* ---------------- Filtro por ciclo en el hub ---------------- */
  document.querySelectorAll("[data-filtro-ciclo]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const val = btn.getAttribute("data-filtro-ciclo");
      document.querySelectorAll("[data-filtro-ciclo]").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");
      document.querySelectorAll("[data-ciclo-group]").forEach(function (g) {
        g.hidden = val !== "todos" && g.getAttribute("data-ciclo-group") !== val;
      });
    });
  });

  /* ---------------- Hub de trámites: listado por ciclo ---------------- */
  const hub = document.querySelector("[data-all-tramites]");
  if (hub) {
    const perfil = qs.get("perfil") || "";
    let lista = D.tramites || [];
    if (perfil) lista = lista.filter(function (t) { return t.perfiles.indexOf(perfil) !== -1; });

    if (perfil) {
      const banner = document.querySelector("[data-perfil-banner]");
      if (banner) {
        banner.hidden = false;
        banner.innerHTML = '<div class="alert alert-info">' + icon("info") + '<div><strong>Mostrando trámites para ' + perfilNombre(perfil).toLowerCase() + '</strong>Puedes <a href="tramites.html">quitar el filtro</a> para ver los 28 trámites.</div></div>';
      }
    }

    hub.innerHTML = (D.ciclos || []).map(function (c) {
      const items = lista.filter(function (t) { return t.ciclo === c.id; });
      if (!items.length) return "";
      return '' +
        '<section class="section-sm" data-ciclo-group="' + c.id + '" id="ciclo-' + c.id + '">' +
          '<div class="section-head" style="max-width:none;display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap">' +
            '<div><span class="eyebrow">' + items.length + (items.length === 1 ? " trámite" : " trámites") + '</span><h2>' + c.nombre + '</h2><p style="margin-bottom:0">' + c.desc + '</p></div>' +
          '</div>' +
          '<div class="grid grid-3">' +
            items.map(function (t) {
              return '<a class="card" href="tramite.html?id=' + t.id + '">' +
                '<h3>' + t.nombre + '</h3>' +
                '<p>' + t.resumen.slice(0, 120) + '…</p>' +
                '<div class="card-meta"><span class="tag tag-neutral">' + t.tiempo + '</span>' + (/^Sin costo/.test(t.costo) ? '<span class="tag tag-ok">Sin costo</span>' : '<span class="tag tag-warn">' + t.costo + '</span>') + '</div>' +
              '</a>';
            }).join("") +
          '</div>' +
        '</section>';
    }).join("");
  }

  /* ---------------- Radicados ---------------- */
  const radList = document.querySelector("[data-radicados]");
  if (radList) {
    const estadoTag = { "en-proceso": "tag-warn", "requiere-info": "tag-danger", "finalizado": "tag-ok" };
    const render = function (filtro) {
      const items = (D.radicados || []).filter(function (r) { return !filtro || r.estado === filtro; });
      radList.innerHTML = items.length ? items.map(function (r) {
        const t = (D.tramites || []).find(function (x) { return x.id === r.tramite; });
        return '' +
          '<article class="radicado-card">' +
            '<div class="radicado-top">' +
              '<div><span class="radicado-id">' + r.id + '</span><h3 style="margin:4px 0 2px">' + (t ? t.nombre : r.tramite) + '</h3>' +
              '<p class="small muted" style="margin:0">Radicado el ' + r.fecha + ' · ' + r.dependencia + ' · Entrega estimada: ' + r.estimado + '</p></div>' +
              '<span class="tag ' + (estadoTag[r.estado] || "tag-neutral") + '">' + r.estadoTexto + '</span>' +
            '</div>' +
            '<div class="progress" style="margin:16px 0 0;gap:4px" aria-hidden="true">' +
              [0, 1, 2, 3].map(function (i) {
                return '<div class="progress-step ' + (i <= r.progreso ? "done" : "") + '"><div class="progress-bar"><span></span></div></div>';
              }).join("") +
            '</div>' +
            (r.estado === "requiere-info" ? '<div class="alert alert-warn" style="margin-top:16px">' + icon("alert") + '<div><strong>Necesitamos un documento</strong>' + r.detalle + '</div></div>' : '') +
            '<div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap">' +
              '<a class="btn btn-secondary btn-sm" href="radicado.html?id=' + encodeURIComponent(r.id) + '">Ver detalle</a>' +
              (r.estado === "finalizado" ? '<button class="btn btn-ghost btn-sm" type="button" onclick="window.toast(\'Descarga simulada: el PDF se genera desde el gestor documental.\')">' + icon("download") + ' Descargar</button>' : '') +
              (r.estado === "requiere-info" ? '<button class="btn btn-primary btn-sm" type="button" onclick="window.toast(\'Adjunto simulado. En producción se valida el PDF antes de enviarlo.\')">Adjuntar documento</button>' : '') +
            '</div>' +
          '</article>';
      }).join("") : '<div class="empty"><div class="empty-icon">' + icon("doc") + '</div><h2>No hay radicados en este estado</h2><p>Cuando radiques un trámite aparecerá aquí con su número de seguimiento.</p><a class="btn btn-primary mt4" href="tramites.html">Ver trámites</a></div>';
    };
    render("");
    document.querySelectorAll("[data-filtro-radicado]").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll("[data-filtro-radicado]").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        render(b.getAttribute("data-filtro-radicado"));
      });
    });
  }

  const radDetalle = document.querySelector("[data-radicado]");
  if (radDetalle) {
    const id = qs.get("id") || "RAD-2026-014872";
    const r = (D.radicados || []).find(function (x) { return x.id === id; }) || (D.radicados || [])[0];
    const t = r ? (D.tramites || []).find(function (x) { return x.id === r.tramite; }) : null;
    if (r) {
      const tag = r.estado === "finalizado" ? "tag-ok" : r.estado === "requiere-info" ? "tag-danger" : "tag-warn";
      radDetalle.innerHTML = '' +
        '<div class="breadcrumb"><div class="container"><ol>' +
          '<li><a href="index.html">Inicio</a></li>' +
          '<li><a href="radicados.html">Mis radicados</a></li>' +
          '<li><span aria-current="page">' + r.id + '</span></li>' +
        '</ol></div></div>' +
        '<header class="page-head"><div class="container">' +
          '<span class="radicado-id">' + r.id + '</span>' +
          '<h1 style="margin-top:6px">' + (t ? t.nombre : r.tramite) + '</h1>' +
          '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:10px">' +
            '<span class="tag ' + tag + '">' + r.estadoTexto + '</span>' +
            '<span class="small muted">Radicado el ' + r.fecha + ' · Entrega estimada: ' + r.estimado + '</span>' +
          '</div>' +
        '</div></header>' +
        '<div class="container"><div class="two-col section-sm">' +
          '<div>' +
            (r.estado === "requiere-info" ? '<div class="alert alert-warn" style="margin-bottom:24px">' + icon("alert") + '<div><strong>Acción requerida</strong>' + r.detalle + '<div style="margin-top:10px"><button class="btn btn-primary btn-sm" type="button" onclick="window.toast(\'Adjunto simulado. En producción se valida el PDF antes de enviarlo.\')">Adjuntar documento</button></div></div></div>' : '') +
            '<h2>Estado del trámite</h2>' +
            '<ol class="timeline">' +
              r.etapas.map(function (e) { return '<li class="' + e.estado + '"><span class="dot" aria-hidden="true"></span><strong>' + e.nombre + '</strong><span class="when">' + e.fecha + '</span></li>'; }).join("") +
            '</ol>' +
            '<div class="note-box mt5">' + r.detalle + '</div>' +
            '<h2 class="mt6">¿Qué puedo hacer ahora?</h2>' +
            '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
              '<button class="btn btn-secondary" type="button" onclick="window.toast(\'Consulta enviada a ' + r.dependencia + '.\')">Escribir a ' + r.dependencia + '</button>' +
              '<button class="btn btn-ghost" type="button" onclick="window.toast(\'Solicitud de anulación registrada. Tienes 24 horas para confirmarla.\')">Anular solicitud</button>' +
            '</div>' +
          '</div>' +
          '<aside>' +
            '<div class="side-card">' +
              '<h2>Datos del radicado</h2>' +
              '<dl class="dl">' +
                '<div><dt>Número</dt><dd style="font-family:var(--mono);font-size:.8125rem">' + r.id + '</dd></div>' +
                '<div><dt>Dependencia</dt><dd>' + r.dependencia + '</dd></div>' +
                '<div><dt>Fecha</dt><dd>' + r.fecha + '</dd></div>' +
                '<div><dt>Estimado</dt><dd>' + r.estimado + '</dd></div>' +
              '</dl>' +
              (t ? '<a class="btn btn-secondary btn-block mt4" href="tramite.html?id=' + t.id + '">Ver ficha del trámite</a>' : '') +
            '</div>' +
            '<div class="side-card" style="position:static">' +
              '<h2>Recordatorio</h2>' +
              '<p class="small muted">Si el trámite supera la fecha estimada, escríbenos desde este radicado. No necesitas llamar.</p>' +
            '</div>' +
          '</aside>' +
        '</div></div>';
    }
  }

  /* ---------------- Fecha del pie ---------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
