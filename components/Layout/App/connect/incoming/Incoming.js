/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import IncomingInsert from './IncomingInsert';
import IncomingUpdate from './IncomingUpdate';

const Incoming = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log( router.query.id )
    // return;
    if (!router.query.id) {
      const prefix = '/app/connect';
      Router.push(`${prefix}/incoming?id=3133`, `${prefix}/incoming`);
    }
  }, []);

  return (<>
    { !router.query.id && <IncomingInsert /> }
    { router.query.id && router.query.id !== '' && <IncomingUpdate /> }
  </>);
};

export default Incoming;
