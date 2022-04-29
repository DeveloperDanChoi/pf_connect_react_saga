/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
  getTeamsToken,
} from '../../../../store/connect/connect';
import { postTeamsOutgoing } from '../../../../store/connect/outgoing/outgoing';

const Outgoing = () => {
  const dispatch = useDispatch();
  const { team, bitbucket, trello, connect } = useSelector((state) => {
    console.log('outgoing state !!', state);
    return state;
  });

  /**
   * @deprecated
   */
  const handleClick = () => {
    // Router.push('/');
  };
  /**
   * 계정 인증하기
   */
  const authConnect = () => {
  };
  /**
   * 연동하고자 하는 리스트
   */
  const getList = () => {
    dispatch(getTeamsToken({ connectType: 'outgoing' }));
  };
  /**
   * 연동 항목 추가하기
   */
  const addConnect = () => {
    dispatch(postTeamsOutgoing());
  };
  /**
   * 인증된 계정 삭제
   */
  const deleteConnect = (e, data) => {
  };

  useEffect(() => {
    getList();
  }, []);

  return (<>
    <div onClick={handleClick} style={{
      width: '100%',
    }}>
      {/* ********** 인증 영역 !! ************* */}
      <div>dan의 Webhook 발신 (Outgoing Webhook)</div>
      {/* ********** 리스트 영역 !! ************* */}
      {/* ********** 설정 영역 !! ************* */}
      <div>설정방법 안내</div>
      <div>URL</div>
      <div>시작 키워드 입력</div>
      <div>토큰: {connect.teamsToken.webhookToken}</div>
      {/* ********** 토픽 영역 !! ************* */}
      <div>알림 메시지를 등록할 토픽 또는 채팅 JANDI를 선택해주세요.</div>
      <ul>
        <li>토픽리스트@</li>
        { team.team.topics && team.team.topics.map((data, i) => (
            <li key={i}>{data.name}</li>))
        }
      </ul>
      <button>토픽 생성하기</button>
      {/* ********** 프로필 영역 !! ************* */}
      <div>연동 서비스 프로필 설정</div>
      <div>팀 내에서 이 커넥트 항목이 메시지를 보낼 때의 프로필 이미지와 이름을 지정하실 수 있습니다.</div>
      <div>이미지</div>
      <input />
      <div>언어 설정</div>
      <div>수신할 메시지의 언어를 선택합니다.</div>
      <ul>
        <li>언어</li>
      </ul>
      <button onClick={addConnect}>연동 항목 추가하기</button>
    </div>
  </>);
};

export default Outgoing;
