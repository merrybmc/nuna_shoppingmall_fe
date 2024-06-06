import styled from 'styled-components';

export const Container = styled.div``;

export const ProductContainer = styled.div`
  max-width: 1312px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* align-items: center; */
`;

export const MenuTitle = styled.h2`
  font-size: 18px;
  font-family: proxima-nova;
  font-weight: 600;
  padding-top: 40px;
  padding-bottom: 20px;
  align-self: flex-start;
  /* padding-left: 40px; */
  text-align: left;
`;

export const ProductWrapper = styled.div`
  display: flex;
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
