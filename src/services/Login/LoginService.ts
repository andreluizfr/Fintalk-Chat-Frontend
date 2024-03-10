import { makeHttpClient } from "@factories/makeHttpClient";
import { makePersistentStorage } from "@factories/makePersistentStorage";

import { IHttpError } from "@entities/httpClient/IHttpError";
import { IHttpResponse } from "@entities/httpClient/IHttpResponse";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from '@store/redux/config';

export const LoginService = (
  email: string | null,
  password: string | null
) => {
  const languageStore = useSelector((state: StoreState) => state.language);
  
  const queryResult = useQuery<IHttpResponse<string>, IHttpError>(
    ['login'],
    async () => LoginHttpRequest(email, password, languageStore.messages)
  );

  const navigate = useNavigate();
  
  useEffect(() => {
    if (queryResult.isError && queryResult.error) HandleLoginQueryError(queryResult.error);
    else if (queryResult.data?.data) HandleLoginQuerySuccess(queryResult.data, navigate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryResult.isError, queryResult.error, queryResult.data]);

  return queryResult; //para fazer o devido uso com relação a camada de view do react
}

async function LoginHttpRequest(
  email: string | null,
  password: string | null,
  messages: any
): Promise<IHttpResponse<string>> {

  if (!email || !password)
    throw {
      httpStatusCode: null,
      message: messages.emailOrPasswordNullRequestError
    } as IHttpError;

  const httpClient = makeHttpClient<string>();

  const httpResponse = httpClient.post(
    '/login',
    { email, password }
  );

  return httpResponse;
}

function HandleLoginQuerySuccess(data: IHttpResponse<string>, navigate: NavigateFunction) {

  console.log(data);

  const accessToken = data.data;

  if (accessToken) {
    const persistentStorage = makePersistentStorage();
    persistentStorage.set("x-access-token", accessToken);

    setTimeout(() => navigate("/chats", { replace: true }), 2000);
  }
}

function HandleLoginQueryError(httpError: IHttpError) {
  console.error(httpError);
}