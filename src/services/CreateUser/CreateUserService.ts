import { makeHttpClient } from "@factories/makeHttpClient";

import { IHttpError } from "@entities/httpClient/IHttpError";
import { IHttpResponse } from "@entities/httpClient/IHttpResponse";
import User from "@entities/User";

import { createUser } from "@store/redux/features/userSlice";

import { Dispatch, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { AnyAction } from "@reduxjs/toolkit";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const CreateUserService = (
  name: string | null,
  email: string | null,
  password: string | null,
  birthDate: Date | null
) => {

  const queryResult = useQuery<IHttpResponse<User>, IHttpError>(
    ['createUser'],
    async () => CreateUserHttpRequest(name, email, password, birthDate),
    {
      staleTime: 0,
      cacheTime: 0
    }
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (queryResult.isError && queryResult.error)
      HandleCreateUserQueryError(queryResult.error);
    else if (queryResult.data?.data)
      HandleCreateUserQuerySuccess(queryResult.data, dispatch, navigate);
  }, [queryResult.isError, queryResult.error, queryResult.data]);

  return queryResult;
}

async function CreateUserHttpRequest(
  name: string | null,
  email: string | null,
  password: string | null,
  birthdate: Date | null,
): Promise<IHttpResponse<User>> {

  if (!name || !email || !password || !birthdate)
    throw {
      httpStatusCode: null,
      message: "Erro: nome, email, senha ou data de aniversário não foram identificados."
    } as IHttpError;

  const httpClient = makeHttpClient<User>();

  const httpResponse = httpClient.post(
    '/createUser',
    { name, email, password, birthdate }
  );

  return httpResponse;
}

function HandleCreateUserQuerySuccess(data: IHttpResponse<User>, dispatch: Dispatch<AnyAction>, navigate: NavigateFunction) {

  console.log(data);

  const user = data.data;

  if(user) {
    dispatch(createUser(user));

    setTimeout(() => navigate("/"), 2000);
  }
}

function HandleCreateUserQueryError(httpError: IHttpError) {
  console.error(httpError);
}