import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="kor">
      <Head>
        <link rel="shortcut icon" href="#" />
      </Head>
      <body>
        <Main />
        <div id="modal-root"></div>
        <NextScript />
      </body>
    </Html>
  );
}
