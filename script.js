/* =============================================================
   Soares e Melo Advocacia — Home
   Scripts de interação
   ============================================================= */
(() => {
  'use strict';

  const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Header compacta ao rolar ------------------- */
  const header = document.querySelector('.site-header');
  const setHeaderState = () => {
    if (!header) return;
    header.dataset.scroll = window.scrollY > 24 ? 'scrolled' : 'top';
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  /* ---------- 2. Reveal genérico ao entrar viewport --------- */
  const revealTargets = document.querySelectorAll('.reveal, .section-head, .diferencial, .bento__cell, .step, .stats, .card-form, .faq__item, .cta-final');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          // Delay opcional em bento cells via --d
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- 3. Diferenciais: scroll-spy no índice --------- */
  const difItems = document.querySelectorAll('.diferencial');
  const difNumButtons = document.querySelectorAll('.diferenciais__index .index__num');
  if (difItems.length && difNumButtons.length && 'IntersectionObserver' in window) {
    const difSpy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          difNumButtons.forEach((btn) => {
            btn.classList.toggle('is-active', btn.dataset.target === id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
    difItems.forEach((el) => difSpy.observe(el));
  }

  // Click nos numerais → scroll smooth
  document.querySelectorAll('.index__num').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) {
        const offset = 120;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- 4. Processo: numeral sticky cross-fade -------- */
  const stickyNumeral = document.querySelector('.sticky-roman__numeral');
  const stickyStep = document.querySelector('.sticky-roman__step');
  const steps = document.querySelectorAll('.step');

  if (stickyNumeral && steps.length && 'IntersectionObserver' in window) {
    const processoSpy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const numeral = entry.target.dataset.numeral;
          const label = entry.target.dataset.label;
          const current = stickyNumeral.textContent;
          if (current !== numeral) {
            stickyNumeral.classList.add('is-swapping');
            setTimeout(() => {
              stickyNumeral.textContent = numeral;
              if (stickyStep) stickyStep.textContent = label;
              stickyNumeral.classList.remove('is-swapping');
            }, 250);
          }
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    steps.forEach((step) => processoSpy.observe(step));
  }

  /* ---------- 5. Sobre: mouse parallax no Crest ------------- */
  const crest = document.querySelector('.sobre__crest');
  const sobre = document.querySelector('.sobre');
  if (crest && sobre && !prefersReducedMotion) {
    let mx = 0, my = 0, rafId = null;
    sobre.addEventListener('mousemove', (e) => {
      const rect = sobre.getBoundingClientRect();
      mx = (e.clientX - rect.left) / rect.width - 0.5;
      my = (e.clientY - rect.top) / rect.height - 0.5;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          crest.style.transform = `translateY(-50%) translate3d(${mx * 14}px, ${my * -10}px, 0)`;
          rafId = null;
        });
      }
    });
    sobre.addEventListener('mouseleave', () => {
      crest.style.transform = 'translateY(-50%)';
    });
  }

  /* ---------- 6. Stats: counter animation ------------------- */
  const stats = document.querySelectorAll('.stat__num');
  if (stats.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1400;
          const start = performance.now();
          const from = 0;
          const ease = (t) => 1 - Math.pow(1 - t, 3);
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.floor(from + (target - from) * ease(progress));
            el.textContent = (target < 10 ? String(value).padStart(2, '0') : String(value)) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          statsObs.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    stats.forEach((s) => statsObs.observe(s));
  }

  /* ---------- 7. CTA Final: máscara de telefone + submit ---- */
  const phoneInput = document.getElementById('input-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 10) {
        v = v.replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, '($1) $2 $3-$4');
      } else if (v.length > 6) {
        v = v.replace(/^(\d{2})(\d{4,5})(\d{0,4}).*/, '($1) $2-$3').replace(/-$/, '');
      } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2').trim();
      } else if (v.length > 0) {
        v = v.replace(/^(\d{0,2}).*/, '($1').trim();
      }
      e.target.value = v;
    });
  }

  const form = document.getElementById('form-consulta');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value.trim();
      const phoneRaw = form.querySelector('[name="phone"]').value.replace(/\D/g, '');

      let valid = true;
      const nameField = form.querySelector('[name="name"]').parentElement;
      const phoneField = form.querySelector('[name="phone"]').parentElement;

      nameField.classList.toggle('is-invalid', name.length < 2);
      phoneField.classList.toggle('is-invalid', phoneRaw.length < 10);

      if (name.length < 2 || phoneRaw.length < 10) {
        valid = false;
        setTimeout(() => {
          nameField.classList.remove('is-invalid');
          phoneField.classList.remove('is-invalid');
        }, 600);
      }

      if (!valid) return;

      const service = form.dataset.service;
      const baseMsg = service
        ? `Olá, meu nome é ${name} e gostaria de agendar uma consulta sobre ${service}.`
        : `Olá, meu nome é ${name} e gostaria de agendar uma consulta gratuita.`;
      const url = `https://wa.me/5531971547036?text=${encodeURIComponent(baseMsg)}`;

      let opened = false;
      const open = () => { if (!opened) { opened = true; window.open(url, '_blank', 'noopener'); } };
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          send_to: 'AW-18148697196/9uqmCJ3_tqscEOzI_M1D',
          value: 1.0,
          currency: 'BRL',
          event_callback: open
        });
        setTimeout(open, 1200);
      } else {
        open();
      }
    });
  }

  /* ---------- 8. FAQ Accordion ------------------------------ */
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq__q');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      // Fecha todos
      faqItems.forEach((i) => {
        i.classList.remove('is-open');
        i.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
      });
      // Abre o clicado, se não estava aberto
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // FAQ index: scroll-spy
  const faqNumButtons = document.querySelectorAll('.faq__index .index__num');
  if (faqItems.length && faqNumButtons.length && 'IntersectionObserver' in window) {
    const faqSpy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          faqNumButtons.forEach((btn) => {
            btn.classList.toggle('is-active', btn.dataset.target === id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
    faqItems.forEach((el) => faqSpy.observe(el));
  }

  /* ---------- 9. Botão "voltar ao topo" --------------------- */
  const toTop = document.getElementById('to-top');
  const backToTopSeal = document.getElementById('back-to-top');
  const toggleToTop = () => {
    if (!toTop) return;
    toTop.classList.toggle('is-visible', window.scrollY > 600);
  };
  toggleToTop();
  window.addEventListener('scroll', toggleToTop, { passive: true });
  if (toTop) {
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
  if (backToTopSeal) {
    backToTopSeal.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- 10. Scroll-spy do header ---------------------- */
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  const sections = Array.from(navLinks).map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    const navSpy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          navLinks.forEach((a) => {
            a.classList.toggle('is-active', a.getAttribute('href') === id);
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
    sections.forEach((s) => navSpy.observe(s));
  }

})();
