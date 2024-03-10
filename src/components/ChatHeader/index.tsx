import './styles.scss';

import { CiMenuKebab } from "react-icons/ci";
import { IoArrowBackSharp } from "react-icons/io5";

import { useSelector } from 'react-redux';
import { StoreState } from '@store/redux/config';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

interface props {
  chatName: string | undefined;
  membersQuantity: number;
}

export default function ChatHeader({chatName, membersQuantity}: props) {

  const navigate = useNavigate();
  
  const themeStore = useSelector((state: StoreState) => state.theme);
  const languageStore = useSelector((state: StoreState) => state.language);

  const isSmallScreen = useMediaQuery({
    query: '(max-width: 576px)'
  });

  return (
    <header className='chat-container-header' data-theme={themeStore.selectedTheme}>

      {isSmallScreen &&
        <div className='rounded-icon' onClick={()=>navigate('/chats')} data-theme={themeStore.selectedTheme}>
          <IoArrowBackSharp className='back-icon' data-theme={themeStore.selectedTheme}/>
        </div>
      }

      <img 
        className='chat-icon'
        src="https://static.vecteezy.com/ti/vetor-gratis/p3/3769720-group-chat-linear-icon-thin-line-illustration-chat-box-com-grupo-de-pessoas-dentro-do-contorno-simbolo-isolado-esboco-desenho-vetor.jpg"
        alt="chat icon"
        decoding='async'
      />

      <div className='chat-infos'>
        <h1 className='chat-name' data-theme={themeStore.selectedTheme}>
          {chatName}
        </h1>

        <span className='members' data-theme={themeStore.selectedTheme}>
          {membersQuantity + " " + languageStore.labels.members}
        </span>
      </div>

      <div className='chat-options'>
        <CiMenuKebab className='options-icon' data-theme={themeStore.selectedTheme}/>
      </div>

    </header>
  )
}