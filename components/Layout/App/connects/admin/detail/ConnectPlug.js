/* eslint-disable max-len */
import { useDispatch } from 'react-redux';
import React, {useEffect, useState} from 'react';
import { Input } from 'antd';
import { getPublicAssetPath } from '../../../../../../lib/assetHelper';

const ConnectPlug = (props) => {
  const dispatch = useDispatch();

  const [inputVal, setInputVal] = useState('');
  const [selectVal, setSelectVal] = useState('');

  /* switch toggle */
  const onToggle = (e) => {
    e.target.closest('.switch').classList.toggle('on');
    e.target.closest('tr').classList.toggle('disabled');
  };
  /* custom selectbox  */
  const onSelect = (e) => {
    e.stopPropagation();
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
  return (<>
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_jira.png')} alt="jira"></img></p>
            <div className='info'>
              <strong className="info-tit">JIRA</strong>
              <p>이슈 추적, 프로젝트 관리</p>
            </div>
            <div className="board-search-bar">
              <div className="select-box">
                <a href="#none" title="검색필드 선택" className="select-value" value={selectVal} onClick={onSelect}><span>{selectVal === '' ? '생성자' : selectVal}</span></a>
                <div className="select-list">
                    <ul>
                      <li><a href="#none" className='on'><span>생성자</span></a></li>
                      <li><a href="#none"><span>Chủ đề được liên kết / JANDI</span></a></li>
                      <li><a href="#none"><span>커넥트명</span></a></li>
                    </ul>
                </div>
              </div>
              <Input 
                type="text" 
                placeholder="검색어를 입력하세요." 
                title="검색어 입력" 
                value={inputVal} 
                onChange={(e) => setInputVal(e.currentTarget.value)}></Input>
              <button type="button" className="search-btn" disabled={inputVal.trim().length < 1}>검색</button>
            </div>
          </div>
        </div>
      </div>{/* //detail-header */}

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
                  <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                  <span>
                    JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                  </span>
                  </td>
                <td><span className='fc-green'>Mobile JIRA</span></td>
                <td>
                  <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
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
              <tr>
                <td>
                  <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                  <span>
                    JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                  </span>
                  </td>
                <td><span className='fc-green'>Mobile JIRA</span></td>
                <td>
                  <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
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
              <tr>
                <td>
                  <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                  <span>
                    JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                  </span>
                  </td>
                <td><span className='fc-green'>Mobile JIRA</span></td>
                <td>
                  <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
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
              <tr>
                <td>
                  <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                  <span>
                    JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                  </span>
                  </td>
                <td><span className='fc-green'>Mobile JIRA</span></td>
                <td>
                  <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
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
              <tr className='disabled'>
                <td>
                  <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
                  <span>
                    JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동IRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동JIRA New - 20220313 재연동
                  </span>
                  </td>
                <td><span className='fc-green'>Mobile JIRA</span></td>
                <td>
                  <span className='img-box'><img src={getPublicAssetPath('static/dummy.png')} alt="dummy"></img></span>
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
        </div>{/* //connect-table-wrap */}
        <div className='pagination-wrap'>
          <button type='button' className='btn-paging first icon-ic-double-angle-left-02'><span className='hidden'>맨끝</span></button>
          <button type='button' className='btn-paging prev icon-ic-mini-left'><span className='hidden'>이전</span></button>
          <div className='page-num'>
            <strong>1</strong>
            <a href='#none'>2</a>
            <a href='#none'>3</a>
          </div>
          <button type='button' className='btn-paging next icon-ic-mini-right'><span className='hidden'>다음</span></button>
          <button type='button' className='btn-paging last icon-ic-double-angle-right-02' disabled><span className='hidden'>맨뒤</span></button>
        </div>{/* //pagination-wrap */}
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
        </div>{/* //connect-table-wrap */}
        <div className='pagination-wrap'>
          <button type='button' className='btn-paging first icon-ic-double-angle-left-02' disabled><span className='hidden'>맨끝</span></button>
          <button type='button' className='btn-paging prev icon-ic-mini-left' disabled><span className='hidden'>이전</span></button>
          <div className='page-num'>
            <strong>1</strong>
          </div>
          <button type='button' className='btn-paging next icon-ic-mini-right' disabled><span className='hidden'>다음</span></button>
          <button type='button' className='btn-paging last icon-ic-double-angle-right-02' disabled><span className='hidden'>맨뒤</span></button>
        </div>{/* //pagination-wrap */}
      </div>
    </div>
  </>);
};
export default ConnectPlug;
