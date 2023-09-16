import React, { forwardRef } from 'react';
import styled from '@emotion/styled';

export const InputTextStyled = forwardRef((props: InputType) => {
  const { name, placeholder, register } = props;

  console.log(register);

  return (
    <InputCss {...register} name={name} placeholder={placeholder} type="text" />
  );
});

interface InputType {
  name: string;
  type?: string;
  placeholder: string;
  register?: any;
}

const InputCss = styled.input`
  border-radius: 50px;
  border: none;
  font-size: 16px;
  padding: 10px 16px;
`;
