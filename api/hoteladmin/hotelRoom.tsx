import axiosInstance from '@/services/axios/clientfetch';

export const createHotelRoom = async (data: object) =>
  await axiosInstance.post(`/hotel/store-room`, data)

