import styled from '@emotion/styled';

export const PostingStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  margin: auto;
  padding: 20px;
  & form {
    position: relative;
    width: 100%;
    & textarea {
      display: block;
      width: 100%;
      margin-bottom: 20px;
    }
    & button {
      position: absolute;
      right: 0;
      margin-left: 10px;
    }
  }
`;
