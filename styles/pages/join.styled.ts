import styled from '@emotion/styled';

export const JoinStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & form {
    display: flex;
    flex-direction: column;
    width: 480px;
    & input {
      & + input {
        margin-top: 10px;
      }
    }
  }
  & button {
    margin-top: 10px;
  }
`;
