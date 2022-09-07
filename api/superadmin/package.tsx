import axiosInstance from '@/services/axios/clientfetch';

export const createPackage = async (form: any) =>
  await axiosInstance.post(`/admin/package/store`, form)

export const updatePackage = async (id: number, form: any) =>
  await axiosInstance.post(`/admin/package/${id}/update`, form)
  
export const view = async (id: number, form: any) =>
  await axiosInstance.post(`/admin/package/${id}`, form)

export const deletePackage = async (id: any) =>
  await axiosInstance.post(`/admin/package/delete/${id}`)
