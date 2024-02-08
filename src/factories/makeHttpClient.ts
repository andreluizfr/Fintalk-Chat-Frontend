import { IHttpClient } from "@entities/httpClient/IHttpClient";
import { AxiosHttpClientImpl } from "@entities/httpClient/axios/httpClientImpl";
import { axiosInstance } from "@entities/httpClient/axios/AxiosInstance";

//Factory method pattern
export function makeHttpClient<T>(): IHttpClient<T> {

  const httpClient: IHttpClient<T> = new AxiosHttpClientImpl<T>(axiosInstance);

  return httpClient;
}