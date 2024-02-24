import './styles.scss';
import StyledInput from '@components/StyledInput';

import { CreateUserService } from '@services/CreateUser/CreateUserService';

import { StoreState } from '@store/redux/config';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";

interface registerForm {
  name: string,
  email: string,
  password: string,
  birthdate: Date,
}

export default function SignupPage(): JSX.Element {

  const themeStore = useSelector((state: StoreState) => state.theme);
  const languageStore = useSelector((state: StoreState) => state.language);

  const { register, handleSubmit } = useForm<registerForm>();

  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [birthdate, setBirthdate] = useState<Date | null>(null);

  function onSubmit(data: registerForm) {
    setName(data.name);
    setEmail(data.email);
    setPassword(data.password);
    setBirthdate(data.birthdate);
  }

  const createUserResult = CreateUserService(name, email, password, birthdate);

  useEffect(() => {
    if (name && email && password && birthdate) {
      createUserResult.refetch();
      setName(null);
      setEmail(null);
      setPassword(null);
      setBirthdate(null);
    }
  }, [name, email, password, birthdate]);

  useEffect(() => {
    if (createUserResult.isError && createUserResult.error)
      toast.error(createUserResult.error.message, {
        position: "top-center",
        hideProgressBar: true,
        theme: themeStore.selectedTheme
      });

    else if (createUserResult.data?.data)
      toast.success(languageStore.messages.signupSuccessful, {
        position: "top-right",
        hideProgressBar: false,
        theme: themeStore.selectedTheme
      });
  }, [createUserResult.isError, createUserResult.data, createUserResult.error]);

  return (
    <main className='signup-page' data-theme={themeStore.selectedTheme}>

      <form className='Signup-form' onSubmit={handleSubmit(onSubmit)} data-theme={themeStore.selectedTheme}>

        <h1 className='Title'>Registrar</h1>

        <StyledInput
          title={"Nome"}
          warning={languageStore.messages.enterName}
          hasShow={false}
          theme={themeStore.selectedTheme}
          type='text'
          {...register("name")}
          required
        />

        <StyledInput
          title={languageStore.labels.email}
          warning={languageStore.messages.enterValidEmail}
          hasShow={false}
          theme={themeStore.selectedTheme}
          type='email'
          {...register("email")}
          required
        />

        <StyledInput
          title={languageStore.labels.password}
          warning={languageStore.messages.enterValidPassword}
          hasShow={true}
          theme={themeStore.selectedTheme}
          type='password'
          {...register("password")}
          minLength={4}
          maxLength={60}
          required
        />

        <input 
          className="BirthdateInput"
          data-theme={themeStore.selectedTheme}
          type="date"
          {...register("birthdate")}
          required
        />

        <button className='Signup-button' type='submit'>
          {languageStore.labels.signup}
        </button>
      </form>

    </main>
  );
}