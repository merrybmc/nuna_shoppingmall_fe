import React from 'react';
import ProductCard from '../component/ProductCard';
import { useSearchParams } from 'react-router-dom';
import * as S from './ProductAll.styled';

const FILTER_DATA = ['men', 'women', 'kids', 'top', 'bottom', 'shoes', 'bag', 'accessory'];

const ProductAll = () => {
  // 처음 로딩하면 상품리스트 불러오기

  return (
    <S.Container>
      {FILTER_DATA.map((filter) => (
        <ProductCard filter={filter} />
      ))}
    </S.Container>
  );
};

export default ProductAll;
