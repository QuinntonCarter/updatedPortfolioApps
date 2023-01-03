import React, { useState } from 'react';
import Head from 'next/head';

import Loading from 'components/Loading';
import Header from './Header';
import Footer from './Footer';

export const LoadingContext = React.createContext({
  showLoading: () => null,
  hideLoading: () => null,
});

const Layout = ({ children, title, description, keywords }) => {
  const [isLoading, setIsLoading] = useState(false);

  const loadingContextValue = {
    showLoading: () => setIsLoading(true),
    hideLoading: () => setIsLoading(false),
  };

  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        {title && <meta property="og:title" content={title} />}
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
      </Head>
      <Loading isShowing={isLoading} />
      <div className="wrapper">
        <Header />
        <LoadingContext.Provider value={loadingContextValue}>
          {children}
        </LoadingContext.Provider>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
