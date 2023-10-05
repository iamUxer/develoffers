import styled from '@emotion/styled';
import { theme } from '../theme';

export const ProfileUploaderStyled = styled.div`
  margin-bottom: 30px;
  & form {
    display: grid;
    grid-auto-columns: max-content;
    justify-content: center;
    gap: 10px;
    position: relative;
    & > button {
      position: absolute;
      top: 0;
      left: calc(50% + 15px);
      z-index: 1;
    }
  }
  & input[type='file'] {
    display: none;
  }
  & input[type='text'] {
    &:read-only {
      text-align: center;
      &:hover {
        cursor: default;
      }
      &:focus-visible {
        outline: none;
      }
      &::placeholder {
        font-weight: 600;
        color: ${theme.palette.primary};
      }
    }
  }

  & label {
    display: flex;
    margin: auto;
    width: 60px;
    height: 60px;
    &:hover {
      cursor: pointer !important;
    }
    &:read-only {
      &:hover {
        cursor: default !important;
      }
    }
    & span,
    & img {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      position: relative;
      width: 60px;
      height: 60px;
      object-fit: cover;
      overflow: hidden;
      border-radius: 100%;
      background: ${theme.palette.default};
      & svg {
        position: absolute;
        bottom: -4px;
        fill: ${theme.palette.bg_primary};
      }
    }
    & + div {
      display: flex;
      align-items: center;
      margin-left: 45px;
      &.isEdit {
        margin-left: 90px;
      }
      & input {
        & + button {
          margin-left: 5px;
          & + button {
            margin-left: 5px;
          }
        }
      }
    }
  }
`;
