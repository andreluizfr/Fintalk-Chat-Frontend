import './styles.scss';
import logoCropped from '@assets/img/logo-white-cropped.svg';

import { FaMapMarkerAlt } from "react-icons/fa";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { IoIosHelpCircle } from "react-icons/io";

import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';

export default function Footer() {

  const languageStore = useSelector((state: StoreState) => state.language);

  return (
    <footer className='page-footer'>
      <div className='footer-container'>
        <section className='section-column'>
          <div className='section-wrapper'>
            <img
              className='logo'
              src={logoCropped}
              alt='logo'
            />
            <p className='info'><FaMapMarkerAlt/>{languageStore.labels.footerAddress}</p>
            <p className='info'>{languageStore.labels.footerCityStateCountry}</p>
            <p className='info'><BsFillTelephoneInboundFill/>{languageStore.labels.footerPhoneNumber}</p>
          </div>
        </section>

        <section className='section-column'>
          <div className='section-wrapper'>
            <h1 className='section-title'>{languageStore.labels.company}</h1>
            <p className='link'>{languageStore.labels.aboutFintalk}</p>
            <p className='link'>{languageStore.labels.workWithUs}</p>
            <p className='link'>{languageStore.labels.clients}</p>
          </div>
        </section>

        <section className='section-column'>
          <div className='section-wrapper'>
            <h1 className='section-title'>{languageStore.labels.funcionalities}</h1>
            <p className='link'>{languageStore.labels.press}</p>
            <p className='link'>{languageStore.labels.prices}</p>
          </div>
        </section>

        <section className='section-column'>
          <div className='section-wrapper'>
            <h1 className='section-title'>{languageStore.labels.support}</h1>
            <p className='link'>{languageStore.labels.documentation}</p>
            <p className='link'>{languageStore.labels.apiReference}</p>
          </div>
        </section>

        <section className='section-column'>
          <div className='section-wrapper'>
            <h1 className='section-title'>{languageStore.labels.help}</h1>
            <p className='link'><IoIosHelpCircle/>{languageStore.labels.help}</p>
          </div>
        </section>
      </div>
    </footer>
  )
}