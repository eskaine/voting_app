import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { VoteProvider } from '../context/VoteContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <VoteProvider>
      <Component {...pageProps} />
    </VoteProvider>
  )
}

export default MyApp
