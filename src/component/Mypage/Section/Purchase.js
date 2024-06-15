import React from 'react';
import OrderStatusCard from '../../OrderStatusCard';
import { useGetOrderListQuery } from '../../../api/hooks/OrderApi';

export default function Purchase() {
  const { data: orderList } = useGetOrderListQuery('order/me');

  return (
    <div>
      {orderList?.data?.map((item) => (
        <OrderStatusCard item={item} className='status-card-container' key={item._id} />
      ))}
    </div>
  );
}
