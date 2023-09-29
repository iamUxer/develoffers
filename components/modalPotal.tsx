import React, { ReactElement, useEffect, useState } from 'react';
import ReactDom, { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const ModalPotal = ({ children }: { children: ReactElement }) => {
  const [mounted, setMounted] = useState<boolean>(true);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === 'undefined') return <></>;

  return mounted ? (
    createPortal(
      <>
        <div>overay</div>
        <ModalWrapper>{children}</ModalWrapper>
      </>,
      document.querySelector('#modal-root') as HTMLDivElement
    )
  ) : (
    <></>
  );
};

export default ModalPotal;

const ModalWrapper = styled.div`
  background: #000;
`;
