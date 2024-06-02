import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

export default function Tab() {
  const [content, setContent] = useState('info');
  const navigate = useNavigate();

  const onNavigate = (path) => {
    setContent(path);
    navigate(`${path}`);
  };

  return (
    <Container>
      <Title>마이페이지</Title>
      <ContentWrapper>
        <ContentBox>
          <SubTitle>나의 정보</SubTitle>
          <Content content={content === 'info'} onClick={() => onNavigate('info')}>
            개인정보관리
          </Content>
          <Content content={content === 'delivery'} onClick={() => onNavigate('delivery')}>
            배송지 관리
          </Content>
          <Content content={content === 'deleteuser'} onClick={() => onNavigate('deleteuser')}>
            회원탈퇴
          </Content>
        </ContentBox>
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  color: #0d0d0d;
  font-weight: 900;
  font-size: 30px;
  padding-right: 60px;
  padding-bottom: 25px;
  border-bottom: 1px solid #0d0d0d;
`;

const ContentWrapper = styled.div`
  padding-top: 25px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;

const SubTitle = styled.h3`
  font-family: lato;
  color: #0d0d0d;
  font-size: 18px;
  font-weight: 600;
`;

const Content = styled.button`
  color: ${({ content }) => (content ? 'black' : '#808080')};
  border-bottom: ${({ content }) => (content ? '1px solid gray' : 'none')};
  /* color: #808080; */
  font-size: 15px;
`;
