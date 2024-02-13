import './styles.scss';

export default function ChatContainer() {
  return (
    <article className='chat-container'>
      <header className='chat-container-header'>
        <img 
          className='chat-icon'
          src="https://cdn.icon-icons.com/icons2/909/PNG/512/images_icon-icons.com_70941.png"
          alt="chat icon"
        />

        <div className='chat-infos'>
          <h1 className='chat-name'>
            Purweb team
          </h1>

          <span className='members'>
            28 members
          </span>
        </div>

        <div className='chat-options'>
          <img
            className='options-icon'
            src="https://cdn2.iconfinder.com/data/icons/communication-vector-for-business/2000/Icon_15-512.png" 
            alt="more options icon"
          />
        </div>
      </header>

      <main className='messages-container'>

        <article className='message'>
          <img
            className='user-icon'
            src="https://cdn.icon-icons.com/icons2/909/PNG/512/images_icon-icons.com_70941.png" 
            alt="message user icon"
          />

          <div className='message-infos-wrapper'>
            <div className='first-row'>
              <span className='username'>
                André Luiz
              </span>
              <span className='time'>
                1:48 AM
              </span>
            </div>

            <p className='message-text'>
              hahaha
            </p>
          </div>
        </article>

        <article className='message' data-selfie-message>
          <p className='message-text' data-selfie-message>
            hahaha
          </p>
        </article>

        <article className='message'>
          <img
            className='user-icon'
            src="https://cdn.icon-icons.com/icons2/909/PNG/512/images_icon-icons.com_70941.png" 
            alt="message user icon"
          />

          <div className='message-infos-wrapper'>
            <div className='first-row'>
              <span className='username'>
                André Luiz
              </span>
              <span className='time'>
                1:48 AM
              </span>
            </div>

            <p className='message-text'>
              hahahahahaahahahahahaahahahahahahahahahahahahahahahahahahahahahahahahahahahhahahahahahaahhahahahahahahahahahah
            </p>
          </div>
        </article>

        <article className='message' data-selfie-message>
          <p className='message-text' data-selfie-message>
            hahaha
          </p>
        </article>

        <article className='message'>
          <img
            className='user-icon'
            src="https://cdn.icon-icons.com/icons2/909/PNG/512/images_icon-icons.com_70941.png" 
            alt="message user icon"
          />

          <div className='message-infos-wrapper'>
            <div className='first-row'>
              <span className='username'>
                André Luiz
              </span>
              <span className='time'>
                1:48 AM
              </span>
            </div>

            <p className='message-text'>
              hahaha
            </p>
          </div>
        </article>
      </main>
    </article>
  )
}