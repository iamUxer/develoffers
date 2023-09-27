import { Global, css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import { theme } from './theme';

const style = css`
  ${emotionReset}
  * {
    box-sizing: border-box;
    font-family: 'Roboto', 'HelveticaNeue', 'Helvetica Neue', Helvetica, Arial,
      sans-serif;
  }
  body {
    background: #eee;
    color: black;
    letter-spacing: -0.3px;
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
    &:visited {
      color: #0083ff;
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
