import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from "next/Link";
import Router, { useRouter, withRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header/Header';
import ConnectList from "./connect/ConnectCard";
import { setBannerHide } from '../store/connect/connect';
import { helpUrl, surveyUrl } from '../constants/path';

const Layout = (props) => {
  const { team, connect } = useSelector((state) => {
      console.log( state )
    return state;
  });
  const { isMobile } = props;
  const router = useRouter();
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  Router.events.on('routeChangeStart', (url) => {
    console.log('routeChangeStart', url);
  });
  // eslint-disable-next-line no-unused-vars
  Router.events.on('routeChangeComplete', (url) => {
    console.log('routeChangeComplete', url);
  });
  // eslint-disable-next-line no-unused-vars
  Router.events.on('routeChangeError', (url) => {
    console.log('routeChangeError', url);
  });

  /**
   * 배너
   * @type {{link: link, close: close}}
   */
  const banner = (() => {
    const close = () => {
      dispatch(setBannerHide('none'));
    };
    /**
     * 설문조사 url 을 설정한다.
     * @private
     */
    function _initSurveyUrl() {
      var account = Account.getAccount();
      var surveyUrl = 'https://jandi.typeform.com/to/OtcRfH';
      var helpUrl = '';


      var primary = _.find(account.emails, function(email) {
        //Member Authority 추가되면서 primary --> isPrimary 로 변경. 하위 호환성 유지를 위해 둘다 체크함
        //fixme: Member Authority 배포 이후 primary 로 검사하는 코드 제거
        return email.primary || email.isPrimary;
      });

      switch (Language.getCurrentLanguage()) {
        case 'ko':
          surveyUrl = 'https://tosslab.typeform.com/to/Xk94B2';
          helpUrl = 'https://support.jandi.com/hc/ko/articles/207499586-%EC%9E%94%EB%94%94-%EC%BB%A4%EB%84%A5%ED%8A%B8%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80%EC%9A%94-';
          break;
        case 'ja':
          surveyUrl = 'https://tosslab.typeform.com/to/uA6Hvi';
          helpUrl = 'https://support.jandi.com/hc/ja/articles/115004542106-JANDI%E3%82%B3%E3%83%8D%E3%82%AF%E3%83%88%E3%81%A8%E3%81%AF%E3%81%AA%E3%82%93%E3%81%A7%E3%81%99%E3%81%8B-';
          break;
        case 'en':
          surveyUrl = 'https://tosslab.typeform.com/to/wUUvXJ';
          helpUrl = 'https://support.jandi.com/hc/en-us/articles/210865903-Understanding-JANDI-Connect';
          break;
        case 'zh-tw':
          surveyUrl = 'https://tosslab.typeform.com/to/oOxBOX';
          helpUrl = 'https://support.jandi.com/hc/zh-tw/articles/213392286-a-%E4%BB%80%E9%BA%BC%E6%98%AF-JANDI-Connect-';
          break;
        case 'zh-cn':
          surveyUrl = 'https://tosslab.typeform.com/to/lAYkIS';
          helpUrl = 'https://support.jandi.com/hc/zh-tw/articles/213392286-a-%E4%BB%80%E9%BA%BC%E6%98%AF-JANDI-Connect-';
          break;
        case 'vi':
          surveyUrl = 'https://tosslab.typeform.com/to/wUUvXJ';
          helpUrl = 'https://support.jandi.com/hc/en-us/articles/210865903-Understanding-JANDI-Connect';
          break;
      }
      $scope.surveyUrl = surveyUrl + '?email=' + primary.email;
      $scope.helpUrl = helpUrl;
    }
    const link = () => {
      window.open(helpUrl.ko);
    };
    const survey = () => {
      // window.open(surveyUrl.ko + '?email=' + primary.email);
      window.open(surveyUrl.ko);
    };
    return {
      close, link, survey,
    };
  })();

  useEffect(() => {
    if (isMobile) document.getElementById('jndApp').className = 'color-scheme-green mac is-mobile';
    else document.getElementById('jndApp').className = 'color-scheme-green mac';
  }, []);

  return (<>
    {props.children}
    {/* 배너 영역 */}
    <article className={ connect.bannerHide } style={{ border: '1px solid' }}>
      <p>잔디 커넥트를 처음 사용하시나요? 이제 Google 캘린더, Trello, GitHub, JIRA 등을 연동하여 잔디에서 알림을 받아보세요.</p>
      <button onClick={banner.close}>X</button>
      <button onClick={banner.link}>더 알아보기</button>
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
