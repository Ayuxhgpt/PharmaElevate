/* ===== Main JS for interactive features ===== */

// MOBILE MENU
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('show');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('show');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// SMOOTH SCROLL WITH OFFSET
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const topPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: topPos, behavior: 'smooth' });
      }
    }
  });
});

// STATS COUNTER
const counters = document.querySelectorAll('.count');
const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      if (!el.classList.contains('counted')) {
        let target = +el.dataset.target;
        let duration = 1700;
        let start = 0;
        let startTime = performance.now();

        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          el.textContent = Math.floor(progress * (target - start) + start);
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
        el.classList.add('counted');
      }
      obs.unobserve(el);
    }
  });
}, { threshold: 0.45 });
counters.forEach(c => counterObserver.observe(c));

// SCROLL REVEAL
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });
revealElements.forEach(el => revealObserver.observe(el));

// NAV LINK ACTIVE ON SCROLL
const navAnchors = document.querySelectorAll('.nav-links a');
const sections = Array.from(navAnchors).map(a => {
  const href = a.getAttribute('href');
  return href.startsWith('#') ? document.querySelector(href) : null;
});

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  sections.forEach((sec, idx) => {
    if (!sec) return;
    const top = sec.offsetTop - 120
