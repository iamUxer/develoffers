import React, { forwardRef, Ref } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { theme } from '../theme';

export const ButtonStyled = forwardRef(
  (props: ButtonType, ref: Ref<HTMLInputElement>) => {
    const { size = 'md', color, type, children, disabled, ...rest } = props;
    console.log(props.children);
    return (
      <ButtonCss
        size={size}
        type={type}
        color={color}
        disabled={disabled}
        {...rest}
      >
        {children}
      </ButtonCss>
    );
  }
);

export interface ButtonType extends React.HTMLAttributes<HTMLButtonElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xlg';
  type?: 'button' | 'submit' | 'reset' | undefined;
  color?: string;
  children?: string | React.ReactElement;
  disabled?: boolean;
}

const ButtonCss = styled.button<ButtonType>`
  border-radius: 50px;
  border: none;
  font-size: 14px;
  padding: 10px 16px;
  background: ${(props) => {
    switch (props.color) {
      case 'primary':
        return theme.palette.primary;
      default:
        return theme.palette.default;
    }
  }};
  color: ${(props) => {
    switch (props.color) {
      case 'primary':
        return theme.palette.bright;
      default:
        return theme.palette.default_color;
    }
  }};

  &:active {
    opacity: 0.6;
  }
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    ${theme.palette.disabled_background}
    &:hover {
      cursor: default;
    }
    &:active {
      opacity: 1;
    }
  }

  // Size
  ${(props) =>
    props.size === 'sm' &&
    css`
      height: 28px;
      font-size: 12px;
      padding: 0 15px;
    `}
  ${(props) =>
    props.size === 'md' &&
    css`
      height: 38px;
    `}

  // Loading
  ${(props) =>
    props.color === 'loading' &&
    css`
      ${theme.palette.disabled_background}
    `}

    & span {
    & .anticon {
      margin-left: 6px;
    }
  }
`;
