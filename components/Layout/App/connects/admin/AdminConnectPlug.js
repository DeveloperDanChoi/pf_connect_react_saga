/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux';
import React, { Fragment, useEffect } from 'react';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import Router from 'next/router';
import { modules as connectModules } from '../../../../../store/connect/connect';
import { modules as teamModules } from '../../../../../store/team/team';

const AdminConnectPlug = (props) => {
  const dispatch = useDispatch();
  const { connect, team, user } = useSelector((state) => {
    // console.log('state !!', state);
    return state;
  });

  /**
   * 어드민 상세 페이지 이동
   * @param data
   */
  const handleClick = (data) => {
    // TODO: DEV
    Router.push('/app/connects/admin/detail', `/app/connects/admin/detail?${data}`);
  };

  /**
   * TODO: 다른 데이터 가공할 때 처리할 수 없는지 검토
   * 닉네임 생성하는 함수
   * 3명까지만 보여준다
   * @param data
   * @returns {string}
   */
  const connectMemberNames = (data, length) => {
    let names = data[0].member.name;

    for (let i = 1; i < 3; i++) {
      names = `${names},${data[i].member.name}`;
    }

    return `${names} 외 ${length - 3}인`;
  };

  /**
   * TODO: 다른 데이터 가공할 때 처리할 수 없는지 검토
   * 총 연동
   * @returns {number}
   */
  const totalCount = () => {
    let cnt = 0;

    for (const item in connect.teamsConnect) {
      cnt = cnt + connect.teamsConnect[item].length;
    }

    return cnt;
  };

  useEffect(() => {
    if (team.teamId === 0) return;

    dispatch(teamModules.creators.getTeamsMembers(team.teamId));
  }, [user.user.member]);

  useEffect(() => {
    if (team.teamId === 0) return;

    dispatch(connectModules.creators.getTeamsConnect(team.teamId));
  }, [team.teamsMembers]);

  return (<>
    <div className='connect-container'>
      <div className='title-wrap type02'>
        <h2>잔디 커넥트 관리자</h2>
        <p className='sub_tit'>
          <strong className='icon-ic-company'>{team.team.team.name}</strong> <span>총 <strong>{totalCount()}</strong>개 연동 중</span>
        </p>
      </div>
      <div className='connect-admin-wrap'>
        { Object.keys(connect.teamsConnect).map((data, i) => (
          <a key={i} href="#none" className='connect-info-box' onClick={() => handleClick(data)}>
            <p className='img-box'><img src={connect.connectsObj[data].botThumbnail} alt={data.name}></img></p>
            <div className='info'>
              <strong>{connect.connectsObj[data].label}</strong>
              <p>{connect.connectsObj[data].category}</p>
            </div>

            <div className='connect-etc-box'>
              <span><i className='icon-ic-plug'></i>{connect.teamsConnect[data].length}개 연동중</span>
              <div className='profile-box'>
                {(() => {
                  switch (connect.teamsConnect[data].length) {
                    case 0:
                      // 연결 커넥트가 없을 경우
                      return (<div className='item'><div className='etc-profile'><i className='icon-ic-more'></i></div></div>);
                    case 1: case 2: case 3:
                      // 연결 커넥트가 3개 이하
                      return (<>{
                        connect.teamsConnect[data].map((connectData, j) => (
                          <div key={j} className='item'><img src={connectData.member.photoUrl} alt={connectData.member.name}></img></div>
                        ))
                      }</>);
                    default:
                      // 연결 커넥트 3개 초과 툴팁 표시
                      return (<>{
                        connect.teamsConnect[data].map((connectData, j) => (<Fragment key={j}>{
                          (() => {
                            switch (j) {
                              case 0: case 1: case 2:
                                return (<div className='item'><img src={connectData.member.photoUrl} alt={connectData.member.name}></img></div>);
                              case 3:
                                return (<>
                                  <div className='item'><div className='etc-profile'><i className='icon-ic-more'></i></div></div>
                                  <div className='tooltip'><span>{connectMemberNames(connect.teamsConnect[data], connect.teamsConnect[data].length)}</span></div>
                                </>);
                              default: return (<></>);
                            }
                          })()
                        }</Fragment>))
                      }</>);
                  }
                })()}
              </div>
            </div>
          </a>
        ))}
      </div>

      <p>----- 퍼블</p>
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
