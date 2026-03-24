/* ============================================================
   script.js — Sachin Portfolio
   ============================================================ */

(function () {
  'use strict';

  /* ---- CUSTOM CURSOR ---- */

  const dot = document.getElementById('cursorDot');

  if (dot && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0;
    let cx = 0, cy = 0;
    let raf;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
    });

    function animateCursor() {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      dot.style.left = cx + 'px';
      dot.style.top  = cy + 'px';
      raf = requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        dot.style.width  = '20px';
        dot.style.height = '20px';
        dot.style.background = 'rgba(57,217,138,0.4)';
      });
      el.addEventListener('mouseleave', function () {
        dot.style.width  = '8px';
        dot.style.height = '8px';
        dot.style.background = 'var(--accent)';
      });
    });
  } else {
    if (dot) dot.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

  /* ---- HAMBURGER / MOBILE NAV ---- */

  const burger  = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      const open = mobileNav.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });

    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- SCROLL REVEAL ---- */

  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---- NAV ACTIVE LINK ---- */

  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function markActiveNav() {
    const y = window.scrollY + 120;
    sections.forEach(function (sec) {
      const top    = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id     = sec.id;
      navAnchors.forEach(function (a) {
        if (a.getAttribute('href') === '#' + id) {
          a.style.color = (y >= top && y < bottom) ? 'var(--accent)' : '';
        }
      });
    });
  }

  window.addEventListener('scroll', markActiveNav, { passive: true });
  markActiveNav();

  /* ---- TERMINAL LIVE COMMAND TYPER ---- */

  const liveCmd = document.getElementById('liveCmd');

  if (liveCmd) {
    const commands = [
      'npm run dev',
      'python app.py',
      'git push origin main',
      'node server.js',
      'pip install flask',
      'git commit -m "feat: new update"',
    ];

    let cmdIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let pauseTimer = null;

    function typeStep() {
      const cmd = commands[cmdIdx];

      if (!deleting) {
        charIdx++;
        liveCmd.textContent = cmd.slice(0, charIdx);
        if (charIdx === cmd.length) {
          deleting = true;
          pauseTimer = setTimeout(typeStep, 1800);
          return;
        }
        setTimeout(typeStep, 68);
      } else {
        charIdx--;
        liveCmd.textContent = cmd.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          cmdIdx = (cmdIdx + 1) % commands.length;
          setTimeout(typeStep, 400);
          return;
        }
        setTimeout(typeStep, 32);
      }
    }

    setTimeout(typeStep, 1200);
  }

  /* ---- STAGGER DELAY ON GRID CHILDREN ---- */

  document.querySelectorAll('.skills-grid, .projects-grid').forEach(function (grid) {
    Array.from(grid.children).forEach(function (child, i) {
      child.style.transitionDelay = (i * 80) + 'ms';
    });
  });

})();
