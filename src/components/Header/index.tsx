import './styles.scss';

import ProfileOptions from './ProfileOptions';
import AppOptions from './AppOptions';

import logo from '@assets/img/logo.png';

import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Header() {

  const languageStore = useSelector((state: StoreState) => state.language);
  const themeStore = useSelector((state: StoreState) => state.theme);
  const userStore = useSelector((state: StoreState) => state.user);
  const user = userStore.loggedUser;

  const navigate = useNavigate();

  function goToChats(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    navigate("/chats");
  }
    
  return (
    <header className='page-header' data-theme={themeStore.selectedTheme}>

      <img 
        className='logo-img'
        loading='eager'
        decoding='async'
        src={logo}
        alt='logo'
        width={8 * parseFloat(getComputedStyle(document.documentElement).fontSize)}
        height='auto'
        onClick={()=>navigate("/")}
      />

      {user &&
        <a className='chats-link' onClick={goToChats} data-theme={themeStore.selectedTheme}>{languageStore.labels.chats}</a>
      }

      <div className='buttons-bar-wrapper'>

        {user &&
            <ProfileOptions />
        }

        {!user &&
          <>
            <button className='login-button button' data-theme={themeStore.selectedTheme} onClick={()=>navigate("/login")}>
              {languageStore.labels.login}
            </button>

            <button className='signup-button button' data-theme={themeStore.selectedTheme} onClick={()=>navigate("/signup")}>
              {languageStore.labels.signup}
            </button>
          </>
        }
        
        <AppOptions />
        
      </div>
    </header>
  )
}
