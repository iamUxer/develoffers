import React, { ReactElement, useContext, useEffect, useState } from 'react';
import ReactDom, { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { AppContext, PostingEditModalContext } from '@/pages/context';

const ModalPotal = ({ children }: { children: ReactElement }) => {
  const { isModal, setModal } = useContext(PostingEditModalContext);

  if (typeof window === 'undefined') return <></>;

  useEffect(() => {
    setModal(false);
    return () => setModal(false);
  }, []);

  const clickOveray = () => {
    setModal(false);
  };

  return isModal ? (
    createPortal(
      <>
        <ModalOveray onClick={clickOveray}>overay</ModalOveray>
        <ModalHeader></ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter></ModalFooter>
      </>,
      document.querySelector('#modal-root') as HTMLDivElement
    )
  ) : (
    <></>
  );
};

export default ModalPotal;

const ModalHeader = styled.div``;
const ModalOveray = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #00000050;
`;
const ModalBody = styled.div`
  position: fixed;
  top: 10%;
  width: 580px;
  padding: 50px;
  border-radius: 5px;
  background: #fff;
`;

const ModalFooter = styled.div``;
