import { makeHttpClient } from "@factories/makeHttpClient";

import { IHttpError } from "@entities/httpClient/IHttpError";
import { IHttpResponse } from "@entities/httpClient/IHttpResponse";
import User from "@entities/User";

import { addUser } from "@store/redux/features/userSlice";

import { Dispatch, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { AnyAction } from "@reduxjs/toolkit";


export const CreateUserService = (
  email: string | null,
  password: string | null,
  birthDate: Date | null
) => {

  const queryResult = useQuery<IHttpResponse<User>, IHttpError>(
    ['createUser'],
    async () => CreateUserHttpRequest(email, password, birthDate)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (queryResult.isError && queryResult.error)
      HandleCreateUserQueryError(queryResult.error);
    else if (queryResult.data?.data)
      HandleCreateUserQuerySuccess(queryResult.data, dispatch);
  }, [queryResult.isError, queryResult.error, queryResult.data]);

  return queryResult;
}

async function CreateUserHttpRequest(
  email: string | null,
  password: string | null,
  birthDate: Date | null,
): Promise<IHttpResponse<User>> {

  if (!email || !password || !birthDate)
    throw {
      httpStatusCode: null,
      message: "Erro: Email, senha ou data de aniversário não foram identificados."
    } as IHttpError;

  const httpClient = makeHttpClient<User>();

  const httpResponse = httpClient.post(
    '/user/create',
    { email, password, birthDate },
  )

  return httpResponse;
}

function HandleCreateUserQuerySuccess(data: IHttpResponse<User>, dispatch: Dispatch<AnyAction>) {
  console.log(data);
  const user = data.data;
  dispatch(addUser(user));
}

function HandleCreateUserQueryError(httpError: IHttpError) {
  console.error(httpError);
}