import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import '../style/register.style.css';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { useRegisterMutation, useRegisterQuery } from '../api/hooks/SignApi';
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    policy: false,
  });
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');
  const [policyError, setPolicyError] = useState(false);

  // react-query mutaion 함수 호출
  const { mutate: registerMutate, error } = useRegisterMutation();

  const register = (event) => {
    event.preventDefault();

    const { name, email, password, confirmPassword, policy } = formData;

    if (password !== confirmPassword) {
      return setPasswordError('비밀번호 중복확인이 일치하지 않습니다.');
    }

    if (!policy) {
      return setPolicyError(true);
    }

    setPasswordError('');
    setPolicyError(false);

    // react-query mutate 로직 처리
    registerMutate(
      { path: 'api/user', data: { name, email, password } },
      {
        onSuccess: () => {
          navigate('/login');
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const handleChange = (event) => {
    event.preventDefault();
    // 값을 읽어서 FormData에 넣어주기
    const { id, value, checked } = event.target;
    if (id === 'policy') setFormData({ ...formData, [id]: checked });
    else setFormData({ ...formData, [id]: value });
  };

  return (
    <Container className='register-area'>
      {error && (
        <div>
          <Alert variant='danger' className='error-message'>
            {error}
          </Alert>
        </div>
      )}
      <Form onSubmit={register}>
        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            id='email'
            placeholder='Enter email'
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            id='name'
            placeholder='Enter name'
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            id='password'
            placeholder='Password'
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            id='confirmPassword'
            placeholder='Confirm Password'
            onChange={handleChange}
            required
            isInvalid={passwordError}
          />
          <Form.Control.Feedback type='invalid'>{passwordError}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Check
            type='checkbox'
            label='이용약관에 동의합니다'
            id='policy'
            onChange={handleChange}
            isInvalid={policyError}
            checked={formData.policy}
          />
        </Form.Group>
        <Button variant='danger' type='submit'>
          회원가입
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
