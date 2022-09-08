import axiosClient from "@/services/axios/clientfetch"
import axios from "axios"

export const bookPackage = async (data: FormData) => await axiosClient.post('/user/booking', data)