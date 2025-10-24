document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-navigation');

  if (!toggle || !nav) return;

  // Create a backdrop element to detect outside clicks on mobile
  const backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  backdrop.style.position = 'fixed';
  backdrop.style.inset = '0';
  backdrop.style.zIndex = '30';
  backdrop.style.display = 'none';

  document.body.appendChild(backdrop);

  function openNav() {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.classList.add('open');
    // change icon to X and keep sr-only for screen readers
    toggle.innerHTML = '<span class="sr-only">Close navigation</span>✕';
    backdrop.style.display = 'block';
  }

  function closeNav() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('open');
    // change icon back to hamburger
    toggle.innerHTML = '<span class="sr-only">Toggle navigation</span>☰';
    backdrop.style.display = 'none';
  }

  toggle.addEventListener('click', function (e) {
    const isOpen = nav.classList.contains('open');
    if (isOpen) closeNav(); else openNav();
  });

  // Close when clicking outside (backdrop) or on any navigation link
  backdrop.addEventListener('click', closeNav);

  nav.addEventListener('click', function (e) {
    const target = e.target;
    if (target.tagName === 'A') {
      // close after a short delay to allow navigation (esp. same-page anchors)
      setTimeout(closeNav, 50);
    }
  });

  // Close when focus moves outside and a click happens elsewhere
  document.addEventListener('click', function (e) {
    if (!nav.classList.contains('open')) return;
    const withinNav = nav.contains(e.target) || toggle.contains(e.target);
    if (!withinNav) closeNav();
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });
});
