/* eslint-disable max-len,import/no-unresolved */
import { useSelector } from 'react-redux';
import React from 'react';
import Link from 'next/Link';
import TeamsConnectPlug from '../connects/TeamsConnectPlug';
import { getPublicAssetPath } from '../../../../lib/assetHelper';
import Router, {useRouter} from "next/router";
import { banner } from '../../../../service/banner';

const ConnectCard = () => {
  const { connect, user } = useSelector((state) => state);

  const handleClick = (data) => {
    // TODO: config path
    const prefix = '/app/connect';
    Router.push(`${prefix}/${data.name}`, `${prefix}/${data.name}`);
  };

  return (<>
  <div className='container'>
    <div className='connect-container'>
      {/* 배너 영역 */}
      <div className='connect-card-banner'>
        <div className='txt-wrap'>
          <p>잔디 커넥트를 처음 사용하시나요? 이제 Google 캘린더, Trello, GitHub, JIRA 등을 연동하여 잔디에서 알림을 받아보세요.</p>
          <span>이제 Google 캘린더, Trello, GitHub, JIRA 등을 연동하여 잔디에서 알림을 받아보세요.</span>
        </div>
        <button onClick={() => banner.help(user)}>더 알아보기</button>
      </div>
      
      {/* 신규 서비스 */}
      <div className='title_wrap type02'>
        <h2>신규 서비스</h2>
        <span className='badge'>NEW</span>
      </div>
      <div className='connect-card-wrap type_list_new'>
        <div className='connect-card'>
          <div className='img-box'>
            <img src={getPublicAssetPath('static/icon_notion.png')} alt="notion"></img>
          </div>
          <div className='inner'>
            <strong>Notion</strong>
            <p>Notion 문서의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button>연동하기</button>
          </div>
        </div>
        <div className='connect-card'>
          <div className='img-box'>
            <img src={getPublicAssetPath('static/icon_figma.png')} alt="figma"></img>
          </div>
          <div className='inner'>
            <strong>Figma</strong>
            <p>figma 문서의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button>연동하기</button>
          </div>
        </div>
        <div className='connect-card'>
          <div className='img-box asana'>
            <img src={getPublicAssetPath('static/icon_asana.png')} alt="asana"></img>
          </div>
          <div className='inner'>
            <strong>Asana</strong>
            <p>Asana의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button>연동하기</button>
          </div>
        </div>
      </div>

      {/* 커넥트 목록 */}
      <div className='title_wrap type02'>
        <h2>커넥트 목록</h2>
      </div>
      <div className='connect-card-wrap type_list'>
        { connect.connects && connect.connects.map((data, i) => (
            <div className='connect-card' key={i} >
              <div className='inner'>
                <img src={data.botThumbnail} className='img'></img>
                <strong>{data.label}</strong>
                <p>{data.text}</p>
                <button onClick={() => handleClick(data)}>연동하기</button>
              </div>
            </div>
        )) }
      </div>
      <div className='connect-card-wrap type_list'>
        <div className='connect-card'>
          <div className='inner'>
            <img src="" className='img'></img>
            <strong>Notion</strong>
            <p>Asana의 변동 사항을 잔디에서 확인하 수 있습니다.Asana의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button>연동하기</button>
          </div>
        </div>
        <div className='connect-card'>
          <div className='inner'>
            <img src="" className='img'></img>
            <strong>Notion</strong>
            <p>Asana의 변동 사항을 잔디에서 확인하 수 있습니다.Asana의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button>연동하기</button>
          </div>
        </div>
        <div className='connect-card'>
          <div className='inner'>
            <img src="" className='img'></img>
            <strong>Notion</strong>
            <p>Asana의 변동 사항을 잔디에서 확인하 수 있습니다.Asana의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button>연동하기</button>
          </div>
        </div>
        <div className='connect-card'>
          <div className='inner'>
            <img src="" className='img'></img>
            <strong>Notion</strong>
            <p>Asana의 변동 사항을 잔디에서 확인하 수 있습니다.Asana의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button>연동하기</button>
          </div>
        </div>
        <div className='connect-card'>
          <div className='inner'>
            <img src="" className='img'></img>
            <strong>Notion</strong>
            <p>Asana의 변동 사항을 잔디에서 확인하 수 있습니다.Asana의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button>연동하기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>);
};
export default ConnectCard;
