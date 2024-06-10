import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import OrderReceipt from '../component/OrderReceipt';
import PaymentForm from '../component/PaymentForm';
import '../style/paymentPage.style.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { cc_expires_format } from '../utils/number';
import { useGetCartQuery } from '../api/hooks/CartApi';
import { useCreateOrderMutation } from '../api/hooks/OrderApi';

const PaymentPage = () => {
  const [cardValue, setCardValue] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });
  const navigate = useNavigate();
  const [firstLoading, setFirstLoading] = useState(true);
  const [shipInfo, setShipInfo] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    address: '',
    city: '',
    zip: '',
  });

  const { data: items } = useGetCartQuery('/cart');

  const [totalPrice, setTotalPrice] = useState();

  const { mutate: createOrderMutate } = useCreateOrderMutation();

  useEffect(() => {
    if (items) {
      const total = items?.data?.items?.reduce(
        (total, item) => (total += item?.productId?.price * item?.qty),
        0
      );

      setTotalPrice(total);
    }
  }, [items]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, contact, address, city, zip } = shipInfo;
    console.log(items);
    const data = {
      totalPrice,
      shipTo: { address, city, zip },
      contact: { firstName, lastName, contact },
      orderList: items?.data?.items?.map((item) => {
        return {
          productId: item.productId._id,
          price: item.productId.price,
          qty: item.qty,
          size: item.size,
        };
      }),
    };
    createOrderMutate(
      { path: 'order', data },
      {
        onSuccess: (res) => {
          console.log('res', res);
          navigate('/payment/success', { state: { orderNum: res.data.orderNum } });
        },
        onError: () => {
          alert('생성 실패');
        },
      }
    );
  };

  const handleFormChange = (event) => {
    //shipInfo에 값 넣어주기
    const { name, value } = event.target;
    setShipInfo({ ...shipInfo, [name]: value });
  };

  const handlePaymentInfoChange = (event) => {
    const { name, value } = event.target;
    if (name === 'expiry') {
      let newValue = cc_expires_format(value);
      setCardValue({ ...cardValue, [name]: newValue });
      return;
    }
    setCardValue({ ...cardValue, [name]: value });
  };

  const handleInputFocus = (e) => {
    setCardValue({ ...cardValue, focus: e.target.name });
  };
  //카트에 아이템이 없다면 다시 카트페이지로 돌아가기 (결제할 아이템이 없으니 결제페이지로 가면 안됌)
  return (
    <Container>
      <Row>
        <Col lg={7}>
          <div>
            <h2 className='mb-2'>배송 주소</h2>
            <div>
              <Form onSubmit={handleSubmit}>
                <Row className='mb-3'>
                  <Form.Group as={Col} controlId='lastName'>
                    <Form.Label>성</Form.Label>
                    <Form.Control
                      type='text'
                      onChange={handleFormChange}
                      required
                      name='lastName'
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId='firstName'>
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                      type='text'
                      onChange={handleFormChange}
                      required
                      name='firstName'
                    />
                  </Form.Group>
                </Row>

                <Form.Group className='mb-3' controlId='formGridAddress1'>
                  <Form.Label>연락처</Form.Label>
                  <Form.Control
                    placeholder='010-xxx-xxxxx'
                    onChange={handleFormChange}
                    required
                    name='contact'
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formGridAddress2'>
                  <Form.Label>주소</Form.Label>
                  <Form.Control
                    placeholder='Apartment, studio, or floor'
                    onChange={handleFormChange}
                    required
                    name='address'
                  />
                </Form.Group>

                <Row className='mb-3'>
                  <Form.Group as={Col} controlId='formGridCity'>
                    <Form.Label>City</Form.Label>
                    <Form.Control onChange={handleFormChange} required name='city' />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridZip'>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control onChange={handleFormChange} required name='zip' />
                  </Form.Group>
                </Row>
                <div className='mobile-receipt-area'>
                  <OrderReceipt items={items} />
                </div>
                <div>
                  <h2 className='payment-title'>결제 정보</h2>
                  <PaymentForm
                    cardValue={cardValue}
                    handleInputFocus={handleInputFocus}
                    handlePaymentInfoChange={handlePaymentInfoChange}
                  />
                </div>

                <Button variant='dark' className='payment-button pay-button' type='submit'>
                  결제하기
                </Button>
              </Form>
            </div>
          </div>
        </Col>
        <Col lg={5} className='receipt-area'>
          <OrderReceipt items={items} />
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
