import React, { useState } from 'react';
import * as S from './section.styled';
import Modal from '../../../utils/Modal';
import DeleteUserCheck from '../../Modal/DeleteUserCheck';

export default function DeleteUser() {
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onOpenModal = (button) => {
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
  };

  const onChangeValue = (e) => {
    setPassword(e.target.value);
  };

  return (
    <S.Container>
      <S.Title>
        회원 탈퇴 <S.TitleDes>회원탈퇴를 진행하기 위해 본인 확인이 필요합니다.</S.TitleDes>
      </S.Title>
      <S.ContentWrapper style={{ alignItems: 'flex-start', paddingLeft: '150px' }}>
        <S.ContentBox>
          <S.SubTitle style={{ width: '90px' }}>비밀번호</S.SubTitle>
          <S.Input type='password' value={password} onChange={(e) => onChangeValue(e)} />
        </S.ContentBox>
        {error && <S.ErrorMsg>{error}</S.ErrorMsg>}
        <S.ChangeButton style={{ marginTop: '20px', marginLeft: '170px' }} onClick={onOpenModal}>
          회원 탈퇴
        </S.ChangeButton>
      </S.ContentWrapper>
      {modal && (
        <Modal onClose={onClose}>
          <DeleteUserCheck onClose={onClose} />
        </Modal>
      )}
    </S.Container>
  );
}
