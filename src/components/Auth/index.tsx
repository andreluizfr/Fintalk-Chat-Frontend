import Loading from "@pages/Loading";
import { FetchUserService } from "@services/FetchUser/FetchUserService";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({ children }: React.HTMLAttributes<HTMLElement>): JSX.Element {

  const fetchUserResult = FetchUserService();

  if (fetchUserResult.isLoading || fetchUserResult.isFetching) return <Loading />;

  if (fetchUserResult.data?.data) return <>{children}</>
  
  else {
    const navigate = useNavigate();
    navigate("/");
    return <></>
  }
}