import type { AppProps } from 'next/app';
import Layout from '../app/layout';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import { GlobalStyle } from '@/styles/global';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
