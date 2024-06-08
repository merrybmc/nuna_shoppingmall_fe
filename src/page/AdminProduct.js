import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import SearchBox from '../component/SearchBox';
import NewItemDialog from '../component/NewItemDialog';
import ReactPaginate from 'react-paginate';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductTable from '../component/ProductTable';
import { useGetProductsQuery } from '../api/hooks/ProductApi';
import * as S from './AdminProduct.styled';

const AdminProduct = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    page: query.get('page') || 1,
    name: query.get('name') || '',
  }); //검색 조건들을 저장하는 객체

  const [mode, setMode] = useState('new');
  const tableHeader = ['#', 'Sku', 'Name', 'Price', 'Stock', 'Image', 'Status', ''];

  const { data: products, isLoading, error } = useGetProductsQuery('/product', searchQuery);

  useEffect(() => {
    const params = new URLSearchParams(searchQuery);
    setQuery(params);
  }, [searchQuery]);

  if (isLoading) {
    return (
      <S.ApiSpinner thickness='7px' speed='0.5s' emptyColor='cyan.200' color='blue.500' size='xl' />
    );
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  const deleteItem = (id) => {
    //아이템 삭제
  };

  const openEditForm = () => {
    setMode('edit');
    setShowDialog(true);
  };

  const handleClickNewItem = () => {
    setMode('new');
    setShowDialog(true);
  };

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  return (
    <div>
      <Container>
        <div className='mt-2'>
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder='제품 이름으로 검색'
            field='name'
          />
        </div>
        <Button className='mt-2 mb-2' onClick={handleClickNewItem}>
          Add New Item +
        </Button>

        <ProductTable
          header={tableHeader}
          products={products}
          deleteItem={deleteItem}
          openEditForm={openEditForm}
        />
        <S.ReactPaginateStyle
          nextLabel=' >'
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={products?.data?.totalPageNum} // 전체 페이지
          forcePage={searchQuery.page - 1} // 페이지 값 조정
          previousLabel='< '
          renderOnZeroPageCount={null}
        />
      </Container>
      <NewItemDialog mode={mode} showDialog={showDialog} setShowDialog={setShowDialog} />
    </div>
  );
};

export default AdminProduct;
