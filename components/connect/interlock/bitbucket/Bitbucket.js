/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
  getTeamsToken,
} from '../../../../store/connect/connect';
import { postTeamsBitbucket } from '../../../../store/connect/bitbucket/bitbucket';

const Bitbucket = () => {
  const dispatch = useDispatch();
  const { team, bitbucket, trello, connect } = useSelector((state) => {
    console.log('bitbucket state !!', state);
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
    dispatch(getTeamsToken({ connectType: 'bitbucket' }));
  };
  /**
   * 연동 항목 추가하기
   */
  const addConnect = () => {
    dispatch(postTeamsBitbucket());
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
      <div>dan의 Bitbucket</div>
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
      <div>메시지 발생 이벤트 선택</div>
      <div>카드</div>
      <div>카드가 생성되었을 때</div>
      <div>카드가 옮겨졌을 때</div>
      <div>카드 이름이 변경되었을 때</div>
      <div>코멘트가 카드에 추가되었을 때</div>
      <div>첨부 파일이 카드에 추가되었을 때</div>
      <div>설명(Description)이 변경되었을 때</div>
      <div>마감일(Due date)이 변경되었을 때</div>
      <div>라벨(Label)이 변경되었을 때</div>
      <div>카드에 멤버가 추가되었을 때</div>
      <div>카드가 archive 또는 unarchive되었을 때</div>
      <div>리스트</div>
      <div>리스트가 생성되었을 때</div>
      <div>리스트 이름이 바뀌었을 때</div>
      <div>리스트가 다른 보드로 옮겨졌을 때</div>
      <div>리스트가 archive 또는 unarchive되었을 때</div>
      <div>보드 이름이 바뀌었을 때</div>
      <div>보드에 멤버가 추가되었을 때</div>
      <div>체크리스트</div>
      <div>체크리스트가 카드에 추가되었을 때</div>
      <div>체크리스트 아이템이 생성되었을 때</div>
      <div>체크리스트 아이템이 완료(Complete)/미완료(Incomplete)로 될 때</div>
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

export default Bitbucket;
