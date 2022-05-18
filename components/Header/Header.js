import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter, withRouter } from 'next/router';
import styles from './Header.module.scss';
const Header = (props) => {
  const router = useRouter();

  const handleBack = () => {
    if (router.asPath !== '/') {
      router.back();
    }
  };

  return (<>
  <header className={styles.header}>
    <button onClick={handleBack}>뒤로가기</button>
    <h1>잔디 커넥트</h1>
    <button>X</button>
  </header>
  </>);
};

export default withRouter(Header);
