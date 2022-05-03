import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import {
  useDispatch,
} from 'react-redux';
import { useRouter } from 'next/router';
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
import '../styles/globals.css';
// eslint-disable-next-line import/order
import _ from 'lodash';
import FixedMeta from '../components/FixedMeta';
import Layout from '../components/Layout';

const App = ({ Component, pageProps }) => {
  const { pageInfo } = pageProps;
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    query: { teamId, jwt },
    pathname,
  } = router;

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
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

export default wrapper.withRedux(App);
