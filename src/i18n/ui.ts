export const languages = {
  es: { label: 'ES', name: 'Español', locale: 'es-CO', path: '/' },
  en: { label: 'EN', name: 'English', locale: 'en-US', path: '/en/' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

export type SectionKey = 'home' | 'experience' | 'projects' | 'stack' | 'about' | 'contact';

const es = {
  meta: {
    title: 'Eduardo Coronell · Desarrollador Backend',
    description:
      'Desarrollador Backend en Barranquilla, Colombia. Procedimientos almacenados, optimización SQL y lógica de negocio sobre Oracle y PostgreSQL para sistemas ERP.',
    ogAlt: 'Eduardo Coronell, Desarrollador Backend',
  },
  skip: 'Saltar al contenido',
  sections: {
    home: { id: 'inicio', label: 'Inicio' },
    experience: { id: 'experiencia', label: 'Experiencia' },
    projects: { id: 'proyectos', label: 'Proyectos' },
    stack: { id: 'tecnologias', label: 'Tecnologías' },
    about: { id: 'sobre-mi', label: 'Sobre mí' },
    contact: { id: 'contacto', label: 'Contacto' },
  },
  sidebar: {
    title: 'Ingeniero de Sistemas',
    profileLabel: 'Perfil',
    navLabel: 'Secciones',
    locationLabel: 'Ubicación',
    location: 'Barranquilla, Colombia',
    languagesLabel: 'Idiomas',
    languages: 'Español (nativo) · Inglés (A2)',
    cv: 'Descargar CV',
    cvLang: '',
    cvLangLong: '',
    write: 'Escríbeme',
    darkMode: 'Modo oscuro',
    langLabel: 'Idioma',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    rights: 'Hecho en Barranquilla',
  },
  hero: {
    role: 'Desarrollador Backend',
    tagline: 'Construyo y optimizo la lógica que mueve sistemas ERP, desde la base de datos.',
    availability: 'Abierto a oportunidades como Desarrollador Backend',
    illustrationLabel:
      'Ventana de un cliente SQL con una consulta de facturación sobre PostgreSQL y cuatro filas de resultado con datos de ejemplo.',
    rows: '4 filas',
    run: 'Ejecutar',
    runLong: 'Volver a ejecutar la animación de la consulta',
    metric: '−15 % tiempo de respuesta',
  },
  experience: {
    intro: 'Donde he aplicado lo que sé, con resultados medibles.',
    present: 'Presente',
    current: 'Actual',
  },
  projects: {
    intro: 'Proyectos personales y académicos que construí fuera del trabajo.',
    code: 'Código',
    demo: 'Demo',
  },
  stack: {
    intro: 'Las herramientas con las que trabajo a diario y las que uso en mis proyectos.',
    pause: 'Pausar carrusel',
    play: 'Reanudar carrusel',
    groups: {
      data: 'Bases de datos',
      backend: 'Lenguajes backend',
      mobile: 'Móvil',
      tools: 'Herramientas',
    },
  },
  about: {
    photoAlt: 'Eduardo Coronell sonriendo, sentado en una terraza',
    paragraphs: [
      'Empecé en el SENA como Tecnólogo en Sistemas y hoy sigo formándome en Ingeniería de Sistemas en el Politécnico de la Costa Atlántica. En el camino construí apps Android con Kotlin y Jetpack Compose, donde aprendí a cuidar la arquitectura (MVVM) y las pruebas.',
      'Hoy trabajo en ASP Solutions escribiendo y optimizando procedimientos almacenados para sistemas ERP sobre Oracle y PostgreSQL. Lo que más disfruto es encontrar el cuello de botella: una consulta de facturación que responde un 15 % más rápido o un script que le quita un 20 % al tiempo de resolución de incidencias. Aprendo rápido y me gusta explicar lo técnico sin enredos.',
    ],
    educationLabel: 'Educación',
    education: [
      { title: 'Ingeniería de Sistemas', place: 'Politécnico de la Costa Atlántica', period: '2025 — Presente' },
      { title: 'Tecnólogo en Sistemas', place: 'SENA', period: '2021 — 2023' },
    ],
  },
  contact: {
    title: '¿Hablamos?',
    text: 'Si tienes una vacante backend, un proyecto o solo quieres conversar de bases de datos, escríbeme.',
    copy: 'Copiar correo',
    copied: 'Correo copiado',
    copyError: 'No se pudo copiar. Selecciónalo y cópialo a mano.',
    mailSubject: 'Hola Eduardo, vi tu portafolio',
  },
  footer: {
    built: 'Diseñado y construido con Astro.',
  },
};

type Dict = typeof es;

const en: Dict = {
  meta: {
    title: 'Eduardo Coronell · Backend Developer',
    description:
      'Backend Developer based in Barranquilla, Colombia. Stored procedures, SQL optimization and business logic on Oracle and PostgreSQL for ERP systems.',
    ogAlt: 'Eduardo Coronell, Backend Developer',
  },
  skip: 'Skip to Content',
  sections: {
    home: { id: 'home', label: 'Home' },
    experience: { id: 'experience', label: 'Experience' },
    projects: { id: 'projects', label: 'Projects' },
    stack: { id: 'stack', label: 'Stack' },
    about: { id: 'about', label: 'About' },
    contact: { id: 'contact', label: 'Contact' },
  },
  sidebar: {
    title: 'Systems Engineer',
    profileLabel: 'Profile',
    navLabel: 'Sections',
    locationLabel: 'Location',
    location: 'Barranquilla, Colombia',
    languagesLabel: 'Languages',
    languages: 'Spanish (native) · English (A2)',
    cv: 'Download CV',
    cvLang: 'ES',
    cvLangLong: '(in Spanish)',
    write: 'Email Me',
    darkMode: 'Dark Mode',
    langLabel: 'Language',
    menuOpen: 'Open Menu',
    menuClose: 'Close Menu',
    rights: 'Made in Barranquilla',
  },
  hero: {
    role: 'Backend Developer',
    tagline: 'I build and optimize the logic that powers ERP systems, starting at the database.',
    availability: 'Open to Backend Developer roles',
    illustrationLabel: 'A SQL client window running a billing query on PostgreSQL, with four result rows of sample data.',
    metric: '−15% response time',
    rows: '4 rows',
    run: 'Run',
    runLong: 'Replay the query animation',
  },
  experience: {
    intro: 'Where I have put what I know to work, with measurable results.',
    present: 'Present',
    current: 'Current',
  },
  projects: {
    intro: 'Personal and academic projects I built outside of work.',
    code: 'Code',
    demo: 'Demo',
  },
  stack: {
    intro: 'The tools I use every day at work and in my own projects.',
    pause: 'Pause Carousel',
    play: 'Resume Carousel',
    groups: {
      data: 'Databases',
      backend: 'Backend Languages',
      mobile: 'Mobile',
      tools: 'Tools',
    },
  },
  about: {
    photoAlt: 'Eduardo Coronell smiling, sitting on a terrace',
    paragraphs: [
      'I started at SENA as a Systems Technologist and I keep growing through a Systems Engineering degree at Politécnico de la Costa Atlántica. Along the way I built Android apps with Kotlin and Jetpack Compose, where I learned to care about architecture (MVVM) and testing.',
      'Today I work at ASP Solutions writing and optimizing stored procedures for ERP systems on Oracle and PostgreSQL. What I enjoy most is finding the bottleneck: a billing query that responds 15% faster, or a script that cuts incident resolution time by 20%. I learn fast and I like explaining technical things plainly.',
    ],
    educationLabel: 'Education',
    education: [
      { title: 'Systems Engineering', place: 'Politécnico de la Costa Atlántica', period: '2025 — Present' },
      { title: 'Systems Technologist', place: 'SENA', period: '2021 — 2023' },
    ],
  },
  contact: {
    title: 'Let’s Talk',
    text: 'If you have a backend role, a project, or just want to talk databases, send me an email.',
    copy: 'Copy Email',
    copied: 'Email copied',
    copyError: 'Couldn’t copy it. Select it and copy it by hand.',
    mailSubject: 'Hi Eduardo, I saw your portfolio',
  },
  footer: {
    built: 'Designed and built with Astro.',
  },
};

export const ui: Record<Lang, Dict> = { es, en };

export const sectionOrder: SectionKey[] = ['home', 'experience', 'projects', 'stack', 'about', 'contact'];

export function useTranslations(lang: Lang) {
  return ui[lang];
}

export function formatMonth(value: string, lang: Lang) {
  const [year, month] = value.split('-').map(Number);
  const label = new Intl.DateTimeFormat(languages[lang].locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(year, month - 1, 1)),
  );
  return label.replace('.', '').replace(' de ', ' ');
}
