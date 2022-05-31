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
  <header className='header'>
    <button type="button" onClick={handleBack} className='btn-back icon-ic-arrow-left'><span className='hidden'>뒤로가기</span></button>
    <h1>잔디 커넥트</h1>
    <button type="button" className='btn-close icon-ic-close'><span className='hidden'>닫기</span></button>
  </header>
  </>);
};

export default withRouter(Header);
