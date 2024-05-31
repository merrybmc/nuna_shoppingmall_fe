import { useMutation, useQuery } from '@tanstack/react-query';
import { getAsync, postAsync } from '../api';

// react-query api 호출

// 회원가입
export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: ({ path, data }) => postAsync(path, data),
  });
};

// 이메일 로그인
export const useEmailLoginMutation = () => {
  return useMutation({
    mutationKey: ['emailLogin'],
    mutationFn: ({ path, data }) => postAsync(path, data),
  });
};

// 구글 로그인
export const useGoogleLoginMutation = () => {
  return useMutation({
    mutationKey: ['googleLogin'],
    mutationFn: ({ path, data }) => postAsync(path, data),
  });
};

// 로그아웃
export const useLogoutQuery = (path) => {
  return useQuery({
    queryKey: ['logout'],
    queryFn: () => getAsync(path),
  });
};

// 회원 정보 조회
export const useGetUserInfoQuery = (path) => {
  return useQuery({
    queryKey: ['getUserInfo'],
    queryFn: () => getAsync(path),
    enabled: !!path,
  });
};
