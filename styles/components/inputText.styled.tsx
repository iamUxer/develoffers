import React, { forwardRef, Ref } from 'react';
import styled from '@emotion/styled';
import { theme } from '../theme';

export const InputTextStyled = forwardRef(
  (props: InputType, ref: Ref<HTMLInputElement>) => {
    const { name, placeholder, register, type, readonly, loading, ...rest } =
      props;
    console.log(props);
    return (
      <>
        {type === 'file' && (
          <InputLabel htmlFor="file">
            {loading && <span>이미지 +1</span>}
            {!loading && <span>이미지 추가</span>}
          </InputLabel>
        )}
        {type === 'textarea' && (
          <TextAreaCss
            {...register}
            readOnly={readonly}
            placeholder={placeholder}
            {...rest}
            maxLength={180}
          />
        )}
        {type !== 'textarea' && (
          <InputCss
            {...register}
            name={name}
            placeholder={placeholder}
            type={type}
            {...rest}
          />
        )}
      </>
    );
  }
);

interface InputType {
  name?: string;
  type?: string | File;
  placeholder?: string;
  register?: any;
  id?: string;
  htmlFor?: string;
  accept?: string;
  resize?: boolean;
  readonly?: boolean;
  required?: boolean;
  rows?: number;
  cols?: number;
  loading?: boolean;
}

const InputLabel = styled.label`
  & span {
    margin-bottom: -1px;
  }
  display: inline-flex;
  align-items: center;
  padding: 0 16px;
  font-size: 15px;
  height: 38px;
  border: 1px solid ${theme.palette.bg_primary};
  border-radius: 50px;
  background: #fff;
  color: ${theme.palette.bg_primary};
  cursor: pointer;
  &:hover {
    ${theme.filter.hover}
  }
  &:active {
    ${theme.filter.action}
  }
`;

const InputCss = styled.input<InputType>`
  display: ${(prop) => prop.type === 'file' && 'none'};
  border-radius: 50px;
  border: none;
  font-size: 14px;
  padding: 10px 20px;
`;

const TextAreaCss = styled.textarea<InputType>`
  border-radius: 0px;
  resize: none;
  padding: 20px;
`;
