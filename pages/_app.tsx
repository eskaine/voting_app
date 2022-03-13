import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { BallotProvider } from '../provider/BallotProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BallotProvider>
      <Component {...pageProps} />
    </BallotProvider>
  )
}

export default MyApp
