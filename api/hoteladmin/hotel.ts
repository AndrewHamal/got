import axiosInstance from '@/services/axios/clientfetch';

export const createHotel = async (data: object) =>
  await axiosInstance.post(`/hotel/store-update`, data)

export const updateHotel = async (data: object) =>
  await axiosInstance.put(`/hotel/store-update`, data)
