import { makeHttpClient } from "@factories/makeHttpClient";
import { makePersistentStorage } from "@factories/makePersistentStorage";

import { IHttpError } from "@entities/httpClient/IHttpError";
import { IHttpResponse } from "@entities/httpClient/IHttpResponse";
import User from "@entities/User";

import { addUser, removeUser } from '@store/redux/features/userSlice';

import { Dispatch, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AnyAction } from "@reduxjs/toolkit";


export const FetchUserService = () => {

  const queryResult = useQuery<IHttpResponse<User>, IHttpError>(
    ['fetchUser'],
    async () => FetchUserHttpRequest(),
    {
      enabled: true,
      staleTime: 5 * 1000,
      cacheTime: 60 * 60 * 1000
    }
  );

  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (queryResult.isError && queryResult.error) 
      HandleFetchUserQueryError(queryResult.error, dispatch, navigation);
    else if (queryResult.data?.data) 
      HandleFetchUserQuerySuccess(queryResult.data, dispatch);
  }, [queryResult.isError, queryResult.error, queryResult.data]);

  return queryResult;
}

export async function FetchUserHttpRequest() {

  const persistentStorage = makePersistentStorage();
  const accessToken = persistentStorage.get<string>("x-access-token");

  if (!accessToken)
    throw {
      httpStatusCode: null,
      message: 'Erro: Token de acesso não encontrado.'
    } as IHttpError;

  const httpClient = makeHttpClient<User>();
  const httpResponse = httpClient.get(
    '/fetchUser',
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return httpResponse;
}

function HandleFetchUserQuerySuccess(data: IHttpResponse<User>, dispatch: Dispatch<AnyAction>) {
  console.log(data);
  const user = data.data;
  if(user) {
    dispatch(addUser(user));
  }
}

function HandleFetchUserQueryError(httpError: IHttpError, dispatch: Dispatch<AnyAction>, navigation: NavigateFunction) {
  console.error(httpError);
  dispatch(removeUser());
  navigation('/');
}
