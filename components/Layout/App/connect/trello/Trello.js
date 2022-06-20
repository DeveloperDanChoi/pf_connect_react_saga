/* eslint-disable max-len */
import React, { useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/trello/trello';
import { template1 } from '../../../../../service/connect';
import Thumbnail from "../../../../ui/Thumbnail/Thumbnail";
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';
import BitbucketInsert from "../bitbucket/BitbucketInsert";
import BitbucketUpdate from "../bitbucket/BitbucketUpdate";
import TrelloInsert from "./TrelloInsert";
import TrelloUpdate from "./TrelloUpdate";

const Trello = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log( router.query.id )
    // return;
    if (!router.query.id) {
      const prefix = '/app/connect';
      Router.push(`${prefix}/trello?id=3135`, `${prefix}/trello`);
    }
  }, []);



  return (<>
    { !router.query.id && <TrelloInsert /> }
    { router.query.id && router.query.id !== '' && <TrelloUpdate /> }
  </>);
};

export default Trello;
