/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Router, { useRouter, withRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ConnectList from './App/connect/ConnectCard';
import { helpUrl, surveyUrl } from '../../constants/path';
import Header from './Header';
import Left from './Left';

const Layout = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (<>
    {/* theme dark light */}
    {/* <div id="jndApp" className={`jdConnect-wrap ${theme.theme}`}> */}
    <div id="jndApp" className={`jdConnect-wrap ${props.theme}`}>
      {/* 헤더 영역 */}
      <Header />
      {/* 메뉴 영역 */}
      <div className='jdConnect-container'>
        <Left />
        {/* 서비스 목록 */}
        { router.pathname === '/app' && <ConnectList {...props}/> }
        { router.pathname !== '/app' && <main>{props.children}</main> }
      </div>
       {/* modal */}
       <div className='modal-container' style={{ display: 'none' }}>
         <div className='modal-box'>
           <p>이 잔디 커넥트 항목을 중지하시겠습니까? 중지하실 경우 더이상 연동된 서비스의 변경 사항을 메시지로 받아보실 수 없습니다.</p>
           <div className='btn-box'>
             <button type='button' className='btn-cancel'>취소</button>
             <button type='button' className='btn-ok'>중지하기</button>
           </div>
         </div>
       </div>
       {/* // modal */}
       {/* toast */}
       <div id="toast-container" className="toast-top-center" style={{ display: 'none' }}>
         {/* 연결 성공 case */}
         <div className="ng-scope">
          <div className="toast c-toast-success">
            <i className="icon-delete toast-close-button ng-scope"></i>
            <i className="status-icon icon-check-circle"></i>
            <div className="toast-text" >
              <div className="toast-message">잔디 커넥트 항목이 업데이트 되었습니다.</div>
            </div>
          </div>
        </div>
        {/* 연결 실패 case */}
        <div className="ng-scope">
          <div className="toast c-toast-warning">
            <i className="icon-delete toast-close-button ng-scope"></i>
            <i className="status-icon icon-warning-triangle-fill"></i>
            <div className="toast-text" >
              <div className="toast-message">잔디 커넥트 연동에 실패하였습니다.</div>
            </div>
          </div>
        </div>
        {/*
        [D] : 현재 그 외 case는 없지만 추후 생길 가능성 잇으므로 주석.
        <div className="ng-scope">
          <div className="toast c-toast-error">
            <i className="icon-delete toast-close-button ng-scope"></i>
            <i className="status-icon icon-warning-fill"></i>
            <div className="toast-text" >
              <div className="toast-message">잔디 커넥트 항목이 업데이트 되었습니다.</div>
            </div>
          </div>
        </div>
        <div className="ng-scope">
          <div className="toast c-toast-caution">
            <i className="icon-delete toast-close-button ng-scope"></i>
            <i className="status-icon icon-warning-triangle"></i>
            <div className="toast-text" >
              <div className="toast-message">잔디 커넥트 항목이 업데이트 되었습니다.</div>
            </div>
          </div>
        </div>
        */}
      </div>
      {/* // toast */}
    </div>
  </>);
};

export default withRouter(Layout);
