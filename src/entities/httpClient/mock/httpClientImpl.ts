import { IHttpClient } from '@entities/httpClient/IHttpClient';
import { IHttpResponse } from '@entities/httpClient/IHttpResponse';
import { IHttpError } from '@entities/httpClient/IHttpError';

import { HttpStatusCode } from '../HttpStatusCode';
import User from '@entities/User';
import Message from '@entities/Message';

import { v4 as uuidv4 } from 'uuid';
import { loremIpsumGenerator } from '@utils/loremIpsumGenerator';

export class AxiosHttpClientImpl<T> implements IHttpClient<T> {

  public async get(path: string, params?: any) {

    switch(true) {
      case /^\/fetchUser/.test(path): {
        return await this.mockFetchUser(params.headers);
      }
      case /^\/message/.test(path): {
        const searchParams = new URLSearchParams(path.split("?")[1]);
        return await this.mockMessage(params.headers, searchParams.get("chatId"), searchParams.get("membersQuantity"));
      }
      default: {
        throw {
          httpStatusCode: HttpStatusCode.Not_Found,
          message: "Route doesn't exist."
        } satisfies IHttpError;
      }
    }
  }

  public async post(path: string, body: object, _params?: any) {

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

  private mockLogin(body: object) {
    return new Promise<IHttpResponse<T>>(resolve => {
      setTimeout(() => {
        resolve({
          httpStatusCode: HttpStatusCode.Ok,
          message: "Succesful login.",
          data: ("mock-access-token;"+(body as any).email+";"+(body as any).password) as T
        } satisfies IHttpResponse<T>);
      }, 1000);
    });
  }

  private mockFetchUser(header: any) {
    return new Promise<IHttpResponse<T>>((resolve, reject) => {
      setTimeout(() => {

        const authorization = header.Authorization;

        if(authorization){
          const token = (authorization as string).split("Bearer ")[1];
          console.log("token received:", token);
          const email = token.split(";")[1];
          const password = token.split(";")[2];
          resolve({
            httpStatusCode: HttpStatusCode.Ok,
            message: "Succesful login.",
            data: {
              username: "usuario-teste",
              password: password,
              email: email
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

  private mockMessage(header: any, chatId: string | null, membersQuantity: string | null) {
    return new Promise<IHttpResponse<T>>((resolve, reject) => {
      setTimeout(() => {

        const authorization = header.Authorization;

        if(authorization){
          const token = (authorization as string).split("Bearer ")[1];
          console.log("token received:", token);

          if(chatId !== null && membersQuantity !== null) {

            const sendOrNot = Math.floor((Math.random() * 10) + 1);

            if(sendOrNot===10 && Number(membersQuantity)>1){

              const member = Math.floor((Math.random() * Number(membersQuantity)) + 1);
              const date = new Date();
              const hours = (date.getHours() < 10)? "0"+date.getHours() : date.getHours();
              const minutes = (date.getMinutes() < 10)? "0"+date.getMinutes() : date.getMinutes();

              resolve({
                httpStatusCode: HttpStatusCode.Ok,
                message: "Succesful message fetching.",
                data: {
                  id: uuidv4(),
                  sender: "member " + member,
                  message: loremIpsumGenerator(),
                  time: hours+":"+minutes
                } satisfies Message as T
              } satisfies IHttpResponse<T>);

            } else {

              resolve({
                httpStatusCode: HttpStatusCode.Ok,
                message: "Succesful message fetching.",
                data: null
              } satisfies IHttpResponse<T>);
            }
          }
          else {

            reject({
              httpStatusCode: HttpStatusCode.Bad_Request,
              message: "chatId or membersNumber is missing."
            } satisfies IHttpError);
          }
        }
        
        reject({
          httpStatusCode: HttpStatusCode.Bad_Request,
          message: "token is missing"
        } satisfies IHttpError);
      }, 500);
    });
  }

}