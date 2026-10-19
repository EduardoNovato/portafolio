const root = document.documentElement;

/* ---------- Tema claro / oscuro ---------- */
type Theme = 'light' | 'dark';

const themeToggles = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
const currentTheme = (): Theme => (root.dataset.theme === 'light' ? 'light' : 'dark');

function syncThemeToggles() {
  const isDark = currentTheme() === 'dark';
  themeToggles.forEach((button) => button.setAttribute('aria-checked', String(isDark)));
  // La barra del navegador en móvil sigue el tema elegido, no solo el del sistema
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute('content', isDark ? '#0b1012' : '#f1f5f3'));
}

themeToggles.forEach((button) =>
  button.addEventListener('click', () => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Sin almacenamiento disponible: el tema solo dura esta visita
    }
    syncThemeToggles();
  }),
);

syncThemeToggles();
requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('theme-ready')));

/* ---------- Menú lateral en móvil ---------- */
const sidebar = document.querySelector<HTMLElement>('[data-sidebar]');
const backdrop = document.querySelector<HTMLElement>('[data-backdrop]');
const openButton = document.querySelector<HTMLButtonElement>('[data-menu-open]');
const closeButton = document.querySelector<HTMLButtonElement>('[data-menu-close]');
const desktop = window.matchMedia('(min-width: 1024px)');

function setMenu(open: boolean, moveFocus = true) {
  if (!sidebar) return;
  const isMobile = !desktop.matches;
  sidebar.dataset.open = String(open && isMobile);
  sidebar.inert = isMobile && !open;
  openButton?.setAttribute('aria-expanded', String(open && isMobile));
  backdrop?.classList.toggle('opacity-0', !(open && isMobile));
  backdrop?.classList.toggle('pointer-events-none', !(open && isMobile));
  document.body.classList.toggle('overflow-hidden', open && isMobile);
  if (moveFocus && isMobile) (open ? closeButton : openButton)?.focus({ preventScroll: true });
}

openButton?.addEventListener('click', () => setMenu(true));
closeButton?.addEventListener('click', () => setMenu(false));
backdrop?.addEventListener('click', () => setMenu(false));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && sidebar?.dataset.open === 'true') setMenu(false);
});
sidebar?.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) =>
  link.addEventListener('click', () => {
    if (!desktop.matches) setMenu(false, false);
  }),
);
desktop.addEventListener('change', () => setMenu(false, false));
setMenu(false, false);

/* ---------- Sección activa en la navegación ---------- */
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav]'));
const sections = navLinks
  .map((link) => document.getElementById(link.dataset.nav ?? ''))
  .filter((section): section is HTMLElement => section !== null);

function setActive(id: string) {
  navLinks.forEach((link) => {
    if (link.dataset.nav === id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

if (sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((section) => sectionObserver.observe(section));
  setActive(sections[0].id);
}

/* ---------- Aparición al hacer scroll ---------- */
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
);
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

/* ---------- Ventana SQL del hero: volver a ejecutar ---------- */
const heroQuery = document.querySelector<HTMLElement>('[data-hero-query]');
heroQuery?.querySelector('[data-query-run]')?.addEventListener('click', () => {
  heroQuery.getAnimations({ subtree: true }).forEach((animation) => {
    animation.cancel();
    animation.play();
  });
});

/* ---------- Pausar el carrusel de tecnologías ---------- */
const marquee = document.querySelector<HTMLElement>('[data-marquee]');
const marqueeToggle = document.querySelector<HTMLButtonElement>('[data-marquee-toggle]');
marqueeToggle?.addEventListener('click', () => {
  const paused = !marqueeToggle.hasAttribute('data-paused');
  marqueeToggle.toggleAttribute('data-paused', paused);
  marquee?.toggleAttribute('data-paused', paused);
  const label = marqueeToggle.querySelector('[data-marquee-label]');
  if (label) label.textContent = (paused ? marqueeToggle.dataset.labelPlay : marqueeToggle.dataset.labelPause) ?? '';
});

/* ---------- Copiar correo ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
  const status = document.getElementById(button.dataset.status ?? '');
  let timer: number | undefined;

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy ?? '');
      button.dataset.state = 'copied';
      if (status) status.textContent = button.dataset.ok ?? '';
    } catch {
      if (status) status.textContent = button.dataset.error ?? '';
    }
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      button.dataset.state = '';
      if (status) status.textContent = '';
    }, 2400);
  });
});
