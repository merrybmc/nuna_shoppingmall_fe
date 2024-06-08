import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import * as S from './MenuTable.styled';
import { menuCategory } from '../../constant/menu';
import { currencyFormat } from './../../utils/number';
import { useGetProductsQuery } from '../../api/hooks/ProductApi';

export default function MenuTable() {
  const { menu, category } = useParams();
  const navigate = useNavigate();

  const [kind, setKind] = useState();

  useEffect(() => {
    if (menu === 'men' || menu === 'women' || menu === 'kids') {
      setKind({ kind: menu, category: category === 'all' ? '' : category });
    } else {
      setKind({ category: menu });
    }
  }, [menu]);

  useEffect(() => {
    if (category === 'all') {
      setKind({ kind: menu, category: '' });
    } else if (
      category === 'top' ||
      category === 'bottom' ||
      category === 'shoes' ||
      category === 'bag' ||
      category === 'accessory'
    ) {
      setKind({ kind: menu, category: category === 'all' ? '' : category });
    } else {
      setKind({ kind: menu, category });
    }
  }, [category]);

  const { data: productList } = useGetProductsQuery('/product', kind);

  return (
    <S.Container>
      <S.ShortcutBox>
        <S.ShortcutContent>홈</S.ShortcutContent>
        <p>{'>'}</p>
        <S.ShortcutContent>{menu.toUpperCase()}</S.ShortcutContent>
        <p>{'>'}</p>
        <S.ShortcutContent>{category.toUpperCase()}</S.ShortcutContent>
      </S.ShortcutBox>
      <S.CategoryTitle>{menu.toUpperCase()}</S.CategoryTitle>
      <S.CategoryBox>
        {menuCategory.map((item) => {
          return (
            <S.CategoryContent
              onClick={() => {
                navigate(`/product/${menu}/${item.toLowerCase()}`);
              }}
            >
              {item}
            </S.CategoryContent>
          );
        })}
      </S.CategoryBox>
      <S.ListContainer>
        <S.ProductCount>총 {productList?.data?.products?.length}개의 상품</S.ProductCount>
        <S.ProductWrapper>
          {productList?.data?.products?.map((product) => {
            return (
              <S.ProductBox
                key={product?._id}
                onClick={() => navigate(`/product/${product?._id}`, { state: { product } })}
              >
                <S.ProductImgBox>
                  <S.ProductImg src={product.images[0]} />
                </S.ProductImgBox>
                <S.ProductTitle>{product.name}</S.ProductTitle>
                <S.ProductDescription>{product.description}</S.ProductDescription>
                <S.Price>{currencyFormat(product.price)}원</S.Price>
              </S.ProductBox>
            );
          })}
        </S.ProductWrapper>
      </S.ListContainer>
    </S.Container>
  );
}
