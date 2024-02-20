import { makeHttpClient } from "@factories/makeHttpClient";
import { makePersistentStorage } from "@factories/makePersistentStorage";

import { IHttpError } from "@entities/httpClient/IHttpError";
import { IHttpResponse } from "@entities/httpClient/IHttpResponse";
import Message from "@entities/Message";

import { Dispatch, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { AnyAction } from "@reduxjs/toolkit";
import { addMessage } from '@store/redux/features/chatSlice';

export const GetMessagesService = (chatId: string | null, membersQuantity: number) => {

  const queryResult = useQuery<IHttpResponse<Message>, IHttpError>(
    ['getMessages'],
    async () => GetMessagesHttpRequest(chatId, membersQuantity),
    {
      enabled: chatId === null ? false : true,
      staleTime: 0,
      cacheTime: 60 * 60 * 1000,
      refetchInterval: 1000
    }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (queryResult.isError && queryResult.error) 
      HandleGetMessagesQueryError(queryResult.error);
    else if (queryResult.data?.data) 
      HandleGetMessagesQuerySuccess(queryResult.data, dispatch, chatId);
  }, [queryResult.isError, queryResult.error, queryResult.data]);

  return queryResult;
}

export async function GetMessagesHttpRequest(chatId: string | null, membersQuantity: number) {

  const persistentStorage = makePersistentStorage();
  const accessToken = persistentStorage.get<string>("x-access-token");

  if (!accessToken)
    throw {
      httpStatusCode: null,
      message: 'Erro: Token de acesso não encontrado.'
    } as IHttpError;
  
  if (!chatId)
    throw {
      httpStatusCode: null,
      message: 'Erro: Nenhum chat encontrado.'
    } as IHttpError;

  const httpClient = makeHttpClient<Message>();
  const httpResponse = httpClient.get(
    '/messages?chatId='+chatId+'&membersQuantity='+membersQuantity,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return httpResponse;
}

function HandleGetMessagesQuerySuccess(data: IHttpResponse<Message>, dispatch: Dispatch<AnyAction>, chatId: string | null) {

  const message = data.data;

  if(message) {
    dispatch(addMessage({chatId: chatId, message: message}));
  }
}

function HandleGetMessagesQueryError(httpError: IHttpError) {
  console.error(httpError);
}
