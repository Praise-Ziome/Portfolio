/* ═══════════════════════════════════════════
   P. ZIOME PORTFOLIO — script.js
═══════════════════════════════════════════ */

/* ── NAVBAR: scroll shadow + mobile menu ── */
(function initNav() {
  const navbar = document.getElementById('navbar');
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobLinks = document.querySelectorAll('.mob-link');

  // Sticky style on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Burger toggle
  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu on link click
  mobLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', false);
    });
  });
})();

/* ── SCROLL REVEAL ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();

/* ── IMAGE PLACEHOLDER HIDE ── */
(function initImages() {
  // When a real image loads successfully, hide its sibling placeholder
  const imgs = document.querySelectorAll('img');
  imgs.forEach(img => {
    const placeholder = img.nextElementSibling;
    if (!placeholder) return;

    if (img.complete && img.naturalWidth > 0) {
      placeholder.style.display = 'none';
    } else {
      img.addEventListener('load', () => {
        if (img.naturalWidth > 0) placeholder.style.display = 'none';
      });
    }
  });
})();

/* ── ACTIVE NAV LINK (scroll spy) ── */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ── CONTACT FORM ── */
(function initForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      setStatus('Please fill in all fields.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      setStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Disable button during send
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    setStatus('', '');

    try {
      /*
       * TODO: Replace this with your actual form endpoint.
       * Options: Formspree (formspree.io), Netlify Forms,
       * EmailJS, or your own backend.
       *
       * Example with Formspree:
       *   const res = await fetch('https://formspree.io/f/YOUR_ID', {
       *     method: 'POST',
       *     headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
       *     body: JSON.stringify({ name, email, message })
       *   });
       *   if (!res.ok) throw new Error('Send failed');
       */

      // Simulate a send for now (remove this when connecting a real endpoint)
      await new Promise(resolve => setTimeout(resolve, 1200));

      setStatus('Message sent! I\'ll be in touch soon.', 'success');
      form.reset();
    } catch (err) {
      setStatus('Something went wrong. Please try emailing me directly.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  });

  function setStatus(msg, type) {
    status.textContent = msg;
    status.className = `form-status${type ? ' ' + type : ''}`;
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }
})();

/* ── SMOOTH SCROLL for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navHeight = document.getElementById('navbar').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
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
