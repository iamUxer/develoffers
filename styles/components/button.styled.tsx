import React, { forwardRef, Ref } from 'react';
import styled from '@emotion/styled';
import { theme } from '../theme';

export const ButtonStyled = forwardRef(
  (props: ButtonType, ref: Ref<HTMLInputElement>) => {
    const { color, type, children } = props;

    return (
      <ButtonCss type={type} color={color}>
        {children}
      </ButtonCss>
    );
  }
);

interface ButtonType {
  size?: string | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  color?: string;
  children?: string;
}

const ButtonCss = styled.button`
  border-radius: 50px;
  border: none;
  font-size: 16px;
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
        return theme.palette.default;
      default:
        return theme.palette.primary;
    }
  }};
`;
