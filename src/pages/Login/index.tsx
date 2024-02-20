import './styles.scss';
import StyledInput from '@components/StyledInput';

import { LoginService } from '@services/Login/LoginService';

import { StoreState } from '@store/redux/config';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";

interface loginForm {
  email: string,
  password: string,
}

export default function LoginPage(): JSX.Element {

  const themeStore = useSelector((state: StoreState) => state.theme);
  const languageStore = useSelector((state: StoreState) => state.language);

  const { register, handleSubmit } = useForm<loginForm>();

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  function onSubmit(data: loginForm) {
    setEmail(data.email);
    setPassword(data.password);
  }

  const loginResult = LoginService(email, password);

  useEffect(()=>{
    if(email && password){
        loginResult.refetch();
        setEmail(null);
        setPassword(null);
    }
  }, [email, password]);

  useEffect(()=>{
    if(loginResult.isError && loginResult.error)
        toast.error(loginResult.error.httpStatusCode+": "+loginResult.error.message, {
            position: "top-center",
            hideProgressBar: true
        });

    else if(loginResult.data?.data)
        toast.success(languageStore.messages.loginSuccessful, {
            position: "top-right",
            hideProgressBar: false
        });
  }, [loginResult.isError, loginResult.data, loginResult.error]);

  return (
    <main className='login-page' data-theme={themeStore.selectedTheme}>

        <form className='Login-form' onSubmit={handleSubmit(onSubmit)} data-theme={themeStore.selectedTheme}>
            
            <h1 className='Title'>Entrar</h1>

            <StyledInput 
              title={languageStore.labels.email}
              hasShow={false}
              theme={themeStore.selectedTheme}
              type='email'
              {...register("email")}
            />

            <StyledInput 
              title={languageStore.labels.password}
              hasShow={true}
              theme={themeStore.selectedTheme}
              type='password'
              {...register("password")}
            />

            <button className='Login-button' type='submit'>
                {languageStore.labels.login}
            </button>

            <div className='Remember-me-and-need-help-container'>
                <div className='Remember-me-checkbox'>
                    <input type='checkbox' data-theme={themeStore.selectedTheme}/>

                    <span data-theme={themeStore.selectedTheme}>
                      {languageStore.messages.rememberMe}
                    </span>
                </div>

                <span className='Need-help' data-theme={themeStore.selectedTheme}>
                  {languageStore.messages.needHelp}
                </span>
            </div>

            <div className='Aditional-infos-container' data-theme={themeStore.selectedTheme}>
                <p className='New-members' data-theme={themeStore.selectedTheme}>
                  {languageStore.messages.newHere} <strong>{languageStore.messages.signupNow}</strong>.
                </p>
                <p className='Recaptcha-notice' data-theme={themeStore.selectedTheme}>
                  {languageStore.messages.reCaptcha} <a href="#">{languageStore.messages.learnMore}</a>
                </p>
            </div>
        </form>

    </main>
  );
}