/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGooglecalendarCalendarlist,
  putGooglecalendar,
  putAuthentications,
} from '../../../../store/connect/googleCalendar/googleCalendar';

const GoogleCalendar = () => {
  const dispatch = useDispatch();
  const { team, googleCalendar } = useSelector((state) => {
    // console.log('GoogleCalendar state !!', state);
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
    console.log('create auth !!');
    window.addEventListener('popupDone', () => {
      console.log('popupDone !!!!!');
    });
    window.addEventListener('googleCalendar', () => {
      console.log('googleCalendar !!!!!');
    });
    window.addEventListener('beforeunload', () => {
      console.log('beforeunload !!!!!');
    });
    window.popupDone = () => {
      console.warn('popupDone >>>>');
    };
    window.googleCalendar = () => {
      console.warn('googleCalendar >>>>');
    };
    // TODO: popupDone callback ??
    // const popup
    window.open(
      'https://www.jandi.io/connect/auth/googleCalendar?callbackEventName=popupDone',
      'googleAuth',
      'resizable=no, scrollbars=1, toolbar=no, menubar=no, status=no, directories=no, width=1024, height=768',
    );
  };
  /**
   * 연동하고자 하는 리스트
   */
  const getList = () => {
    dispatch(getGooglecalendarCalendarlist());
  };
  /**
   * 연동 항목 추가하기
   */
  const addConnect = () => {
    dispatch(putGooglecalendar());
  };
  /**
   * 인증된 계정 삭제
   */
  const deleteConnect = (e, data) => {
    dispatch(putAuthentications(data, data));
  };

  useEffect(() => {
    getList();
  }, []);

  return (<>
    <div onClick={handleClick} style={{
      width: '100%',
    }}>
      {/* ********** 인증 영역 !! ************* */}
      <div>dan의 Google 캘린더</div>
      <div>인증된 계정</div>
      <ul>
        <li>계정 추가하기</li>
        { googleCalendar.calendarList && googleCalendar.calendarList.length === 0 && <button onClick={authConnect}>구글 캘린더 계정 인증하기</button> }
        { googleCalendar.calendarList && googleCalendar.calendarList.map((data, i) => (
            <div key={i}><li>{data.authenticationName}</li><button onClick={(e) => {
              deleteConnect(e, data);
            }}>X</button></div>
        ))}
      </ul>
      {/* ********** 리스트 영역 !! ************* */}
      <div>일정 알림 메시지를 받고자 하는 캘린더를 선택해주세요.</div>
      <ul>
        <li>캘린더리스트</li>
        { googleCalendar.calendarList && googleCalendar.calendarList.length > 0 && googleCalendar.calendarList[0].list.map((data, i) => (
            <li key={i}>{data.id}</li>
        ))}
      </ul>
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
      <div>알림 설정</div>
      <ul>
        <li>정시</li>
        <li>15분전</li>
      </ul>
      <div>에 일정에 대한 알림 메시지 수신 (UTC+09:00)</div>
      <div>종일 일정의 경우</div>
      <ul>
        <li>당일</li>
      </ul>
      <ul>
        <li>00:00</li>
        <li>01:00</li>
        <li>02:00</li>
      </ul>
      <div>에 일정에 대한 알림 메시지 수신 (UTC+09:00)</div>
      <div>일정 요약</div>
      <div>매일</div>
      <ul>
        <li>00:00</li>
        <li>01:00</li>
        <li>02:00</li>
      </ul>
      <div>(UTC+09:00)</div>
      <div>매주</div>
      <ul>
        <li>요일</li>
      </ul>
      <ul>
        <li>00:00</li>
        <li>01:00</li>
        <li>02:00</li>
      </ul>
      <div>(UTC+09:00)</div>
      <div>캘린더 업데이트 옵션</div>
      <div>일정이 새롭게 생성되었거나 일정에 초대되었을 때</div>
      <div>일정의 제목이나 시각, 장소가 수정되었을 때</div>
      <div>일정이 취소되거나 삭제되었을 때</div>
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

export default GoogleCalendar;
