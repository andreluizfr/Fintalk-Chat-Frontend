import { makeHttpClient } from "@Main/factories/infrastructure/makeHttpClient";
import { makePersistentStorage } from "@Main/factories/infrastructure/makePersistentStorage";

import { HttpStatusCode } from "@Infrastructure/httpClient/HttpStatusCode";
import { IHttpError } from "@Infrastructure/httpClient/IHttpError";
import { IHttpResponse } from "@Infrastructure/httpClient/IHttpResponse";

import { MediaList } from "@Model/entities/MediaList";

import { removeUser } from "@Infrastructure/store/redux/features/userSlice";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const GetMediaListsService = () => {

    const queryResult = useQuery<IHttpResponse<MediaList[]>, IHttpError>(
        ['getMediaLists'],
        async () => GetMediaListsHttpRequest(),
        {
            enabled: true,
            staleTime: 60 * 1000,
            cacheTime: 60 * 60 * 1000,
        }
    );
    
    const dispatch = useDispatch(); 
    
    useEffect(()=>{
        if (queryResult.isError && queryResult.error) HandleGetMediaListsQueryError(queryResult.error, dispatch);
        else if (queryResult.data?.data) HandleGetMediaListsQuerySuccess(queryResult.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryResult.isError, queryResult.error, queryResult.data]);

    return queryResult; //para fazer o devido uso com relação a camada de view do react
}

export async function GetMediaListsHttpRequest (): Promise<IHttpResponse<MediaList[]>>{

    const persistentStorage = makePersistentStorage();

    const accessToken = persistentStorage.get<string>("x-access-token");

    if(!accessToken)
        throw {
            httpStatusCode: null,
            message: 'Erro: Token de acesso não encontrado.'
        } as IHttpError;

    const httpClient = makeHttpClient<MediaList[]>();

    const httpResponse = httpClient.get(
        "/mediaList",
        {headers: { Authorization: `Bearer ${accessToken}` }}
    );

    return httpResponse;  
}

function HandleGetMediaListsQuerySuccess(data: IHttpResponse<MediaList[]>) {

    console.log(data);
}

function HandleGetMediaListsQueryError(httpError: IHttpError, dispatch: Dispatch<AnyAction>) {

    console.error(httpError);

    switch(httpError.httpStatusCode){ 

        case HttpStatusCode.Forbidden: {  //Forbidden. Token inválido ou expirado 
            dispatch(removeUser()); //se tiver algum salvo
            window.location.href = import.meta.env.VITE_APP_BASE_URL;
            break;
        }
        case HttpStatusCode.Internal_Server_Error: { //Internal server error. erro durante a criaçao das entidades, não há tratamento
            break;
        }
        case null: { //Erro desconhecido, servidor indisponível, ou não passou em validação para inciar a request
            break;
        }

        default: { //erro não mapeado pelo controlador do backend, não há tratamento
            break;
        }
    }
}