import React, { useState } from 'react';
import * as S from './modal.styled';
import { useDeleteUserMutation, useLogoutMutation } from '../../api/hooks/SignApi';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { userInfoAtom } from '../../utils/store';
export default function DeleteUserCheck({ onClose }) {
  const [error, setError] = useState('');
  const setUserInfo = useSetRecoilState(userInfoAtom);

  const { mutate: deleteUserMutate } = useDeleteUserMutation();
  const { mutate: logoutMutate } = useLogoutMutation();

  const navigate = useNavigate();

  const onDeleteUser = () => {
    deleteUserMutate(
      { path: '/user/deleteuser' },
      {
        onSuccess: () => {
          logoutMutate(
            { path: '/auth/logout' },
            {
              onSuccess: () => {
                navigate('/');
                setUserInfo(null);
              },
            }
          );
        },
        onError: () => {
          setError('회원 탈퇴 실패');
        },
      }
    );
  };

  return (
    <S.Container>
      <S.Title>회원 탈퇴</S.Title>
      <p style={{ textAlign: 'center' }}>
        정말로 회원 탈퇴를 진행 하시겠습니까?
        <S.ErrorMsg>관련된 모든 정보는 영구 삭제되며 복구 불가능합니다.</S.ErrorMsg>
      </p>
      {error && <S.ErrorMsg>error</S.ErrorMsg>}
      <S.ButtonBox>
        <S.CheckButton onClick={onDeleteUser}>탈퇴</S.CheckButton>
        <S.CancelButton onClick={onClose}>취소</S.CancelButton>
      </S.ButtonBox>
    </S.Container>
  );
}
