import axiosInstance from '@/services/axios/clientfetch';

export const updateCountry = async (id: any, data: object) =>
  await axiosInstance.put(`/admin/country/${id}`, data)
