import React from 'react';
import Head from 'next/head';

import {
  defaultTitle,
  defaultDescription,
  defaultKeywords,
} from 'lib/constants';

import 'styles/main.scss';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>{defaultTitle}</title>
        <meta property="og:title" content={defaultTitle} />
        <meta name="description" content={defaultDescription} />
        <meta name="keywords" content={defaultKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
