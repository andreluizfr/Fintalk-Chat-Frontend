import './styles.scss';

import EditProfileModal from './EditProfileModal';

import { BiDoorOpen } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";

import { Popover } from '@mui/material';

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
  const id = open ? 'simple-popover' : undefined;


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  function loggout() {
    dispatch(removeUser());
    navigate("/");
  }

  const [profileModalOpen, setProfileModalOpen] = useState(false);

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
        <span className='field' data-theme={themeStore.selectedTheme} onClick={()=>setProfileModalOpen(true)}>
          <FaUserEdit className='icon'/>
          {languageStore.labels.editProfile}
          <EditProfileModal open={profileModalOpen} setOpen={setProfileModalOpen}/>
        </span>

        <span className='field' data-theme={themeStore.selectedTheme} onClick={loggout}>
          <BiDoorOpen className='icon'/>
          {languageStore.labels.logout}
        </span>
      </Popover>
    </>
  ); 
}