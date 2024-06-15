import React, { useEffect } from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { currencyFormat } from '../utils/number';

const badgeBg = {
  preparing: 'primary',
  shipping: 'warning',
  refund: 'danger',
  delivered: 'success',
};

const OrderStatusCard = ({ item }) => {
  useEffect(() => {
    console.log(item);
  }, [item]);

  return (
    <div>
      <Row className='status-card'>
        <Col xs={2}>
          <img
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
        <Col md={2} className='vertical-middle'>
          <div className='text-align-center text-12'>주문상태</div>
          <Badge bg={badgeBg[item.status]}>{item.status}</Badge>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;
