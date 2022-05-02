/* eslint-disable max-len */
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import Link from "next/link";

const TeamsConnectPlug = (props) => {
  const { team, connect } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
  }, [props.display]);

  return (<ul>
    { connect.teamsConnect[props.parent.name] && connect.teamsConnect[props.parent.name].map((data, i) => (
        <li className={JSON.stringify(data)} key={i} style={{ padding: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex' }}>
                <img src={data.bot && data.bot.thumbnailUrl} style={{ width: '80px', padding: '20px' }}></img>
              </div>
              <div>
                {/* 1라인 */}
                <div style={{ display: 'flex' }}>
                  {/* 채팅 보드 */}
                  <i>c/b</i>
                  <div>
                    <div>{data.roomId}</div>
                  </div>
                  {/* 비공개 공개 */}
                  <i>v/u</i>
                  {/* 알림 미알림 */}
                  <i>o/f</i>
                </div>
                {/* 2라인 */}
                <div>
                  <div style={{ display: 'flex' }}>
                    {/* ! */}
                    <i>!</i>
                    <div>{data.bot && data.bot.name}</div>
                  </div>
                </div>
                {/* 3라인 */}
                <div>
                  <div style={{ display: 'flex' }}>
                    {/* 체인모양? */}
                    <i>I</i>
                  </div>
                </div>
                {/* 4라인 */}
                <div>
                  <div style={{ display: 'flex' }}>
                    {/* 사람? */}
                    <i>h</i>
                    <div>{data.memberId}</div>
                  </div>
                </div>
              </div>
              <div>{data.createdAt}</div>
              <div>{data.status === 'enabled' ? '작동중' : '미작동'}</div>
              <button>편집</button>
              <button>삭제</button>
            </div>
          </div>
        </li>
    )) }
  </ul>);
};
export default TeamsConnectPlug;
