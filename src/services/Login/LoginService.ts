import { makeHttpClient } from "@factories/makeHttpClient";
import { makePersistentStorage } from "@factories/makePersistentStorage";

import { IHttpError } from "@entities/httpClient/IHttpError";
import { IHttpResponse } from "@entities/httpClient/IHttpResponse";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';

export const LoginService = (
  email: string,
  password: string
) => {

  const queryResult = useQuery<IHttpResponse<string>, IHttpError>(
    ['login'],
    async () => LoginHttpRequest(email, password)
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
  email: string,
  password: string,
): Promise<IHttpResponse<string>> {

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

    setTimeout(() => navigate("/chat", { replace: true }), 2000);
  }
}

function HandleLoginQueryError(httpError: IHttpError) {
  console.error(httpError);
}