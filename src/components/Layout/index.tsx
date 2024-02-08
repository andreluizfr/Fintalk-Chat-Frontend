import './styles.scss';

import Header from '../Header';
import Footer from '../Footer';

import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';
import { HTMLAttributes } from 'react';

export default function Layout({ children }: HTMLAttributes<HTMLElement>) {

  const themeStore = useSelector((state: StoreState) => state.theme);

  return (
    <div className='page-wrapper' data-theme={themeStore.selectedTheme}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}