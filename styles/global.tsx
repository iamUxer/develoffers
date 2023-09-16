import { Global, css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import { theme } from './theme';

const style = css`
  ${emotionReset}
  * {
    box-sizing: border-box;
  }
  body {
    background: #eee;
    color: black;
  }
  button,
  link,
  a {
    &:hover {
      cursor: pointer;
    }
    &:active {
      opacity: 0.9;
    }
  }
  h1 {
    ${theme.typo.Header_28}
  }
  h2 {
    ${theme.typo.Header_24}
  }
  h3 {
    ${theme.typo.Header_20}
  }
`;

export const GlobalStyle = () => <Global styles={style} />;
