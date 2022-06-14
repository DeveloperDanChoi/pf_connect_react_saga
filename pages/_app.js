import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import {
  useDispatch,
} from 'react-redux';
import Router, { useRouter } from 'next/router';
import {
  redirectToLoginAndList,
} from '../lib/helpers/routeHelper';
import wrapper from '../store/configureStore';
import {
  getCookie, hasAccessToken,
} from '../lib/cookie';
import {
  authorize,
} from '../store/authority/authority';
import '../styles/globals.scss';
// eslint-disable-next-line import/order
/* swiper */
// import 'swiper/swiper.scss';
// import 'swiper/components/navigation/navigation.scss';

import _ from 'lodash';
import FixedMeta from '../components/FixedMeta/FixedMeta';
import Layout from '../components/Layout/Layout';
import PcAddOnComponent from '../components/PcAddOnComponent';

const App = ({ Component, pageProps }) => {
  const { pageInfo } = pageProps;
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    query: { teamId, jwt },
    pathname,
  } = router;

  const routeChangeStart = (url) => {
    console.log('routeChangeStart', url);
  };
  const routeChangeComplete = (url) => {
    console.log('routeChangeComplete', url);
  };
  const routeChangeError = (url) => {
    console.log('routeChangeError', url);
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeComplete);
    Router.events.on('routeChangeError', routeChangeError);

    return () => {
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeComplete);
      Router.events.off('routeChangeError', routeChangeError);
    };
  }, []);

  /**
   * 토큰 확인 후에 도메인을 확인
   */
  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    dispatch(authorize(_.split(location.hostname, '.')[0]));
  }, []);

  return (
    <>
      <FixedMeta />
      <Layout {...pageInfo}>
          <Component {...pageProps} />
      </Layout>
      <PcAddOnComponent />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

export default wrapper.withRedux(App);
