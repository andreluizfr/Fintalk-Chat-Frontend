import './styles.scss';

import ThemeSwitcher from './ThemeSwitcher';
import LanguageSelect from './LanguageSelect';

import gearIcon from '@assets/img/gear.svg';

import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function AppOptions() {

  const themeStore = useSelector((state: StoreState) => state.theme);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <>
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
    </>
  );
}