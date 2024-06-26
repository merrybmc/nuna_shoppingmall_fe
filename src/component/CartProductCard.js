import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { currencyFormat } from '../utils/number';
import { useDeleteCartMutation, useUpdateCartQtyMutation } from '../api/hooks/CartApi';
import { useQueryClient } from '@tanstack/react-query';

const CartProductCard = ({ item }) => {
  console.log('pr', item);

  const queryClient = useQueryClient();
  const { mutate: deleteCartMutate } = useDeleteCartMutation();
  const { mutate: qtyUpdateMutate } = useUpdateCartQtyMutation();

  const handleQtyChange = (id, qty) => {
    qtyUpdateMutate(
      { path: `cart/${id}`, data: { qty } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['getcart']);
        },
        onError: () => {
          alert('수정 실패');
        },
      }
    );
  };

  const deleteCart = (id) => {
    console.log('id', id);
    deleteCartMutate(
      { path: `/cart/${id}` },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['getcart']);
        },
        onError: () => {
          alert('삭제 실패');
        },
      }
    );
  };

  return (
    <div className='product-card-cart'>
      <Row>
        <Col md={2} xs={12}>
          <img src={item.productId.images[0]} width={112} alt={item.productId._id} />
        </Col>
        <Col md={10} xs={12}>
          <div className='display-flex space-between'>
            <h3>{item.productId.name}</h3>
            <button className='trash-button'>
              <FontAwesomeIcon icon={faTrash} width={24} onClick={() => deleteCart(item._id)} />
            </button>
          </div>

          <div>
            <strong>₩ {currencyFormat(item.productId.price)}</strong>
          </div>
          <div>Size: {item.size.toUpperCase()}</div>
          <div>Total: ₩ {currencyFormat(item.productId.price * item.qty)}</div>
          <div>
            Quantity:
            <Form.Select
              onChange={(event) => handleQtyChange(item._id, event.target.value)}
              required
              defaultValue={item.qty}
              className='qty-dropdown'
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </Form.Select>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartProductCard;
