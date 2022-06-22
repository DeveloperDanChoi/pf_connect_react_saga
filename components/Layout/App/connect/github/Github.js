/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import GithubInsert from './GithubInsert';
import GithubUpdate from './GithubUpdate';

const Github = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log( router.query.id )
    return;
    if (!router.query.id) {
      const prefix = '/app/connect';
      Router.push(`${prefix}/github?id=3108`, `${prefix}/github`);
    }
  }, []);

  return (<>
    { !router.query.id && <GithubInsert /> }
    { router.query.id && router.query.id !== '' && <GithubUpdate /> }
  </>);
};

export default Github;
