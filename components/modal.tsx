import { ReactElement } from 'react';
import ModalPotal from './modalPotal';
import styled from '@emotion/styled';

const Modal = ({ children }: { children: ReactElement }) => {
  return (
    <ModalPotal>
      <ModalStyled>{children}</ModalStyled>
    </ModalPotal>
  );
};

export default Modal;

const ModalStyled = styled.div`
  background: #000;
`;
