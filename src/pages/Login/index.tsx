import './styles.scss';
import logo from '@assets/img/logo.png';
import Layout from '@components/Layout';
import StyledInput from '@components/StyledInput';

import { LoginService } from '@services/Login/LoginService';

import { StoreState } from '@store/redux/config';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';


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
        toast.error(loginResult.error.message, {
            position: "top-center",
            hideProgressBar: true,
            theme: themeStore.selectedTheme
        });

    else if(loginResult.data?.data)
        toast.success(languageStore.messages.loginSuccessful, {
            position: "top-right",
            hideProgressBar: false,
            theme: themeStore.selectedTheme
        });
  }, [loginResult.isError, loginResult.data, loginResult.error]);

  return (
    <Layout>
      <main className='login-page' data-theme={themeStore.selectedTheme}>

        <Helmet>
          <meta property="og:title" content="Fintalk chat login" />
          <meta property="og:url" content="http://localhost/login" />
          <meta property="og:image" content={logo} />
          <meta property="og:image:alt" content="Fintalk logo" />
          <meta property="og:description" content="Login to chat with people from worldwide" />
          <meta property="og:site_name" content="Fintalk" />
        </Helmet>

        <form className='Login-form' onSubmit={handleSubmit(onSubmit)} data-theme={themeStore.selectedTheme}>
            
            <h1 className='Title'>Entrar</h1>

            <StyledInput 
              title={languageStore.labels.email}
              hasShow={false}
              theme={themeStore.selectedTheme}
              type='email'
              {...register("email")}
              maxLength={128}
            />

            <StyledInput 
              title={languageStore.labels.password}
              hasShow={true}
              theme={themeStore.selectedTheme}
              type='password'
              {...register("password")}
              maxLength={128}
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
    </Layout>
  );
}