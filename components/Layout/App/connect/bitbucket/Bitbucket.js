import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import BitbucketInsert from './BitbucketInsert';
import BitbucketUpdate from './BitbucketUpdate';

const Bitbucket = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query.id);
    // if (!router.query.id) {
    //   const prefix = '/app/connect';
    //   Router.push(`${prefix}/bitbucket?id=25101`, `${prefix}/bitbucket`);
    // }
  }, []);

  return (<>
    { !router.query.id && <BitbucketInsert /> }
    { router.query.id && router.query.id !== '' && <BitbucketUpdate /> }
  </>);
};

export default Bitbucket;
