import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import '../style/login.style.css';
import { GoogleLogin } from '@react-oauth/google';
import { useEmailLoginMutation, useGoogleLoginMutation } from '../api/hooks/SignApi';
import { useQueryClient } from '@tanstack/react-query';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const queryClient = useQueryClient();

  // 이메일 로그인 mutation
  const { mutate: emailLoginMutate } = useEmailLoginMutation();

  // 구글 로그인 mutation
  const { mutate: googleLoginMutate } = useGoogleLoginMutation();

  const loginWithEmail = (event) => {
    event.preventDefault();

    emailLoginMutate(
      { path: '/auth/emaillogin', data: { email, password } },
      {
        onSuccess: () => {
          navigate('/');
          queryClient.invalidateQueries(['getUserInfo']);
        },
        onError: (error) => {
          alert(error.error);
        },
      }
    );
  };

  const handleGoogleLogin = async (googleData) => {
    // 구글로 로그인 하기

    const token = { token: googleData.credential };
    googleLoginMutate(
      { path: '/auth/googlelogin', data: token },
      {
        onSuccess: () => {
          navigate('/');
          queryClient.invalidateQueries(['getUserInfo']);
        },
        onError: (error) => {
          alert('구글 로그인 실패');
        },
      }
    );
  };

  // if (user) {
  //   navigate("/");
  // }
  return (
    <>
      <Container className='login-area'>
        {/* {error && (
          <div className='error-message'>
            <Alert variant='danger'>{error}</Alert>
          </div>
        )} */}
        <Form className='login-form' onSubmit={loginWithEmail}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <div className='display-space-between login-button-area'>
            <Button variant='danger' type='submit'>
              Login
            </Button>
            <div>
              아직 계정이 없으세요?<Link to='/register'>회원가입 하기</Link>{' '}
            </div>
          </div>

          <div className='text-align-center mt-2'>
            <p>-외부 계정으로 로그인하기-</p>
            <div className='display-center'>
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log('Login Faild');
                }}
              />
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;
