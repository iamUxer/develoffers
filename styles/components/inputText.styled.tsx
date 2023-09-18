import React, { forwardRef, Ref } from 'react';
import styled from '@emotion/styled';

export const InputTextStyled = forwardRef(
  (props: InputType, ref: Ref<HTMLInputElement>) => {
    const { name, placeholder, register, type } = props;

    return (
      <InputCss
        {...register}
        name={name}
        placeholder={placeholder}
        type={type}
      />
    );
  }
);

interface InputType {
  name?: string;
  type?: string | 'text';
  placeholder?: string;
  register?: any;
}

const InputCss = styled.input<InputType>`
  border-radius: 50px;
  border: none;
  font-size: 16px;
  padding: 10px 16px;
`;
