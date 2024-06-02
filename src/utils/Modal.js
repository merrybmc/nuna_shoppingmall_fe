import React from 'react';
import styled from 'styled-components';

export default function Modal({ children, onClose }) {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  return (
    <Container onClick={handleClickOutside}>
      <div>{children}</div>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
`;
