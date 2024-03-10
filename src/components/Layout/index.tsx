import './styles.scss';

import Header from '../Header';
import Footer from '../Footer';

import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';
import { HTMLAttributes } from 'react';

interface props extends HTMLAttributes<HTMLElement> {
  hideFooter?: boolean;
}

export default function Layout({ children, hideFooter }: props) {

  const themeStore = useSelector((state: StoreState) => state.theme);

  return (
    <div className='page-wrapper' data-theme={themeStore.selectedTheme}>
      <Header />

      {children}

      {hideFooter ?
        <></>
        :
        <Footer />
      }
    </div>
  )
}