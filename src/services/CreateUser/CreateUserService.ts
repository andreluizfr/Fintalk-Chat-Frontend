import { makeHttpClient } from "@factories/makeHttpClient";

import User from "@entities/User";
import { IHttpError } from "@entities/httpClient/IHttpError";
import { IHttpResponse } from "@entities/httpClient/IHttpResponse";
import { userRegisteringSchema } from '@entities/UserRegistering';

import { createUser } from "@store/redux/features/userSlice";

import { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { AnyAction } from "@reduxjs/toolkit";
import { StoreState } from '@store/redux/config';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ValidationError } from "yup";

export const CreateUserService = (
  name: string | null,
  email: string | null,
  password: string | null,
  birthDate: Date | null
) => {
  const languageStore = useSelector((state: StoreState) => state.language);

  const queryResult = useQuery<IHttpResponse<User>, IHttpError>(
    ['createUser'],
    async () => CreateUserHttpRequest(name, email, password, birthDate, languageStore.messages),
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
  messages: any
): Promise<IHttpResponse<User>> {

  await validateFields(name, email, password, birthdate, messages);

  const httpClient = makeHttpClient<User>();

  const httpResponse = httpClient.post(
    '/createUser',
    { name, email, password, birthdate }
  );

  return httpResponse;
}

async function validateFields(name: string | null, email: string | null, password: string | null, birthdate: Date | null, messages: any) {
  if (!name || !email || !password || !birthdate)
    throw {
      httpStatusCode: null,
      message: messages.signupFieldsNullRequestError
    } as IHttpError;

  try {
    await userRegisteringSchema.validate({name, email, password, birthdate});
  } catch (err) {
    const error = err as ValidationError;
    throw {
      httpStatusCode: null,
      message: error.message
    } as IHttpError;
  }
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