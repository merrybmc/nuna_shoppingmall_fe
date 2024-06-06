import React from 'react';
import * as S from './SearchProductCard.styled';
import { currencyFormat } from '../utils/number';

export default function SearchProductCard({ searchData }) {
  console.log(searchData);
  return (
    <S.Container>
      <S.ProductContainer>
        <S.Title>
          '{searchData?.data?.keyword}'에 대한{' '}
          <S.TitleCount>{searchData?.data?.totalItemNum}</S.TitleCount>개의 검색결과가 있습니다.
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
          <S.ProductBox
            key={searchData?.data?.products[0]?._id}
            onClick={() => alert('coming soon')}
          >
            <S.ProductImgBox>
              <S.ProductImg src={searchData?.data?.products[0]?.images[0]} />
            </S.ProductImgBox>
            <S.ProductTitle>{searchData?.data?.products[0]?.name}</S.ProductTitle>
            <S.ProductDescription>
              {searchData?.data?.products[0]?.description}
            </S.ProductDescription>
            <S.Price>{currencyFormat(searchData?.data?.products[0]?.price)}원</S.Price>
          </S.ProductBox>
          <S.ProductBox
            key={searchData?.data?.products[0]?._id}
            onClick={() => alert('coming soon')}
          >
            <S.ProductImgBox>
              <S.ProductImg src={searchData?.data?.products[0]?.images[0]} />
            </S.ProductImgBox>
            <S.ProductTitle>{searchData?.data?.products[0]?.name}</S.ProductTitle>
            <S.ProductDescription>
              {searchData?.data?.products[0]?.description}
            </S.ProductDescription>
            <S.Price>{currencyFormat(searchData?.data?.products[0]?.price)}원</S.Price>
          </S.ProductBox>
          <S.ProductBox
            key={searchData?.data?.products[0]?._id}
            onClick={() => alert('coming soon')}
          >
            <S.ProductImgBox>
              <S.ProductImg src={searchData?.data?.products[0]?.images[0]} />
            </S.ProductImgBox>
            <S.ProductTitle>{searchData?.data?.products[0]?.name}</S.ProductTitle>
            <S.ProductDescription>
              {searchData?.data?.products[0]?.description}
            </S.ProductDescription>
            <S.Price>{currencyFormat(searchData?.data?.products[0]?.price)}원</S.Price>
          </S.ProductBox>
          <S.ProductBox
            key={searchData?.data?.products[0]?._id}
            onClick={() => alert('coming soon')}
          >
            <S.ProductImgBox>
              <S.ProductImg src={searchData?.data?.products[0]?.images[0]} />
            </S.ProductImgBox>
            <S.ProductTitle>{searchData?.data?.products[0]?.name}</S.ProductTitle>
            <S.ProductDescription>
              {searchData?.data?.products[0]?.description}
            </S.ProductDescription>
            <S.Price>{currencyFormat(searchData?.data?.products[0]?.price)}원</S.Price>
          </S.ProductBox>
          <S.ProductBox
            key={searchData?.data?.products[0]?._id}
            onClick={() => alert('coming soon')}
          >
            <S.ProductImgBox>
              <S.ProductImg src={searchData?.data?.products[0]?.images[0]} />
            </S.ProductImgBox>
            <S.ProductTitle>{searchData?.data?.products[0]?.name}</S.ProductTitle>
            <S.ProductDescription>
              {searchData?.data?.products[0]?.description}
            </S.ProductDescription>
            <S.Price>{currencyFormat(searchData?.data?.products[0]?.price)}원</S.Price>
          </S.ProductBox>
          <S.ProductBox
            key={searchData?.data?.products[0]?._id}
            onClick={() => alert('coming soon')}
          >
            <S.ProductImgBox>
              <S.ProductImg src={searchData?.data?.products[0]?.images[0]} />
            </S.ProductImgBox>
            <S.ProductTitle>{searchData?.data?.products[0]?.name}</S.ProductTitle>
            <S.ProductDescription>
              {searchData?.data?.products[0]?.description}
            </S.ProductDescription>
            <S.Price>{currencyFormat(searchData?.data?.products[0]?.price)}원</S.Price>
          </S.ProductBox>
          <S.ProductBox
            key={searchData?.data?.products[0]?._id}
            onClick={() => alert('coming soon')}
          >
            <S.ProductImgBox>
              <S.ProductImg src={searchData?.data?.products[0]?.images[0]} />
            </S.ProductImgBox>
            <S.ProductTitle>{searchData?.data?.products[0]?.name}</S.ProductTitle>
            <S.ProductDescription>
              {searchData?.data?.products[0]?.description}
            </S.ProductDescription>
            <S.Price>{currencyFormat(searchData?.data?.products[0]?.price)}원</S.Price>
          </S.ProductBox>
          <S.ProductBox
            key={searchData?.data?.products[0]?._id}
            onClick={() => alert('coming soon')}
          >
            <S.ProductImgBox>
              <S.ProductImg src={searchData?.data?.products[0]?.images[0]} />
            </S.ProductImgBox>
            <S.ProductTitle>{searchData?.data?.products[0]?.name}</S.ProductTitle>
            <S.ProductDescription>
              {searchData?.data?.products[0]?.description}
            </S.ProductDescription>
            <S.Price>{currencyFormat(searchData?.data?.products[0]?.price)}원</S.Price>
          </S.ProductBox>
          <S.ProductBox
            key={searchData?.data?.products[0]?._id}
            onClick={() => alert('coming soon')}
          >
            <S.ProductImgBox>
              <S.ProductImg src={searchData?.data?.products[0]?.images[0]} />
            </S.ProductImgBox>
            <S.ProductTitle>{searchData?.data?.products[0]?.name}</S.ProductTitle>
            <S.ProductDescription>
              {searchData?.data?.products[0]?.description}
            </S.ProductDescription>
            <S.Price>{currencyFormat(searchData?.data?.products[0]?.price)}원</S.Price>
          </S.ProductBox>
        </S.ProductWrapper>
        <S.MoreBtn onClick={() => alert('coming soon')}>더보기</S.MoreBtn>
        <S.Hr />
      </S.ProductContainer>
    </S.Container>
  );
}
