(function () {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');

  if (toggle && menu) {
    const setOpen = (open) => {
      menu.dataset.open = String(open);
      toggle.setAttribute('aria-expanded', String(open));
    };

    setOpen(false);

    toggle.addEventListener('click', () => {
      const isOpen = menu.dataset.open === 'true';
      setOpen(!isOpen);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) setOpen(false);
    });
  }

  const navLinks = document.querySelector('.nav-links');
  if (navLinks && !navLinks.querySelector('[data-about-link]')) {
    const isEnglish = document.documentElement.lang.toLowerCase().startsWith('en') || window.location.pathname.startsWith('/en/');
    const aboutLink = document.createElement('a');
    aboutLink.dataset.aboutLink = '';
    aboutLink.href = isEnglish ? '/en/about.html' : '/es/quienes-somos.html';
    aboutLink.textContent = isEnglish ? 'About us' : 'Quiénes somos';

    const aboutPath = isEnglish ? '/en/about.html' : '/es/quienes-somos.html';
    if (window.location.pathname === aboutPath) {
      aboutLink.setAttribute('aria-current', 'page');
    }

    const insightsLink = Array.from(navLinks.querySelectorAll('a')).find((link) =>
      link.getAttribute('href')?.includes('insights')
    );
    navLinks.insertBefore(aboutLink, insightsLink || null);
  }

  const yearNode = document.querySelector('[data-current-year]');
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();
      const subject = encodeURIComponent(`Consulta web - ${name || 'Sin nombre'}`);
      const body = encodeURIComponent(
        `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
      );
      window.location.href = `mailto:civilis.huelva@gmail.com?subject=${subject}&body=${body}`;
    });
  }
})();
