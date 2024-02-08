import { makeHttpClient } from "@Main/factories/infrastructure/makeHttpClient";

import { HttpStatusCode } from "@Infrastructure/httpClient/HttpStatusCode";
import { IHttpError } from "@Infrastructure/httpClient/IHttpError";
import { IHttpResponse } from "@Infrastructure/httpClient/IHttpResponse";

import { Media } from "@Model/entities/Media";

import { removeUser } from "@Infrastructure/store/redux/features/userSlice";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const GetMediaService = (mediaId: string | null) => {

    const queryResult = useQuery<IHttpResponse<Media>, IHttpError>(
        ['getMedia'],
        async () => GetMediaHttpRequest(mediaId),
        {
            enabled: true,
            staleTime: 3 * 60 * 60 * 1000, //colocar o tempo que dura o signed cookie
            cacheTime: 24 * 60 * 60 * 1000,
        }
    );
    
    const dispatch = useDispatch(); 
    
    useEffect(()=>{
        if (queryResult.isError && queryResult.error) HandleGetMediaQueryError(queryResult.error, dispatch);
        else if (queryResult.data?.data) HandleGetMediaQuerySuccess(queryResult.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryResult.isError, queryResult.error, queryResult.data]);

    return queryResult; //para fazer o devido uso com relação a camada de view do react
}

export async function GetMediaHttpRequest (mediaId: string | null): Promise<IHttpResponse<Media>>{

    if(mediaId === null)
        throw {
            httpStatusCode: null,
            message: 'Erro: Id do título não identificado.'
        } as IHttpError;

    const httpClient = makeHttpClient<Media>();

    const httpResponse = httpClient.get("/media/"+mediaId);

    return httpResponse;  
}

function HandleGetMediaQuerySuccess(data: IHttpResponse<Media>) {

    console.log(data);
}

function HandleGetMediaQueryError(httpError: IHttpError, dispatch: Dispatch<AnyAction>) {

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