import { IHttpClient } from '@entities/httpClient/IHttpClient';
import { IHttpResponse } from '@entities/httpClient/IHttpResponse';
import { IHttpError } from '@entities/httpClient/IHttpError';

import { AxiosError, AxiosInstance } from 'axios';
import { HttpStatusCode } from '../HttpStatusCode';
import User from '@entities/User';

export class AxiosHttpClientImpl<T> implements IHttpClient<T> {

  axiosInstance;

  constructor(instance: AxiosInstance) {
    this.axiosInstance = instance;
  }

  public async get(path: string, header?: any) {

    try {
      switch(path) {
        case '/fetchUser': {
          return await this.mockFetchUser(header);
        }

        default: {
          throw this.generateHttpError("Route doesn't exist.", HttpStatusCode.Not_Found);
        }
      }

    } catch (err: unknown) {
      const error = err as Error;
      throw this.generateHttpError(error.message, HttpStatusCode.Bad_Gateway);
    }
  }

  public async post(path: string, body: object, header?: any) {

    try {
      switch(path) {
        case '/createUser': {
          return await this.mockCreateUser(body as User);
        }
        case '/login': {
          return await this.mockLogin(body);
        }
        default: {
          throw this.generateHttpError("Route doesn't exist.", HttpStatusCode.Not_Found);
        }
      }

    } catch (err: unknown) {
      const error = err as Error;
      throw this.generateHttpError(error.message, HttpStatusCode.Bad_Gateway);
    }
  }

  private generateHttpError(message: string, httpStatusCode: HttpStatusCode): IHttpError {
    return {
      httpStatusCode: httpStatusCode,
      message: message
    };
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
        
        reject(Error('token is missing'));
      }, 1000);
    });
  }

}