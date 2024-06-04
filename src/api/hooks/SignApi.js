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
export const useLogoutMutation = () => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: ({ path }) => postAsync(path),
  });
};

// 회원 정보 조회
export const useGetUserInfoQuery = (path) => {
  return useQuery({
    queryKey: ['getUserInfo'],
    queryFn: () => getAsync(path),
    enabled: !!path,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// 이름 변경
export const useChangeNameMutation = () => {
  return useMutation({
    mutationKey: ['changename'],
    mutationFn: ({ path, data }) => postAsync(path, data),
  });
};

// 비밀번호 변경
export const useChangePasswordMutation = () => {
  return useMutation({
    mutationKey: ['changepassword'],
    mutationFn: ({ path, data }) => postAsync(path, data),
  });
};

// 비밀번호 검증
export const useValidPasswordMutation = () => {
  return useMutation({
    mutationKey: ['validpassword'],
    mutationFn: ({ path, data }) => postAsync(path, data),
  });
};

// 회원 탈퇴
export const useDeleteUserMutation = () => {
  return useMutation({
    mutationKey: ['deleteuser'],
    mutationFn: ({ path }) => postAsync(path),
  });
};
