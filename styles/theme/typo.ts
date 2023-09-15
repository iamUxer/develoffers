import { css } from '@emotion/react';
export const calcRem = (px: number) => `${px / 16}rem`;

export const typo = {
  Header_28: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(28)};
    line-height: 150%;
    font-weight: 700;
  `,
  Header_24: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(24)};
    line-height: 150%;
    font-weight: 700;
  `,
  Header_20: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(20)};
    line-height: 150%;
    font-weight: 700;
  `,
};
