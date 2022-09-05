import axiosInstance from '@/services/axios/clientfetch';

export const createBlog = async (form: any) =>
  await axiosInstance.post(`/admin/blog`, form)

export const updateBlog = async (id: number, form: any) =>
  await axiosInstance.post(`/admin/blog/${id}`, form)

export const createBlogCategory = async (form: any) =>
  await axiosInstance.post(`/admin/blog/categories/store`, form)


export const updateBlogCategory = async (id: any, titleName: any) =>
  await axiosInstance.post(`/admin/blog/categories/${id}/update`, { title: titleName })

export const deleteBlogCategory = async (id: any) =>
  await axiosInstance.post(`/admin/blog/categories/delete/${id}`)