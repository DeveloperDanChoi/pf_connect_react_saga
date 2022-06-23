/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import BitbucketInsert from './BitbucketInsert';
import BitbucketUpdate from './BitbucketUpdate';

const Bitbucket = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log( router.query.id )
    // return;
    if (!router.query.id) {
      const prefix = '/app/connect';
      Router.push(`${prefix}/bitbucket?id=25093`, `${prefix}/bitbucket`);
    }
  }, []);

  return (<>
    { !router.query.id && <BitbucketInsert /> }
    { router.query.id && router.query.id !== '' && <BitbucketUpdate /> }
  </>);
};

export default Bitbucket;
