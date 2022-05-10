import React, { useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ConnectList from './connect/ConnectCard';
import { setBannerHide } from '../store/connect/connect';
import { helpUrl, surveyUrl } from '../constants/path';

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
  });

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
    {props.children}
    {/* 배너 영역 */}
    <article className={ connect.bannerHide } style={{ border: '1px solid' }}>
      <p>잔디 커넥트를 처음 사용하시나요? 이제 Google 캘린더, Trello, GitHub, JIRA 등을 연동하여 잔디에서 알림을 받아보세요.</p>
      <button onClick={banner.close}>X</button>
      <button onClick={banner.help}>더 알아보기</button>
    </article>
    {/* 서비스 목록 */}
    <ConnectList {...props}/>
    {/* 배너 영역 */}
    <article style={{ border: '1px solid' }}>
      <p>잔디 커넥트에 더 추가를 원하시는 서비스가 있으신가요?</p>
      <button onClick={banner.survey}>서비스 연동 요청하기</button>
    </article>
  </>);
};

export default withRouter(Layout);
