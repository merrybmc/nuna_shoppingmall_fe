import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../../utils/store';
import Modal from '../../../utils/Modal';
import Name from '../../Modal/Name';
import Password from '../../Modal/Password';
import * as S from './section.styled';
import { useGetUserInfoQuery } from '../../../api/hooks/SignApi';

export default function Info() {
  const { data: userInfo } = useGetUserInfoQuery('/user');

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

  return (
    <S.Container>
      <S.Title>개인정보 관리</S.Title>
      <S.ContentWrapper>
        <S.ContentBox>
          <S.SubTitle>이메일</S.SubTitle>
          <S.Content>
            {userInfo?.data.email.includes('kakao') ? '카카오 계정' : userInfo?.data.email}
          </S.Content>
        </S.ContentBox>
        <S.ContentHr />
        <S.ContentBox>
          <S.SubTitle>이름</S.SubTitle>
          <S.Content>{userInfo?.data.name}</S.Content>
          <S.ChangeButton onClick={() => onOpenModal('name')}>변경</S.ChangeButton>
        </S.ContentBox>
        <S.ContentHr />
        {userInfo?.data.kind === 'email' && (
          <div>
            <S.ContentBox>
              <S.SubTitle>비밀번호</S.SubTitle>
              <S.ChangeButton onClick={() => onOpenModal('password')}>변경</S.ChangeButton>
            </S.ContentBox>
            <S.ContentHr />
          </div>
        )}
      </S.ContentWrapper>
      {modal && (
        <Modal onClose={onClose}>
          {change === 'name' && <Name defaultName={userInfo?.data.name} onClose={onClose} />}
          {change === 'password' && <Password onClose={onClose} />}
        </Modal>
      )}
    </S.Container>
  );
}
