/* ============================================
   Portfolio interactions
   - Mobile nav toggle (with hamburger ↔ X animation)
   - Sticky navbar shadow on scroll
   - Active link close on navigation
   - Footer year
   - Contact form (client-side validation)
   ============================================ */
(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  var spans = toggle ? toggle.querySelectorAll('span') : [];

  function openMenu() {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    // Animate to X
    if (spans.length === 3) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[1].style.transform = 'scaleX(0)';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    }
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    // Animate back to hamburger
    if (spans.length === 3) {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[1].style.transform = '';
      spans[2].style.transform = '';
    }
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when a nav link is clicked
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        closeMenu();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (menu.classList.contains('is-open') &&
          !menu.contains(e.target) &&
          !toggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  // Navbar shadow on scroll
  var navbar = document.getElementById('navbar');
  var onScroll = function () {
    if (!navbar) return;
    if (window.scrollY > 8) navbar.classList.add('is-scrolled');
    else navbar.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Contact form
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !emailOk || !message) {
        status.style.color = '#b91c1c';
        status.textContent = 'Please fill in every field with a valid email.';
        return;
      }
      status.style.color = '';
      status.textContent = 'Thanks ' + name + '! Your message has been queued.';
      form.reset();
    });
  }
})();

/* ── THEME TOGGLE ── */
(function initTheme() {
  const btn  = document.getElementById('themeToggle');
  const body = document.body;
  const KEY  = 'pziome-theme';

  // Restore saved preference, or respect OS setting
  const saved = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'light' || (!saved && !prefersDark)) {
    body.classList.add('light');
  }

  btn.addEventListener('click', () => {
    body.classList.toggle('light');
    localStorage.setItem(KEY, body.classList.contains('light') ? 'light' : 'dark');
  });
})();
