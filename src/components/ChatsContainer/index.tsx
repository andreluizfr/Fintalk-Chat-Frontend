import './styles.scss';

export default function ChatsContainer() {
  return (
    <aside className='chats-container'>

      <header className='chats-header'>
        <div className='chats-header-toolbar'>
          <h1 className='title'>Messages</h1>
          <img 
            className='creat-chat-icon'
            src="https://cdn.icon-icons.com/icons2/3412/PNG/512/chat_add_icon_217458.png"
            alt="enter or create chat"
          />
        </div>

        <input className='chats-header-search' placeholder='Search...'/>
      </header>
      
      <main className='chats'>
        <article className='chat'>
          <img 
            className='chat-icon'
            src="https://cdn.icon-icons.com/icons2/909/PNG/512/images_icon-icons.com_70941.png" 
            alt='chat icon'
          />

          <ul className='chat-infos-wrapper'>
            <li>Ronald Richards</li>
            <li>4:42 PM</li>
            <li data-typing="true">Typing...</li>
            <li>3</li>
          </ul>
        </article>

        <article className='chat'>
          <img 
            className='chat-icon'
            src="https://cdn.icon-icons.com/icons2/909/PNG/512/images_icon-icons.com_70941.png" 
            alt='chat icon'
          />
          
          <ul className='chat-infos-wrapper'>
            <li>Floyd Miles</li>
            <li>9:37 PM</li>
            <li>I don't like this I don't like this I don't like this I don't like this</li>
            <li>
              <img 
                src="https://w7.pngwing.com/pngs/944/917/png-transparent-telegram-message-check-mark-whatsapp-microblogging-miscellaneous-blue-angle-thumbnail.png"
              />
            </li>
          </ul>
        </article>
      </main>

    </aside>
  )
}