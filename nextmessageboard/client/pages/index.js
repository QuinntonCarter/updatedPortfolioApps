import React, { useState, useCallback } from 'react';

import Layout from 'components/Layout';
import Button from 'components/Button';
import {
  defaultTitle,
  defaultDescription,
  defaultKeywords,
} from 'lib/constants';

const layoutProps = {
  title: defaultTitle,
  description: defaultDescription,
  keywords: defaultKeywords,
};

const IndexPage = () => {
  const [counter, setCounter] = useState(0);
  const incrementCounter = useCallback(() => {
    setCounter(counter + 1);
  }, [counter]);

  return (
    <Layout {...layoutProps}>
      <div className="main common">
        <section className="main__section">
          <h1 className="main__title">
            Welcome to a Simple Next.js Boilerplate!
          </h1>
          <p>
            This is a simple boilerplate for Next.js, with TypeScript,
            SASS/SCSS, Styled Components, Jest, ESLint, Prettier, and deployed
            with Vercel.
          </p>
          <p>Click the button, have some fun.</p>
          <Button onClick={incrementCounter}>
            This button has been clicked {counter} time
            {counter === 1 ? '' : 's'}!
          </Button>
        </section>
      </div>
    </Layout>
  );
};

export default IndexPage;
