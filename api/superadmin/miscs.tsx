import axiosInstance from '@/services/axios/clientfetch';

export const createCountry = async (data: object) =>
  await axiosInstance.post(`/admin/country/store`, data)

export const updateCountry = async (id: any, updatedName: any) =>
  await axiosInstance.post(`/admin/country/${id}/update`, { name: updatedName })

export const deleteCountry = async (id: any) =>
  await axiosInstance.post(`/admin/country/delete/${id}`)

export const createRegion = async (data: object) =>
  await axiosInstance.post(`/admin/region/store`, data)

export const updateRegion = async (id: any, form: any) =>
  await axiosInstance.post(`/admin/region/${id}/update`, form)

export const deleteRegion = async (id: any) =>
  await axiosInstance.post(`/admin/region/delete/${id}`)
