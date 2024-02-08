import { HttpStatusCode } from "./HttpStatusCode";

export interface IHttpError {
  httpStatusCode: HttpStatusCode | null;
  message: string;
}