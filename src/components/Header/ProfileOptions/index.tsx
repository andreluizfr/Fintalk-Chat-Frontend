import './styles.scss';

import { BiDoorOpen } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";

import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { StoreState } from '@store/redux/config';
import { removeUser } from '@store/redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileOptions() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const languageStore = useSelector((state: StoreState) => state.language);
  const themeStore = useSelector((state: StoreState) => state.theme);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  
  function loggout() {
    dispatch(removeUser());
    navigate("/");
  }

  return (
    <>
      <button
        id="profile-options"
        aria-describedby={id}
        aria-label="configs"
        onClick={handleClick} 
        className='profile-options'
      >
        <img
          className='user-icon'
          loading='eager'
          decoding='async'
          src="https://cdn-icons-png.freepik.com/512/1144/1144760.png"
          alt="message user icon"
          data-default-img
          data-theme={themeStore.selectedTheme}
        />
      </button>

      <ClickAwayListener onClickAway={()=>{
        const el = document.getElementById("profile-options");
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
          <span className='edit-profile' data-theme={themeStore.selectedTheme}>
            {languageStore.labels.editProfile}
            <FaUserEdit className='edit-profile-icon'/>
          </span>

          <span className='loggout' data-theme={themeStore.selectedTheme} onClick={loggout}>
            {languageStore.labels.logout}
            <BiDoorOpen className='loggout-icon'/>
          </span>
        </Popper>
      </ClickAwayListener>
    </>
  ); 
}