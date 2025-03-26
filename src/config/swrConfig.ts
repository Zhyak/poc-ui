import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

export const baseURL = 'http://172.17.240.45:8081/poc/api';

const apiClient = axios.create({
    baseURL: 'http://172.17.240.45:8081/poc/api',
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'comma' }),
});

export const fetcher = <T>(
    url: string,
    params?: AxiosRequestConfig['params']
): Promise<T> =>
    apiClient
        .get<T>(url, { params })
        .then(response => response.data);

const swrConfig = { fetcher };

export default swrConfig;
