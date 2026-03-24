/* ============================================
   script.js — Sachin Portfolio
   ============================================ */

(function () {
  'use strict';

  // ==========================================
  // HAMBURGER / MOBILE NAV
  // ==========================================

  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================
  // SCROLL REVEAL
  // ==========================================

  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || i * 60;
            setTimeout(function () {
              entry.target.classList.add('visible');
            }, Number(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ==========================================
  // NAV ACTIVE STATE ON SCROLL
  // ==========================================

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    const scrollY = window.scrollY;

    sections.forEach(function (section) {
      const top = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      navLinks.forEach(function (link) {
        if (link.getAttribute('href') === '#' + id) {
          if (scrollY >= top && scrollY < bottom) {
            link.style.color = 'var(--text)';
          } else {
            link.style.color = '';
          }
        }
      });
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ==========================================
  // NAV BORDER ON SCROLL
  // ==========================================

  const nav = document.getElementById('nav');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      nav.style.borderBottomColor = 'var(--border)';
    } else {
      nav.style.borderBottomColor = 'var(--border-light)';
    }
  }, { passive: true });

})();
