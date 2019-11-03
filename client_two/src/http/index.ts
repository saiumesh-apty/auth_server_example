import axios, { AxiosRequestConfig } from 'axios';
import { HTTP_URLS } from './urls';


axios.interceptors.request.use((config: AxiosRequestConfig) => {
    return { ...config, baseURL: HTTP_URLS.BASE };
}, (error: Error) => {
    return error;
})

/**
 * T is body type
 * R is response from http request
 */
export const postRequest = async <T, R>(url: string, body: T): Promise<R> => {
    return axios.post(url, body).then((resp) => resp.data);
}
