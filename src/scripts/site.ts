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

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function applyTheme(theme: Theme) {
  root.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Sin almacenamiento disponible: el tema solo dura esta visita
  }
  syncThemeToggles();
}

themeToggles.forEach((button) =>
  button.addEventListener('click', () => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
    if (typeof document.startViewTransition !== 'function' || reduceMotion.matches) {
      applyTheme(next);
      return;
    }

    // Todo el sitio cambia en un solo fotograma y el tema nuevo se expande en círculo desde el interruptor
    const { left, top, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    root.classList.add('theme-switching');
    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          // Misma curva que --ease-out
          { duration: 700, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
        );
      })
      .catch(() => {});
    transition.finished.finally(() => root.classList.remove('theme-switching'));
  }),
);

syncThemeToggles();

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
desktop.addEventListener('change', () => {
  // Al cruzar el punto de corte el panel cambia de sitio sin deslizarse
  sidebar?.style.setProperty('transition', 'none');
  setMenu(false, false);
  requestAnimationFrame(() => requestAnimationFrame(() => sidebar?.style.removeProperty('transition')));
});

/* ---------- Cerrar el menú deslizándolo hacia la izquierda ---------- */
type Drag = { startX: number; startY: number; dx: number; axis: 'x' | 'y' | null; lastX: number; lastT: number; velocity: number };
let drag: Drag | null = null;

function releaseDrag() {
  sidebar?.style.removeProperty('transition');
  sidebar?.style.removeProperty('transform');
  backdrop?.style.removeProperty('transition');
  backdrop?.style.removeProperty('opacity');
}

sidebar?.addEventListener(
  'touchstart',
  (event) => {
    if (desktop.matches || sidebar.dataset.open !== 'true') return;
    const { clientX, clientY } = event.touches[0];
    drag = { startX: clientX, startY: clientY, dx: 0, axis: null, lastX: clientX, lastT: event.timeStamp, velocity: 0 };
  },
  { passive: true },
);

sidebar?.addEventListener(
  'touchmove',
  (event) => {
    if (!drag) return;
    const { clientX, clientY } = event.touches[0];
    const dx = clientX - drag.startX;
    const dy = clientY - drag.startY;
    // Se decide la dirección tras unos píxeles: si es vertical, el panel hace scroll normal
    if (!drag.axis) {
      if (Math.hypot(dx, dy) < 8) return;
      drag.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (drag.axis === 'x') {
        sidebar.style.transition = 'none';
        backdrop?.style.setProperty('transition', 'none');
      }
    }
    if (drag.axis !== 'x') return;

    drag.velocity = (clientX - drag.lastX) / Math.max(1, event.timeStamp - drag.lastT);
    drag.lastX = clientX;
    drag.lastT = event.timeStamp;
    // Hacia la derecha ofrece resistencia, como los paneles de iOS
    drag.dx = dx < 0 ? dx : dx / 6;
    sidebar.style.transform = `translateX(${drag.dx}px)`;
    backdrop?.style.setProperty('opacity', String(Math.max(0, 1 + Math.min(0, drag.dx) / sidebar.offsetWidth)));
  },
  { passive: true },
);

function endDrag() {
  if (!drag || !sidebar) return;
  const { dx, axis, velocity } = drag;
  drag = null;
  if (axis !== 'x') return;
  // Se cierra si pasa de un tercio o si se lanza con rapidez (px/ms); si no, vuelve a su sitio con la misma curva
  const close = dx < -sidebar.offsetWidth / 3 || velocity < -0.5;
  releaseDrag();
  if (close) setMenu(false);
}

sidebar?.addEventListener('touchend', endDrag);
sidebar?.addEventListener('touchcancel', endDrag);
setMenu(false, false);

/* ---------- Sección activa en la navegación ---------- */
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav]'));
const sections = navLinks
  .map((link) => document.getElementById(link.dataset.nav ?? ''))
  .filter((section): section is HTMLElement => section !== null);

// Enlaces de idioma: apuntan a la misma sección en el otro idioma (las secciones van en el mismo orden)
const langLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-lang-link]'));

function setActive(id: string) {
  navLinks.forEach((link) => {
    if (link.dataset.nav === id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  const index = navLinks.findIndex((link) => link.dataset.nav === id);
  langLinks.forEach((link) => {
    const target = link.dataset.sectionIds?.split(',')[index];
    link.hash = index > 0 && target ? target : '';
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
    // La entrada de la propia ventana no se repite, solo la consulta
    if ((animation.effect as KeyframeEffect | null)?.target === heroQuery) return;
    animation.cancel();
    animation.play();
  });
});

/* ---------- Pausar el carrusel de tecnologías ---------- */
const marquee = document.querySelector<HTMLElement>('[data-marquee]');
const marqueeToggle = document.querySelector<HTMLButtonElement>('[data-marquee-toggle]');
// Fuera de pantalla no hace falta seguir animando
if (marquee) {
  new IntersectionObserver(([entry]) => marquee.toggleAttribute('data-offscreen', !entry.isIntersecting)).observe(marquee);
}
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
