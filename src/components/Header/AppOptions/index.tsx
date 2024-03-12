import './styles.scss';

import ThemeSwitcher from './ThemeSwitcher';
import LanguageSelect from './LanguageSelect';

import gearIcon from '@assets/img/gear.svg';

import Popover from '@mui/material/Popover';

import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function AppOptions() {

  const themeStore = useSelector((state: StoreState) => state.theme);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

      <Popover 
        id={id} 
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}          
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        sx={{
          zIndex: 99999,
          '& .MuiPaper-root': {
            backgroundColor: themeStore.light ? "#fafafa" : "#545454",
            padding: ".5rem",
            display: "flex",
            flexDirection: "column",
            gap: ".4rem",
            borderRadius: ".2rem",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
            margin: ".2rem !important",
            width: "10rem"
          }
        }}
      >
        <ThemeSwitcher />
        <LanguageSelect />
      </Popover>
    </>
  );
}