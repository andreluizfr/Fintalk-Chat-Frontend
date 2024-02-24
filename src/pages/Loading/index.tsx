import './styles.scss';

import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';
import DotLoader from "react-spinners/DotLoader";

export default function Loading(): JSX.Element {

  const themeStore = useSelector((state: StoreState) => state.theme);

  return (
    <main className='LoadingPage' data-theme={themeStore.selectedTheme}>
      <DotLoader
        className='Loader'
        color="#f3537e"
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </main>
  );
}