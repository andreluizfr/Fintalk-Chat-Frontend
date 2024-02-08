import { makeHttpClient } from "@Main/factories/infrastructure/makeHttpClient";
import { makePersistentStorage } from "@Main/factories/infrastructure/makePersistentStorage";
import { queryClient } from "@Main/providers/ReactQueryProvider";

import { HttpStatusCode } from "@Infrastructure/httpClient/HttpStatusCode";
import { IHttpError } from "@Infrastructure/httpClient/IHttpError";
import { IHttpResponse } from "@Infrastructure/httpClient/IHttpResponse";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { FetchUserHttpRequest } from "../FetchUser/FetchUserService";
import { GetMediaListsHttpRequest } from "../GetMediaLists/GetMediaListsService";

export const LoginService = (
    email: string | null,
    password: string | null
) => {

    const queryResult = useQuery<IHttpResponse<string>, IHttpError>(
        ['login'],
        async () => LoginHttpRequest(email, password)
    );
    
    const navigate = useNavigate();

    useEffect(()=>{
        if (queryResult.isError && queryResult.error) HandleLoginQueryError(queryResult.error);
        else if (queryResult.data?.data) HandleLoginQuerySuccess(queryResult.data, navigate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryResult.isError, queryResult.error, queryResult.data]);

    return queryResult; //para fazer o devido uso com relação a camada de view do react
}

async function LoginHttpRequest (
    email: string | null,
    password: string | null,
): Promise<IHttpResponse<string>>{
    
    if(!email || !password)
        throw {
            httpStatusCode: null,
            message: 'Erro: Email ou senha não foram identificados.'
        };

    const httpClient = makeHttpClient<string>();

    const httpResponse = httpClient.post(
        '/auth/login',
        {email, password}
    );

    return httpResponse;  
}

function HandleLoginQuerySuccess(data: IHttpResponse<string>, navigate: NavigateFunction) {

    console.log(data);

    const accessToken = data.data;

    if(accessToken){
        const persistentStorage = makePersistentStorage();
        persistentStorage.set("x-access-token", accessToken);

        setTimeout(()=>navigate("/whoIsWatching", { replace: true }), 2000);

        queryClient.prefetchQuery({queryKey: ['fetchUser'], queryFn: FetchUserHttpRequest });
        queryClient.prefetchQuery({queryKey: ['getMediaLists'], queryFn: GetMediaListsHttpRequest });
    }
}

function HandleLoginQueryError(httpError: IHttpError) {

    console.error(httpError);

    switch(httpError.httpStatusCode){ 

        case HttpStatusCode.Bad_Request: { //Bad Request. Erro nos parametros passados. Não há tratamento
            break;
        }
        case HttpStatusCode.Forbidden: { //Forbidden. Email ou senha errada. Não há tratamento
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