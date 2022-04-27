import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import Link from "next/Link";
import Router, { useRouter, withRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header/Header';
import ConnectList from "./connect/ConnectList";

const Layout = (props) => {
  const { team, connect } = useSelector((state) => {
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

  useEffect(() => {
    if (isMobile) document.getElementById('jndApp').className = 'color-scheme-green mac is-mobile';
    else document.getElementById('jndApp').className = 'color-scheme-green mac';
  }, []);

  /**
   * 초기 진입 시 3개의 api 호출
   promises.push(JndConnectApi.getList());
   promises.push(JndConnectApi.getAllAuth());
   promises.push(JndConnectApi.getConnectInfo());
   */
  useEffect(() => {
    if (team.teamId === 0) return;
  }, [team.teamId]);

  return (
      <>
        {props.children}
        { team.teamId > 0 && <div>{team.teamId}</div> }
        <div>잔디 커넥트를 처음 사용하시나요? 이제 Google 캘린더, Trello, GitHub, JIRA 등을 연동하여 잔디에서 알림을 받아보세요.<button>X</button></div>
        <button>더 알아보기</button>
        <div>연동 가능한 서비스 목록</div>
        <ConnectList {...props}/>
        <div>잔디 커넥트에 더 추가를 원하시는 서비스가 있으신가요?</div>
        <button>서비스 연동 요청하기</button>
      </>
  );
};

Layout.propTypes = {
  // headerTitle: PropTypes.string,
  // hasHeader: PropTypes.bool,
  // isMobile: PropTypes.bool,
  // headerDisabled: PropTypes.bool,
  // leftDisabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default withRouter(Layout);
