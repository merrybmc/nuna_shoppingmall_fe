import React, { useEffect } from 'react';
import Tab from '../component/Mypage/Tab';
import Section from '../component/Mypage/Section';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useGetUserInfoQuery } from '../api/hooks/SignApi';

export default function MyPage() {
  const { data: userInfo } = useGetUserInfoQuery('/user');
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) navigate('/login');
  }, []);

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
