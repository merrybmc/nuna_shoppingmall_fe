import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: 24px;
  padding-bottom: 25px;
  border-bottom: 1px solid #0d0d0d;
`;

export const TitleDes = styled.span`
  padding-left: 20px;
  font-size: 16px;
`;

export const ContentWrapper = styled.div`
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ContentBox = styled.div`
  display: flex;
  padding-left: 40px;
  align-items: center;
`;

export const SubTitle = styled.h3`
  width: 150px;
  font-weight: 600;
`;

export const Content = styled.p`
  padding-right: 10px;
`;

export const ContentHr = styled.hr`
  border-color: #e0e0e0;
  border-width: 2px;
`;

export const ChangeButton = styled.button`
  border: 1px solid black;
  padding: 5px;

  &:hover {
    color: white;
    background-color: black;
  }
`;

export const Input = styled.input`
  outline: none;
  padding: 3px;
  border: 1px solid #808080;
`;

export const ErrorMsg = styled.p`
  color: red;
  text-align: center;
`;
