import './styles.scss';

import ThemeSwitcher from './ThemeSwitcher';
import LanguageSelect from './LanguageSelect';

import gearIcon from '@assets/img/gear.svg';

import logo from '@assets/img/logo.png';

import Popper from '@mui/material/Popper';

import { StoreState } from '@store/redux/config';
import { removeUser } from '@store/redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClickAwayListener from '@mui/material/ClickAwayListener';

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

  function goToChats(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    navigate("/chats");
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
    
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
          <>
            <img
              className='user-icon'
              loading='eager'
              decoding='async'
              src="https://cdn-icons-png.freepik.com/512/1144/1144760.png" 
              alt="message user icon"
              data-default-img
              data-theme={themeStore.selectedTheme}
            />
            <span className='loggout' data-theme={themeStore.selectedTheme} onClick={loggout}>
              {languageStore.labels.logout}
            </span>
          </>
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
        
          <button
            id="configs-button"
            aria-describedby={id}
            aria-label="configs"
            onClick={handleClick} 
            className='configs-button'
          >
            <img 
              src={gearIcon} 
              alt='gear icon'
              loading='eager'
              decoding='async'
              width={1.3 * parseFloat(getComputedStyle(document.documentElement).fontSize)}
              height='auto'
              className='configs-icon' 
              data-theme={themeStore.selectedTheme}
            />
          </button>

        <ClickAwayListener onClickAway={()=>{
          const el = document.getElementById("configs-button");
          el?.click();
        }}>
          <Popper 
            id={id} 
            open={open} 
            anchorEl={anchorEl}
            placement='bottom-end'
            sx={{ 
              zIndex: 99999,
              backgroundColor: themeStore.light ? "#fafafa" : "#545454",
              padding: ".5rem",
              display: "flex",
              flexDirection: "column",
              gap: ".4rem",
              borderRadius: ".2rem",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
              margin: ".2rem !important",
              width: "10rem"
            }}
          >
            <ThemeSwitcher />
            <LanguageSelect />
          </Popper>
        </ClickAwayListener>
        
      </div>
    </header>
  )
}
