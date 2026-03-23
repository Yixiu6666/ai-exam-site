(() => {
  'use strict';

  // ===== SCROLL HEADER STATE =====
  const header = document.getElementById('site-header');
  let lastScroll = 0;

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    lastScroll = y;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== MOBILE NAV TOGGLE =====
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
      });
    });
  }

  // ===== HERO FADE-UP ON LOAD =====
  const heroEls = document.querySelectorAll('.hero .fade-up');
  const mockupEl = document.querySelector('.hero-mockup.fade-up');

  requestAnimationFrame(() => {
    heroEls.forEach(el => el.classList.add('is-visible'));
    if (mockupEl) {
      setTimeout(() => mockupEl.classList.add('is-visible'), 500);
    }
  });

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('[data-count]');

  const animateCounter = el => {
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();

    const frame = ts => {
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  };

  const counterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => counterObserver.observe(c));

  // ===== NAV ACTIVE STATE =====
  const navLinks = document.querySelectorAll('.main-nav a');
  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(s => sectionObserver.observe(s));
})();
