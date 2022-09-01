import axiosInstance from '@/services/axios/clientfetch';

export const createBlog = async (form: any) =>
  await axiosInstance.post(`/blog`, form)

export const updateBlog = async (id: number, form: any) =>
  await axiosInstance.post(`/blog/${id}`, form)
