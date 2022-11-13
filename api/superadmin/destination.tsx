import axiosInstance from '@/services/axios/clientfetch';

export const createDestination = async (form: any) =>
  await axiosInstance.post(`/admin/destination/store`, form)

export const createEssential = async (form: any) =>
  await axiosInstance.post(`/admin/essential`, form)

export const updateEssential = async (form: any, id: any) =>
  await axiosInstance.patch(`/admin/essential/${id}`, form)

export const deleteGear = async (id: any) =>
  await axiosInstance.delete(`/admin/essential/${id}`)

export const updateDestination = async (id: number, form: any) =>
  await axiosInstance.post(`/admin/destination/${id}/update`, form)

export const deleteDestination = async (id: any) =>
  await axiosInstance.post(`/admin/destination/delete/${id}`)

export const uploadDestinationFiles = async (files: FormData) =>
  await axiosInstance.post(`/admin/destination/files`, files)

export const deleteDestinationFiles = async (fileId: FormData) =>
  await axiosInstance.post(`/admin/destination/files/delete/${fileId}`)