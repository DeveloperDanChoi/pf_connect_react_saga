/* eslint-disable max-len */
import { useDispatch } from 'react-redux';
import React from 'react';
import { getPublicAssetPath } from '../../../lib/assetHelper';
import { Input } from 'antd';

const AdminConnectPlug = (props) => {
  const dispatch = useDispatch();

  return (<>
     <div className='connect-container'>
      <div className='title_wrap type02'>
        <h2>잔디 커넥트 관리자</h2>
        <span className='sub_tit'>총 <b>47</b>개 연동 중</span>
      </div>
      <div className='connect-admin-wrap'>
        <div className='connect-info-box'>
          <p className='img-box'><img src={getPublicAssetPath('static/icon_google.png')} alt="Google 캘린더"></img></p>
          <div className='info'>
            <strong>Google 캘린더</strong>
            <p>일정 관리, 캘린더 공유 </p>
          </div>
          <span>7개 연동중</span>
          <div className='profile-box'>
            <ul>
              <li>
                <img src={getPublicAssetPath('static/dummy3.png')} alt="dummy"></img></li>
              <li>
                <img src={getPublicAssetPath('static/dummy3.png')} alt="dummy"></img></li>
              <li>
                <img src={getPublicAssetPath('static/dummy3.png')} alt="dummy"></img></li>
              <li><div className='etc-profile'><span></span></div></li>
              <li className='tootip'><span>김유진, 박한솔, 배호영 외 20인</span></li>
            </ul>
          </div>
        </div>{/* //connect-info-box' */}
        <div className='connect-info-box'>
          <p className='img-box'><img src={getPublicAssetPath('static/icon_webhook.png')} alt="webhook"></img></p>
          <div className='info'>
            <strong>Webhook 수신 (Incoming Webhook)</strong>
            <p>생산성, 커스터마이징</p>
          </div>
          <span>7개 연동중</span>
        </div>{/* //connect-info-box' */}
        <div className='connect-info-box'>
          <p className='img-box'><img src={getPublicAssetPath('static/icon_webhook.png')} alt="webhook"></img></p>
          <div className='info'>
            <strong>Webhook 수신 (Incoming Webhook)</strong>
            <p>생산성, 커스터마이징</p>
          </div>
          <span>7개 연동중</span>
        </div>{/* //connect-info-box' */}
        <div className='connect-info-box'>
          <p className='img-box'><img src={getPublicAssetPath('static/icon_rss.png')} alt="RSS"></img></p>
          <div className='info'>
            <strong>RSS 구독</strong>
            <p>콘텐츠, 미디어 및 뉴스</p>
          </div>
          <span>7개 연동중</span>
        </div>{/* //connect-info-box' */}
        <div className='connect-info-box'>
          <p className='img-box'><img src={getPublicAssetPath('static/icon_jira.png')} alt="jira"></img></p>
          <div className='info'>
            <strong>JIRA</strong>
            <p>이슈 추적, 프로젝트 관리</p>
          </div>
          <span>7개 연동중</span>
        </div>{/* //connect-info-box' */}
      </div>
    </div>
  </>);
};
export default AdminConnectPlug;
