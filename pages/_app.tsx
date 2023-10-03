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
import { LoginCheckContext } from './context';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = getClient();
  const [isLoading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);
  const init = async () => {
    // wait for firebase
    await auth.authStateReady();
    const user = await auth.currentUser;
    if (user) {
      setLogin(true);
    }
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
          <LoginCheckContext.Provider
            value={{ isLogin, setLogin, isLoading, setLoading }}
          >
            <Layout>
              <AuthProvider>
                {isLoading && <LoadingScreen />}
                {!isLoading && <Component {...pageProps} />}
              </AuthProvider>
            </Layout>
          </LoginCheckContext.Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
