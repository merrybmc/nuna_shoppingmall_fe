import React from 'react';
import Tab from '../component/Mypage/Tab';
import Section from '../component/Mypage/Section';
import styled from 'styled-components';

export default function MyPage() {
  return (
    <Container>
      <Tab />
      <Section />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 60px;
`;
