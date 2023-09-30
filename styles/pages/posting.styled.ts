import styled from '@emotion/styled';

export const PostingStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  margin: auto;
  & form {
    position: relative;
    width: 100%;
    & textarea {
      display: block;
      width: 100%;
      & + div {
        display: flex;
        position: relative;
        justify-content: space-between;
        margin-top: 20px;
        & > div {
          display: flex;
        }
      }
    }
    & img {
      height: 38px;
      width: auto;
      & + label {
        margin-left: 10px;
      }
    }
    & input {
      & + button {
        margin-left: 10px;
      }
    }
  }
  & + div {
    margin-top: 30px;
  }
`;
