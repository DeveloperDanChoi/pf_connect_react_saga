/* eslint-disable max-len */
import { useDispatch } from 'react-redux';
import React, {useEffect} from 'react';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';
import Router, {useRouter} from "next/router";

const AdminConnectPlug = (props) => {
  const dispatch = useDispatch();
  const handleClick = (data) => {
    // TODO: DEV
    Router.push('/app/connects/admin/detail', '/app/connects/admin/detail');
  };

  return (<>
     <div className='connect-container'>
      <div className='title-wrap type02'>
        <h2>잔디 커넥트 관리자</h2>
        <p className='sub_tit'>
          <strong className='icon-ic-company'>TossLab,Inc.</strong> <span>총 <strong>47</strong>개 연동 중</span>
        </p>

      </div>

      <div className='connect-admin-wrap'>
        <a href="#none" className='connect-info-box'>
          <p className='img-box'><img src={getPublicAssetPath('static/icon_google.png')} alt="Google 캘린더"></img></p>
          <div className='info'>
            <strong>Google 캘린더</strong>
            <p>일정 관리, 캘린더 공유 </p>
          </div>

          <div className='connect-etc-box'>
            <span onClick={() => handleClick()}><i className='icon-ic-plug'></i>7개 연동중</span>
            <div className='profile-box'>
                <div className='item'><img src={getPublicAssetPath('static/dummy3.png')} alt="dummy"></img></div>
                <div className='item'><img src={getPublicAssetPath('static/dummy3.png')} alt="dummy"></img></div>
                <div className='item'><img src={getPublicAssetPath('static/dummy3.png')} alt="dummy"></img></div>{/* [D]: 프로필(item) 최대 3개 노출 */}
                <div className='item'><div className='etc-profile'><i className='icon-ic-more'></i></div></div>{/* [D]: 프로필 최대 3개 이상일 경우 etc-profile 노출 */}
                <div className='tooltip'><span>Andy, 박한솔, hosi 외 200인</span></div>
            </div>
          </div>
        </a>{/* //connect-info-box' */}

        <a href="#none" className='connect-info-box'>
          <p className='img-box'><img src={getPublicAssetPath('static/icon_webhook.png')} alt="webhook"></img></p>
          <div className='info'>
            <strong>Webhook 수신 (Incoming Webhook)Webhook 수신 (Incoming Webhook)Webhook 수신 (Incoming Webhook)</strong>
            <p>생산성, 커스터마이징</p>
          </div>
          <div className='connect-etc-box'>
            <span onClick={() => handleClick()}><i className='icon-ic-plug'></i>7000개 연동중</span>
            <div className='profile-box'>
              <div className='item'><img src={getPublicAssetPath('static/dummy3.png')} alt="dummy"></img></div>
              <div className='tooltip'><span>유, 박</span></div>
            </div>
          </div>
        </a>{/* //connect-info-box' */}

        <a href="#none" className='connect-info-box'>
          <p className='img-box'><img src={getPublicAssetPath('static/icon_webhook.png')} alt="webhook"></img></p>
          <div className='info'>
            <strong>Webhook 수신 (Incoming Webhook)Webhook 수신 (Incoming Webhook)Webhook 수신 (Incoming Webhook)</strong>
            <p>생산성, 커스터마이징생산성, 커스터마이징생산성, 커스터마이징생산성, 커스터마이징생산성, 커스터마이징생산성, 커스터마이징생산성, 커스터마이징생산성, 커스터마이징생산성, 커스터마이징</p>
          </div>
          <div className='connect-etc-box'>
            <span onClick={() => handleClick()}><i className='icon-ic-plug'></i>700개 연동중</span>
            <div className='profile-box'>
              <div className='item'><img src={getPublicAssetPath('static/dummy3.png')} alt="dummy"></img></div>
              <div className='item'><img src={getPublicAssetPath('static/dummy3.png')} alt="dummy"></img></div>
              <div className='item'><img src={getPublicAssetPath('static/dummy3.png')} alt="dummy"></img></div>{/* [D]: 프로필(item) 최대 3개 노출 */}
              <div className='item'><div className='etc-profile'><i className='icon-ic-more'></i></div></div>{/* [D]: 프로필 최대 3개 이상일 경우 etc-profile 노출 */}
              <div className='tooltip'><span>frankie, buuuuu, Andreson 외 5000인</span></div>
            </div>
          </div>
        </a>{/* //connect-info-box' */}

        <a href="#none" className='connect-info-box'>
          <p className='img-box'><img src={getPublicAssetPath('static/icon_rss.png')} alt="RSS"></img></p>
          <div className='info'>
            <strong>RSS 구독</strong>
            <p>콘텐츠, 미디어 및 뉴스</p>
          </div>
          <div className='connect-etc-box'>
            <span onClick={() => handleClick()}><i className='icon-ic-plug'></i>7개 연동중</span>
            <div className='profile-box'>
              <div className='item'><img src={getPublicAssetPath('static/dummy3.png')} alt="dummy"></img></div>
              <div className='item'><img src={getPublicAssetPath('static/dummy3.png')} alt="dummy"></img></div>
              <div className='tooltip'><span>frankie, austinnnn</span></div>
          </div>
        </div>
        </a>{/* //connect-info-box' */}

        <a href="#none" className='connect-info-box'>
          <p className='img-box'><img src={getPublicAssetPath('static/icon_jira.png')} alt="jira"></img></p>
          <div className='info'>
            <strong className="info-tit">JIRA</strong>
            <p>이슈 추적, 프로젝트 관리</p>
          </div>
          <div className='connect-etc-box'>
            <span onClick={() => handleClick()}><i className='icon-ic-plug'></i>7개 연동중</span>
            <div className='profile-box'>
              <div className='item'><img src={getPublicAssetPath('static/dummy3.png')} alt="dummy"></img></div>
              <div className='tooltip'><span>jio</span></div>
            </div>
          </div>
        </a>{/* //connect-info-box' */}
      </div>
    </div>
  </>);
};
export default AdminConnectPlug;
