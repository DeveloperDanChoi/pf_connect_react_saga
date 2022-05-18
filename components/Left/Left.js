import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'next/router';
import Link from 'next/link';
import styles from './Left.module.scss';


const Left = (props) => {
  const { team } = useSelector((state) => state.team);
  const myConnectURL = '/connect/detail';
  const adminConnectURL = '/connect/admin';

  return (<>
  <div className={styles.aside}>
    <ul className={styles.wrap}>
      <li className={styles.active}>
        <Link href={myConnectURL} data-route={myConnectURL}>커넥트 목록</Link>
      </li>
      <li>
        <Link href={myConnectURL} data-route={myConnectURL}>나의 잔디 커넥트</Link>
      </li>
      <li>
        <Link href={adminConnectURL} data-route={adminConnectURL}>잔디 커넥트 관리자</Link>
      </li>
    </ul>
    <div className={styles.notice}>
      <p>잔디 커넥트에 더 추가를 원하시는 서비스가 있으신가요?</p>
      <button className={`${styles.btn} ${styles.green} ${styles.full}`}>서비스 연동 요청하기</button>
    </div>
  </div>


  </>);
};

export default withRouter(Left);
