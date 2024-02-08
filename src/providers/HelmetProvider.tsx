import { HelmetProvider } from "react-helmet-async";

interface ProviderProps {
  children?: React.ReactNode,
}

const helmetContext = {};

export const ReactQueryProvider = ({ children }: ProviderProps) => {
  return (
    <HelmetProvider context={helmetContext}>
      {children}
    </HelmetProvider>
  );
}

export { HelmetProvider };
