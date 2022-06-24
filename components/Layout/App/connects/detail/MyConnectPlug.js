/* eslint-disable max-len */
import {useDispatch, useSelector} from 'react-redux';
import React, {Fragment, useEffect, useState} from 'react';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';
import { deleteConnect, modules as connectModules, updateStatus } from "../../../../../store/connect/connect";
import {template1} from "../../../../../service/connect";
import Router from "next/router";
import {putTeamsGithubSetting} from "../../../../../api/connect/WebAdmin/Github/github";



const MyConnectPlug = (props) => {
  const dispatch = useDispatch();
  const { connect, team, user } = useSelector((state) => {
    return state;
  });

  const allModules = template1.allModules();

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

  useEffect(() => {
    if (team.teamId === 0 || user.user.member.id === 0) return;

    dispatch(connectModules.creators.getTeamsConnect(team.teamId));
  }, [team.teamId, user.user.member]);

  /* switch toggle */
  const onToggle = (e) => {
    e.target.closest('.switch').classList.toggle('on');
    e.target.closest('tr').classList.toggle('disabled');
  };

  /* (s) tooltipbox toggle */
  useEffect(() => {
    const tooltipBoxs = document.querySelectorAll('.tooltip-box');
    document.querySelector('body').addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.closest('.tooltip-box') === null) {
        tooltipBoxs.forEach((tooltipBox) => {
          if (tooltipBox.classList.contains('on')) { tooltipBox.classList.toggle('on'); }
        });
      }
    });
  }, []);
  const openTooltip = (e) => {
    e.stopPropagation();
    const tooltipBoxs = document.querySelectorAll('.tooltip-box');
    const target = e.currentTarget.nextElementSibling;
    if (target.classList.contains('on')) {
      target.classList.remove('on');
    } else {
      tooltipBoxs.forEach((tooltipbox) => tooltipbox.classList.remove('on'));
      target.classList.add('on');
    }
  };
  /* (e) tooltipbox toggle */
  return (
  <>
    { user.myConnectCount !== '' &&
    <div className='connect-container'>
      <div className='title-wrap'>
        <h2>나의 잔디 커넥트</h2>
        <span className='sub_tit'>총 <strong>{user.myConnectCount}</strong>개 연동 중</span>
      </div>
      { connect.connects.map((data, i) => (
          <Fragment key={i}>
          {
            user.myConnect && user.myConnect[data.name] && (
            <div className='connect-table-wrap'>
              <div className='connect-info-box'>
                <p className='img-box'><img src={data.botThumbnail} alt={data.name}></img></p>
                <div className='info'>
                  <strong className="info-tit">{data.label}</strong>
                  <p>{data.name}</p>
                </div>
                <div className='connect-etc-box'><span><i className='icon-ic-plug'></i>{user.myConnect[data.name].length}개 연동중</span></div>
              </div>
              <table>
                <caption></caption>
                <colgroup>
                  <col width="auto"/>
                  <col width="20%"/>
                  <col width="15%"/>
                  <col width="190px"/>
                </colgroup>
                <thead>
                <tr>
                  <th scope="col">커넥트 프로필</th>
                  <th scope="col">연동된 토픽 / JANDI</th>
                  <th scope="col">생성일</th>
                  <th scope="col">상태</th>
                </tr>
                </thead>
                <tbody>
                {
                  user.myConnect[data.name].map((dataConnect, i2) => (
                    <tr key={i2} className={dataConnect.status}>
                      <td>
                        <span className='img-box'><img src={dataConnect.bot.thumbnailUrl} alt={data.name}></img></span>
                        <span>{dataConnect.bot.name}</span>
                      </td>
                      <td><span className='fc-green'>{dataConnect.roomName}</span></td>
                      <td><span className='fw-normal'>{dataConnect.createdAt}</span></td>
                      <td className='of-visible'>
                        <div className='status-wrap'>
                          <label className={dataConnect.statusClss} labefor="unit">
                            <span className='txt'>{dataConnect.statusText}</span>
                            <Input type="checkbox" id=""/>
                            <a href="#none" className="slider" onClick={(e) => handleToggleStatus(dataConnect, e)}></a>
                          </label>
                          <div className='btn-wrap tablet'>
                            <a href="#none" className='btn-more' onClick={openTooltip}><i className="icon-ic-more"></i><span className='hidden'>열기</span></a>
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
                </tbody>
              </table>
            </div>
            )
          }
          </Fragment>
      )) }
      {/* ******************************* */}
      {/* ******************************* */}
      {/* ******************************* */}
      <p>---퍼블</p>
      <div className='connect-table-wrap'>
        <div className='connect-info-box'>
          <p className='img-box'><img src={getPublicAssetPath('static/icon_jira.png')} alt="jira"></img></p>
          <div className='info'>
            <strong className="info-tit">JIRA</strong>
            <p>이슈 추적, 프로젝트 관리</p>
          </div>
          <div className='connect-etc-box'><span><i className='icon-ic-plug'></i>7개 연동중</span></div>
        </div>
        {/* //connect-info-box */}
        <table>
          <caption></caption>
          <colgroup>
            <col width="auto"/>
            <col width="20%"/>
            <col width="15%"/>
            <col width="190px"/>
          </colgroup>
          <thead>
            <tr>
              <th scope="col">커넥트 프로필</th>
              <th scope="col">연동된 토픽 / JANDI</th>
              <th scope="col">생성일</th>
              <th scope="col">상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                <span>
                  JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                </span>
              </td>
              <td><span className='fc-green'>Mobile JIRA</span></td>
              <td><span className='fw-normal'>2021-12-06</span></td>
              <td className='of-visible'>
                <div className='status-wrap'>
                  <label className="switch on" labefor="unit">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <div className='btn-wrap tablet'>
                    <a href="#none" className='btn-more' onClick={openTooltip} onClick={openTooltip}><i className="icon-ic-more"></i><span className='hidden'>열기</span></a>
                    <div className='tooltip-box'>
                      <div>
                        <button className='btn-icon' onClick={() => handleClick({type: 'jira'})}><i className="icon-ic-edit"></i><span>수정하기</span></button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span>삭제하기</span></button>
                      </div>
                  </div>
                  </div>
                  <div className='btn-wrap pc'>
                    <button className='btn-icon'onClick={() => handleClick({type: 'jira'})}><i className="icon-ic-edit"></i><span className='hidden'>편집</span></button>
                    <button className='btn-icon'><i className="icon-ic-delete"></i><span className='hidden'>삭제</span></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                <span>
                  JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                </span>
              </td>
              <td><span className='fc-green'>outgoing</span></td>
              <td><span className='fw-normal'>2021-12-06</span></td>
              <td className='of-visible'>
                <div className='status-wrap'>
                  <label className="switch on" labefor="unit">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <div className='btn-wrap tablet'>
                    <a href="#none" className='btn-more' onClick={openTooltip}><i className="icon-ic-more"></i><span className='hidden'>열기</span></a>
                    <div className='tooltip-box'>
                      <div>
                        <button className='btn-icon' onClick={() => handleClick({type: 'outgoing'})}><i className="icon-ic-edit"></i><span>수정하기</span></button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span>삭제하기</span></button>
                      </div>
                  </div>
                  </div>
                  <div className='btn-wrap pc'>
                    <button className='btn-icon'onClick={() => handleClick({type: 'outgoing'})}><i className="icon-ic-edit"></i><span className='hidden'>편집</span></button>
                    <button className='btn-icon'><i className="icon-ic-delete"></i><span className='hidden'>삭제</span></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                <span>
                  JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                </span>
              </td>
              <td><span className='fc-green'>rss</span></td>
              <td><span className='fw-normal'>2021-12-06</span></td>
              <td className='of-visible'>
                <div className='status-wrap'>
                  <label className="switch on" labefor="unit">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <div className='btn-wrap tablet'>
                    <a href="#none" className='btn-more' onClick={openTooltip}><i className="icon-ic-more"></i><span className='hidden'>열기</span></a>
                    <div className='tooltip-box'>
                      <div>
                        <button className='btn-icon' onClick={() => handleClick({type: 'rss'})}><i className="icon-ic-edit"></i><span>수정하기</span></button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span>삭제하기</span></button>
                      </div>
                  </div>
                  </div>
                  <div className='btn-wrap pc'>
                    <button className='btn-icon'onClick={() => handleClick({type: 'rss'})}><i className="icon-ic-edit"></i><span className='hidden'>편집</span></button>
                    <button className='btn-icon'><i className="icon-ic-delete"></i><span className='hidden'>삭제</span></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                <span>
                  JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                </span>
              </td>
              <td><span className='fc-green'>github</span></td>
              <td><span className='fw-normal'>2021-12-06</span></td>
              <td className='of-visible'>
                <div className='status-wrap'>
                  <label className="switch on" labefor="unit">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <div className='btn-wrap tablet'>
                    <a href="#none" className='btn-more' onClick={openTooltip}><i className="icon-ic-more"></i><span className='hidden'>열기</span></a>
                    <div className='tooltip-box'>
                      <div>
                        <button className='btn-icon' onClick={() => handleClick({type: 'github'})}><i className="icon-ic-edit"></i><span>수정하기</span></button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span>삭제하기</span></button>
                      </div>
                  </div>
                  </div>
                  <div className='btn-wrap pc'>
                    <button className='btn-icon'onClick={() => handleClick({type: 'github'})}><i className="icon-ic-edit"></i><span className='hidden'>편집</span></button>
                    <button className='btn-icon'><i className="icon-ic-delete"></i><span className='hidden'>삭제</span></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                <span>
                  JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                </span>
              </td>
              <td><span className='fc-green'>googleCalendar</span></td>
              <td><span className='fw-normal'>2021-12-06</span></td>
              <td className='of-visible'>
                <div className='status-wrap'>
                  <label className="switch on" labefor="unit">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <div className='btn-wrap tablet'>
                    <a href="#none" className='btn-more' onClick={openTooltip}><i className="icon-ic-more"></i><span className='hidden'>열기</span></a>
                    <div className='tooltip-box'>
                      <div>
                        <button className='btn-icon' onClick={() => handleClick({type: 'googleCalendar'})}><i className="icon-ic-edit"></i><span>수정하기</span></button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span>삭제하기</span></button>
                      </div>
                  </div>
                  </div>
                  <div className='btn-wrap pc'>
                    <button className='btn-icon'onClick={() => handleClick({type: 'googleCalendar'})}><i className="icon-ic-edit"></i><span className='hidden'>편집</span></button>
                    <button className='btn-icon'><i className="icon-ic-delete"></i><span className='hidden'>삭제</span></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                <span>
                  JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                </span>
              </td>
              <td><span className='fc-green'>trello</span></td>
              <td><span className='fw-normal'>2021-12-06</span></td>
              <td className='of-visible'>
                <div className='status-wrap'>
                  <label className="switch on" labefor="unit">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <div className='btn-wrap tablet'>
                    <a href="#none" className='btn-more' onClick={openTooltip}><i className="icon-ic-more"></i><span className='hidden'>열기</span></a>
                    <div className='tooltip-box'>
                      <div>
                        <button className='btn-icon' onClick={() => handleClick({type: 'trello'})}><i className="icon-ic-edit"></i><span>수정하기</span></button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span>삭제하기</span></button>
                      </div>
                  </div>
                  </div>
                  <div className='btn-wrap pc'>
                    <button className='btn-icon'onClick={() => handleClick({type: 'trello'})}><i className="icon-ic-edit"></i><span className='hidden'>편집</span></button>
                    <button className='btn-icon'><i className="icon-ic-delete"></i><span className='hidden'>삭제</span></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                <span>
                  JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                </span>
              </td>
              <td><span className='fc-green'>incoming</span></td>
              <td><span className='fw-normal'>2021-12-06</span></td>
              <td className='of-visible'>
                <div className='status-wrap'>
                  <label className="switch on" labefor="unit">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <div className='btn-wrap tablet'>
                    <a href="#none" className='btn-more' onClick={openTooltip}><i className="icon-ic-more"></i><span className='hidden'>열기</span></a>
                    <div className='tooltip-box'>
                      <div>
                        <button className='btn-icon' onClick={() => handleClick({type: 'incoming'})}><i className="icon-ic-edit"></i><span>수정하기</span></button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span>삭제하기</span></button>
                      </div>
                  </div>
                  </div>
                  <div className='btn-wrap pc'>
                    <button className='btn-icon'onClick={() => handleClick({type: 'incoming'})}><i className="icon-ic-edit"></i><span className='hidden'>편집</span></button>
                    <button className='btn-icon'><i className="icon-ic-delete"></i><span className='hidden'>삭제</span></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr className='disabled'>
              <td>
                <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                <span>
                  JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                </span>
              </td>
              <td><span className='fc-green'>Mobile bitbucket</span></td>
              <td><span className='fw-normal'>2021-12-06</span></td>
              <td className='of-visible'>
                <div className='status-wrap'>
                  <label className="switch" labefor="">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <div className='btn-wrap tablet'>
                    <a href="#none" className='btn-more' onClick={openTooltip}><i className="icon-ic-more"></i><span className='hidden'>열기</span></a>
                    <div className='tooltip-box'>
                      <div>
                        <button className='btn-icon' onClick={() => handleClick({type: 'bitbucket'})}><i className="icon-ic-edit"></i><span>수정하기</span></button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span>삭제하기</span></button>
                      </div>
                  </div>
                  </div>
                  <div className='btn-wrap pc'>
                    <button className='btn-icon'onClick={() => handleClick({type: 'bitbucket'})}><i className="icon-ic-edit"></i><span className='hidden'>편집</span></button>
                    <button className='btn-icon'><i className="icon-ic-delete"></i><span className='hidden'>삭제</span></button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* //connect-table-wrap */}

      <div className='connect-table-wrap'>
        <div className='connect-info-box'>
          <p className='img-box'><img src={getPublicAssetPath('static/icon_jira.png')} alt="jira"></img></p>
          <div className='info'>
            <strong className="info-tit">JIRA</strong>
            <p>이슈 추적, 프로젝트 관리</p>
          </div>
          <div className='connect-etc-box'><span><i className='icon-ic-plug'></i>7개 연동중</span></div>
        </div>

        <table>
          <caption></caption>
          <colgroup>
            <col width="auto"/>
            <col width="20%"/>
            <col width="15%"/>
            <col width="190px"/>
          </colgroup>
          <thead>
            <tr>
              <th scope="col">커넥트 프로필</th>
              <th scope="col">연동된 토픽 / JANDI</th>
              <th scope="col">생성일</th>
              <th scope="col">상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                <span>
                  JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                </span>
              </td>
              <td><span className='fc-green'>Mobile JIRA</span></td>
              <td><span className='fw-normal'>2021-12-06</span></td>
              <td className='of-visible'>
                <div className='status-wrap'>
                  <label className="switch on" labefor="">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <div className='btn-wrap tablet'>
                    <a href="#none" className='btn-more' onClick={openTooltip}><i className="icon-ic-more"></i><span className='hidden'>열기</span></a>
                    <div className='tooltip-box'>
                      <div>
                        <button className='btn-icon'><i className="icon-ic-edit"></i><span>수정하기</span></button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span>삭제하기</span></button>
                      </div>
                  </div>
                  </div>
                  <div className='btn-wrap pc'>
                    <button className='btn-icon'><i className="icon-ic-edit"></i><span className='hidden'>편집</span></button>
                    <button className='btn-icon'><i className="icon-ic-delete"></i><span className='hidden'>삭제</span></button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='table-bottom'>
          <div className='loader'><span></span></div>
          <button type='button'>더보기<i className='icon-ic-b-arrow-down'></i></button>
        </div>
      </div>
      {/* connect-info-wrap */}
    </div>
    }
  </>);
};
export default MyConnectPlug;
/**
 * TODO: 더보기 기능
 * TODO: 이미지 radius
 * TODO: 토픽명 매핑
 */
