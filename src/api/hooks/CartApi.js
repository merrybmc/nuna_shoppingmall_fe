import { useMutation, useQuery } from '@tanstack/react-query';
import { DeleteAsync, getAsync, postAsync, putAsync } from '../api';

// 카트 추가하기
export const useCartCreateMutation = () => {
  return useMutation({
    mutationKey: ['cartcreate'],
    mutationFn: ({ path, data }) => postAsync(path, data),
  });
};

// 카트 조회하기
export const useGetCartQuery = (path) => {
  return useQuery({
    queryKey: ['getcart'],
    queryFn: () => getAsync(path),
  });
};

// 카트 삭제하기
export const useDeleteCartMutation = () => {
  return useMutation({
    mutationKey: ['cartdelete'],
    mutationFn: ({ path }) => DeleteAsync(path),
  });
};

// 카트 개수 수정하기
export const useUpdateCartQtyMutation = () => {
  return useMutation({
    mutationKey: ['updatecartqty'],
    mutationFn: ({ path, data }) => putAsync(path, data),
  });
};
