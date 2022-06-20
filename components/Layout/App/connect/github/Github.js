/* eslint-disable max-len */
import React, { useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/github/github';
import { template1 } from '../../../../../service/connect';
import Thumbnail from '../../../../ui/Thumbnail/Thumbnail';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';
import GithubInsert from "./GithubInsert";
import GithubUpdate from "./GithubUpdate";

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
