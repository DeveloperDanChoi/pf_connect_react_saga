import React from 'react';
import Head from 'next/head';

const FixedMeta = () => (
  <Head>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"
    />
    <meta name="msapplication-TileColor" content="#da532c" />
  </Head>
);

export default React.memo(FixedMeta);
