/* eslint-disable max-len */
import React, { useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/outgoing/outgoing';
import { template1 } from '../../../../../service/connect';
import Thumbnail from "../../../../ui/Thumbnail/Thumbnail";
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';
/* swiper */
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import OutgoingInsert from "./OutgoingInsert";
import OutgoingUpdate from "./OutgoingUpdate";

SwiperCore.use([ Navigation]);

const Outgoing = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { team, outgoing } = useSelector((state) => {
    return state;
  });

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
