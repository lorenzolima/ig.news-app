// Inside this file '_app' we'll insert all the components will appear on all pages

import { AppProps } from 'next/app'
import { Header } from '../components/Header';
import { SessionProvider as NextAuthProvider } from 'next-auth/react'

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
