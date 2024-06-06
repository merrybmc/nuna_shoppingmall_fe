import { useMutation, useQuery } from '@tanstack/react-query';
import { getAsync, postAsync } from '../api';

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
