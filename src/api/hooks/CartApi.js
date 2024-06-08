import { useMutation } from '@tanstack/react-query';
import { postAsync } from '../api';

// 카트 추가하기
export const useCartCreateMutation = () => {
  return useMutation({
    mutationKey: ['cartcreate'],
    mutationFn: ({ path, data }) => postAsync(path, data),
  });
};
