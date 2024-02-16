import Loading from "@pages/Loading";
import { FetchUserService } from "@services/FetchUser/FetchUserService";
import React from "react";

export default function AuthProvider({ children }: React.HTMLAttributes<HTMLElement>): JSX.Element {

  const fetchUserResult = FetchUserService();

  if (fetchUserResult.isLoading || fetchUserResult.isFetching) return <Loading />;

  return <>{children}</>
}