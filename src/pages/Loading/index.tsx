import './styles.scss';

import DotLoader from "react-spinners/DotLoader";

export default function Loading(): JSX.Element {

  return (
    <main className='LoadingPage'>
      <DotLoader
        className='Loader'
        color="rgb(229,9,20)"
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </main>
  );

}