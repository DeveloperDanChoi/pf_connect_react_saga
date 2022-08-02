/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,no-shadow,object-curly-newline,object-property-newline,no-multiple-empty-lines */
import {useDispatch, useSelector} from 'react-redux';
import React, {Fragment, useEffect, useState} from 'react';
import { Input } from 'antd';
import { getPublicAssetPath } from '../../../../../../lib/assetHelper';
import Router, {useRouter} from "next/router";
import {modules as teamModules} from '../../../../../../store/team/team';
import { deleteConnect, modules as connectModules, updateStatus } from '../../../../../../store/connect/connect';
import ConnectPlugHeader from "./ConnectPlugHeader";
import {all} from "redux-saga/effects";

const ConnectPlug = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { connect, team, user } = useSelector((state) => (state));
  const [connectType, setConnectType] = useState('');

  /**
   * 상세 페이지 이동
   * @param data
   */
  const handleClick = (data) => {
    // TODO: config path
    const prefix = '/app/connect';
    Router.push(`${prefix}/${data.type}?id=${data.id}`, `${prefix}/${data.type}`);
  };

  /**
   * 커넥트 enabled/disabled<br>
   * @param data
   * @param e
   * @returns {{data, type: string}}
   */
  const handleToggleStatus = (data, e) => dispatch(updateStatus(data, e));

  /**
   * 커넥트 삭제<br>
   * @param data
   */
  const handleClickDeleteConnect = (data) => {
    dispatch(deleteConnect(data));
  };

  /**
   * 올바른 접근이 아닐 경우 튕김
   * TODO: 공통화
   */
  useEffect(() => {
    // dispatch(connectModules.creators.setTeamsConnectDetail([]));

    if (router.asPath.indexOf('?') === -1) {
      Router.push('/app', '/app');
    }

    setConnectType(router.asPath.split('?')[1].split('#')[0]);
  }, []);

  useEffect(() => {
    if (connectType === '' || Object.keys(connect.connectsObj).length === 0) return;

    if (!connect.connectsObj[connectType]) {
      Router.push('/app', '/app');
    }
  }, [connectType, connect.connectsObj]);

  const [inputVal, setInputVal] = useState('');
  const [selectVal, setSelectVal] = useState('');

  /* switch toggle */
  const onToggle = (e) => {
    e.target.closest('.switch').classList.toggle('on');
    e.target.closest('tr').classList.toggle('disabled');
  };

  /* custom selectbox  */
  const onSelect = (e) => {
    // e.stopPropagation();
    const selectBoxs = document.querySelectorAll('.select-box');
    if (e.target.closest('.select-box').classList.contains('on')) {
      e.target.closest('.select-box').classList.remove('on');
    } else {
      selectBoxs.forEach((selectbox) => selectbox.classList.remove('on'));
      e.target.closest('.select-box').classList.add('on');
    }
  };
  /* tooltip box  */
  const openTooltip = (e) => {
    // e.stopPropagation();
    const tooltipBoxs = document.querySelectorAll('.tooltip-box');
    const target = e.currentTarget.nextElementSibling;
    if (target.classList.contains('on')) {
      target.classList.remove('on');
    } else {
      tooltipBoxs.forEach((tooltipbox) => tooltipbox.classList.remove('on'));
      target.classList.add('on');
    }
  };
  /* custom selectbox, tooltip box */
  useEffect(() => {
    const select = document.querySelector('.select-list').querySelectorAll('a');
    const selectBox = document.querySelector('.select-box');
    select.forEach((box) => {
      box.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        setSelectVal(e.currentTarget.innerText);

        select.forEach((el) => {
          el.classList.remove('on');
        });
        target.classList.add('on');
        selectBox.classList.toggle('on');
      })
    });
    const tooltipBoxs = document.querySelectorAll('.tooltip-box');
    document.querySelector('body').addEventListener('click', (e) => {
      e.preventDefault();
      if ((e.target.closest('.select-box') === null && selectBox.classList.contains('on'))) {
        selectBox.classList.toggle('on');
      }
      if (e.target.closest('.tooltip-box') === null) {
        tooltipBoxs.forEach((tooltipBox) => {
          if (tooltipBox.classList.contains('on')) { tooltipBox.classList.toggle('on'); }
        });
      }
    });
  }, []);

  useEffect(() => {
    if (team.teamId === 0) return;

    dispatch(teamModules.creators.getTeamsMembers(team.teamId));
  }, [user.user.member]);

  useEffect(() => {
    if (team.teamId === 0) return;

    dispatch(connectModules.creators.getTeamsConnect(team.teamId));
  }, [team.teamsMembers]);

  useEffect(() => {
    if (connectType === '' || Object.keys(connect.connectsObj).length === 0) return;
    if (team.teamId === 0) return;

    // 앱별 상세 데이터
    // const connectDetail = connectModules.creators.getTeamsConnectDetail();
    // console.log( connectDetail )
    // TODO: 다시 페이지에 진입했을 때 이전 상태 유지?
    const thisDetail = connect.teamsConnectDetail[connectType] || {};

    console.log( thisDetail )

    const allData = connect.teamsConnect[connectType];

    const obj = (() => {
      const interval = 13;
      const count = allData.length;
      const current = 0;
      const page = Math.floor(allData.length / 13);
      const datas = [];
      const pageSize = 10;
      let currentIndex = 0;

      for (let i = 0; i < page + 1; i++) {
        if (i === page) {
          datas.push([...allData].slice(currentIndex, count));
        } else {
          datas.push([...allData].slice(currentIndex, currentIndex + interval));
        }
        currentIndex += interval;
      }

      return {
        interval,
        count,
        current,
        page,
        datas,
        pageSize,
      }
    })();

    // console.log( obj )

    dispatch(connectModules.creators.setTeamsConnectDetail({[connectType]: obj}));
  }, [connect.teamsConnect[connectType]]);

  const pagination = (() => {
    if (!connect.teamsConnectDetail[connectType]) return;

    const { pageSize, current, page } = connect.teamsConnectDetail[connectType];
    const arr = [];
    const startPage = (() => {
      if (current < pageSize) {
        return 0;
      }

      return Math.floor(current / pageSize) * pageSize;
    })();
    const lastPage = (() => {
      if (current < pageSize) {
        return page > pageSize ? pageSize : page + 1;
      }
      const currPage = Math.floor(current / pageSize) * pageSize + pageSize;

      return currPage < page ? currPage : page + 1;
    })();

    // 현재 페이지 기준으로
    for (let i = startPage; i < lastPage; i++) {
      if (i === connect.teamsConnectDetail[connectType].current) {
        arr.push(
          <strong key={i} onClick={() => {
            const obj = {...connect.teamsConnectDetail[connectType]};
            obj.current = i;
            // dispatch(connectModules.creators.setTeamsConnectDetail({[connectType]: obj}));
          }}>{i + 1}</strong>
        );
      } else {
        arr.push(
          <a key={i} onClick={() => {
            const obj = {...connect.teamsConnectDetail[connectType]};
            obj.current = i;
            dispatch(connectModules.creators.setTeamsConnectDetail({[connectType]: obj}));
          }
          }>{i + 1}</a>
        );
      }
    }
    return arr;
  })();

  return (<>
        <div className='detail-container'>
          <ConnectPlugHeader />
          {/* //detail-header */}
          <div className='detail-wrapper'>
            <div className='connect-table-wrap'>
              <table>
                <caption></caption>
                <colgroup>
                  <col width="36%"/>
                  <col width="18%"/>
                  <col width="14%"/>
                  <col width="13%"/>
                  <col width="auto"/>
                </colgroup>
                <thead>
                <tr>
                  <th scope="col">커넥트 프로필</th>
                  <th scope="col">연동된 토픽 / JANDI</th>
                  <th scope="col">생성자</th>
                  <th scope="col">생성일</th>
                  <th scope="col">상태</th>
                </tr>
                </thead>

                {
                  connect.input.search !== '' && connect.teamsConnectDetail[connectType] && connect.teamsConnectDetail[connectType].count === 0 &&
                  <tbody>
                  <tr>
                    <td colSpan={5}>
                      <div className='noresult-wrap'><span>&lsquo;{connect.input.search}&lsquo; 의 검색 결과가 없습니다.</span></div>
                    </td>
                  </tr>
                  </tbody>
                }
                {
                  connect.teamsConnectDetail[connectType] && connect.teamsConnectDetail[connectType].count > 0 &&
                  <tbody>
                  {/* [D]: 13개 이상부터 페이징 처리 필요 */}
                  {
                    connect.teamsConnectDetail[connectType] && connect.teamsConnectDetail[connectType].datas.length > 0 && connect.teamsConnectDetail[connectType].datas[connect.teamsConnectDetail[connectType].current].map((dataConnect, i) => (
                      <tr key={i} className={dataConnect.status}>
                        {
                          dataConnect.bot &&
                          <td>
                            <span className='img-box'><img src={dataConnect.bot.thumbnailUrl} alt={dataConnect.bot.name}></img></span>
                            <span>{dataConnect.bot.name}</span>
                          </td>
                        }
                        {
                          !dataConnect.bot &&
                          <td>
                            <span className='img-box'></span>
                            <span></span>
                          </td>
                        }
                        <td><span className='fc-green'>{dataConnect.roomName}</span></td>
                        <td>
                      <span className='img-box'>
                        {
                          dataConnect.member.photoUrl &&
                          <img src={dataConnect.member.photoUrl} alt={dataConnect.member.name}></img>
                        }
                      </span>
                          <span>{dataConnect.member.name}</span>
                        </td>
                        <td><span className='fw-normal'>{dataConnect.createdAt}</span></td>
                        <td className='of-visible'>
                          <div className='status-wrap'>
                            <label className={dataConnect.statusClss} labefor="">
                              <span className='txt'>{dataConnect.statusText}</span>
                              <Input type="checkbox" id=""/>
                              <a href="#none" className="slider" onClick={(e) => handleToggleStatus(dataConnect, e)}></a>
                            </label>
                            <div className='btn-wrap tablet'>
                              <a href="#none" className='btn-more' onClick={openTooltip}><i className="icon-ic-more"></i><span
                                className='hidden'>열기</span></a>
                              <div className='tooltip-box'>
                                <div>
                                  <button className='btn-icon'><i className="icon-ic-edit"></i><span>수정하기</span></button>
                                  <button className='btn-icon'><i className="icon-ic-delete"></i><span>삭제하기</span></button>
                                </div>
                              </div>
                            </div>
                            <div className='btn-wrap pc'>
                              <button className='btn-icon' onClick={() => handleClick(dataConnect)}><i className="icon-ic-edit"></i><span className='hidden'>편집</span></button>
                              <button className='btn-icon' onClick={() => handleClickDeleteConnect(dataConnect)}><i className="icon-ic-delete"></i><span className='hidden'>삭제</span></button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                  {
                    connect.teamsConnectDetail && connect.teamsConnectDetail.length === 0 &&
                    <tr>
                      <td colSpan={5}>
                        <div className='noresult-wrap'><span>&lsquo;변수처리할것&lsquo; 의 검색 결과가 없습니다.</span></div>
                      </td>
                    </tr>
                  }
                  </tbody>
                }
              </table>
            </div>
            {/* //connect-table-wrap */}
            <div className='pagination-wrap'>
              <button type='button' className='btn-paging first icon-ic-double-angle-left-02' disabled={connect.teamsConnectDetail[connectType] && connect.teamsConnectDetail[connectType].count === 0 ? 'disabled' : ''} onClick={() => {
                const obj = {...connect.teamsConnectDetail[connectType]};
                obj.current = 0;
                dispatch(connectModules.creators.setTeamsConnectDetail({[connectType]: obj}));
              }}>
                <span className='hidden'>맨끝</span>
              </button>
              <button type='button' className='btn-paging prev icon-ic-mini-left' disabled={connect.teamsConnectDetail[connectType] && connect.teamsConnectDetail[connectType].current === 0 ? 'disabled' : ''} onClick={() => {
                const obj = {...connect.teamsConnectDetail[connectType]};
                obj.current = obj.current === 0 ? 0 : obj.current - 1;
                dispatch(connectModules.creators.setTeamsConnectDetail({[connectType]: obj}));
              }}>
                <span className='hidden'>이전</span>
              </button>
              <div className='page-num'>{pagination}</div>
              <button type='button' className='btn-paging next icon-ic-mini-right' disabled={connect.teamsConnectDetail[connectType] && connect.teamsConnectDetail[connectType].current === connect.teamsConnectDetail[connectType].page ? 'disabled' : ''} onClick={() => {
                const obj = {...connect.teamsConnectDetail[connectType]};
                obj.current = obj.current === obj.page ? obj.current : obj.current + 1;
                dispatch(connectModules.creators.setTeamsConnectDetail({[connectType]: obj}));
              }}>
                <span className='hidden'>다음</span>
              </button>
              <button type='button' className='btn-paging last icon-ic-double-angle-right-02' disabled={connect.teamsConnectDetail[connectType] && connect.teamsConnectDetail[connectType].current === connect.teamsConnectDetail[connectType].page ? 'disabled' : ''} onClick={() => {
                const obj = {...connect.teamsConnectDetail[connectType]};
                obj.current = obj.page;
                dispatch(connectModules.creators.setTeamsConnectDetail({[connectType]: obj}));
              }}>
                <span className='hidden'>맨뒤</span>
              </button>
            </div>
            {/* //pagination-wrap */}
          </div>

          {/* [D] : 검색결과 없을 경우 */}
          {/*<div className='detail-wrapper'>*/}
          {/*  <div className='connect-table-wrap'>*/}
          {/*    <table>*/}
          {/*      <caption></caption>*/}
          {/*      <colgroup>*/}
          {/*        <col width="35%"/>*/}
          {/*        <col width="20%"/>*/}
          {/*        <col width="13%"/>*/}
          {/*        <col width="13%"/>*/}
          {/*        <col width="auto"/>*/}
          {/*      </colgroup>*/}
          {/*      <thead>*/}
          {/*      <tr>*/}
          {/*        <th scope="col">커넥트 프로필</th>*/}
          {/*        <th scope="col">연동된 토픽 / JANDI</th>*/}
          {/*        <th scope="col">생성자</th>*/}
          {/*        <th scope="col">생성일</th>*/}
          {/*        <th scope="col">상태</th>*/}
          {/*      </tr>*/}
          {/*      </thead>*/}
          {/*      <tbody>*/}
          {/*      <tr>*/}
          {/*        <td colSpan={5}>*/}
          {/*          <div className='noresult-wrap'><span>&lsquo;홍길동&lsquo; 의 검색 결과가 없습니다.</span></div>*/}
          {/*        </td>*/}
          {/*      </tr>*/}
          {/*      </tbody>*/}
          {/*    </table>*/}
          {/*  </div>*/}
          {/*  /!* //connect-table-wrap *!/*/}
          {/*  <div className='pagination-wrap'>*/}
          {/*    <button type='button' className='btn-paging first icon-ic-double-angle-left-02' disabled><span*/}
          {/*        className='hidden'>맨끝</span></button>*/}
          {/*    <button type='button' className='btn-paging prev icon-ic-mini-left' disabled><span*/}
          {/*        className='hidden'>이전</span></button>*/}
          {/*    <div className='page-num'>*/}
          {/*      <strong>1</strong>*/}
          {/*    </div>*/}
          {/*    <button type='button' className='btn-paging next icon-ic-mini-right' disabled><span*/}
          {/*        className='hidden'>다음</span></button>*/}
          {/*    <button type='button' className='btn-paging last icon-ic-double-angle-right-02' disabled><span*/}
          {/*        className='hidden'>맨뒤</span></button>*/}
          {/*  </div>*/}
          {/*  /!* //pagination-wrap *!/*/}
          {/*</div>*/}
        </div>
  </>);
};
export default ConnectPlug;
/**
 * TODO: 페이징 refactor
 * TODO: 이미지 radius
 * TODO: 토픽명 매핑
 * TODO: not found messages
 */
