/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import JiraInsert from './JiraInsert';
import JiraUpdate from './JiraUpdate';

const Jira = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log( router.query.id )
    // return;
    if (!router.query.id) {
      const prefix = '/app/connect';
      Router.push(`${prefix}/jira?id=2609`, `${prefix}/jira`);
    }
  }, []);

  return (<>
    { !router.query.id && <JiraInsert /> }
    { router.query.id && router.query.id !== '' && <JiraUpdate /> }
  </>);
};

export default Jira;
