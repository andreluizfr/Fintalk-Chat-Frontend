import './styles.scss';

import { FiMoon } from "react-icons/fi";
import { FiSun } from "react-icons/fi";

import { StoreState } from '@store/redux/config';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '@store/redux/features/themeSlice';

export default function ThemeSwitcher() {

  const themeStore = useSelector((state: StoreState) => state.theme);
  const languageStore = useSelector((state: StoreState) => state.language);
  
  const dispatch = useDispatch();

  if (themeStore.light)
    return (
      <div 
        className='theme-switcher' 
        data-theme={themeStore.selectedTheme}
        onClick={()=>dispatch(selectTheme("dark"))} 
      >
        <FiSun className='theme-icon' data-theme={themeStore.selectedTheme}/>
        <label>{languageStore.labels.theme}</label>
      </div>
    );

  return (
    <div 
      className='theme-switcher' 
      data-theme={themeStore.selectedTheme}
      onClick={()=>dispatch(selectTheme("light"))} 
    >
      <FiMoon className='theme-icon' data-theme={themeStore.selectedTheme}/>
      <label data-theme={themeStore.selectedTheme}>{languageStore.labels.theme}</label>
    </div>
  );
}
