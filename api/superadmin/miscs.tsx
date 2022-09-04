import axiosInstance from '@/services/axios/clientfetch';

export const updateCountry = async (id: any, updatedName: any) =>
  await axiosInstance.post(`/admin/country/${id}/update`, { name: updatedName })

export const deleteCountry = async (id: any) =>
  await axiosInstance.post(`/admin/country/delete/${id}`)
