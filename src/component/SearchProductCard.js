import React from 'react';
import * as S from './SearchProductCard.styled';
import { currencyFormat } from '../utils/number';
import { useSearchParams } from 'react-router-dom';

export default function SearchProductCard({ searchData }) {
  const [query, setQuery] = useSearchParams();

  console.log('sarchquery', query.get('name'));

  return (
    <S.Container>
      <S.ProductContainer>
        <S.Title>
          '{query.get('name')}'에 대한{' '}
          {searchData ? (
            <>
              <S.TitleCount>{searchData?.data?.totalItemNum}</S.TitleCount>
              개의 검색결과가 있습니다.
            </>
          ) : (
            <d>검색 결과가 없습니다.</d>
          )}
        </S.Title>
        <S.ProductWrapper>
          {searchData?.data?.products?.map((product) => (
            <S.ProductBox key={product._id} onClick={() => alert('coming soon')}>
              <S.ProductImgBox>
                <S.ProductImg src={product.images[0]} />
              </S.ProductImgBox>
              <S.ProductTitle>{product.name}</S.ProductTitle>
              <S.ProductDescription>{product.description}</S.ProductDescription>
              <S.Price>{currencyFormat(searchData.price)}원</S.Price>
            </S.ProductBox>
          ))}
        </S.ProductWrapper>
        <S.MoreBtn onClick={() => alert('coming soon')}>더보기</S.MoreBtn>
        <S.Hr />
      </S.ProductContainer>
    </S.Container>
  );
}
