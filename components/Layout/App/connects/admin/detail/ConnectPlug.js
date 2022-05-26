/* eslint-disable max-len */
import { useDispatch } from 'react-redux';
import React,{useEffect, useState} from 'react';
import { Input } from 'antd';
import { getPublicAssetPath } from '../../../../../../lib/assetHelper';

const ConnectPlug = (props) => {
  const dispatch = useDispatch();
  const [inputVal,setInputVal] = useState('');
  const onToggle = (e) => {
    e.target.closest('.switch').classList.toggle('on');
    e.target.closest('tr').classList.toggle('disabled');
  };
  const onSelect = (e) => {
    e.target.closest('.select_box').classList.toggle('on');
  };
  useEffect(() => {
    const select = document.querySelector('.select_list').querySelectorAll('a');
    const selectValue = document.querySelector('.select_value');
    const selectBox = document.querySelector('.select_box');
    select.forEach((box) => {
      box.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const val = e.currentTarget.innerText;
        select.forEach((el) => {
          el.classList.remove('on');
        });
        selectValue.innerText = val;
        target.classList.add('on');
        selectBox.classList.toggle('on');
      })
    });

    document.querySelector('body').addEventListener('click', (e) => {
      e.preventDefault();
      if ((e.target.closest('.select_box') === null && selectBox.classList.contains('on'))) {
        selectBox.classList.toggle('on');
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
              <strong>JIRA</strong>
              <p>이슈 추적, 프로젝트 관리</p>
            </div>
            <div className="board_search_bar">
              <div className="select_box">
                <a href="#none" title="검색필드 선택" className="select_value" onClick={(e)=>onSelect(e)}><span>생성자</span></a>
                <div className="select_list">
                    <ul>
                      <li><a href="#none" className='on'><span>생성자</span></a></li>
                      <li><a href="#none"><span>Chủ đề được liên kết / JANDI</span></a></li>
                      <li><a href="#none"><span>커넥트명</span></a></li>
                    </ul>
                </div>
              </div>
              <div className="search_input">
                  <Input 
                    type="text" 
                    placeholder="검색어를 입력하세요." 
                    title="검색어 입력" 
                    value={inputVal} 
                    onChange={(e) => setInputVal(e.currentTarget.value)}></Input>
              </div>
              <button type="button" className="search_btn" disabled={inputVal.trim().length < 1}>검색</button>
            </div>
          </div>
        </div>
      </div>{/* //detail-header */}

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
        </div>{/* //connect-table-wrap */}
        <div className='pagination-wrap'>
          <button type='button' className='btn-paging first'><i className='icon-ic-double-angle-left-02'></i><span className='hidden'>맨끝</span></button>
          <button type='button' className='btn-paging prev'><i className='icon-ic-mini-left'></i><span className='hidden'>이전</span></button>
          <div className='page-num'>
            <strong>1</strong>
            <a href='#none'>2</a>
            <a href='#none'>3</a>
          </div>
          <button type='button' className='btn-paging next'><i className='icon-ic-mini-right'></i><span className='hidden'>다음</span></button>
          <button type='button' className='btn-paging last' disabled><i className='icon-ic-double-angle-right-02'></i><span className='hidden'>맨뒤</span></button>
        </div>{/* //pagination-wrap */}
      </div>
      
      {/* [D] : 검색결과 없을 경우 */}
      <div className='detail-wrapper'>
        <div className='connect-table-wrap'>
          <table>
            <caption></caption>
            <colgroup>
              <col width="210px"/>
              <col width="210px"/>
              <col width="210px"/>
              <col width="210px"/>
              <col width="210px"/>
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
          <button type='button' className='btn-paging first' disabled><i className='icon-ic-double-angle-left-02'></i><span className='hidden'>맨끝</span></button>
          <button type='button' className='btn-paging prev' disabled><i className='icon-ic-mini-left'></i><span className='hidden'>이전</span></button>
          <div className='page-num'>
            <strong>1</strong>
          </div>
          <button type='button' className='btn-paging next' disabled><i className='icon-ic-mini-right'></i><span className='hidden'>다음</span></button>
          <button type='button' className='btn-paging last' disabled><i className='icon-ic-double-angle-right-02'></i><span className='hidden'>맨뒤</span></button>
        </div>{/* //pagination-wrap */}
      </div>
    </div>
  </>);
};
export default ConnectPlug;
