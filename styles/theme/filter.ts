import { css } from '@emotion/react';

export const filter = {
  hover: css`
    opacity: 0.8;
  `,
  action: css`
    opacity: 0.6;
  `,
};

export type TypeOfFilter = typeof filter;
export type KeyOfFilter = keyof typeof filter;
