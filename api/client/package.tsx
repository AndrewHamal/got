import axiosUser from "@/services/axios/axiosUser"

export const bookPackage = async (data: FormData) => await axiosUser.post('/user/booking', data)