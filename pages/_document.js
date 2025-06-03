import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/heart-icon.png" type="image/png" />
        <meta name="theme-color" content="#ff3366" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
