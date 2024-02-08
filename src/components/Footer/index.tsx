import './styles.scss';

import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';

export default function Footer() {

  const languageStore = useSelector((state: StoreState) => state.language);
  const themeStore = useSelector((state: StoreState) => state.theme);

  return (
    <footer className='page-footer'>
      <p>
        Todas as marcas e ilustrações utilizadas são de seus respectivos donos.
      </p>
    </footer>
  )
}