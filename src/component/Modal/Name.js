import React, { useState } from 'react';
import * as S from './modal.styled';
import { useChangeNameMutation } from '../../api/hooks/SignApi';
import { useQueryClient } from '@tanstack/react-query';

export default function Name({ defaultName, onClose }) {
  const [name, setName] = useState(defaultName);
  const [error, setError] = useState(null);
  const onChangeValue = (e) => {
    setName(e.target.value);
  };

  const { mutate: changeNameMutate } = useChangeNameMutation();
  const queryClient = useQueryClient();

  const onChangeName = () => {
    if (defaultName === name) return setError('기존 이름과 변경할 이름이 동일합니다.');
    if (name.length > 8) return setError('이름은 8자 이상 입력 불가능합니다.');
    changeNameMutate(
      { path: '/user/changename', data: { name } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['getUserInfo']);
          onClose();
        },
        onError: () => {
          setError('이름 변경에 실패하였습니다.');
        },
      }
    );
  };

  return (
    <S.Container>
      <S.Title>이름 변경</S.Title>
      <S.ContentBox>
        <S.SubTitle>변경할 이름 :</S.SubTitle>
        <S.Input value={name} onChange={(e) => onChangeValue(e)} maxLength={8} />
      </S.ContentBox>
      {error && <S.ErrorMsg>{error}</S.ErrorMsg>}
      <S.ButtonBox>
        <S.CheckButton onClick={onChangeName}>변경</S.CheckButton>
        <S.CancelButton onClick={onClose}>취소</S.CancelButton>
      </S.ButtonBox>
    </S.Container>
  );
}
