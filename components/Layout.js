import React, { useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ConnectList from './connect/ConnectCard';
import { setBannerHide } from '../store/connect/connect';
import { helpUrl, surveyUrl } from '../constants/path';
import Header from './Header';
import Left from './Left';

const Layout = (props) => {
  const dispatch = useDispatch();
  const { connect, user } = useSelector((state) => state);
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
   * 배너
   * @type {{link: link, close: close}}
   */
  const banner = (({ lang }) => {
    /**
     * 배너 닫기
     */
    const close = () => {
      dispatch(setBannerHide('none'));
    };
    /**
     * 더 알아보기<br>
     */
    const help = () => {
      window.open(helpUrl[lang]);
    };
    /**
     * 서비스 연동 요청하기<br>
     */
    const survey = () => {
      // window.open(surveyUrl.ko + '?email=' + primary.email);
      window.open(surveyUrl[lang]);
    };
    return {
      close, help, survey,
    };
  })(user.user);

  return (<>
  <div className='jdConnect-wrap'>
    {props.children}
    {/* 헤더 영역*/}
    <Header />
    {/* 메뉴 영역 */}
    <div className='jdConnect-container'>
      <Left />
      {/* 배너 영역 */}
     
      {/* 서비스 목록 */}
      <ConnectList {...props}/>
    </div>
    {/* 배너 영역 */}
 
  </div>
  </>);
};

export default withRouter(Layout);
