import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1110px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-family: proxima-nova;
  font-weight: 600;
  font-size: 20px;
  padding-top: 20px;
  padding-bottom: 50px;
  align-self: flex-start;
  margin: auto;
`;

export const TitleCount = styled.span`
  color: #da1618;
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 40px;
  column-gap: 20px;
  /* column-gap: 40px; */
`;

export const ProductBox = styled.div`
  width: 262px;
  padding: 4px;

  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const ProductImgBox = styled.div`
  width: 254px;
  height: 254px;
  background-color: #f4f4f4;

  border-radius: 10px;
`;

export const ProductImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export const ProductTitle = styled.h3`
  font-family: proxima-nova;
  font-size: 13px;
  font-weight: 700;
  padding-top: 9px;
  padding-bottom: 2px;
  padding-left: 4px;
  padding-right: 4px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProductDescription = styled.p`
  height: 35px;
  font-family: proxima-nova;
  font-size: 13px;
  padding-left: 4px;
  padding-right: 4px;

  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Price = styled.p`
  font-family: proxima-nova;
  font-size: 14px;
  font-weight: 700;
  padding-top: 12px;
  padding-left: 4px;
  padding-right: 4px;
`;

export const Advertisement = styled.div`
  /* width: 100%;
  height: 480px;
  margin-top: 55px;
  background-color: blue; */
`;

export const Hr = styled.hr`
  width: 1200px;
  margin-top: 56px;
  /* border-color: #ebebeb; */
  border: 1px solid #ebebeb;
  /* border: 1px solid black; */
`;

export const MoreBtn = styled.button`
  width: fit-content;
  height: 42px;
  background-color: white;
  border: 1px solid #d3d3d3;
  border-radius: 12px;
  font-size: 14px;
  color: #5e6564;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;
`;
