/* eslint-disable max-len */
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import TeamsConnectList from "./teams/TeamsConnectPlug";
import Link from "next/Link";
import { useRouter } from "next/router";
import {updateConnects} from "../../store/connect/connect";

const ConnectCard = (props) => {
  const dispatch = useDispatch();

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

  const handleDropdown = (data) => {
    // console.log( data )
    // if (data.display === 'block') {
    //   data.display = 'none';
    // }
    //   data.display = 'block';
    // }
    dispatch(updateConnects(data));
  };

  return (<>
    <div>연동 가능한 서비스 목록</div>
    <ul>
    { connect.connects && connect.connects.map((data, i) => (
        <li key={i} style={{ margin: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={data.botThumbnail} style={{ width: '50px' }}></img>
            <div style={{ width: '90%' }}>
              <div style={{ display: 'flex' }}>
                <div onClick={handleClick}>{data.label}</div>
                <i>!</i>
              </div>
              <div>{data.text}</div>
            </div>
            <div style={{ display: 'flex', width: '300px' }}>
              <div onClick={() => {
                handleDropdown(data);
              }}>{connect.teamsConnect[data.name] && connect.teamsConnect[data.name].length + '개 연동중'}</div>
              <Link href={data.name} onClick={addInterlock} data-route={data.name}>연동 항목 추가하기</Link>
            </div>
          </div>
          <TeamsConnectList parent={data} display={data.display} />
        </li>
    )) }
  </ul></>);
};
export default ConnectCard;
