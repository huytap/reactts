import { LoginPayload } from "features/auth/authSlice";
import { User } from "models/user";
import axiosClient from "./axiosClient";

export const Urls = {
    LOGIN : 'auth/login',
    LOGOUT : 'auth/logout',
    REFRESH_TOKEN : 'auth/fresh',
    GET_LOGGED_USER_INFO: 'auth/user',
    LIST : 'users',
    ADD : 'users',
    EDIT: 'users/',
    DELETE: 'users/',
    SHOW: 'users/',

};
const authApi = {
    login(params: LoginPayload): Promise<User>{
        const url = '/auth/login';
        return axiosClient.post(url, params)
    }
}

export default authApi;