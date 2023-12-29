import { ResponseType, instance } from "./todolistAPI"
import { LoginValues } from "../components/login/Login"

export const loginAPI = {
    logIn(values: LoginValues) {
        return instance.post<ResponseType<{userId: number}>>('/auth/login', values)
    },
    logOut() {
        return instance.delete<ResponseType>('/auth/login')
    },
    getUserData() {
        return instance.get<ResponseType<UserDataType>>('/auth/me')
    }
}

export type UserDataType = {
    id: number
    email: string
    login: string
}