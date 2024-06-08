import React, { useEffect, useState } from 'react';
import ProductCard from '../component/ProductCard';
import { useHref, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import * as S from './ProductAll.styled';
import { useGetProductsQuery } from '../api/hooks/ProductApi';
import SearchProductCard from '../component/SearchProductCard';

const FILTER_DATA = ['men', 'women', 'kids', 'top', 'bottom', 'shoes', 'bag', 'accessory'];

const ProductAll = () => {
  const location = useLocation();
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    query.size !== 0
      ? {
          name: query.get('name'),
        }
      : {}
  );

  const { data } = useGetProductsQuery(
    '/product',
    query.size === 0 || (query.size === 1 && searchQuery.name === '')
      ? {
          kind: 'men,women,kids',
          category: 'top,bottom,shoes,bag,accessory',
        }
      : searchQuery
  );

  useEffect(() => {
    const params = Object.fromEntries([...query.entries()]);
    setSearchQuery(params);
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(searchQuery);
    setQuery(params);
  }, [searchQuery]);

  return (
    <S.Container>
      {query.size === 0 || (query.size === 1 && searchQuery.name === '') ? (
        <div>
          {FILTER_DATA.map((filter) => (
            <ProductCard data={data} filter={filter} key={filter} />
          ))}
        </div>
      ) : (
        <SearchProductCard searchData={data} />
      )}
    </S.Container>
  );
};

export default ProductAll;
