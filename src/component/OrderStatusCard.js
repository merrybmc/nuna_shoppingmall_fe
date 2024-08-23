import React, { useEffect } from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { currencyFormat } from '../utils/number';
import styled from 'styled-components';

const OrderStatusCard = ({ item }) => {
  useEffect(() => {
    console.log(item);
  }, [item]);

  return (
    <div>
      <Row className='status-card'>
        <Col xs={2}>
          <ProductImg
            j
            src={item.items[0]?.productId?.images[0]}
            alt={item.items[0]?.productId?.image}
            height={96}
          />
        </Col>
        <Col xs={8} className='order-info'>
          <div>
            <strong>주문번호: {item.orderNum}</strong>
          </div>

          <div className='text-12'>{item.createdAt.slice(0, 10)}</div>

          <div>
            {item.items[0].productId.name}
            {item.items.length > 1 && `외 ${item.items.length - 1}개`}
          </div>
          <div>₩ {currencyFormat(item.totalPrice)}</div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;

const ProductImg = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
`;
