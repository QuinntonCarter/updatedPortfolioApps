import React, { useState, useCallback } from 'react';

import Layout from 'components/Layout';
import Button from 'components/Button';
import {
  defaultTitle,
  defaultDescription,
  defaultKeywords,
} from 'lib/constants';
import api from 'lib/api';

const layoutProps = {
  title: defaultTitle,
  description: defaultDescription,
  keywords: defaultKeywords,
};

export const getServerSideProps = async () => {
  try {
    const response = await api.get('random-positive-int');
    if (response && response.status === 200) {
      const { number: randomPositiveInt } = response.data;
      return { props: { randomPositiveInt } };
    }
  } catch (error) {
    // Do nothing
  }

  return { props: { randomPositiveInt: 0 } };
};

const SsrPage = ({ randomPositiveInt }) => {
  const [counter, setCounter] = useState(randomPositiveInt);
  const incrementCounter = useCallback(() => {
    setCounter(counter + 1);
  }, [counter]);

  return (
    <Layout {...layoutProps}>
      <div className="main common">
        <section className="main__section">
          <h1 className="main__title">
            This page was server-side rendered (SSR)!
          </h1>
          <p>This is always built when requested.</p>
          <p>
            The button starts as if having been clicked {randomPositiveInt} time
            {randomPositiveInt === 1 ? '' : 's'}.
          </p>
          <Button onClick={incrementCounter}>
            This button has been clicked {counter} time
            {counter === 1 ? '' : 's'}!
          </Button>
        </section>
      </div>
    </Layout>
  );
};

export default SsrPage;
