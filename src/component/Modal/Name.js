import React from 'react';
import * as S from './modal.styled';

export default function Name({ onClose }) {
  return (
    <S.Container>
      <S.Title>이름 변경</S.Title>
      <S.ContentBox>
        <S.SubTitle>변경할 이름 :</S.SubTitle>
        <S.Input />
      </S.ContentBox>
      <S.ButtonBox>
        <S.CheckButton>변경</S.CheckButton>
        <S.CancelButton onClick={onClose}>취소</S.CancelButton>
      </S.ButtonBox>
    </S.Container>
  );
}
