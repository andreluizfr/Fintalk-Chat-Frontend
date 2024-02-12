import './styles.scss';
import logo from '@assets/img/logo.png';

import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {

  const languageStore = useSelector((state: StoreState) => state.language);
  const themeStore = useSelector((state: StoreState) => state.theme);

  return (
    <header className='page-header' data-theme={themeStore.selectedTheme}>
      <img 
        className='logo-img'
        loading='lazy'
        decoding='async'
        src={logo}
      />

      <div className='buttons-bar-wrapper'>
        <button className='login-button' data-theme={themeStore.selectedTheme}>
          {languageStore.labels.login}
        </button>

        <button className='signup-button' data-theme={themeStore.selectedTheme}>
          {languageStore.labels.signup}
        </button>

        <ThemeSwitcher />
      </div>
    </header>
  )
}
