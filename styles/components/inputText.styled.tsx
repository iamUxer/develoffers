import React, { forwardRef, Ref } from 'react';
import styled from '@emotion/styled';

export const InputTextStyled = forwardRef(
  (props: InputType, ref: Ref<HTMLInputElement>) => {
    const { name, placeholder, register, type, value } = props;

    return (
      <InputCss
        {...register}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    );
  }
);

interface InputType {
  name?: string;
  type?: string | 'text';
  placeholder?: string;
  register?: any;
  value?: string;
}

const InputCss = styled.input`
  border-radius: 50px;
  border: none;
  font-size: 16px;
  padding: 10px 16px;
`;
