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
