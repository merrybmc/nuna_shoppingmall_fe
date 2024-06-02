import React, { useState } from 'react';
import * as S from './section.styled';
import Modal from '../../../utils/Modal';
import DeleteUserCheck from '../../Modal/DeleteUserCheck';
import { useValidPasswordMutation } from '../../../api/hooks/SignApi';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../../utils/store';

export default function DeleteUser() {
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const userInfo = useRecoilValue(userInfoAtom);

  const onOpenModal = (button) => {
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
  };

  const onChangeValue = (e) => {
    setPassword(e.target.value);
  };

  const { mutate: validPasswordMutate } = useValidPasswordMutation();

  const onPasswordValid = () => {
    if (userInfo.kind === 'email') {
      validPasswordMutate(
        { path: '/user/validpassword', data: { password } },
        {
          onSuccess: () => {
            onOpenModal();
            setError('');
          },
          onError: () => {
            setError('비밀번호가 일치하지 않습니다.');
          },
        }
      );
    } else {
      onOpenModal();
    }
  };

  if (userInfo)
    return (
      <S.Container>
        <S.Title>
          회원 탈퇴
          {userInfo.kind === 'email' && (
            <S.TitleDes>회원탈퇴를 진행하기 위해 본인 확인이 필요합니다.</S.TitleDes>
          )}
        </S.Title>
        <S.ContentWrapper style={{ alignItems: 'flex-start', paddingLeft: '150px' }}>
          {userInfo.kind === 'google' && (
            <p style={{ paddingLeft: '120px' }}>구글로 로그인한 계정입니다.</p>
          )}
          {userInfo.kind === 'kakao' && (
            <p style={{ paddingLeft: '120px' }}>카카오로 로그인한 계정입니다.</p>
          )}
          {userInfo.kind === 'github' && (
            <p style={{ paddingLeft: '120px' }}>깃허브로 로그인한 계정입니다.</p>
          )}
          {userInfo.kind === 'email' && (
            <div>
              <S.ContentBox>
                <S.SubTitle style={{ width: '90px' }}>비밀번호</S.SubTitle>
                <S.Input type='password' value={password} onChange={(e) => onChangeValue(e)} />
              </S.ContentBox>
              {error && <S.ErrorMsg style={{ paddingLeft: '110px' }}>{error}</S.ErrorMsg>}
            </div>
          )}
          <S.ChangeButton
            style={{ marginTop: '20px', marginLeft: '170px' }}
            onClick={onPasswordValid}
          >
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
