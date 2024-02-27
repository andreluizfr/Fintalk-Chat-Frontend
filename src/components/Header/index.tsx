import './styles.scss';
import ThemeSwitcher from './ThemeSwitcher';
import logo from '@assets/img/logo.png';

import { StoreState } from '@store/redux/config';
import { removeUser } from '@store/redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Header() {

  const languageStore = useSelector((state: StoreState) => state.language);
  const themeStore = useSelector((state: StoreState) => state.theme);
  const userStore = useSelector((state: StoreState) => state.user);
  const user = userStore.loggedUser;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function loggout() {
    dispatch(removeUser());
    navigate("/");
  }

  return (
    <header className='page-header' data-theme={themeStore.selectedTheme}>
      <img 
        className='logo-img'
        loading='lazy'
        decoding='async'
        src={logo}
        alt='logo'
        onClick={()=>navigate("/")}
      />

      <div className='buttons-bar-wrapper'>

        {user &&
          <>
            <img
              className='user-icon'
              loading='eager'
              decoding='async'
              src="https://static.vecteezy.com/system/resources/previews/007/033/152/non_2x/users-people-icon-vector.jpg" 
              alt="message user icon"
            />
            <span className='loggout' data-theme={themeStore.selectedTheme} onClick={loggout}>
              {languageStore.labels.logout}
            </span>
          </>
        }

        {!user &&
          <>
            <button className='login-button' data-theme={themeStore.selectedTheme} onClick={()=>navigate("/login")}>
              {languageStore.labels.login}
            </button>

            <button className='signup-button' data-theme={themeStore.selectedTheme} onClick={()=>navigate("/signup")}>
              {languageStore.labels.signup}
            </button>
          </>
        }

        <ThemeSwitcher />
        
      </div>
    </header>
  )
}
