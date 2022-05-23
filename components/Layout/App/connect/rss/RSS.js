/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/rss/rss';
import { template1 } from '../../../../../service/connect';
import Thumbnail from "../../../../ui/Thumbnail/Thumbnail";

const RSS = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { team, rss } = useSelector((state) => {
    console.log('rss state !!', state);
    return state;
  });
  const { creators } = modules;

  useEffect(() => {
    template1.initialize({
      dispatch,
      router,
      connectType: 'rss',
      modules,
      load: creators.getTeamsRss,
      connect: [creators.postTeamsRss, creators.putTeamsRssSetting],
      set: creators.setInputRss,
    }, false);
  }, []);

  return (<>
    <div style={{
      width: '100%',
    }}>
      {/* ********** 인증 영역 !! ************* */}
      <div>dan의 RSS 구독</div>
      {/* ********** 리스트 영역 !! ************* */}
      {/* ********** 토픽 영역 !! ************* */}
      <div>알림 메시지를 등록할 토픽 또는 채팅 JANDI를 선택해주세요.</div>
      <ul>
        <li>토픽리스트@</li>
        { team.team.topics && team.team.topics.map((data, i) => (
            <li key={i}>{data.name}</li>))
        }
      </ul>
      <button>토픽 생성하기</button>
      {/* ********** 설정 영역 !! ************* */}
      {/* ********** 프로필 영역 !! ************* */}
      <div>연동 서비스 프로필 설정</div>
      <div>팀 내에서 이 커넥트 항목이 메시지를 보낼 때의 프로필 이미지와 이름을 지정하실 수 있습니다.</div>
      <Thumbnail state={rss} parent={template1} />
      <input />
      <div>언어 설정</div>
      <div>수신할 메시지의 언어를 선택합니다.</div>
      <ul>
        <li>언어</li>
      </ul>
      <button onClick={(e) => {
        template1.connect(e, { rss });
      }}>연동 항목 추가하기</button>
    </div>
  </>);
};

export default RSS;
