import React, { Ref, forwardRef } from 'react';
import styled from '@emotion/styled';
import { theme } from '../theme';

export const InputTextStyled = forwardRef(
  (props: InputType, ref: Ref<HTMLInputElement>) => {
    const {
      name,
      placeholder,
      register,
      type,
      readonly,
      loading,
      already,
      ...rest
    } = props;
    // console.log(props);
    return (
      <>
        {type === 'file' && (
          <InputLabel htmlFor={name}>
            {already && <span>다른 사진 추가</span>}
            {!already && <span>사진 추가</span>}
          </InputLabel>
        )}
        {type === 'textarea' && (
          <TextAreaCss
            {...register}
            readOnly={readonly}
            placeholder={placeholder}
            {...rest}
            maxLength={1000}
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

const InputLabel = styled.label`
  & span {
    /* margin-bottom: -1px; */
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
  border-radius: 10px;
  border: none;
  resize: none;
  padding: 20px;
`;

type InputType = {
  name?: string;
  type?: string | FileList;
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
  already?: boolean;
};
