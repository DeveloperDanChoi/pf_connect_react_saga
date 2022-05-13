import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'next/router';

const Header = (props) => {
  const { team } = useSelector((state) => state.team);

  return (<>
    <button>뒤로가기</button>
    <span>잔디 커넥트</span>
    <button>X</button>
  </>);
};

export default withRouter(Header);
