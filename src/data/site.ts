// Datos personales y de contacto. El teléfono no va aquí a propósito: no se publica.
export const site = {
  name: 'Eduardo Coronell',
  firstName: 'Eduardo',
  lastName: 'Coronell',
  email: 'ejco2003@gmail.com',
  linkedin: 'https://www.linkedin.com/in/eduardo-coronell',
  github: 'https://github.com/EduardoNovato',
  // Exporta tu CV sin teléfono y guárdalo con este nombre en public/cv/
  cv: '/cv/eduardo-coronell-cv.pdf',
  url: 'https://eduardocoronell.vercel.app',
} as const;

export type TechIcon =
  | 'openjdk'
  | 'sql'
  | 'postgresql'
  | 'database'
  | 'docker'
  | 'linux'
  | 'git'
  | 'kotlin'
  | 'jetpackcompose'
  | 'go'
  | 'python'
  | 'php'
  | 'astro';

export interface Tech {
  name: string;
  icon: TechIcon;
  group: 'data' | 'backend' | 'mobile' | 'tools';
}

// Orden del carrusel: por relevancia para backend
export const techs: Tech[] = [
  { name: 'Java', icon: 'openjdk', group: 'backend' },
  { name: 'PL/SQL', icon: 'sql', group: 'data' },
  { name: 'PostgreSQL', icon: 'postgresql', group: 'data' },
  { name: 'Oracle', icon: 'database', group: 'data' },
  { name: 'Docker', icon: 'docker', group: 'tools' },
  { name: 'Linux', icon: 'linux', group: 'tools' },
  { name: 'Git', icon: 'git', group: 'tools' },
  { name: 'Kotlin', icon: 'kotlin', group: 'mobile' },
  { name: 'Jetpack Compose', icon: 'jetpackcompose', group: 'mobile' },
  { name: 'Go', icon: 'go', group: 'backend' },
  { name: 'Python', icon: 'python', group: 'backend' },
  { name: 'PHP', icon: 'php', group: 'backend' },
  { name: 'Astro', icon: 'astro', group: 'tools' },
];
