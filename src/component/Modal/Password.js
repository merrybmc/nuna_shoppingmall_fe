import React, { useState } from 'react';
import * as S from './modal.styled';
import { useChangePasswordMutation } from '../../api/hooks/SignApi';

export default function Password({ onClose }) {
  const { mutate: changePasswordMutate } = useChangePasswordMutation();

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkNewPassword, setCheckNewPassword] = useState('');
  const [error, setError] = useState('');

  const onChangePasswordValue = (e) => {
    const { id, value } = e.target;
    id === 'password' && setPassword(value);
    id === 'newPassword' && setNewPassword(value);
    id === 'checkNewPassword' && setCheckNewPassword(value);
  };

  const onChangePassword = () => {
    if (newPassword !== checkNewPassword) return setError('비밀번호 확인이 일치하지 않습니다.');

    changePasswordMutate(
      {
        path: '/user/changepassword',
        data: { password, newPassword, checkNewPassword },
      },
      {
        onSuccess: () => {
          onClose();
        },
        onError: ({ error }) => {
          setError(error);
        },
      }
    );
  };

  return (
    <S.Container>
      <S.Title>비밀번호 변경</S.Title>
      <S.ContentBox>
        <S.SubTitle>현재 비밀번호</S.SubTitle>
        <S.Input
          type='password'
          value={password}
          id='password'
          onChange={(e) => onChangePasswordValue(e)}
        />
      </S.ContentBox>
      <S.ContentBox>
        <S.SubTitle>새 비밀번호</S.SubTitle>
        <S.Input
          type='password'
          value={newPassword}
          id='newPassword'
          onChange={(e) => onChangePasswordValue(e)}
        />
      </S.ContentBox>
      <S.ContentBox>
        <S.SubTitle>새 비밀번호 확인</S.SubTitle>
        <S.Input
          type='password'
          value={checkNewPassword}
          id='checkNewPassword'
          onChange={(e) => onChangePasswordValue(e)}
        />
      </S.ContentBox>
      {error && <S.ErrorMsg>{error}</S.ErrorMsg>}
      <S.ButtonBox>
        <S.CheckButton onClick={onChangePassword}>변경</S.CheckButton>
        <S.CancelButton onClick={onClose}>취소</S.CancelButton>
      </S.ButtonBox>
    </S.Container>
  );
}
