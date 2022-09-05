import axiosInstance from '@/services/axios/clientfetch';

export const createItinerary = async (form: any) =>
  await axiosInstance.post(`/admin/itinarery/store`, form)

export const updateItinerary = async (id: number, form: any) =>
  await axiosInstance.post(`/admin/itinarery/${id}/update`, form)

export const deleteItinerary = async (id: any) =>
  await axiosInstance.post(`/admin/itinarery/delete/${id}`)
