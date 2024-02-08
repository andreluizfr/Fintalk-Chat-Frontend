import store from "@/store/redux/config";

import { Provider } from "react-redux";

interface ProviderProps {
  children?: React.ReactNode,
}

export function ReduxProvider({ children }: ProviderProps) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
