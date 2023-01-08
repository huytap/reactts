import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import siteConfig from "configs/siteConfig";
import {Urls} from "./authApi";
const axiosClient = axios.create({
    baseURL: siteConfig.apiUrl,
    headers: {
      "Content-type": "application/json",
      'Authorization': tokenInfo.token_type + ' ' + tokenInfo.access_token,
    },
    timeout: siteConfig.apiTimeout
})
axiosClient.interceptors.request.use(function (config: AxiosRequestConfig) {
    // Do something before request is sent
    checkTokenExpired;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosClient.interceptors.response.use(function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
export function* checkTokenExpired(request: any) {
    if (request.url === Urls.LOGIN) {
        return request;
    }

    //get cached token info
    const tokenInfo = getTokenInfo();
    if (tokenInfo === false) {
        clearToken();
        window.location = PageUrls.PAGE_ROOT;
        return request;
    }

    // check if expired
    if (tokenInfo) {
        const expiredAt = tokenInfo.expires_at;
        if ((parseInt(expiredAt) * 1000 - Date.now()) <= 60 * 5 * 1000) {
            let service = axios.create({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': tokenInfo.token_type + ' ' + tokenInfo.access_token
                },
                baseURL: siteConfig.apiRoot,
                timeout: siteConfig.apiTimeout,
            });
            let res = await service.request({
                method: 'GET',
                url: Urls.REFRESH_TOKEN + `?grant_type=refresh_token&refresh_token=REFESH_TOKEN`,
                responseType: 'json'
            });

            if (res.data.status && res.data.data.access_token !== undefined
                && res.data.data.access_token !== '' && Object.keys(res.data.data.access_token).length > 0) {
                const state = {
                    isLoggedIn: true,
                    tokenInfo: res.data.data,
                    message: res.data.message,
                };

                //set local
                localStorage.setItem('data', JSON.stringify(state));

                //override header of this request
                request.headers.Authorization = state.tokenInfo.token_type + ' ' + state.tokenInfo.access_token;
                return request;

            } else {
                clearToken();
                window.location = PageUrls.PAGE_ROOT;
            }
        } else {
            return request;
        }
    } else {
        return request;
    }
}
export default axiosClient;