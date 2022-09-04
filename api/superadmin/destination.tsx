import axiosInstance from '@/services/axios/clientfetch';

export const createDestination = async (form: any) =>
  await axiosInstance.post(`/admin/destination/store`, form)

export const updateDestination = async (id: number, form: any) =>
  await axiosInstance.patch(`/destination/${id}`, form)

export const uploadDestinationFiles = async (files: FormData) =>
  await axiosInstance.post(`/admin/destination/files`, files)