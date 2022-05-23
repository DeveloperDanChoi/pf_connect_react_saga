/* eslint-disable max-len */
import { useDispatch } from 'react-redux';
import React from 'react';
import { getPublicAssetPath } from '../../../lib/assetHelper';
import { Input } from 'antd';

const MyConnectPlug = (props) => {
  const dispatch = useDispatch();
 
  const onToggle = (e) => {
    e.target.closest('.switch').classList.toggle('on');
    e.target.closest('tr').classList.toggle('disabled');
  };
  return (
  <>
    <div className='connect-container'>
      <div className='title_wrap'>
        <h2>나의 잔디 커넥트</h2>
        <span className='sub_tit'>총 <b>9</b>개 연동 중</span>
      </div>
      <div className='connect-table-wrap'>
        <div className='connect-info-box'>
          <p className='img-box'><img src={getPublicAssetPath('static/icon_jira.png')} alt="jira"></img></p>
          <div className='info'>
            <strong>JIRA</strong>
            <p>이슈 추적, 프로젝트 관리</p>
          </div>
          <span>7개 연동중</span>
        </div>
        {/* //connect-info-box */}
        <table>
          <caption></caption>
          <colgroup>
            <col width="35%"/>
            <col width="30%"/>
            <col width="20%"/>
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
              <td>
                <div className='status-wrap'>
                  <label className="switch on" labefor="unit">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <button className='btn-icon'><i className="icon icon-pencil"></i><span>편집</span></button>
                  <button className='btn-icon'><i className="icon icon-delete"></i><span>삭제</span></button>
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
              <td>
                <div className='statusWrap'>
                  <label className="switch on" labefor="unit">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <button className='btn-icon'><i className="icon icon-pencil"></i><span>편집</span></button>
                  <button className='btn-icon'><i className="icon icon-delete"></i><span>삭제</span></button>
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
              <td>
                <div className='statusWrap'>
                  <label className="switch on" labefor="unit">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <button className='btn-icon'><i className="icon icon-pencil"></i><span>편집</span></button>
                  <button className='btn-icon'><i className="icon icon-delete"></i><span>삭제</span></button>
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
              <td>
                <div className='statusWrap'>
                  <label className="switch" labefor="">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <button className='btn-icon'><i className="icon icon-pencil"></i><span>편집</span></button>
                  <button className='btn-icon'><i className="icon icon-delete"></i><span>삭제</span></button>
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
          <span>7개 연동중</span>
        </div>

        <table>
          <caption></caption>
          <colgroup>
            <col width="35%"/>
            <col width="30%"/>
            <col width="20%"/>
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
              <td>
                <div className='statusWrap'>
                  <label className="switch on" labefor="">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <button className='btn-icon'><i className="icon icon-pencil"></i><span>편집</span></button>
                  <button className='btn-icon'><i className="icon icon-delete"></i><span>삭제</span></button>
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
              <td>
                <div className='statusWrap'>
                  <label className="switch on" labefor="">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <button className='btn-icon'><i className="icon icon-pencil"></i><span>편집</span></button>
                  <button className='btn-icon'><i className="icon icon-delete"></i><span>삭제</span></button>
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
              <td>
                <div className='statusWrap'>
                  <label className="switch on" labefor="">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <button className='btn-icon'><i className="icon icon-pencil"></i><span>편집</span></button>
                  <button className='btn-icon'><i className="icon icon-delete"></i><span>삭제</span></button>
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
              <td>
                <div className='statusWrap'>
                  <label className="switch" labefor="">
                    <span className='txt'>작동중</span>
                    <Input type="checkbox" id=""/>
                    <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
                  </label>
                  <button className='btn-icon'><i className="icon icon-pencil"></i><span>편집</span></button>
                  <button className='btn-icon'><i className="icon icon-delete"></i><span>삭제</span></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='table_botttom'>
          <div className='three_quarters_loader'><span></span></div>
          <button>더보기 화살표</button>
        </div>
      </div>
      {/* connect-info-wrap */}
    </div>
  </>);
};
export default MyConnectPlug;
