import { makeHttpClient } from "@factories/makeHttpClient";
import { makePersistentStorage } from "@factories/makePersistentStorage";

import { IHttpError } from "@entities/httpClient/IHttpError";
import { IHttpResponse } from "@entities/httpClient/IHttpResponse";
import User from "@entities/User";

import { addUser, removeUser } from '@store/redux/features/userSlice';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { StoreState } from '@store/redux/config';

export const FetchUserService = () => {
  const languageStore = useSelector((state: StoreState) => state.language);

  const queryResult = useQuery<IHttpResponse<User>, IHttpError>(
    ['fetchUser'],
    async () => FetchUserHttpRequest(languageStore.messages),
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

export async function FetchUserHttpRequest(messages: any) {

  const persistentStorage = makePersistentStorage();
  const accessToken = persistentStorage.get<string>("x-access-token");

  if (!accessToken)
    throw {
      httpStatusCode: null,
      message: messages.tokenNotFoundRequestError
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
