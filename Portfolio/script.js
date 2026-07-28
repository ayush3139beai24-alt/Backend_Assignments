// ============================
// Line-number gutter
// ============================
function renderGutter() {
  const gutter = document.getElementById('gutter');
  if (!gutter) return;
  const lineHeight = 24;
  const count = Math.ceil(document.body.scrollHeight / lineHeight) + 5;
  const frag = document.createDocumentFragment();
  gutter.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const span = document.createElement('span');
    span.textContent = i;
    frag.appendChild(span);
  }
  gutter.appendChild(frag);
}
window.addEventListener('load', renderGutter);
window.addEventListener('resize', debounce(renderGutter, 200));

// ============================
// Role text rotator
// ============================
const roles = [
  'Software Developer',
  'Full-Stack Engineer',
  'Open Source Contributor',
  'Problem Solver'
];
let roleIndex = 0;
const roleEl = document.getElementById('roleText');

function typeRole() {
  if (!roleEl) return;
  const current = roles[roleIndex];
  let charIndex = roleEl.textContent.length;

  // Simple cross-fade instead of full type animation for a cleaner feel
  roleEl.style.opacity = '0';
  setTimeout(() => {
    roleEl.textContent = current;
    roleEl.style.opacity = '1';
    roleIndex = (roleIndex + 1) % roles.length;
  }, 250);
}
roleEl && (roleEl.style.transition = 'opacity 0.25s ease');
setInterval(typeRole, 3200);

// ============================
// Mobile nav toggle
// ============================
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle && navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

nav && nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================
// Active nav link on scroll
// ============================
const sections = document.querySelectorAll('main .section, main .hero');
const navLinks = document.querySelectorAll('.nav a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(section => {
  if (section.id) navObserver.observe(section);
});

// ============================
// Scroll reveal
// ============================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================
// Contact form validation
// ============================
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

function setError(field, message) {
  const el = form.querySelector(`[data-error-for="${field}"]`);
  if (el) el.textContent = message || '';
}

function validateForm(data) {
  let valid = true;

  if (!data.name.trim()) {
    setError('name', 'Please enter your name.');
    valid = false;
  } else {
    setError('name', '');
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email.trim())) {
    setError('email', 'Please enter a valid email.');
    valid = false;
  } else {
    setError('email', '');
  }

  if (!data.message.trim() || data.message.trim().length < 10) {
    setError('message', 'Message should be at least 10 characters.');
    valid = false;
  } else {
    setError('message', '');
  }

  return valid;
}

form && form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  if (!validateForm(data)) {
    formStatus.textContent = '';
    return;
  }

  // No backend is wired up yet — replace this with a real submission
  // (e.g. Formspree, a serverless function, or your own API endpoint).
  formStatus.textContent = `Thanks, ${data.name.split(' ')[0]}! This form isn't connected to a server yet, but your message was validated successfully.`;
  form.reset();
});

// ============================
// Footer year
// ============================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ============================
// Utility
// ============================
function debounce(fn, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}
