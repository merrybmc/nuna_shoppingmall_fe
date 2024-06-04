import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchBox from '../component/SearchBox';
import OrderDetailDialog from '../component/OrderDetailDialog';
import OrderTable from '../component/OrderTable';
import ReactPaginate from 'react-paginate';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../api/hooks/ProductApi';

const AdminOrderPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get('page') || 1,
    ordernum: query.get('ordernum') || '',
  });
  const [open, setOpen] = useState(false);
  const tableHeader = [
    '#',
    'Order#',
    'Order Date',
    'User',
    'Order Item',
    'Address',
    'Total Price',
    'Status',
  ];

  const { data: products } = useGetProductsQuery('/product');

  useEffect(() => {}, [query]);

  useEffect(() => {
    if (searchQuery.ordernum === '') {
      delete searchQuery.ordernum;
    }
    const params = new URLSearchParams(searchQuery);
    const queryString = params.toString();

    navigate('?' + queryString);
  }, [searchQuery]);

  const openEditForm = (order) => {
    setOpen(true);
  };

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='locate-center'>
      <Container>
        <div className='mt-2 display-center mb-2'>
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder='오더번호'
            field='ordernum'
          />
        </div>

        <OrderTable header={tableHeader} data={products} openEditForm={openEditForm} />
        <ReactPaginate
          nextLabel='next >'
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          // pageCount={totalPageNum}
          forcePage={searchQuery.page - 1}
          previousLabel='< previous'
          renderOnZeroPageCount={null}
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          breakLabel='...'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName='pagination'
          activeClassName='active'
          className='display-center list-style-none'
        />
      </Container>

      {open && <OrderDetailDialog open={open} handleClose={handleClose} />}
    </div>
  );
};

export default AdminOrderPage;
