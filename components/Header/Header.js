import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter, withRouter } from 'next/router';

const Header = (props) => {
  const router = useRouter();

  const handleBack = () => {
    if (router.asPath !== '/') {
      router.back();
    }
  };

  return (<>
    <button onClick={handleBack}>뒤로가기</button>
    <span>잔디 커넥트</span>
    <button>X</button>
  </>);
};

export default withRouter(Header);
