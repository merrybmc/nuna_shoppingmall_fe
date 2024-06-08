import React, { useEffect, useState } from 'react';
import * as S from './ProductCard.styled';
import { currencyFormat } from './../utils/number';
import { useNavigate } from 'react-router';

const ProductCard = ({ data, filter }) => {
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const filterKey = `${filter}Data`;
      setFilterData(data?.data[filterKey]);
    }
  }, [data]);

  const showProduct = (id, product) => {
    navigate(`/product/${id}`, { state: { product } });
  };
  return (
    <S.Container>
      <S.ProductContainer>
        <S.MenuTitle>{filter.toUpperCase()}</S.MenuTitle>
        <S.ProductWrapper>
          {filterData?.map((product) => (
            <S.ProductBox key={product._id} onClick={() => showProduct(product._id, product)}>
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
