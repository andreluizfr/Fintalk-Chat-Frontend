import { IHttpClient } from "@entities/httpClient/IHttpClient";
import { AxiosHttpClientImpl } from "@entities/httpClient/mock/httpClientImpl";

//Factory method pattern
export function makeHttpClient<T>(): IHttpClient<T> {

  const httpClient: IHttpClient<T> = new AxiosHttpClientImpl<T>();

  return httpClient;
}