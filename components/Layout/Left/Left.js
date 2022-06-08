import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {Router, useRouter, withRouter} from 'next/router';
import Link from 'next/link';
import { banner } from '../../../service/banner';


const Left = (props) => {
  const router = useRouter();
  const { team, user } = useSelector((state) => state);
  const mainURL = '/app';
  const myConnectURL = '/app/connects/detail';
  const adminConnectURL = '/app/connects/admin';

  // TODO: left show/hide props
  const isMain = router.pathname === mainURL;
  const isMy = router.pathname === myConnectURL;
  const isAdm = router.pathname === adminConnectURL;

  const openMenu = (e) => {
    e.preventDefault();
    e.currentTarget.classList.toggle('on');
    document.querySelector('.menu-wrap').classList.toggle('block');
  }
  useEffect(() => {
    document.querySelector('body').addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.closest('.btn-open') === null && document.querySelector('.menu-wrap')) {
        document.querySelector('.menu-wrap').classList.remove('block');
      }
    });
  }, []);
  return (<>
    { (isMain || isMy || isAdm) &&
     <div className='menu-container'>
       <div className='tablet-menu'>
         <a href='#none' className='icon-ic-plug btn-open' onClick={openMenu}><span className='hidden'>메뉴 열기</span></a>
       </div>
        <div className='menu-wrap'>
          <ul>
            <li className={isMain ? 'on main' : 'main'}>
              <Link href={mainURL} data-route={mainURL}>커넥트 목록</Link>
            </li>
            <li className={isMy ? 'on my' : 'my'}>
              <Link href={myConnectURL} data-route={myConnectURL}>나의 잔디 커넥트</Link>
            </li>
            <li className={isAdm ? 'on admin' : 'admin'}>
              <Link href={adminConnectURL} data-route={adminConnectURL}>잔디 커넥트 관리자</Link>
            </li>
          </ul>
          <div className='notice-box'>
            <p className='icon-ic-question'>찾으시는 서비스가 없으신가요?</p>
            <button onClick={() => banner.survey(user)}>서비스 추가 요청하기</button>
          </div>
        </div>
     </div>
    }
  </>);
};

export default withRouter(Left);
