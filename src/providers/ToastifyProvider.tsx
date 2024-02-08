import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProviderProps {
  children?: React.ReactNode,
}

export const ToastifyProvider = ({ children }: ProviderProps) => {
  return (
    <>
      {children}
      <ToastContainer
        autoClose={2000}
        newestOnTop
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        hideProgressBar
        theme="dark"
      />
    </>
  );
}