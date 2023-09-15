import { css } from '@emotion/react';

export const palette = {
  primary_color: css`
    color: tomato;
  `,
};

export type TypeOfPalette = typeof palette;
export type KeyOfPalette = keyof typeof palette;
