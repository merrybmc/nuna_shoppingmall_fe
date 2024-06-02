import React from 'react';
import * as S from './modal.styled';
export default function DeleteUserCheck({ onClose }) {
  return (
    <S.Container>
      <S.Title>회원 탈퇴</S.Title>
      <p style={{ textAlign: 'center' }}>
        정말로 회원 탈퇴를 진행 하시겠습니까?
        <S.ErrorMsg>관련된 모든 정보는 영구 삭제되며 복구 불가능합니다.</S.ErrorMsg>
      </p>

      <S.ButtonBox>
        <S.CheckButton>탈퇴</S.CheckButton>
        <S.CancelButton onClick={onClose}>취소</S.CancelButton>
      </S.ButtonBox>
    </S.Container>
  );
}
