/* eslint-disable max-len */
import { useDispatch } from 'react-redux';
import React from 'react';
import { getPublicAssetPath } from '../../../lib/assetHelper';

const MyConnectPlug = (props) => {
  const dispatch = useDispatch();

  return (
  <>
    <div className='container'>
      <h2 className='title'>나의 잔디 커넥트</h2><p>총 <spna>9</spna>개 연동 중</p>
      {/* 배너 영역 */}
      <div className='tableWrap'>
        <div className='connectInfoWrap'>
          <p className='imgBox'><img src={getPublicAssetPath('static/icon_jira.png')} alt="jira"></img></p>
          <div className='info'>
            <strong>JIRA</strong>
            <p>이슈 추적, 프로젝트 관리</p>
          </div>
          <span>7개 연동중</span>
        </div>

        <table>
          <caption></caption>
          <colgroup>
            <col width={'45%'}/>
            <col width={'35%'}/>
            <col width={'15%'}/>
            <col width={'15%'}/>
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
              <td scope="row"> 
                <span className='imgBox'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                <span>
                  JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                </span>
                </td>
              <td>Mobile JIRA</td>
              <td>2021-12-06</td>
              <td>
                <div className='statusWrap'>
                  작동중 라디오버튼
                  아이콘
                  아이콘
                </div>
              </td>
            </tr>
            <tr>
              <td scope="row">
                <span className='imgBox'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                <span>
                  JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                </span>
                </td>
              <td>Mobile JIRA</td>
              <td>2021-12-06</td>
              <td>
                <div className='statusWrap'>
                  작동중 라디오버튼
                  아이콘
                  아이콘
                </div>
              </td>
            </tr>
            <tr>
              <td scope="row">
                <span className='imgBox'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                <span>
                  JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                </span>
                </td>
              <td>Mobile JIRA</td>
              <td>2021-12-06</td>
              <td>
                <div className='statusWrap'>
                  작동중 라디오버튼
                  아이콘
                  아이콘
                </div>
              </td>
            </tr>
            <tr>
              <td scope="row">
                <span className='imgBox'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                <span>
                  JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                </span>
                </td>
              <td>Mobile JIRA</td>
              <td>2021-12-06</td>
              <td>
                <div className='statusWrap'>
                  작동중 라디오버튼
                  아이콘
                  아이콘
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='three_quarters_loader'><span></span></div>
        <button>더보기 화살표</button>
      </div>
    </div>
  </>);
};
export default MyConnectPlug;
