/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,react/jsx-no-duplicate-props,guard-for-in,operator-assignment,no-unreachable,object-curly-newline,react/no-unescaped-entities,react/jsx-no-comment-textnodes,space-before-function-paren,array-callback-return */
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
    dispatch(authorize(location.hostname.split('.')[0]));
  }, []);

  return (
    <>
      <FixedMeta />
      <Layout {...pageInfo}>
        <Component {...pageProps} />
        <PcAddOnComponent />
      </Layout>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

export default wrapper.withRedux(App);
