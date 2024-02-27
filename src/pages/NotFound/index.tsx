import './styles.scss';
import { PiSmileySadLight } from "react-icons/pi";
import Layout from '@components/Layout';

import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';

function NotFoundPage(): JSX.Element {

  const themeStore = useSelector((state: StoreState) => state.theme);

  return (
    <Layout>
      <div className='NotFoundPage'>
        <div className='Container'>
          <PiSmileySadLight className='Sad-face-icon' data-theme={themeStore.selectedTheme}/>
          <h1 className='Title' data-theme={themeStore.selectedTheme}>
            Page Not Found
          </h1>
          <h2 className='Subtitle' data-theme={themeStore.selectedTheme}>
            We couldn't find the page you are looking for.
          </h2>
        </div>
      </div>
    </Layout>
  );
}

export default NotFoundPage;

