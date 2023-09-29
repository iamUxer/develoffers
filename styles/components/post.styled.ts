import styled from '@emotion/styled';
import { theme } from '../theme';

export const PostStyled = styled.div`
  margin: auto;
  max-width: 480px;
  width: auto;
  & > div {
    padding: 30px 20px;
    background: #fff;
    & .button-function {
      display: none;
    }
    &:hover {
      & .button-function {
        display: inline-flex;
      }
    }
  }
  & img {
    max-width: 480px;
    width: 100%;
  }
  & span {
    ${theme.typo.font_small}
    color: ${theme.palette.dim};
  }
  & p {
    margin-top: 20px;
  }
  & + div {
    margin-top: 20px;
  }
`;
