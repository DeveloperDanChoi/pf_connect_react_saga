/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/rss/rss';
import { template1 } from '../../../../../service/connect';
import RssInsert from './RssInsert';
import RssUpdate from './RssUpdate';

const RSS = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log( router.query.id )
    return;
    if (!router.query.id) {
      const prefix = '/app/connect';
      Router.push(`${prefix}/rss?id=3186`, `${prefix}/rss`);
    }
  }, []);

  return (<>
    { !router.query.id && <RssInsert /> }
    { router.query.id && router.query.id !== '' && <RssUpdate /> }
  </>);
};

export default RSS;
/**
 * TODO: file 이벤트 전파 이슈?
 */