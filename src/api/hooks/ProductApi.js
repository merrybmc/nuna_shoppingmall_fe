import { useMutation, useQuery } from '@tanstack/react-query';
import { DeleteAsync, getAsync, postAsync } from '../api';
import { putAsync } from './../api';

// 상품 생성
export const useProductCreateMutation = () => {
  return useMutation({
    mutationKey: ['productcreate'],
    mutationFn: ({ path, data }) => postAsync(path, data),
  });
};

// 상품 읽어오기
export const useGetProductsQuery = (path, params) => {
  return useQuery({
    queryKey: ['getproduct', params],
    queryFn: () => getAsync(path, params),
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// 상품 수정
export const useProductUpdateMutation = () => {
  return useMutation({
    mutationKey: ['productupdate'],
    mutationFn: ({ path, data }) => putAsync(path, data),
  });
};

// 상품 삭제
export const useProductDeleteMutation = () => {
  return useMutation({
    mutationKey: ['productdelete'],
    mutationFn: ({ path }) => DeleteAsync(path),
  });
};
