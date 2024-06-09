import React from 'react';
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CartProductCard from '../component/CartProductCard';
import OrderReceipt from '../component/OrderReceipt';
import '../style/cart.style.css';
import { useGetCartQuery } from '../api/hooks/CartApi';

const CartPage = () => {
  const { data: items } = useGetCartQuery('/cart');

  return (
    <Container>
      <Row>
        <Col xs={12} md={7}>
          {items?.data?.items?.length > 0 ? (
            items?.data?.items?.map((item) => <CartProductCard item={item} key={item._id} />)
          ) : (
            <div className='text-align-center empty-bag'>
              <h2>카트가 비어있습니다.</h2>
              <div>상품을 담아주세요!</div>
            </div>
          )}
        </Col>
        <Col xs={12} md={5}>
          <OrderReceipt items={items} />
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
