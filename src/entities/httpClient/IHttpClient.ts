import { IHttpResponse } from "./IHttpResponse";

//Bridge pattern
export interface IHttpClient<T> {
  get(path: string, header?: object): Promise<IHttpResponse<T>>;
  post(path: string, body: object, header?: object): Promise<IHttpResponse<T>>;
}