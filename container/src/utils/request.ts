import axios from "axios";
import axiosCommon from "./axiosCommon";
import { AxiosResponse, AxiosRequestConfig } from "axios";


const handleSuccess = (response: AxiosResponse) => {
  return response;
};

const handleError = (error: any) => {
  return Promise.reject(error);
};

interface RequestParams {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options'; // Add other HTTP methods as needed
  body?: any;
  unauthrizedRedirect?:boolean;
  rest?:any;
}

export const request = async ({ url, method, body, unauthrizedRedirect = true, ...rest }: RequestParams) => {
  axiosCommon();
  // Interceptor response
  let service = axios.create({withCredentials: true});
  service.interceptors.response.use(handleSuccess, handleError);

  try {
    const response = await service[method](url, body as object);
    return response.data;
  } catch (err: any) {
    if (unauthrizedRedirect && err.response?.status === 401) {
      // window.location.href = `/auth/signin`;
    }
    return Promise.reject(err);
  }
};
