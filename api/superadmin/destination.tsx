import axiosInstance from '@/services/axios/clientfetch';

export const createDestination = async (form: any) =>
  await axiosInstance.post(`/admin/destination/store`, form)

export const updateDestination = async (id: number, form: any) =>
  await axiosInstance.post(`/admin/destination/${id}/update`, form)

export const deleteDestination = async (id: any) =>
  await axiosInstance.post(`/admin/destination/delete/${id}`)


export const uploadDestinationFiles = async (files: FormData) =>
  await axiosInstance.post(`/admin/destination/files`, files)

export const deleteDestinationFiles = async (fileId: FormData) =>
  await axiosInstance.post(`/admin/destination/files/delete/${fileId}`)