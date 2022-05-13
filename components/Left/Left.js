import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'next/router';
import Link from 'next/link';

const Left = (props) => {
  const { team } = useSelector((state) => state.team);
  const myConnectURL = '/connect/detail';
  const adminConnectURL = '/connect/admin';

  return (<>
    <div>커넥트 목록</div>
    <div><Link href={myConnectURL} data-route={myConnectURL}>나의 잔디 커넥트</Link></div>
    <div><Link href={adminConnectURL} data-route={adminConnectURL}>잔디 커넥트 관리자</Link></div>
  </>);
};

export default withRouter(Left);
