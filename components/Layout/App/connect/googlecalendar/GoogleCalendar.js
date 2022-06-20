/* eslint-disable max-len */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/googleCalendar/googleCalendar';
import { template1 } from '../../../../../service/connect';
import Thumbnail from "../../../../ui/Thumbnail/Thumbnail";
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';
import GoogleCalendarInsert from "./GoogleCalendarInsert";
import GoogleCalendarUpdate from "./GoogleCalendarUpdate";

const GoogleCalendar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log( router.query.id )
    // return;
    if (!router.query.id) {
      const prefix = '/app/connect';
      Router.push(`${prefix}/googleCalendar?id=3180`, `${prefix}/googleCalendar`);
    }
  }, []);

  return (<>
    { !router.query.id && <GoogleCalendarInsert /> }
    { router.query.id && router.query.id !== '' && <GoogleCalendarUpdate /> }
  </>);
};

export default GoogleCalendar;
