import { useMutation, useQuery } from '@tanstack/react-query';
import { getAsync, postAsync } from '../api';

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationKey: ['createorder'],
    mutationFn: ({ path, data }) => postAsync(path, data),
  });
};

export const useGetOrderListQuery = (path) => {
  return useQuery({
    queryKey: ['getOrderList'],
    queryFn: () => getAsync(path),
  });
};
