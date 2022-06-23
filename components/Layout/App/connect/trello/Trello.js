/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import TrelloInsert from './TrelloInsert';
import TrelloUpdate from './TrelloUpdate';

const Trello = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log( router.query.id )
    // return;
    if (!router.query.id) {
      const prefix = '/app/connect';
      Router.push(`${prefix}/trello?id=25099`, `${prefix}/trello`);
    }
  }, []);

  return (<>
    { !router.query.id && <TrelloInsert /> }
    { router.query.id && router.query.id !== '' && <TrelloUpdate /> }
  </>);
};

export default Trello;
