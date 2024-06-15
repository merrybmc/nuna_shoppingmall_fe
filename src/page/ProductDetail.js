import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { ColorRing } from 'react-loader-spinner';
import { currencyFormat } from '../utils/number';
import '../style/productDetail.style.css';
import { useGetUserInfoQuery } from '../api/hooks/SignApi';
import { useCartCreateMutation } from '../api/hooks/CartApi';
import { useQueryClient } from '@tanstack/react-query';

const ProductDetail = () => {
  const [size, setSize] = useState('');
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);

  const { data: userInfo } = useGetUserInfoQuery('/user');
  const { mutate: createCartMutate, isSuccess, error } = useCartCreateMutation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isSuccess) {
      alert('카트 추가 성공');
      queryClient.invalidateQueries(['getqty']);
    }
    if (error) {
      alert('이미 카트에 추가되어 있습니다.');
    }
  }, [isSuccess, error]);

  const {
    state: { product },
  } = useLocation();

  const navigate = useNavigate();

  const addItemToCart = () => {
    if (size === '') {
      setSizeError(true);
      return;
    }

    if (!userInfo) navigate('/login');

    const addProduct = { productId: product._id, size, qty: 1 };

    createCartMutate({ path: '/cart', data: addProduct });
  };

  return (
    <Container className='product-detail-card'>
      <Row>
        <Col sm={6}>
          <img src={product.images[0]} className='w-100' alt='image' />
        </Col>
        <Col className='product-info-area' sm={6}>
          <div className='product-info'>{product.name}</div>
          <div className='product-info'>₩ {product.price}</div>
          <div className='product-info'>{product.description}</div>

          <Dropdown
            className='drop-down size-drop-down'
            title={size}
            align='start'
            onSelect={(value) => {
              setSize(value);
              setSizeError(false);
            }}
          >
            <Dropdown.Toggle
              className='size-drop-down'
              variant={sizeError ? 'outline-danger' : 'outline-dark'}
              id='dropdown-basic'
              align='start'
            >
              {size === '' ? '사이즈 선택' : size.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu className='size-drop-down'>
              {Object.entries(product.stock).map(([key, value]) =>
                value > 0 ? (
                  <Dropdown.Item eventKey={key} key={key}>
                    {`${key.toUpperCase()} : ${value}`}
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item eventKey={key} key={key} disabled={true}>
                    {`${key.toUpperCase()} : ${value}`}
                  </Dropdown.Item>
                )
              )}
            </Dropdown.Menu>
          </Dropdown>
          <div className='warning-message'>{sizeError && '사이즈를 선택해주세요.'}</div>
          <Button variant='dark' className='add-button' onClick={addItemToCart}>
            추가
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
