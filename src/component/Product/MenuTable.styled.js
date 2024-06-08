import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: proxima-nova;
`;

export const ShortcutBox = styled.div`
  display: flex;
  gap: 4px;
  padding-left: 30px;
`;

export const ShortcutContent = styled.p`
  font-size: 14px;
  color: rgb(67, 67, 67);

  cursor: pointer;
`;

export const CategoryTitle = styled.h2`
  padding-top: 60px;
  padding-bottom: 60px;
  font-size: 40px;
  text-align: center;
`;

export const CategoryBox = styled.div`
  width: 1326px;
  height: 63px;
  display: flex;
  justify-content: center;
  margin: 0 auto;

  cursor: pointer;
`;

export const CategoryContent = styled.div`
  width: 190px;
  height: 63px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-top: 2px solid rgb(85, 85, 85);
  border-bottom: 1px solid rgb(85, 85, 85);

  &:hover {
    background-color: #ebebeb;
  }
`;

export const ListContainer = styled.div`
  max-width: 1110px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const ProductCount = styled.p`
  font-size: 14px;
  padding-bottom: 48px;
  padding-top: 90px;
`;

export const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
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
