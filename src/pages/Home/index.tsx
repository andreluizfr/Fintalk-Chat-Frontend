import './styles.scss';
import Layout from '@components/Layout';

import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';

export default function HomePage(): JSX.Element {

  const themeStore = useSelector((state: StoreState) => state.theme);
  const languageStore = useSelector((state: StoreState) => state.language);

  return (
    <Layout>
      <main className='home-page' data-theme={themeStore.selectedTheme}>
        <h1 className='welcome-text' data-theme={themeStore.selectedTheme}>
          {languageStore.messages.welcome}
        </h1>
        <h2 className='welcome-subtitle-text' data-theme={themeStore.selectedTheme}>
          {languageStore.messages.welcomeSubtitle}
        </h2>
      </main>
    </Layout>
  );
}