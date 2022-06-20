/* eslint-disable max-len */
import React, { useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/incoming/incoming';
import { template1 } from '../../../../../service/connect';
import Thumbnail from "../../../../ui/Thumbnail/Thumbnail";
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';
/* swiper */
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import IncomingInsert from "./IncomingInsert";
import IncomingUpdate from "./IncomingUpdate";

SwiperCore.use([Navigation]);

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
