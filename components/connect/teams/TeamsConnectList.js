import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";

const TeamsConnectList = (props) => {
  const { team, connect } = useSelector((state) => {
    return state;
  });

  const handleClick = (e) => {
    console.log( e )
  };

  useEffect(() => {
  }, [props.display]);

  return (<ul>
    {/* eslint-disable-next-line max-len */}
    { connect.teamsConnect[props.parent.name] && connect.teamsConnect[props.parent.name].map((data, i) => (
        <li key={i} onClick={handleClick}>
          <div>{data.memberId} {data.status === 'enabled' ? '작동중' : ''}</div>
        </li>
    )) }
  </ul>);
};
export default TeamsConnectList;
