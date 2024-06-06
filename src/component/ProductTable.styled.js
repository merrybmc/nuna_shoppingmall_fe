import styled from 'styled-components';

export const Container = styled.tbody`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: proxima-nova;
  padding-bottom: 30px;
`;
export const Wrapper = styled.tr`
  display: flex;
  align-items: center;
`;

export const Index = styled.th`
  width: 30px;
`;

export const Sku = styled.th`
  width: 100px;
`;

export const Name = styled.th`
  width: 400px;
`;

export const Price = styled.th`
  width: 100px;
`;

export const Stock = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageBox = styled.div`
  width: 330px;
  display: flex;
  gap: 5px;
`;

export const Image = styled.img`
  width: 125px;
  height: 135px;
`;

export const Status = styled.p`
  padding-left: 20px;
  padding-right: 20px;
`;
