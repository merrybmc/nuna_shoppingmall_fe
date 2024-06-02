import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfoAtom } from '../../../utils/store';
import Modal from '../../../utils/Modal';
import Name from '../../Modal/Name';
import Password from '../../Modal/Password';

export default function Info() {
  const userInfo = useRecoilValue(userInfoAtom);
  const [modal, setModal] = useState(false);
  const [change, setChange] = useState(null);

  const onOpenModal = (button) => {
    setModal(true);
    setChange(button);
  };

  const onClose = () => {
    setModal(false);
    setChange(null);
  };

  if (userInfo) {
    return (
      <Container>
        <Title>개인정보 관리</Title>
        <ContentWrapper>
          <ContentBox>
            <SubTitle>이메일</SubTitle>
            <Content> {userInfo.email.includes('kakao') ? '카카오 계정' : userInfo.email}</Content>
          </ContentBox>
          <ContentHr />
          <ContentBox>
            <SubTitle>이름</SubTitle>
            <Content>{userInfo.name}</Content>
            <ChangeButton onClick={() => onOpenModal('name')}>변경</ChangeButton>
          </ContentBox>
          <ContentHr />
          <ContentBox>
            <SubTitle>비밀번호</SubTitle>
            <ChangeButton onClick={() => onOpenModal('password')}>변경</ChangeButton>
          </ContentBox>
          <ContentHr />
        </ContentWrapper>
        {modal && (
          <Modal onClose={onClose}>
            {change === 'name' && <Name defaultName={userInfo.name} onClose={onClose} />}
            {change === 'password' && <Password onClose={onClose} />}
          </Modal>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 24px;
  padding-bottom: 25px;
  border-bottom: 1px solid #0d0d0d;
`;

const ContentWrapper = styled.div`
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ContentBox = styled.div`
  display: flex;
  padding-left: 40px;
  align-items: center;
`;

const SubTitle = styled.h3`
  width: 150px;
  font-weight: 600;
`;

const Content = styled.p`
  padding-right: 10px;
`;

const ContentHr = styled.hr`
  border-color: #e0e0e0;
  border-width: 2px;
`;

const ChangeButton = styled.button`
  border: 1px solid black;
  padding: 5px;

  &:hover {
    color: white;
    background-color: black;
  }
`;
