import api from './index';

// api 호출 함수 재사용

// GET
export const getAsync = async (path) => {
  try {
    const res = await api.get(`${path}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// POST
export const postAsync = async (path, data) => {
  console.log(path, data);
  const res = await api.post(`${path}`, data);
  return res.data;
};
