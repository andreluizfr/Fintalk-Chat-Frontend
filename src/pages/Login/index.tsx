import './styles.scss';
import StyledInput from '@components/StyledInput';

import { LoginService } from '@services/Login/LoginService';

import { StoreState } from '@store/redux/config';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function LoginPage(): JSX.Element {

  const themeStore = useSelector((state: StoreState) => state.theme);
  const languageStore = useSelector((state: StoreState) => state.language);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function onSubmit (e: React.FormEvent){
    e.preventDefault();

    const inputs = document.getElementsByClassName("Input") as HTMLCollection;

    setEmail((inputs[0] as HTMLInputElement).value);
    setPassword((inputs[1] as HTMLInputElement).value);
  }

  const loginResult = LoginService(email, password);

  useEffect(()=>{
    if(email!=="" && password!==""){
        loginResult.refetch();
        setEmail("");
        setPassword("");
    }
  }, [email, password]);

  useEffect(()=>{
    if(loginResult.isError && loginResult.error)
        toast.error(loginResult.error.httpStatusCode+": "+loginResult.error.message, {
            position: "top-center",
            hideProgressBar: true
        });

    else if(loginResult.data?.data)
        toast.success("Login realizado com sucesso, você será redirecionado em breve.", {
            position: "top-right",
            hideProgressBar: false
        });
  }, [loginResult.isError, loginResult.data, loginResult.error]);

  return (
    <main className='login-page' data-theme={themeStore.selectedTheme}>

        <form className='Login-form' onSubmit={onSubmit}>
            <h1 className='Title'>Entrar</h1>

            <StyledInput 
                title={languageStore.labels.email}
                warning={languageStore.messages.enterValidEmail}
                hasShow={false}
                theme={themeStore.selectedTheme}
                type='email'
                required
            />

            <StyledInput 
                title={languageStore.labels.password}
                warning={languageStore.messages.enterValidPassword}
                hasShow={true}
                theme={themeStore.selectedTheme}
                type='password'
                minLength={4}
                maxLength={60}
                required
            />

            <button className='Login-button' type='submit'>
                {languageStore.labels.login}
            </button>

            <div className='Remember-me-and-need-help-container'>
                <div className='Remember-me-checkbox'>
                    <label>
                        <input type='checkbox'/>
                        <span/>
                    </label>

                    <span>
                      {languageStore.messages.rememberMe}
                    </span>
                </div>

                <span className='Need-help'>
                  {languageStore.messages.needHelp}
                </span>
            </div>

            <div className='Aditional-infos-container'>
                <p className='New-members'>
                  {languageStore.messages.newHere} <strong>{languageStore.messages.signupNow}</strong>.
                </p>
                <p className='Recaptcha-notice'>
                  {languageStore.messages.reCaptcha} <a href="#">{languageStore.messages.learnMore}</a>
                </p>
            </div>
        </form>

    </main>
  );
}