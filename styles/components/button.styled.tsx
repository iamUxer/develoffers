import React, { forwardRef, Ref } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { theme } from '../theme';

export const ButtonStyled = forwardRef(
  (props: ButtonType, ref: Ref<HTMLInputElement>) => {
    const { size, color, type, children, disabled, ...rest } = props;
    console.log(props.size);
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
  size?: 'sm';
  type?: 'button' | 'submit' | 'reset' | undefined;
  color?: string;
  children?: string;
  disabled?: boolean;
}

const ButtonCss = styled.button<ButtonType>`
  border-radius: 50px;
  border: none;
  font-size: 16px;
  padding: 10px 16px;
  background: ${(props) => {
    switch (props.color) {
      case 'primary':
        return theme.palette.primary;
    }
  }};
  color: ${(props) => {
    switch (props.color) {
      case 'primary':
        return theme.palette.default;
    }
  }};

  &:active {
    opacity: 0.6;
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

  // Loading
  ${(props) =>
    props.color === 'loading' &&
    css`
      ${theme.palette.disabled_background}
    `}
`;
