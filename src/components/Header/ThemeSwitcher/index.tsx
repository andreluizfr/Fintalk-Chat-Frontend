import { FiMoon } from "react-icons/fi";
import { FiSun } from "react-icons/fi";

import { StoreState } from '@store/redux/config';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '@store/redux/features/themeSlice';

export default function ThemeSwitcher() {

  const themeStore = useSelector((state: StoreState) => state.theme);
  
  const dispatch = useDispatch();

  if (themeStore.light)
    return (
      <FiSun 
        className='theme-icon' 
        onClick={()=>dispatch(selectTheme("dark"))} 
        data-theme={themeStore.selectedTheme}
      />
    );

  return (
    <FiMoon 
      className='theme-icon' 
      onClick={()=>dispatch(selectTheme("light"))} 
      data-theme={themeStore.selectedTheme}
    />
  );
}
