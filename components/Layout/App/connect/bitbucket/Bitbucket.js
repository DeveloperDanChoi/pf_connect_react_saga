/* eslint-disable max-len */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/bitbucket/bitbucket';
import { template1 } from '../../../../../service/connect';
import Thumbnail from "../../../../ui/Thumbnail/Thumbnail";
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';
/* swiper */
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import BitbucketInsert from "./BitbucketInsert";
import BitbucketUpdate from "./BitbucketUpdate";

SwiperCore.use([ Navigation]);

const Bitbucket = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log( router.query.id )
    if (!router.query.id) {
      const prefix = '/app/connect';
      Router.push(`${prefix}/bitbucket?id=1577`, `${prefix}/bitbucket`);
    }
  }, []);

  return (<>
    { !router.query.id && <BitbucketInsert /> }
    { router.query.id && router.query.id !== '' && <BitbucketUpdate /> }
  </>);
};

export default Bitbucket;
