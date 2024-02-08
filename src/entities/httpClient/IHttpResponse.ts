import { HttpStatusCode } from "./HttpStatusCode";

export interface IHttpResponse<T> {
  httpStatusCode: HttpStatusCode | null;
  message: string,
  data: T | null
}
