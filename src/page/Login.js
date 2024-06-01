import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import '../style/login.style.css';
import { GoogleLogin } from '@react-oauth/google';
import { useEmailLoginMutation, useGoogleLoginMutation } from '../api/hooks/SignApi';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../utils/store';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const queryClient = useQueryClient();

  const userInfo = useRecoilValue(userInfoAtom);

  // 팝업 창 크기
  const popupWidth = 600;
  const popupHeight = 800;

  // 화면 너비
  const screenWidth = window.screen.width;

  // 화면 높이
  const screenHeight = window.screen.height;

  // 중앙 위치 계산
  const left = screenWidth / 2 - popupWidth / 2;
  const top = screenHeight / 2 - popupHeight / 2;

  // 이메일 로그인 mutation
  const { mutate: emailLoginMutate } = useEmailLoginMutation();

  // 구글 로그인 mutation
  const { mutate: googleLoginMutate } = useGoogleLoginMutation();

  // 이메일 로그인
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
          setError(error.error);
        },
      }
    );
  };

  // 구글로 로그인 하기
  const handleGoogleLogin = async (googleData) => {
    const token = { token: googleData.credential };
    googleLoginMutate(
      { path: '/auth/googlelogin', data: token },
      {
        onSuccess: () => {
          navigate('/');
          queryClient.invalidateQueries(['getUserInfo']);
        },
        onError: (error) => {
          setError(error.message);
        },
      }
    );
  };

  if (userInfo) {
    navigate('/');
  }

  // 카카오 로그인
  const kakaologin = () => {
    const REACT_APP_KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
    const REACT_APP_REDIRECT_KAKAO_CALLBACK = process.env.REACT_APP_REDIRECT_KAKAO_CALLBACK;
    window.open(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REACT_APP_KAKAO_API_KEY}&redirect_uri=${REACT_APP_REDIRECT_KAKAO_CALLBACK}`,
      'kakao-login',
      `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`
    );
  };

  // 콜백 navigate 리턴
  useEffect(() => {
    const handleKakaoLoginSuccess = (event) => {
      if (event.data.type === 'loginSuccess') {
        navigate('/');
        queryClient.invalidateQueries(['getUserInfo']);
      }
    };

    window.addEventListener('message', handleKakaoLoginSuccess);

    return () => {
      window.removeEventListener('message', handleKakaoLoginSuccess);
    };
  }, [navigate]);

  return (
    <>
      <Container className='login-area'>
        {error && (
          <div className='error-message'>
            <Alert variant='danger'>{error}</Alert>
          </div>
        )}
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
              <button onClick={kakaologin}>카카오 로그인</button>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;
