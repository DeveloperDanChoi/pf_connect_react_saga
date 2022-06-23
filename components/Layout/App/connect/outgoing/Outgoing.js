/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import OutgoingInsert from './OutgoingInsert';
import OutgoingUpdate from './OutgoingUpdate';

const Outgoing = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log( router.query.id )
    // return;
    if (!router.query.id) {
      const prefix = '/app/connect';
      Router.push(`${prefix}/outgoing?id=2821`, `${prefix}/outgoing`);
    }
  }, []);

  return (<>
    { !router.query.id && <OutgoingInsert /> }
    { router.query.id && router.query.id !== '' && <OutgoingUpdate /> }
  </>);
};

export default Outgoing;
