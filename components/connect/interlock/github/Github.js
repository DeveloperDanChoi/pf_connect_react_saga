/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  getGithubRepos,
  putGithub,
  putAuthentications,
} from '../../../../store/connect/github/github';

const Github = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query: { id } } = router;
  const { team, github } = useSelector((state) => {
    // console.log('Github state !!', state);
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
    // TODO: popupDone callback ??
    // const popup
    window.open(
      'https://www.jandi.io/connect/auth/github?callbackEventName=popupDone',
      'connectAuth',
      'resizable=no, scrollbars=1, toolbar=no, menubar=no, status=no, directories=no, width=1024, height=768',
    );
  };
  /**
   * 연동하고자 하는 리스트
   */
  const getList = () => {
    dispatch(getGithubRepos());
  };
  /**
   * 연동 항목 추가하기
   */
  const addConnect = () => {
    dispatch(putGithub());
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
      <div>dan의 Github</div>
      <div>인증된 계정</div>
      <ul>
        <li>계정 추가하기</li>
        { !github.githubRepos.authenticationId && <button onClick={authConnect}>Github 계정 인증하기</button> }
        { github.githubRepos.authenticationId
        && <div><li>{github.githubRepos.authenticationName}</li><button onClick={(e) => {
          deleteConnect(e, github.githubRepos);
        }}>X</button></div> }
      </ul>
      {/* ********** 리스트 영역 !! ************* */}
      <div>알림을 받고자 하는 Repository/Branch를 선택해주세요.</div>
      <ul>
        <li>Repository 선택</li>
        { github.githubRepos.repos && github.githubRepos.repos.map((data) => (
          <div key={data.owner}>
            <li>{data.owner}</li>
              <ul>
              { data.lists && data.lists.map((child) => (
                  <li key={child.id}>{child.name}</li>
              )) }
              </ul>
          </div>
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
      <div>메시지 발생 이벤트 선택</div>
      <div>Commits</div>
      <div>Commit Comments</div>
      <div>Pull Requests Opened / Closed</div>
      <div>Pull Request Comments</div>
      <div>Issue Opened / Closed</div>
      <div>Issue Comments</div>
      <div>Branch or Tag Created / Deleted</div>
      <div>Pull Request Review</div>
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

export default Github;
