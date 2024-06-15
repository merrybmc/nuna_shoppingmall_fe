import React, { useEffect } from 'react';
import Tab from '../component/Mypage/Tab';
import Section from '../component/Mypage/Section';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useGetUserInfoQuery } from '../api/hooks/SignApi';
import { useGetOrderListQuery } from '../api/hooks/OrderApi';
import OrderStatusCard from '../component/OrderStatusCard';

export default function MyPage() {
  const { data: userInfo, isPending } = useGetUserInfoQuery('/user');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo && !isPending) navigate('/login');
  }, [userInfo, isPending]);

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
