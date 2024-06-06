import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './ProductCard.styled';
import { useGetProductsQuery } from '../api/hooks/ProductApi';
import { currencyFormat } from './../utils/number';

const ProductCard = ({ filter }) => {
  const { data } = useGetProductsQuery('/product', {
    kind: 'men,women,kids',
    category: 'top,bottom,shoes,bag,accessory',
  });
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (data) {
      const filterKey = `${filter}Data`;
      setFilterData(data.data[filterKey]);
    }
    console.log(data);
  }, [data]);

  console.log(filterData);

  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
  };
  return (
    <S.Container>
      <S.ProductContainer>
        <S.MenuTitle>{filter.toUpperCase()}</S.MenuTitle>
        <S.ProductWrapper>
          {filterData?.map((product) => (
            <S.ProductBox onClick={() => alert('coming soon')}>
              <S.ProductImgBox>
                <S.ProductImg src={product.images[0]} />
              </S.ProductImgBox>
              <S.ProductTitle>{product.name}</S.ProductTitle>
              <S.ProductDescription>{product.description}</S.ProductDescription>
              <S.Price>{currencyFormat(product.price)}원</S.Price>
            </S.ProductBox>
          ))}
        </S.ProductWrapper>
        <S.MoreBtn onClick={() => alert('coming soon')}>더보기</S.MoreBtn>
        <S.Hr />
      </S.ProductContainer>
    </S.Container>
  );
};

export default ProductCard;
