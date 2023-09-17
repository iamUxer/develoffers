import styled from '@emotion/styled';
import { theme } from '../theme';

export const JoinStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  margin: auto;
  padding: 20px;
  & form {
    display: flex;
    flex-direction: column;
    width: 100%;
    & input {
      & + input {
        margin-top: 10px;
      }
    }
    & p {
      margin: 10px 10px 15px 15px;
      font-size: 14px;
      color: ${theme.palette.primary};
    }
  }
  & button {
    margin-top: 10px;
  }
`;
