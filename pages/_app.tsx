import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import { GlobalStyle } from '@/styles/global';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/loading-screen';
import { auth } from '@/firebase';

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    // wait for firebase
    await auth.authStateReady();
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          {isLoading && <LoadingScreen />}
          {!isLoading && <Component {...pageProps} />}
        </Layout>
      </ThemeProvider>
    </>
  );
}
