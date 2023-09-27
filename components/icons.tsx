import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ProfileIcon = (props: IconType) => {
  const { size, color, disabled } = props;
  return (
    <IconCss size={size} color={color} disabled={disabled}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
          clipRule="evenodd"
        />
      </svg>
    </IconCss>
  );
};
export const LogoutIcon = (props: IconType) => {
  const { size, color, disabled } = props;
  return (
    <IconCss size={size} color={color} disabled={disabled}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </IconCss>
  );
};
export const HomeIcon = (props: IconType) => {
  const { size, color, disabled, ...rest } = props;
  return (
    <IconCss size={size} color={color} disabled={disabled}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
      </svg>
    </IconCss>
  );
};
export const LoadingIcon = (props: IconType) => {
  const { size, color, disabled, ...rest } = props;
  return (
    <IconCss size={size} color={color} disabled={disabled} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
          clipRule="evenodd"
        />
      </svg>
    </IconCss>
  );
};

interface IconType extends React.ClassAttributes<HTMLSpanElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | undefined;
  color?: string;
  disabled?: boolean;
  rotate?: 'rotate';
}

const IconCss = styled.span<IconType>`
  vertical-align: middle;
  & svg {
    height: ${(props) => {
      switch (props.size) {
        case 'xs':
          return '14px';
        case 'sm':
          return '24px';
        case 'md':
          return '36px';
        case 'lg':
          return '48px';
        default:
          return '24px';
      }
    }};
    color: ${(props) => {
      switch (props.color) {
        case 'primary':
          return theme.palette.primary;
        default:
          return theme.palette.default_color;
      }
    }};
    ${(props) =>
      props.rotate &&
      css`
        animation: rotate_image 0.8s linear infinite;
        /* transform-origin: 50% 50%; */
      `}
    @keyframes rotate_image {
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
