import { useMutation } from '@tanstack/react-query';
import { postAsync } from '../api';

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationKey: ['createorder'],
    mutationFn: ({ path, data }) => postAsync(path, data),
  });
};
