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
        margin-top: 20px;
      }
    }
    & button {
      position: absolute;
      right: 0;
      margin-left: 10px;
    }
    & img {
      margin-right: 10px;
      height: 38px;
      width: auto;
    }
  }
  & + div {
    margin-top: 30px;
  }
`;
