import React from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';

export default function Section() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
const Container = styled.div`
  width: 1000px;
  padding-left: 30px;
  padding-top: 6px;
`;
