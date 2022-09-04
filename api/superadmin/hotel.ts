import axiosInstance from '@/services/axios/clientfetch';

export const createHotelAdmin = async (data: object) =>
    await axiosInstance.post(`/admin/country/store`, data)
