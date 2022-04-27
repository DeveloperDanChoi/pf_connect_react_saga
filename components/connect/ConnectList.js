import {useSelector} from "react-redux";
import React, {useState} from "react";
import TeamsConnectList from "./teams/TeamsConnectList";
import Link from "next/Link";
import { useRouter } from "next/router";

const ConnectList = (props) => {
  const { team, connect } = useSelector((state) => {
    // console.log('ConnectList state !! ', state);
    return state;
  });

  const handleClick = (e) => {
    // console.log('click!!!', e);
  };

  const addInterlock = (e) => {
    // console.log( e.target.dataset.route )
    // window.location.href = e.target.dataset.route.toLowerCase();
  };

  return (<>
    <ul>
    { connect.connects && connect.connects.map((data, i) => (
        <li key={i}>
          <div style={{ display: 'flex' }}>
            <div onClick={handleClick}>{data.name} {connect.teamsConnect[data.name] && connect.teamsConnect[data.name].length + '개 연동중'}</div>
            {/* eslint-disable-next-line max-len */}
            <Link href={data.name.toLowerCase()} onClick={addInterlock} data-route={data.name}>연동 항목 추가하기</Link>
          </div>
          <TeamsConnectList parent={data} display={data.display} />
        </li>
    )) }
  </ul></>);
};
export default ConnectList;
