import axiosInstance from '@/services/axios/clientfetch';

export const superadminLogin = async (data: object) =>
    await axiosInstance.post(`/admin/login`, data)

export const logout = async () =>
    await axiosInstance.post(`/logout`)

export const updateProfile = async (data: any) =>
    await axiosInstance.post(`/admin/profile/store`, data)

