/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,react/jsx-no-duplicate-props,guard-for-in,operator-assignment,no-unreachable,object-curly-newline,react/no-unescaped-entities,react/jsx-no-comment-textnodes,space-before-function-paren,array-callback-return */
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
        <span className='bg-type icon-ic-plug'></span>
        <div className='txt-wrap'>
          <strong>잔디 커넥트를 처음 사용하시나요?</strong>
          <p>이제 Google 캘린더, Trello, GitHub, JIRA 등을 연동하여 잔디에서 알림을 받아보세요.</p>
        </div>
        <button onClick={() => banner.help(user)}>더 알아보기</button>
      </div>
      {/* 신규 서비스 */}
      <div style={{display: 'none'}} className='title-wrap type02'>
        <h2>신규 서비스</h2>
        <span className='badge'>NEW</span>
      </div>
      <div style={{display: 'none'}} className='connect-card-wrap type_list_new'>
        <div className='connect-card'>
          <div className='img-box'>
            <img src={getPublicAssetPath('static/icon_notion.png')} alt="notion"></img>
          </div>
          <div className='inner'>
            <strong>Notion</strong>
            <p>Notion 문서의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button onClick={() => handleClick({name: 'notion'})}>연동하기</button>
          </div>
        </div>
        <div className='connect-card'>
          <div className='img-box'>
            <img src={getPublicAssetPath('static/icon_figma.png')} alt="figma"></img>
          </div>
          <div className='inner'>
            <strong>Figma</strong>
            <p>figma 문서의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button onClick={() => handleClick({name: 'figma'})}>연동하기</button>
          </div>
        </div>
        <div className='connect-card'>
          <div className='img-box asana'>
            <img src={getPublicAssetPath('static/icon_asana.png')} alt="asana"></img>
          </div>
          <div className='inner'>
            <strong>Asana</strong>
            <p>Asana의 변동 사항을 잔디에서 확인하 수 있습니다.</p>
            <button onClick={() => handleClick({name: 'asana'})}>연동하기</button>
          </div>
        </div>
      </div>

      {/* 커넥트 목록 */}
      <div className='title-wrap type02'>
        <h2>커넥트 목록</h2>
      </div>
      <div className='connect-card-wrap type_list'>
        {/*
          connect.connects && connect.connects.map((data, i) => (
            <div className='connect-card' key={i} >
              <div className='inner'>
                <img src={data.botThumbnail} className='img'></img>
                <strong>{data.label}</strong>
                <p>{data.text}</p>
                <button onClick={() => handleClick(data)}>연동하기</button>
              </div>
            </div>
          ))
        */}
        {
          connect.connects && connect.connects.length > 0 &&
          (
            <>
              <div className='connect-card'>
                <div className='inner'>
                  <img src={connect.connects[1].botThumbnail} className='img'></img>
                  <strong>{connect.connects[1].label}</strong>
                  <p>{connect.connects[1].text}</p>
                  <button onClick={() => handleClick(connect.connects[1])}>연동하기</button>
                </div>
              </div>
              <div className='connect-card'>
                <div className='inner'>
                  <img src={connect.connects[7].botThumbnail} className='img'></img>
                  <strong>{connect.connects[7].label}</strong>
                  <p>{connect.connects[7].text}</p>
                  <button onClick={() => handleClick(connect.connects[7])}>연동하기</button>
                </div>
              </div>
              <div className='connect-card'>
                <div className='inner'>
                  <img src={connect.connects[6].botThumbnail} className='img'></img>
                  <strong>{connect.connects[6].label}</strong>
                  <p>{connect.connects[6].text}</p>
                  <button onClick={() => handleClick(connect.connects[6])}>연동하기</button>
                </div>
              </div>
              <div className='connect-card'>
                <div className='inner'>
                  <img src={connect.connects[3].botThumbnail} className='img'></img>
                  <strong>{connect.connects[3].label}</strong>
                  <p>{connect.connects[3].text}</p>
                  <button onClick={() => handleClick(connect.connects[3])}>연동하기</button>
                </div>
              </div>
              <div className='connect-card'>
                <div className='inner'>
                  <img src={connect.connects[0].botThumbnail} className='img'></img>
                  <strong>{connect.connects[0].label}</strong>
                  <p>{connect.connects[0].text}</p>
                  <button onClick={() => handleClick(connect.connects[0])}>연동하기</button>
                </div>
              </div>
              <div className='connect-card'>
                <div className='inner'>
                  <img src={connect.connects[8].botThumbnail} className='img'></img>
                  <strong>{connect.connects[8].label}</strong>
                  <p>{connect.connects[8].text}</p>
                  <button onClick={() => handleClick(connect.connects[8])}>연동하기</button>
                </div>
              </div>
              <div className='connect-card'>
                <div className='inner'>
                  <img src={connect.connects[4].botThumbnail} className='img'></img>
                  <strong>{connect.connects[4].label}</strong>
                  <p>{connect.connects[4].text}</p>
                  <button onClick={() => handleClick(connect.connects[4])}>연동하기</button>
                </div>
              </div>
              <div className='connect-card'>
                <div className='inner'>
                  <img src={connect.connects[2].botThumbnail} className='img'></img>
                  <strong>{connect.connects[2].label}</strong>
                  <p>{connect.connects[2].text}</p>
                  <button onClick={() => handleClick(connect.connects[2])}>연동하기</button>
                </div>
              </div>
            </>
          )
        }
      </div>
      {/*<p>아래는 퍼블</p>*/}
      {/* [D] : 로고 이미지 변경 필요 */}
      <div className='connect-card-wrap type_list' style={{display: 'none'}}>
        <div className='connect-card'>
          <div className='inner'>
            <img src={getPublicAssetPath('static/icon_google.png')} alt="googleCalendar" className='img'></img>
            <strong>Google 캘린더</strong>
            <p>연동된 Repository의 변경사항을 잔디에서 확인할 수 있습니다.</p>
            <button>연동하기</button>
          </div>
        </div>
        <div className='connect-card'>
          <div className='inner'>
            <img src={getPublicAssetPath('static/icon_rss.png')} alt="rss" className='img'></img>
            <strong>RSS 구독</strong>
            <p>JIRA 이슈 변동 사항을 잔디에서 확인할 수 있습니다.</p>
            <button>연동하기</button>
          </div>
        </div>
        <div className='connect-card'>
          <div className='inner'>
            <img src={getPublicAssetPath('static/icon_trello.png')} alt="trello" className='img'></img>
            <strong>Trello</strong>
            <p>연동된 Repository의 변경사항을 잔디에서 확인할 수 있습니다.</p>
            <button>연동하기</button>
          </div>
        </div>
        <div className='connect-card'>
          <div className='inner'>
            <img src={getPublicAssetPath('static/icon_jira.png')} alt="jira" className='img'></img>
            <strong>JIRA</strong>
            <p>JIRA 이슈 변동 사항을 잔디에서 확인할 수 있습니다.</p>
            <button>연동하기</button>
          </div>
        </div>
        <div className='connect-card'>
          <div className='inner'>
            <img src={getPublicAssetPath('static/icon_github.png')} alt="github" className='img'></img>
            <strong>GitHub</strong>
            <p>연동된 Repository의 변경사항을 잔디에서 확인할 수 있습니다.</p>
            <button>연동하기</button>
          </div>
        </div>
        <div className='connect-card'>
          <div className='inner'>
            <img src={getPublicAssetPath('static/icon_bitbucket.png')} alt="bitbucket" className='img'></img>
            <strong>bitbucket</strong>
            <p>JIRA 이슈 변동 사항을 잔디에서 확인할 수 있습니다.</p>
            <button>연동하기</button>
          </div>
        </div>
        <div className='connect-card'>
          <div className='inner'>
            <img src={getPublicAssetPath('static/icon_webhook.png')} alt="webhook" className='img'></img>
            <strong>bitbucket</strong>
            <p>JIRA 이슈 변동 사항을 잔디에서 확인할 수 있습니다.</p>
            <button>연동하기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>);
};
export default ConnectCard;
