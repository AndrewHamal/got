import axiosUser from "@/services/axios/axiosUser"

export const customize = async (data: FormData) => await axiosUser.post('/user/customize', data)