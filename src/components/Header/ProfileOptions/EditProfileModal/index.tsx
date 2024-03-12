import './styles.scss';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';

interface props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditProfileModal({open, setOpen}:props) {

  const themeStore = useSelector((state: StoreState) => state.theme);

  return (
    <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={{
          zIndex: 99999,
          backgroundColor: themeStore.light ? "#fafafa" : "#545454",
          padding: ".5rem",
          display: "flex",
          flexDirection: "column",
          gap: ".4rem",
          borderRadius: ".2rem",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
        }}
      >
        <h1 id="modal-modal-title">Edit your profile here</h1>
      </Box>
    </Modal>
  );
}