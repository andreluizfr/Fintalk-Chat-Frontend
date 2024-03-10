import './styles.scss';

import moonIcon from '@assets/img/moon.svg';
import sunIcon from '@assets/img/sun.svg';

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
        <img 
          className='theme-icon'
          src={sunIcon}
          loading='lazy'
          decoding='async'
          data-theme={themeStore.selectedTheme}
          width={2 * parseFloat(getComputedStyle(document.documentElement).fontSize)}
          height='auto'
        />
        <label>{languageStore.labels.theme}</label>
      </div>
    );

  return (
    <div 
      className='theme-switcher' 
      data-theme={themeStore.selectedTheme}
      onClick={()=>dispatch(selectTheme("light"))} 
    >
      <img 
        className='theme-icon' 
        src={moonIcon} 
        loading='lazy'
        decoding='async'
        data-theme={themeStore.selectedTheme}
        width={2 * parseFloat(getComputedStyle(document.documentElement).fontSize)}
        height='auto'
      />
      <label data-theme={themeStore.selectedTheme}>{languageStore.labels.theme}</label>
    </div>
  );
}
