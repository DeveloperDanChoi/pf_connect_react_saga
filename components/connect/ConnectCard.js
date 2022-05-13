/* eslint-disable max-len,import/no-unresolved */
import { useSelector } from 'react-redux';
import React from 'react';
import Link from 'next/Link';
import TeamsConnectPlug from './teams/TeamsConnectPlug';

const ConnectCard = () => {
  const { connect } = useSelector((state) => state);

  const handleDropdown = () => {
    // dispatch(updateConnects(data));
  };

  return (<>
    <div>연동 가능한 서비스 목록</div>
    <ul>
    { connect.connects && connect.connects.map((data, i) => (
        <li key={i} style={{ margin: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={data.botThumbnail} style={{ width: '50px' }}></img>
            <div style={{ width: '90%' }}>
              <div style={{ display: 'flex' }}>
                <div>{data.label}</div>
                <i>!</i>
              </div>
              <div>{data.text}</div>
            </div>
            <div style={{ display: 'flex', width: '300px' }}>
              <div onClick={() => {
                handleDropdown(data);
              }}>{connect.teamsConnect[data.name] && `${connect.teamsConnect[data.name].length}개 연동중`}</div>
              <Link href={data.name} data-route={data.name}>연동 항목 추가하기</Link>
            </div>
          </div>
          {/* 서비스 연결 세부 목록 */}
          {/*<TeamsConnectPlug parent={data} display={data.display} />*/}
        </li>
    )) }
  </ul></>);
};
export default ConnectCard;
