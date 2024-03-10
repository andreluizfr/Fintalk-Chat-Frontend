import { Suspense, lazy, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';

import LoadingPage from "@pages/Loading";
import Auth from '@components/Auth';
const NotFoundPage = lazy(() => import('@pages/NotFound'));
const HomePage = lazy(() => import('@pages/Home'));
const LoginPage = lazy(() => import('@pages/Login'));
const SignupPage = lazy(() => import('@pages/Signup'));
const ChatsPage = lazy(() => import('@pages/Chats'));

function Router() {

  const [errorMessage, setErrorMessage] = useState("");

  return (
    <ErrorBoundary fallback={<p>{errorMessage}</p>} onError={(error: Error, _info: React.ErrorInfo) => setErrorMessage(error.message)}>
      <Suspense fallback={<LoadingPage />}>
        <RouterProvider router={
          createBrowserRouter([
            {
              path: "/",
              element: <HomePage />,
            },
            {
              path: "/login",
              element: <LoginPage />,
            },
            {
              path: "/chats",
              element: <Auth><ChatsPage /></Auth>,
            },
            {
              path: "/signup",
              element: <SignupPage />,
            },
            {
              path: "*",
              element: <NotFoundPage />,
            }
          ])
        } />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Router;
