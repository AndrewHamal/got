import axiosInstance from '@/services/axios/clientfetch';

export const createBlog = async (form: any) =>
  await axiosInstance.post(`/admin/blog`, form)

export const updateBlog = async (id: number, form: any) =>
  await axiosInstance.post(`/admin/blog/${id}`, form)

export const createBlogCategory = async (form: any) =>
  await axiosInstance.post(`/admin/blog/category`, form)