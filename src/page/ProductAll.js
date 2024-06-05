import React from 'react';
import ProductCard from '../component/ProductCard';
import { useSearchParams } from 'react-router-dom';

import * as S from './ProductAll.styled';

const ProductAll = () => {
  // 처음 로딩하면 상품리스트 불러오기

  return (
    <S.Container>
      <ProductCard />
    </S.Container>
  );
};

export default ProductAll;
