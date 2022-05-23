import React, { useEffect } from 'react';
import Router, {useRouter, withRouter} from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ConnectList from './App/connect/ConnectCard';
import { setBannerHide } from '../../store/connect/connect';
import { helpUrl, surveyUrl } from '../../constants/path';
import Header from './Header';
import Left from './Left';

const Layout = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (<>
    {/* theme dark light */}
    {/*<div id="jndApp" className={`jdConnect-wrap ${theme.theme}`}>*/}
    <div id="jndApp" className={`jdConnect-wrap ${props.theme}`}>
      {/* 헤더 영역*/}
      <Header />
      {/* 메뉴 영역 */}
      <div className='jdConnect-container'>
        <Left />
        {/* 서비스 목록 */}
        { router.pathname === '/app' && <ConnectList {...props}/> }
        { router.pathname !== '/app' && <main>{props.children}</main> }
      </div>
    </div>
  </>);
};

export default withRouter(Layout);
