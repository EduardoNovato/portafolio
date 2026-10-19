import { h, palette as c } from './og';

// Monograma "EC" en serif sobre el fondo oscuro de la marca
export function monogram(size: number, radius: number) {
  return h(
    'div',
    {
      style: {
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: c.bg,
        borderRadius: radius,
        fontFamily: 'DM Serif Display',
        fontSize: size * 0.56,
        color: c.accent,
        letterSpacing: -size * 0.01,
        paddingTop: size * 0.04,
      },
    },
    'EC',
  );
}
