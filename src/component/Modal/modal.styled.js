import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px 100px;
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
`;

export const Title = styled.h2`
  font-size: 30px;
  font-weight: 900;
  text-align: center;
`;

export const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const SubTitle = styled.h3`
  width: 130px;
  font-weight: 600;
`;

export const Input = styled.input`
  outline: none;
  padding: 3px;
  border: 1px solid #808080;
`;

export const Button = styled.button`
  border: 1px solid black;
  padding: 8px 20px;
`;

export const CheckButton = styled(Button)`
  background-color: black;
  color: white;
`;

export const CancelButton = styled(Button)`
  color: black;
`;

export const ErrorMsg = styled.p`
  color: red;
  text-align: center;
`;
