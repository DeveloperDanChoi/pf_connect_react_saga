/* eslint-disable max-len */
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import { Input } from 'antd';
import { getPublicAssetPath } from '../../../../../../lib/assetHelper';
import Router, {useRouter} from "next/router";
import {modules as teamModules} from "../../../../../../store/team/team";
import { deleteConnect, modules as connectModules, updateStatus } from "../../../../../../store/connect/connect";
import ConnectPlugHeader from "./ConnectPlugHeader";

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

    dispatch(connectModules.creators.setTeamsConnectDetail(connect.teamsConnect[connectType]));
  }, [connect.teamsConnect]);

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
                <tbody>
                {/* [D]: 13개 이상부터 페이징 처리 필요 */}
                {
                  connect.teamsConnectDetail && connect.teamsConnectDetail.map((dataConnect, i) => (
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
                    <td><span className='fc-green'>Mobile JIRA</span></td>
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
              </table>
            </div>
            {/* //connect-table-wrap */}
            <div className='pagination-wrap'>
              <button type='button' className='btn-paging first icon-ic-double-angle-left-02'><span
                  className='hidden'>맨끝</span></button>
              <button type='button' className='btn-paging prev icon-ic-mini-left'><span className='hidden'>이전</span>
              </button>
              <div className='page-num'>
                <strong>1</strong>
                <a href='#none'>2</a>
                <a href='#none'>3</a>
              </div>
              <button type='button' className='btn-paging next icon-ic-mini-right'><span className='hidden'>다음</span>
              </button>
              <button type='button' className='btn-paging last icon-ic-double-angle-right-02' disabled><span
                  className='hidden'>맨뒤</span></button>
            </div>
            {/* //pagination-wrap */}
          </div>


          <p>--- 퍼블</p>
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
                <tbody>
                {/* [D]: 13개 이상부터 페이징 처리 필요 */}
                <tr>
                  <td>
                    <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')}
                                                   alt="dummy"></img></span>
                    <span>
                    JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                  </span>
                  </td>
                  <td><span className='fc-green'>Mobile JIRA</span></td>
                  <td>
                    <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')}
                                                   alt="dummy"></img></span>
                    <span>이은혜</span>
                  </td>
                  <td><span className='fw-normal'>2021-12-06</span></td>
                  <td className='of-visible'>
                    <div className='status-wrap'>
                      <label className="switch on" labefor="">
                        <span className='txt'>작동중</span>
                        <Input type="checkbox" id=""/>
                        <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
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
                        <button className='btn-icon'><i className="icon-ic-edit"></i><span className='hidden'>편집</span>
                        </button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span
                            className='hidden'>삭제</span></button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')}
                                                   alt="dummy"></img></span>
                    <span>
                    JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                  </span>
                  </td>
                  <td><span className='fc-green'>Mobile JIRA</span></td>
                  <td>
                    <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')}
                                                   alt="dummy"></img></span>
                    <span>이은혜</span>
                  </td>
                  <td><span className='fw-normal'>2021-12-06</span></td>
                  <td className='of-visible'>
                    <div className='status-wrap'>
                      <label className="switch on" labefor="">
                        <span className='txt'>작동중</span>
                        <Input type="checkbox" id=""/>
                        <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
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
                        <button className='btn-icon'><i className="icon-ic-edit"></i><span className='hidden'>편집</span>
                        </button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span
                            className='hidden'>삭제</span></button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')}
                                                   alt="dummy"></img></span>
                    <span>
                    JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                  </span>
                  </td>
                  <td><span className='fc-green'>Mobile JIRA</span></td>
                  <td>
                    <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')}
                                                   alt="dummy"></img></span>
                    <span>이은혜</span>
                  </td>
                  <td><span className='fw-normal'>2021-12-06</span></td>
                  <td className='of-visible'>
                    <div className='status-wrap'>
                      <label className="switch on" labefor="">
                        <span className='txt'>작동중</span>
                        <Input type="checkbox" id=""/>
                        <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
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
                        <button className='btn-icon'><i className="icon-ic-edit"></i><span className='hidden'>편집</span>
                        </button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span
                            className='hidden'>삭제</span></button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')}
                                                   alt="dummy"></img></span>
                    <span>
                    JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                  </span>
                  </td>
                  <td><span className='fc-green'>Mobile JIRA</span></td>
                  <td>
                    <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')}
                                                   alt="dummy"></img></span>
                    <span>이은혜</span>
                  </td>
                  <td><span className='fw-normal'>2021-12-06</span></td>
                  <td className='of-visible'>
                    <div className='status-wrap'>
                      <label className="switch on" labefor="">
                        <span className='txt'>작동중</span>
                        <Input type="checkbox" id=""/>
                        <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
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
                        <button className='btn-icon'><i className="icon-ic-edit"></i><span className='hidden'>편집</span>
                        </button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span
                            className='hidden'>삭제</span></button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className='disabled'>
                  <td>
                    <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')}
                                                   alt="dummy"></img></span>
                    <span>
                    JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                  </span>
                  </td>
                  <td><span className='fc-green'>Mobile JIRA</span></td>
                  <td>
                    <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')}
                                                   alt="dummy"></img></span>
                    <span>이은혜</span>
                  </td>
                  <td><span className='fw-normal'>2021-12-06</span></td>
                  <td className='of-visible'>
                    <div className='status-wrap'>
                      <label className="switch" labefor="">
                        <span className='txt'>작동중</span>
                        <Input type="checkbox" id=""/>
                        <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
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
                        <button className='btn-icon'><i className="icon-ic-edit"></i><span className='hidden'>편집</span>
                        </button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span
                            className='hidden'>삭제</span></button>
                      </div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            {/* //connect-table-wrap */}
            <div className='pagination-wrap'>
              <button type='button' className='btn-paging first icon-ic-double-angle-left-02'><span
                  className='hidden'>맨끝</span></button>
              <button type='button' className='btn-paging prev icon-ic-mini-left'><span className='hidden'>이전</span>
              </button>
              <div className='page-num'>
                <strong>1</strong>
                <a href='#none'>2</a>
                <a href='#none'>3</a>
              </div>
              <button type='button' className='btn-paging next icon-ic-mini-right'><span className='hidden'>다음</span>
              </button>
              <button type='button' className='btn-paging last icon-ic-double-angle-right-02' disabled><span
                  className='hidden'>맨뒤</span></button>
            </div>
            {/* //pagination-wrap */}
          </div>

          {/* [D] : 검색결과 없을 경우 */}
          <div className='detail-wrapper'>
            <div className='connect-table-wrap'>
              <table>
                <caption></caption>
                <colgroup>
                  <col width="35%"/>
                  <col width="20%"/>
                  <col width="13%"/>
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
                <tbody>
                <tr>
                  <td colSpan={5}>
                    <div className='noresult-wrap'><span>&lsquo;홍길동&lsquo; 의 검색 결과가 없습니다.</span></div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            {/* //connect-table-wrap */}
            <div className='pagination-wrap'>
              <button type='button' className='btn-paging first icon-ic-double-angle-left-02' disabled><span
                  className='hidden'>맨끝</span></button>
              <button type='button' className='btn-paging prev icon-ic-mini-left' disabled><span
                  className='hidden'>이전</span></button>
              <div className='page-num'>
                <strong>1</strong>
              </div>
              <button type='button' className='btn-paging next icon-ic-mini-right' disabled><span
                  className='hidden'>다음</span></button>
              <button type='button' className='btn-paging last icon-ic-double-angle-right-02' disabled><span
                  className='hidden'>맨뒤</span></button>
            </div>
            {/* //pagination-wrap */}
          </div>
        </div>
  </>);
};
export default ConnectPlug;
/**
 * TODO: 페이징
 * TODO: 이미지 radius
 * TODO: 토픽명 매핑
 * TODO: not found messages
 */
