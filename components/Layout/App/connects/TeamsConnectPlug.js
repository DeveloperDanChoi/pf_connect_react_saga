import { useDispatch, useSelector } from 'react-redux';
/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,react/jsx-no-duplicate-props,guard-for-in,operator-assignment,no-unreachable,object-curly-newline */
import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/Link';
import { updateStatus, deleteConnect } from '../../../../store/connect/connect';

const TeamsConnectPlug = (props) => {
  const dispatch = useDispatch();
  const { connect } = useSelector((state) => {
    // console.log(state);
    return state;
  });

  /**
   * 연결 정보 변경<br>
   * @param data
   */
  const changedSetting = (data) => {
    console.log(data);
    Router.push(`/${data.type}?id=${data.id}`, `/${data.type}`);
    // dispatch(updateStatus(data));
  };
  /**
   * 연결 상태 변경<br>
   * enabled/disabled<br>
   * @param data
   */
  const changedStatus = (data) => {
    // TODO: 동작 -> 미동작할 때 confirm
    dispatch(updateStatus(data));
  };
  /**
   * 연결 삭제<br>
   * @param data
   */
  const deletedConnect = (data) => {
    // TODO: 삭제할 때 confirm
    dispatch(deleteConnect(data));
  };

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
              <div onClick={() => {
                changedStatus(data);
              }}>{data.status === 'enabled' ? '작동중' : '미작동'}</div>
              <button onClick={() => {
                changedSetting(data);
              }}>편집</button>
              {/*<Link href={props.parent.name + '?' + data.id}>편집</Link>*/}
              <button onClick={() => {
                deletedConnect(data);
              }}>삭제</button>
            </div>
          </div>
        </li>
    )) }
  </ul>);
};
export default TeamsConnectPlug;
