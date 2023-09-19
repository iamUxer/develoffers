import { css } from '@emotion/react';

export const palette = {
  primary: 'tomato',
  default: '#ddd',
  default_color: '#333',
  bright: '#fff',
  disabled: '#aaa',
  disabled_background: css`
    background-color: #aaa;
    color: #fff;
  `,
};

export type TypeOfPalette = typeof palette;
export type KeyOfPalette = keyof typeof palette;
