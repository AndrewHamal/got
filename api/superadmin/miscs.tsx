import axiosInstance from '@/services/axios/clientfetch';

// country 

export const createCountry = async (data: object) =>
  await axiosInstance.post(`/admin/country/store`, data)

export const updateCountry = async (id: any, updatedName: any) =>
  await axiosInstance.post(`/admin/country/${id}/update`, { name: updatedName })

export const deleteCountry = async (id: any) =>
  await axiosInstance.post(`/admin/country/delete/${id}`)

// region

export const createRegion = async (data: object) =>
  await axiosInstance.post(`/admin/region/store`, data)

export const updateRegion = async (id: any, form: any) =>
  await axiosInstance.post(`/admin/region/${id}/update`, form)

export const deleteRegion = async (id: any) =>
  await axiosInstance.post(`/admin/region/delete/${id}`)

// team

export const createTeammember = async (data: object) =>
  await axiosInstance.post(`/admin/team/store`, data)

export const updateTeammember = async (id: any, data: object) =>
  await axiosInstance.post(`/admin/team/${id}/update`, data)

export const deleteTeammember = async (id: any) =>
  await axiosInstance.post(`/admin/team/delete/${id}`)

// partner

export const createPartner = async (data: object) =>
  await axiosInstance.post(`/admin/partner/store`, data)

export const updatePartner = async (id: any, data: object) =>
  await axiosInstance.post(`/admin/partner/${id}/update`, data)

export const deletePartner = async (id: any) =>
  await axiosInstance.post(`/admin/partner/delete/${id}`)

// video trailer

export const createOrUpdateVideoTrailer = async (data: object) =>
  await axiosInstance.post(`/admin/video-trailer/store`, data)

// video listing

export const createVideoListing = async (data: object) =>
  await axiosInstance.post(`/admin/video/store`, data)

export const updateVideoListing = async (id: any, data: object) =>
  await axiosInstance.post(`/admin/video/${id}/update`, data)

export const deleteVideoListing = async (data: object) =>
  await axiosInstance.post(`/admin/video/store`, data)