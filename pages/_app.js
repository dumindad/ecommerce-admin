import { ProductProvider } from '@/context/ProductContext';
import '@/styles/globals.css';
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <ToastContainer position='bottom-right' />
      <SessionProvider session={session}>
        <ProductProvider>

          <Component {...pageProps} />
        </ProductProvider>
      </SessionProvider>
    </>
  )
}
