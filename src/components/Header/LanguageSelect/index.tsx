import './styles.scss';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '@store/redux/config';
import { selectLanguage } from '@store/redux/features/languageSlice';

export default function LanguageSelect() {

  const dispatch = useDispatch();

  const themeStore = useSelector((state: StoreState) => state.theme);
  const languageStore = useSelector((state: StoreState) => state.language);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    dispatch(selectLanguage(event.target.value))
  };

  return (
    <FormControl sx={{ m: 1 }} >
      <Select
        value={languageStore.selectedLanguage}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{
          '& .MuiSelect-select': {
            padding: "4px 8px",
            backgroundColor: themeStore.light ? "#fff" : "#151515",
            color: themeStore.light ? "#242424" : "#fff",
            fontWeight: "400"
          },
          "& .MuiSvgIcon-root": {
            color: themeStore.light ? "#000" : "#fff"
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: "1px solid #151515",
            transition: "all 200ms"
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: "1px solid #ff7b9c"
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: "1px solid #ff3971"
          },
        }}
        MenuProps={{
          sx: {
            zIndex: "99999",
            "& .Mui-selected": {
              backgroundColor: "#f3537e !important",
              color: "#fff"
            },
            "& .Mui-selected:hover": {
              backgroundColor: "#ff3971 !important"
            }
          }
        }}
        variant='outlined'
      >
        <MenuItem value={"pt-BR"} sx={{backgroundColor: "#fff"}}>
          <span className='select-text' data-theme={themeStore.selectedTheme}>
            {languageStore.labels.portuguese}
          </span>
        </MenuItem>

        <MenuItem value={"en-US"} sx={{backgroundColor: "#fff"}}>
          <span className='select-text' data-theme={themeStore.selectedTheme}>
            {languageStore.labels.english}
          </span>
        </MenuItem>

      </Select>
    </FormControl>
  );
}