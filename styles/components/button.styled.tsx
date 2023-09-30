import React, { Ref, forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { theme } from '../theme';

export const ButtonStyled = forwardRef(
  (props: ButtonType, ref: Ref<HTMLButtonElement>) => {
    const {
      size = 'md',
      color,
      type,
      children,
      disabled,
      icon,
      ...rest
    } = props;
    return (
      <ButtonCss
        size={size}
        type={type}
        color={color}
        disabled={disabled}
        icon={icon}
        {...rest}
      >
        <>{children}</>
      </ButtonCss>
    );
  }
);

export type ButtonType = React.HTMLAttributes<HTMLButtonElement> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xlg';
  type?: 'button' | 'submit' | 'reset' | undefined;
  color?: string;
  children?: string | React.ReactElement;
  disabled?: boolean;
  htmlFor?: string;
  icon?: boolean;
  bordered?: boolean;
};

const ButtonCss = styled.button<ButtonType>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: none;
  font-size: 14px;
  padding: 10px 20px;
  background: ${(props) => {
    switch (props.color) {
      case 'primary':
        return theme.palette.bg_primary;
      default:
        return theme.palette.bright;
    }
  }};
  color: ${(props) => {
    switch (props.color) {
      case 'primary':
        return theme.palette.bright;
      case 'bright':
        return theme.palette.primary;
      default:
        return theme.palette.default_color;
    }
  }};
  border: 1px solid
    ${(props) => {
      switch (props.bordered && props.color) {
        case 'danger':
          return theme.palette.danger;
        default:
          return theme.palette.bright;
      }
    }};
  color: ${(props) => {
    switch (props.bordered && props.color) {
      case 'danger':
        return theme.palette.danger;
      /* default:
        return theme.palette.bright; */
    }
  }};

  &:active {
    ${theme.filter.action}
  }
  &:hover {
    ${theme.filter.hover}
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

  & > span {
    line-height: 0;
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

    ${(props) =>
    props.icon &&
    css`
      height: auto;
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
