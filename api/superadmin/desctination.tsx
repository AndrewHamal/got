import axiosInstance from '@/services/axios/clientfetch';

export const createDestination = async (form: any) =>
  await axiosInstance.post(`/destination`, form)

export const updateDestination = async (id: number, form: any) =>
  await axiosInstance.patch(`/destination/${id}`, form)
