import { ProfileUploaderType } from '@/components/profile-uploader';
import styled from '@emotion/styled';
import { theme } from '../theme';

export const ProfileUploaderStyled = styled.div<ProfileUploaderType>`
  & form {
    display: grid;
    grid-auto-columns: max-content;
    justify-content: center;
    gap: 10px;
  }
  & input {
    display: none;
  }
  & label {
    display: flex;
    margin: auto;
    width: 60px;
    height: 60px;
    &:hover {
      cursor: pointer;
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
  }
`;
