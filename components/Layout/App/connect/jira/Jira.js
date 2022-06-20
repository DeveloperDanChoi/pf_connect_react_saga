/* eslint-disable max-len */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/jira/jira';
import { template1 } from '../../../../../service/connect';
import Thumbnail from "../../../../ui/Thumbnail/Thumbnail";
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';
/* swiper */
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import JiraInsert from "./JiraInsert";
import JiraUpdate from "./JiraUpdate";

SwiperCore.use([ Navigation]);

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
