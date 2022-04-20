// Inside this file '_app' we'll insert all the components will appear on all pages

import { AppProps } from 'next/app'
import { Header } from '../components/Header';

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
