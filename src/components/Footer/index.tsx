import './styles.scss';
import logoCropped from '@assets/img/logo-white-cropped.svg';
import mapMarkerIcon from '@assets/img/mapMarker.svg';
import telephoneInboundIcon from '@assets/img/telephoneInbound.svg';
import helpCircleIcon from '@assets/img/helpCircle.svg';

import { StoreState } from '@store/redux/config';
import { useSelector } from 'react-redux';

export default function Footer() {

  const languageStore = useSelector((state: StoreState) => state.language);
  const themeStore = useSelector((state: StoreState) => state.theme);

  return (
    <footer className='page-footer' data-theme={themeStore.selectedTheme}>
      <div className='footer-container'>
        <section className='section-column'>
          <div className='section-wrapper'>
            <img
              className='logo'
              src={logoCropped}
              alt='logo'
              width={6 * parseFloat(getComputedStyle(document.documentElement).fontSize)}
              height='auto'
              decoding='async'
            />
            <p className='info'>
              <img src={mapMarkerIcon} alt='map marker icon' style={{filter: "invert(1)"}} width={16} height='auto'/>
              {" "+languageStore.labels.footerAddress}
            </p>
            <p className='info'>{languageStore.labels.footerCityStateCountry}</p>
            <p className='info'>
              <img src={telephoneInboundIcon} alt='telephone inbound icon' style={{filter: "invert(1)"}} width={12} height='auto'/>
              {" "+languageStore.labels.footerPhoneNumber}
            </p>
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
            <p className='link'>
              <img src={helpCircleIcon} alt='help circle icon' style={{filter: "invert(1)"}} width={16} height='auto'/>
              {languageStore.labels.help}
            </p>
          </div>
        </section>
      </div>
    </footer>
  )
}