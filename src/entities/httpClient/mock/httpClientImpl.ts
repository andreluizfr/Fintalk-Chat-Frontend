import { IHttpClient } from '@entities/httpClient/IHttpClient';
import { IHttpResponse } from '@entities/httpClient/IHttpResponse';
import { IHttpError } from '@entities/httpClient/IHttpError';

import { HttpStatusCode } from '../HttpStatusCode';
import User from '@entities/User';

export class AxiosHttpClientImpl<T> implements IHttpClient<T> {

  public async get(path: string, header?: any) {

    switch(path) {
      case '/fetchUser': {
        return await this.mockFetchUser(header);
      }
      default: {
        throw {
          httpStatusCode: HttpStatusCode.Not_Found,
          message: "Route doesn't exist."
        } satisfies IHttpError;
      }
    }
  }

  public async post(path: string, body: object, _header?: any) {

    switch(path) {
      case '/createUser': {
        return await this.mockCreateUser(body as User);
      }
      case '/login': {
        return await this.mockLogin(body);
      }
      default: {
        throw {
          httpStatusCode: HttpStatusCode.Not_Found,
          message: "Route doesn't exist."
        } satisfies IHttpError;
      }
    }
  }

  private mockCreateUser(user: User): Promise<IHttpResponse<T>> {
    return new Promise<IHttpResponse<T>>(resolve => {
      setTimeout(() => {
        resolve({
          httpStatusCode: HttpStatusCode.Created,
          message: "User created.",
          data: user as T
        } satisfies IHttpResponse<T>);
      }, 1000);
    });
  }

  private mockLogin(_body: object) {
    return new Promise<IHttpResponse<T>>(resolve => {
      setTimeout(() => {
        resolve({
          httpStatusCode: HttpStatusCode.Ok,
          message: "Succesful login.",
          data: "mock-access-token" as T
        } satisfies IHttpResponse<T>);
      }, 1000);
    });
  }

  private mockFetchUser(header: any) {
    return new Promise<IHttpResponse<T>>((resolve, reject) => {
      setTimeout(() => {

        const authorization = header.authorization;

        if(authorization){
          const token = (authorization as string).split("Bearer ")[0];
          console.log("token received:", token);

          resolve({
            httpStatusCode: HttpStatusCode.Ok,
            message: "Succesful login.",
            data: {
              username: "usuario-teste",
              password: "senha-teste",
              email: "email@teste.com"
            } satisfies User as T
          } satisfies IHttpResponse<T>);
        }
        
        reject({
          httpStatusCode: HttpStatusCode.Bad_Request,
          message: "token is missing"
        } satisfies IHttpError);
      }, 1000);
    });
  }

}