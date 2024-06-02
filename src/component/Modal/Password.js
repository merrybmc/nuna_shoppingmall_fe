import React from 'react';
import * as S from './modal.styled';

export default function Password({ onClose }) {
  return (
    <S.Container>
      <S.Title>비밀번호 변경</S.Title>
      <S.ContentBox>
        <S.SubTitle>현재 비밀번호</S.SubTitle>
        <S.Input />
      </S.ContentBox>
      <S.ContentBox>
        <S.SubTitle>새 비밀번호</S.SubTitle>
        <S.Input />
      </S.ContentBox>
      <S.ContentBox>
        <S.SubTitle>새 비밀번호 확인</S.SubTitle>
        <S.Input />
      </S.ContentBox>
      <S.ButtonBox>
        <S.CheckButton>변경</S.CheckButton>
        <S.CancelButton onClick={onClose}>취소</S.CancelButton>
      </S.ButtonBox>
    </S.Container>
  );
}
