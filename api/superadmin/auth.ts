import axiosInstance from '@/services/axios/clientfetch';

export const superadminLogin = async (data: object) =>
    await axiosInstance.post(`/admin/login`, data)

export const logout = async () =>
    await axiosInstance.post(`/logout`)

export const registerUser = async (data: object) =>
    await axiosInstance.post(`/register`, data)

export const forgotPassword = async (data: object) =>
    await axiosInstance.post(`/forgot-password`, data)

export const resetPassword = async (data: object) =>
    await axiosInstance.post(`/reset-password`, data)

