/* ==========================================================================
   WHITE — ARQUITECTURA · INGENIERÍA
   Interactive Landing Page Logic
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     Catálogo de Proyectos (reemplazá `image` por tus fotos reales en /assets)
     ------------------------------------------------------------------------ */
  const PROJECTS = [
    {
      title: 'Residencia Mirador',
      category: 'Residencial · Llave en Mano',
      image: 'assets/project-villa.jpg',
      description:
        'Vivienda unifamiliar contemporánea resuelta en dos volúmenes puros con voladizo estructural en hormigón visto, parasoles en madera natural y expansión directa hacia la piscina.',
      specs: [
        ['Superficie cubierta', '420 m²'],
        ['Sistema constructivo', 'Hormigón armado visto + mampostería térmica'],
        ['Alcance', 'Proyecto arquitectónico, cálculo y obra llave en mano'],
        ['Estado', 'Finalizada']
      ]
    },
    {
      title: 'Torre Aurea',
      category: 'Corporativo · Desarrollo',
      image: 'assets/project-edificio.jpg',
      description:
        'Edificio boutique de uso mixto con basamento comercial vidriado en doble altura, parasoles verticales en aluminio anodizado bronce y revestimiento exterior en piedra natural.',
      specs: [
        ['Superficie total', '2.850 m²'],
        ['Niveles', 'Planta baja + 8 niveles + subsuelo'],
        ['Alcance', 'Ingeniería estructural y dirección integral de obra'],
        ['Estado', 'Finalizada']
      ]
    },
    {
      title: 'Casa Alba — Interior',
      category: 'Interiorismo · Arquitectura',
      image: 'assets/project-interior.jpg',
      description:
        'Espacio social en doble altura bañado en luz natural, articulado mediante una escalera escultórica en acero negro y peldaños de roble macizo sobre pisos de travertino.',
      specs: [
        ['Superficie intervenida', '310 m²'],
        ['Materiales clave', 'Travertino, roble natural, acero y yeso mineral'],
        ['Alcance', 'Diseño interior, carpintería a medida e iluminación'],
        ['Estado', 'Finalizada']
      ]
    },
    {
      title: 'Estructura Torre Norte',
      category: 'Ingeniería · Obra Civil',
      image: 'assets/project-estructura.jpg',
      description:
        'Ejecución de estructura independiente de hormigón armado con losas sin vigas y grandes luces en voladizo, bajo estricto control de calidad y seguridad en obra.',
      specs: [
        ['Volumen de hormigón', '1.450 m³ H-30'],
        ['Control técnico', 'Ensayos de probetas y verificación de armaduras'],
        ['Alcance', 'Cálculo estructural y ejecución de obra gris'],
        ['Estado', 'En ejecución']
      ]
    },
    {
      title: 'Pabellón Horizonte',
      category: 'Residencial · Exteriores',
      image: 'assets/project-terraza.jpg',
      description:
        'Expansión exterior con pérgola estructural en piedra y acero con iluminación lineal embutida, espejo de agua infinito y estar hundido con fogón central.',
      specs: [
        ['Superficie exterior', '185 m²'],
        ['Materiales clave', 'Piedra natural, travertino antideslizante, LED cálido'],
        ['Alcance', 'Diseño, ingeniería del voladizo y ejecución'],
        ['Estado', 'Finalizada']
      ]
    }
  ];

  /* ------------------------------------------------------------------------
     Reels / Videos de Instagram (@white.constructora)
     Para usar videos .mp4 reales descargados de Instagram, colocá los archivos
     en /assets/ (ej: 'assets/reel-1.mp4') y completá la propiedad `videoUrl`.
     ------------------------------------------------------------------------ */
  const REELS = [
    {
      tag: 'Entrega Final · @white.constructora',
      title: 'Iluminación nocturna y volúmenes en voladizo',
      description: 'Recorrido al atardecer mostrando la integración entre el espejo de agua, el travertino y la carpintería piso-techo.',
      poster: 'assets/hero-residence.jpg',
      videoUrl: '' // Ej: 'assets/reel-1.mp4'
    },
    {
      tag: 'Ingeniería en Obra · @white.constructora',
      title: 'Hormigonado y control de armaduras en sitio',
      description: 'Registro de avance estructural: encofrados de precisión, control técnico y hormigonado de losa en voladizo.',
      poster: 'assets/project-estructura.jpg',
      videoUrl: '' // Ej: 'assets/reel-2.mp4'
    },
    {
      tag: 'Terminaciones · @white.constructora',
      title: 'Escalera flotante en roble y acero negro',
      description: 'Detalle constructivo de interiores en doble altura: luz natural rasante y encuentros limpios entre madera, acero y piedra.',
      poster: 'assets/project-interior.jpg',
      videoUrl: '' // Ej: 'assets/reel-3.mp4'
    },
    {
      tag: 'Exteriores · @white.constructora',
      title: 'Pérgola en piedra natural y espejo de agua',
      description: 'Diseño de exteriores y paisajismo arquitectónico con iluminación lineal integrada y estar hundido.',
      poster: 'assets/project-terraza.jpg',
      videoUrl: '' // Ej: 'assets/reel-4.mp4'
    }
  ];

  /* ------------------------------------------------------------------------
     Año dinámico en footer
     ------------------------------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------------
     Header sticky & Menú móvil
     ------------------------------------------------------------------------ */
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 36);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      mobileDrawer.classList.toggle('open', !expanded);
      mobileDrawer.setAttribute('aria-hidden', String(expanded));
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ------------------------------------------------------------------------
     Scroll Reveal (IntersectionObserver)
     ------------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ------------------------------------------------------------------------
     Filtro de Proyectos
     ------------------------------------------------------------------------ */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach((b) => {
        const isCurrent = b === btn;
        b.classList.toggle('active', isCurrent);
        b.setAttribute('aria-selected', String(isCurrent));
      });

      projectCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  /* ------------------------------------------------------------------------
     Lightbox Modal de Proyectos
     ------------------------------------------------------------------------ */
  const projectModal = document.getElementById('project-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCat = document.getElementById('modal-cat');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalSpecs = document.getElementById('modal-specs');
  const modalClose = document.getElementById('modal-close');
  const modalPrev = document.getElementById('modal-prev');
  const modalNext = document.getElementById('modal-next');
  const modalQuoteBtn = document.getElementById('modal-quote-btn');

  let currentProjectIndex = 0;

  const renderProjectModal = (idx) => {
    const item = PROJECTS[idx];
    if (!item) return;
    currentProjectIndex = idx;
    modalImg.src = item.image;
    modalImg.alt = item.title;
    modalCat.textContent = item.category;
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.description;
    modalSpecs.innerHTML = item.specs
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`)
      .join('');
  };

  const openProjectModal = (idx) => {
    renderProjectModal(idx);
    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  projectCards.forEach((card) => {
    const open = () => openProjectModal(Number(card.dataset.projectId));
    card.addEventListener('click', open);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  });

  modalClose?.addEventListener('click', closeProjectModal);
  modalQuoteBtn?.addEventListener('click', closeProjectModal);
  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
  });
  modalPrev?.addEventListener('click', () => {
    renderProjectModal((currentProjectIndex - 1 + PROJECTS.length) % PROJECTS.length);
  });
  modalNext?.addEventListener('click', () => {
    renderProjectModal((currentProjectIndex + 1) % PROJECTS.length);
  });

  /* ------------------------------------------------------------------------
     Modal de Reels / Videos
     ------------------------------------------------------------------------ */
  const reelModal = document.getElementById('reel-modal');
  const reelPoster = document.getElementById('reel-poster');
  const reelVideo = document.getElementById('reel-video');
  const reelModalTag = document.getElementById('reel-modal-tag');
  const reelModalTitle = document.getElementById('reel-modal-title');
  const reelModalDesc = document.getElementById('reel-modal-desc');
  const reelModalClose = document.getElementById('reel-modal-close');
  const reelProgressFill = document.getElementById('reel-progress-fill');
  let reelTimer = null;

  const openReelModal = (idx) => {
    const reel = REELS[idx];
    if (!reel) return;
    reelModalTag.textContent = reel.tag;
    reelModalTitle.textContent = reel.title;
    reelModalDesc.textContent = reel.description;

    if (reel.videoUrl) {
      reelPoster.hidden = true;
      reelVideo.hidden = false;
      reelVideo.src = reel.videoUrl;
      reelVideo.play().catch(() => {});
    } else {
      reelVideo.pause();
      reelVideo.removeAttribute('src');
      reelVideo.hidden = true;
      reelPoster.hidden = false;
      reelPoster.src = reel.poster;
      reelPoster.alt = reel.title;

      // Animación suave de progreso de previsualización
      if (reelProgressFill) {
        reelProgressFill.style.transition = 'none';
        reelProgressFill.style.width = '0%';
        requestAnimationFrame(() => {
          reelProgressFill.style.transition = 'width 9s linear';
          reelProgressFill.style.width = '100%';
        });
      }
    }

    reelModal.classList.add('open');
    reelModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeReelModal = () => {
    clearTimeout(reelTimer);
    reelVideo?.pause();
    reelModal.classList.remove('open');
    reelModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.reel-card').forEach((card) => {
    const open = () => openReelModal(Number(card.dataset.reelId));
    card.addEventListener('click', open);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  });

  reelModalClose?.addEventListener('click', closeReelModal);
  reelModal?.addEventListener('click', (e) => {
    if (e.target === reelModal) closeReelModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal?.classList.contains('open')) closeProjectModal();
      if (reelModal?.classList.contains('open')) closeReelModal();
    } else if (projectModal?.classList.contains('open')) {
      if (e.key === 'ArrowLeft') renderProjectModal((currentProjectIndex - 1 + PROJECTS.length) % PROJECTS.length);
      if (e.key === 'ArrowRight') renderProjectModal((currentProjectIndex + 1) % PROJECTS.length);
    }
  });

  /* ------------------------------------------------------------------------
     Formulario de Contacto (Validación y Reenvío a WhatsApp +595 983 538179)
     ------------------------------------------------------------------------ */
  const WHATSAPP_NUMBER = '595983538179';
  const contactForm = document.getElementById('contact-form');
  const formError = document.getElementById('form-error');
  const formSuccess = document.getElementById('form-success');
  const successMessage = document.getElementById('success-message');
  const whatsappDirectLink = document.getElementById('whatsapp-direct-link');
  const resetFormBtn = document.getElementById('reset-form-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = contactForm.nombre.value.trim();
      const telefono = contactForm.telefono.value.trim();
      const email = contactForm.email.value.trim();
      const tipo = contactForm['tipo-proyecto'].value;
      const mensaje = contactForm.mensaje.value.trim();

      if (!nombre || !telefono || !email) {
        formError.textContent = 'Por favor completá tu nombre, teléfono y correo electrónico.';
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formError.textContent = 'Ingresá un correo electrónico válido.';
        return;
      }

      formError.textContent = '';

      const lines = [
        'Hola *White Arquitectura · Ingeniería*, envío una consulta desde la web:',
        '',
        `*Nombre:* ${nombre}`,
        `*Teléfono:* ${telefono}`,
        `*Correo:* ${email}`,
        `*Tipo de proyecto:* ${tipo}`
      ];
      if (mensaje) {
        lines.push(`*Detalles:* ${mensaje}`);
      }

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;

      // Actualizar enlace de respaldo y abrir WhatsApp en nueva pestaña
      if (whatsappDirectLink) {
        whatsappDirectLink.href = waUrl;
      }
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      // Ocultar campos y mostrar confirmación limpia con acceso directo a WhatsApp
      contactForm.querySelectorAll('.form-row, .field, .form-footer').forEach((el) => {
        el.hidden = true;
      });
      successMessage.textContent = `Gracias, ${nombre}. Tu consulta sobre "${tipo}" fue preparada para WhatsApp (+595 983 538179). Si no se abrió automáticamente, presioná el botón de abajo.`;
      formSuccess.hidden = false;
    });

    resetFormBtn?.addEventListener('click', () => {
      contactForm.reset();
      contactForm.querySelectorAll('.form-row, .field, .form-footer').forEach((el) => {
        el.hidden = false;
      });
      formSuccess.hidden = true;
    });
  }
})();
