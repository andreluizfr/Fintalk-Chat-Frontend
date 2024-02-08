import './styles.scss';

import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';

export default function HomePage(): JSX.Element {

  const themeStore = useSelector((state: StoreState) => state.theme);
  const languageStore = useSelector((state: StoreState) => state.language);

  return (
    <main className='home-page'>
    </main>
  );
}