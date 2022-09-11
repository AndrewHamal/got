import axiosUser from "@/services/axios/axiosUser"

export const contact = async (data: FormData) => await axiosUser.post('/user/contact', data)