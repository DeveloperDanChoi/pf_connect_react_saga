/* eslint-disable max-len */
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';
import {getTeamsConnect} from "../../../../../store/connect/connect";
import {template1} from "../../../../../service/connect";
import Router from "next/router";

const MyConnectPlug = (props) => {
  const dispatch = useDispatch();
  const { connect, team, user } = useSelector((state) => {
    console.log('state !!', state);
    return state;
  });

  const handleClick = (data) => {
    // TODO: config path
    const prefix = '/app/connect';
    Router.push(`${prefix}/${data.type}`, `${prefix}/${data.type}`);
  };

  useEffect(() => {
    if (team.teamId === 0) return;

    dispatch(getTeamsConnect(team.teamId));
  }, [user.user.memberships]);

  const onToggle = (e) => {
    e.target.closest('.switch').classList.toggle('on');
    e.target.closest('tr').classList.toggle('disabled');
  };
  return (
  <>
    { connect.myConnectCount !== '' &&
    <div className='connect-container'>
      <div className='title_wrap'>
        <h2>나의 잔디 커넥트</h2>
        <span className='sub_tit'>총 <strong>{connect.myConnectCount}</strong>개 연동 중</span>
      </div>
      { connect.connects.map((data, i) => (
          <>
          {
            connect.myConnect[data.name] && (
            <div className='connect-table-wrap'>
              <div className='connect-info-box'>
                <p className='img-box'><img src={data.botThumbnail} alt={data.name}></img></p>
                <div className='info'>
                  <strong>{data.label}</strong>
                  <p>{data.name}</p>
                </div>
                <div className='connect-etc-box'><span>{connect.myConnect[data.name].length}개 연동중</span></div>
              </div>
              <table>
                <caption></caption>
                <colgroup>
                    <col width="38%"/>
                    <col width="30%"/>
                    <col width="12%"/>
                    <col width="auto"/>
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
                  connect.myConnect[data.name].map((data2, i2) => (
                    <tr className={data2.status}>
                      <td>
                        <span className='img-box'><img src={data2.bot.thumbnailUrl} alt={data.name}></img></span>
                        <span>{data2.bot.name}</span>
                      </td>
                      <td><span className='fc-green'>{data2.roomId}</span></td>
                      <td><span className='fw-normal'>{data2.createdAt}</span></td>
                      <td className='of-visible'>
                        <div className='status-wrap'>
                          <label className={data2.status === 'enabled' ? 'switch on' : 'switch'} labefor="unit">
                            <span className='txt'>작동중</span>
                            <Input type="checkbox" id=""/>
                            <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                          </label>
                          <div className='btn_wrap tablet'>
                            <a href="#none" className='btn_more'><i className="icon-ic-more"></i><span className='hidden'>열기</span></a>
                            <div className='tooltip_box'>
                              <div>
                                <button className='btn-icon'><i className="icon-ic-edit"></i><span>수정하기</span></button>
                                <button className='btn-icon'><i className="icon-ic-delete"></i><span>삭제하기</span></button>
                              </div>
                          </div>
                          </div>
                          <div className='btn_wrap pc'>
                            <button className='btn-icon'><i className="icon-ic-edit"></i><span className='hidden'>편집</span></button>
                            <button className='btn-icon'><i className="icon-ic-delete"></i><span className='hidden'>삭제</span></button>
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
          </>
      )) }
      {/* ******************************* */}
      {/* ******************************* */}
      {/* ******************************* */}
      <div className='connect-table-wrap'>
        <div className='connect-info-box'>
          <p className='img-box'><img src={getPublicAssetPath('static/icon_jira.png')} alt="jira"></img></p>
          <div className='info'>
            <strong>JIRA</strong>
            <p>이슈 추적, 프로젝트 관리</p>
          </div>
          <div className='connect-etc-box'><span><i className='icon-ic-plug'></i>7개 연동중</span></div>
        </div>
        {/* //connect-info-box */}
        <table>
          <caption></caption>
          <colgroup>
              <col width="38%"/>
              <col width="30%"/>
              <col width="12%"/>
              <col width="auto"/>
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
                  <button className='btn-icon' onClick={() => handleClick(data2)}><i className="icon icon-pencil"></i><span>편집</span></button>
                  <button className='btn-icon'><i className="icon icon-delete"></i><span>삭제</span></button>

                  {/* <div className='btn_wrap tablet'>
                    <a href="#none" className='btn_more'><i className="icon-ic-more"></i><span className='hidden'>열기</span></a>
                    <div className='tooltip_box'>
                      <div>
                        <button className='btn-icon'><i className="icon-ic-edit"></i><span>수정하기</span></button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span>삭제하기</span></button>
                      </div>
                  </div>
                  </div>
                  <div className='btn_wrap pc'>
                    <button className='btn-icon'><i className="icon-ic-edit"></i><span className='hidden'>편집</span></button>
                    <button className='btn-icon'><i className="icon-ic-delete"></i><span className='hidden'>삭제</span></button>
                  </div> */}
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
              <td><span className='fc-green'>Mobile JIRA</span></td>
              <td><span className='fw-normal'>2021-12-06</span></td>
              <td className='of-visible'>
                <div className='status-wrap'>
                  <label className="switch on" labefor="unit">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <div className='btn_wrap tablet'>
                    <a href="#none" className='btn_more'><i className="icon-ic-more"></i><span className='hidden'>열기</span></a>
                    <div className='tooltip_box'>
                      <div>
                        <button className='btn-icon'><i className="icon-ic-edit"></i><span>수정하기</span></button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span>삭제하기</span></button>
                      </div>
                  </div>
                  </div>
                  <div className='btn_wrap pc'>
                    <button className='btn-icon'onClick={() => handleClick(data2)}><i className="icon-ic-edit"></i><span className='hidden'>편집</span></button>
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
              <td><span className='fc-green'>Mobile JIRA</span></td>
              <td><span className='fw-normal'>2021-12-06</span></td>
              <td className='of-visible'>
                <div className='status-wrap'>
                  <label className="switch" labefor="">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <div className='btn_wrap tablet'>
                    <a href="#none" className='btn_more'><i className="icon-ic-more"></i><span className='hidden'>열기</span></a>
                    <div className='tooltip_box'>
                      <div>
                        <button className='btn-icon'><i className="icon-ic-edit"></i><span>수정하기</span></button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span>삭제하기</span></button>
                      </div>
                  </div>
                  </div>
                  <div className='btn_wrap pc'>
                    <button className='btn-icon'><i className="icon-ic-edit"></i><span className='hidden'>편집</span></button>
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
            <strong>JIRA</strong>
            <p>이슈 추적, 프로젝트 관리</p>
          </div>
          <div className='connect-etc-box'><span><i className='icon-ic-plug'></i>7개 연동중</span></div>
        </div>

        <table>
          <caption></caption>
          <colgroup>
              <col width="38%"/>
              <col width="30%"/>
              <col width="12%"/>
              <col width="auto"/>
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
                  <div className='btn_wrap tablet'>
                    <a href="#none" className='btn_more'><i className="icon-ic-more"></i><span className='hidden'>열기</span></a>
                    <div className='tooltip_box'>
                      <div>
                        <button className='btn-icon'><i className="icon-ic-edit"></i><span>수정하기</span></button>
                        <button className='btn-icon'><i className="icon-ic-delete"></i><span>삭제하기</span></button>
                      </div>
                  </div>
                  </div>
                  <div className='btn_wrap pc'>
                    <button className='btn-icon'><i className="icon-ic-edit"></i><span className='hidden'>편집</span></button>
                    <button className='btn-icon'><i className="icon-ic-delete"></i><span className='hidden'>삭제</span></button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='table_botttom'>
          <div className='three_quarters_loader'><span></span></div>
          <button type='button'>더보기<i className='icon-ic-b-arrow-down'></i></button>
        </div>
      </div>
      {/* connect-info-wrap */}
    </div>
    }
  </>);
};
export default MyConnectPlug;
