import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { banner } from '../../service/banner';


const Left = (props) => {
  const { team, user } = useSelector((state) => state);
  const myConnectURL = '/connect/detail';
  const adminConnectURL = '/connect/admin';

  return (<>
  <div className='menu-wrap'>
    <ul>
      <li className='on'>
        <Link href={myConnectURL} data-route={myConnectURL}>커넥트 목록</Link>
      </li>
      <li>
        <Link href={myConnectURL} data-route={myConnectURL}>나의 잔디 커넥트</Link>
      </li>
      <li>
        <Link href={adminConnectURL} data-route={adminConnectURL}>잔디 커넥트 관리자</Link>
      </li>
    </ul>
    <div className='notice-box'>
      <p>찾으시는 서비스가 없으신가요?</p>
      <button onClick={() => banner.survey(user)}>서비스 추가 요청하기</button>
    </div>
  </div>
  </>);
};

export default withRouter(Left);
