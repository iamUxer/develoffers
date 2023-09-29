import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import { GlobalStyle } from '@/styles/global';
import { useContext, useEffect, useState } from 'react';
import LoadingScreen from '@/components/loading-screen';
import { auth } from '@/firebase';
import AuthProvider from '@/components/auth-provider';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { getClient } from './queryClient';
import { AppContext } from './context';

export default function App({ Component, pageProps }: AppProps) {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const queryClient = getClient();
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
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <AuthProvider>
            <AppContext.Provider value={{ isUpdate, setIsUpdate }}>
              <Layout>
                {isLoading && <LoadingScreen />}
                {!isLoading && <Component {...pageProps} />}
              </Layout>
            </AppContext.Provider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
