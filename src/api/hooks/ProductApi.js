import { useMutation } from '@tanstack/react-query';
import { postAsync } from '../api';

export const useProductCreateMutation = () => {
  return useMutation({
    mutationKey: ['productcreate'],
    mutationFn: ({ path, data }) => postAsync(path, data),
  });
};
