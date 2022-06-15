/* eslint-disable max-len */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/googleCalendar/googleCalendar';
import { template1 } from '../../../../../service/connect';
import Thumbnail from "../../../../ui/Thumbnail/Thumbnail";
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';

const GoogleCalendar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { team, googleCalendar, user } = useSelector((state) => {
    // console.log('GoogleCalendar state !!', state);
    return state;
  });
  const { creators } = modules;

  /*==== UI ====*/
  
  /** variable - checkbox,selectbox,swiper ...  **/
  const [searchVal, setSearchVal] = useState(''); /* [D] 임시 */
  /* swiper */
  const swiperRef = useRef(null);
  const swiperOptions = {
    navigation: true,
    className: 'connect-swiper-container',
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    spaceBetween: 50,
    shouldSwiperUpdate: true,
  };
  /* custom check box value */
  const [checkboxs, setCheckboxs] = useState({
    service_01_01: false,
    service_01_02: false,
    service_02_01: false,
    service_02_02: false,
    service_03_01: false,
    service_03_02: false,
    service_03_03: false,
  });
  /* custom select box value */
  const [selects, setSelects] = useState({
    langVal: '',
    accoutVal: '',
    topicVal: '',
    date_01_01: '',
    date_02_01: '',
    date_02_02: '',
    date_03_01: '',
    date_04_01: '',
    date_04_02: '',
  });

  const { langVal, accoutVal,topicVal, date_01_01, date_02_01, date_02_02 ,date_03_01, date_04_01 , date_04_02 } = selects;
  const { service_01_01, service_01_02, service_02_01, service_02_02, service_03_01, service_03_02, service_03_03 } = checkboxs;

  /** (s)common function  **/

  /* custom checkbox */
  const onChangeCheckbox = (e) => {
    e.preventDefault();
    const target = e.currentTarget.querySelector('input');
    setCheckboxs({
      ...checkboxs,
      [target.name]: !target.checked,
    });
  };

  /* (s) custom select */
  const onSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget.closest('.select-box');
    const selectBoxs = document.querySelectorAll('.select-box');
    if (target.classList.contains('on')) {
      target.classList.remove('on');
    } else {
      selectBoxs.forEach((selectbox) => selectbox.classList.remove('on'));
      target.classList.add('on');
    }
  };
  /* custom select - select option */
  const onChangeSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget;
    const selectLists = target.closest('.select-list').querySelectorAll('li a');
    const { name } = target.closest('.select-box').firstChild;

    setSelects({
      ...selects,
      [name]: target.innerText,
    });
    selectLists.forEach((list) => list.classList.remove('on'));
    target.classList.toggle('on');
    target.closest('.select-box').classList.toggle('on');
  };
  useEffect(() => {
    const selectBoxs = document.querySelectorAll('.select-box');
    document.querySelector('body').addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.closest('.select-box') === null) {
        selectBoxs.forEach((selectbox) => {
          if (selectbox.classList.contains('on')) { selectbox.classList.toggle('on'); }
        });
      }
    });
  }, []);
  /* (e) custom select */

  /* tab */
  const onTabChange = (e) => {
    if(swiperRef.current) {setTimeout(()=> swiperRef.current.swiper.update());} //swiper observer
    e.preventDefault();
    const menu = document.querySelectorAll('.tab-menu li a');
    const content = document.querySelectorAll('.tab-cont');

    for(let i = 0; i < menu.length; i++) {
      content[i].classList.remove('on');
      menu[i].classList.remove('on');
    }
    content[e.currentTarget.id - 1].classList.add('on');
    e.currentTarget.classList.add('on');
  };
  /* 연동하기 탭 disabled */
  const onDisabledContent = () => {
    document.querySelector('.connect').classList.toggle('disabled');
    document.querySelector('.full-btn').toggleAttribute('disabled');
  };
  /* switch toggle */
  const onToggle = (e) => {
    e.target.closest('.switch').classList.toggle('on');
    onDisabledContent();
  };
  /** (e)common function  **/

  /*==== UI ====*/
  useEffect(() => {
    template1.initialize({
      dispatch,
      router,
      connectType: 'googleCalendar',
      modules,
      list: creators.getAuthenticationGoogleCalendarCalendarList,
      load: creators.getTeamsGoogleCalendar,
      connect: [creators.postTeamsGoogleCalendar, creators.putTeamsGoogleCalendarSetting],
      disconnect: creators.deleteAuthentications,
      set: creators.setInputGoogleCalendar,
      elements: googleCalendar.input,
    });
  }, []);

  return (<>
    {/* [D] : 연동하기 */}
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_google.png')} alt="google"></img></p>
            <div className='info'>
                <strong>Google 캘린더</strong>
                <p>일정 관리, 캘린더 공유</p>
            </div>
          </div>
        </div>
      </div>{/* //detail-header */}

      <div className='tab-container'>
        <div className='tab-menu'>
          <ul>
            <li><a href='#none' onClick={onTabChange} id="1" className='on'>서비스 소개</a></li>
            <li><a href='#none' onClick={onTabChange} id="2">연동하기</a></li>
          </ul>
        </div>
        <div className='tab-content'>
          <div className='tab-cont on'>
            <div className='detail-content'>
              <div className='info-wrap'>
                <img src={getPublicAssetPath('static/googleCalendar/ko/info/img_info.png')} alt="서비스 소개"></img>{/* [D] : static/커넥트명/언어코드/img_info.png */}
                <div className='info-box'>
                  <strong>Google 캘린더</strong>
                  <p>Google 캘린더는 일정을 관리하고 공유할 뿐 아니라 알림도 받을 수 있는 서비스입니다.<br/>Google 캘린더를 잔디와 연동하게 되면, 일정에 대한 알림 또는 일정 요약을 잔디 팀 내에서 메시지로 받을 수 있습니다.</p>
                </div>
                <button type='button'>더 알아보기<i className='icon-ic-arrow-right-up'></i></button>
              </div>
            </div>
          </div>
          <div className='tab-cont'>
            <div className='detail-content connect'>
              {/* [D] : 계정 인증 전 case */}
              <div className='connect-row-item'>
                <div className='title'><strong>계정 설정</strong></div>
                <div className='content'>
                  <dl className='row'>
                    <dt>
                      <p className='tit'>계정 인증</p>
                      <p className='info'>연동 서비스 추가를 위해서는 계정 인증이 필요합니다.</p>
                    </dt>
                    <dd>
                      <div className='input-row single-type'>
                        <button type='button'>계정 인증하기</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <button type='button' className='full-btn' disabled>연동 추가하기</button>
               {/* //[D] : 계정 인증 전 case */}
              <div className='connect-row-item'>
                <div className='title'><strong>계정 설정</strong></div>
                <div className='content'>
                  <dl className='row'>
                    <dt>
                      <p className='tit'>계정 인증</p>
                      <p className='info'>연동 서비스 추가를 위해서는 계정 인증이 필요합니다.</p>
                    </dt>
                    <dd>
                      <div className='input-row'>
                        <button type='button'>인증된 계정</button>
                        <div className="select-box type-full">
                          <a href="#none" title="검색필드 선택" className="select-value" value={accoutVal} name="accoutVal" onClick={onSelect}>
                            {/* [D] : 로딩 시 노출 */}
                            {/* <span>
                                <div className='loading'>
                                <span>불러오는 중...</span><div className='loader'><span></span></div>
                              </div>
                            </span> */}
                            {/* //[D] : 로딩 case */}
                            <span>{accoutVal === '' ? 'jandi@tosslab.com' : accoutVal}</span>
                          </a>
                          <div className="select-list account-type">
                              <ul>
                                <li><a href="#none" onClick={onChangeSelect} className='on'><span className='icon-ic-user-white'>jandi@tosslab.com</span></a><button type='button' className='btn-delete icon-ic-close'></button></li>
                                <li><a href="#none" onClick={onChangeSelect}><span className='icon-ic-user-white'>jandi02@tosslab.com</span></a><button type='button' className='btn-delete icon-ic-close'></button></li>
                                <li><a href="#none" onClick={onChangeSelect}><span className='icon-ic-user-white'>jandi03@tosslab.com</span></a><button type='button' className='btn-delete icon-ic-close'></button></li>
                                <li><a href="#none"><span className='icon-ic-user-add'>계정 추가하기</span></a></li>
                              </ul>
                          </div>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className='connect-row-item'>
                <div className='title'><strong>서비스 설정</strong></div>
                <div className='content'>
                  <dl className='row flx-baseline'>
                    <dt>
                      <p className='tit'>알림 설정</p>
                      <p className='info'>일정에 대한 알림을 보내드립니다.</p>
                    </dt>
                    <dd>
                      <div className='input-row'>
                        <div className='setting-contents'>
                          <ul>
                            <li>
                              <div className='custom-checkbox none-hover' onClick={onChangeCheckbox}> 
                                <input type="checkbox" id="service_01_01" checked={service_01_01} value="1" name="service_01_01"/>
                                <label htmlFor="service_01_01">
                                  <div className='setting-item'>
                                    <div className="select-box date-type">
                                      <a href="#none" className="select-value" value={date_01_01} name="date_01_01" onClick={onSelect}><span>{date_01_01 === '' ? '정각' : date_01_01}</span></a>
                                      <div className="select-list">
                                          <ul>
                                            <li><a href="#none" onClick={onChangeSelect} className='on'><span>정각</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>1분</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>5분전</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>10분전</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>15분전</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>30분전</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>1시간 전</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>2시간 전</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>4시간 전</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>1일 전</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>1 giờ trước</span></a></li>
                                          </ul>
                                      </div>
                                    </div>
                                    <span className='utc-txt'>(UTC+09:00)</span>
                                  </div>
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className='custom-checkbox none-hover' onClick={onChangeCheckbox}>
                                <input type="checkbox" id="service_01_01" checked={service_01_02} value="1" name="service_01_02"/>
                                <label htmlFor="service_01_02">
                                  <div className='setting-item'>
                                    <strong>종일 일정</strong>
                                    <div className="select-box date-type">
                                      <a href="#none" className="select-value" value={date_02_01} name="date_02_01" onClick={onSelect}><span>{date_02_01 === '' ? '당일' : date_02_01}</span></a>
                                      <div className="select-list">
                                        <ul>
                                          <li><a href="#none" onClick={onChangeSelect} className='on'><span>당일</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>하루 전</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>이틀 전</span></a></li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="select-box date-type">
                                      <a href="#none" className="select-value" value={date_02_02} name="date_02_02" onClick={onSelect}><span>{date_02_02 === '' ? '9:00 AM' : date_02_02}</span></a>
                                      <div className="select-list">
                                          <ul>
                                            <li><a href="#none" onClick={onChangeSelect} className='on'><span>9:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>0:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>1:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>2:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>3:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>4:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>5:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>6:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>7:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>8:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>9:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>10:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>11:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>12:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>1:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>2:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>3:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>4:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>5:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>6:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>7:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>8:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>9:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>10:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>11:00 PM</span></a></li>
                                          </ul>
                                      </div>
                                    </div>
                                    <span className='utc-txt'>(UTC+09:00)</span>
                                  </div>
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </dd>
                  </dl>
                  <dl className='row flx-baseline'>
                    <dt>
                      <p className='tit'>일정 요약</p>
                      <p className='info'>한주간 또는 하루의 일정을 요약해 알려드립니다.</p>
                    </dt>
                    <dd>
                      <div className='input-row'>
                        <div className='setting-contents'>
                          <ul>
                            <li>
                              <div className='custom-checkbox none-hover' onClick={onChangeCheckbox}>
                                <input type="checkbox" id="service_02_01" checked={service_02_01} value="1" name="service_02_01"/>
                                <label htmlFor="service_02_01">
                                  <div className='setting-item'>
                                    <strong>매일</strong>
                                    <div className="select-box date-type">
                                      <a href="#none" className="select-value" value={date_03_01} name="date_03_01" onClick={onSelect}><span>{date_03_01 === '' ? '정각' : date_03_01}</span></a>
                                      <div className="select-list">
                                        <ul>
                                          <li><a href="#none" onClick={onChangeSelect} className='on'><span>9:00 AM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>0:00 AM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>1:00 AM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>2:00 AM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>3:00 AM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>4:00 AM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>5:00 AM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>6:00 AM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>7:00 AM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>8:00 AM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>9:00 AM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>10:00 AM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>11:00 AM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>12:00 AM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>1:00 PM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>2:00 PM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>3:00 PM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>4:00 PM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>5:00 PM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>6:00 PM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>7:00 PM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>8:00 PM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>9:00 PM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>10:00 PM</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>11:00 PM</span></a></li>
                                        </ul>
                                    </div>
                                    </div>
                                    <span className='utc-txt'>(UTC+09:00)</span>
                                  </div>
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className='custom-checkbox none-hover' onClick={onChangeCheckbox}>
                                <input type="checkbox" id="service_02_02" checked={service_02_02} value="1" name="service_02_02"/>
                                <label htmlFor="service_02_02">
                                  <div className='setting-item'>
                                    <strong>매주</strong>
                                    <div className="select-box date-type">
                                      <a href="#none" className="select-value" value={date_04_01} name="date_04_01" onClick={onSelect}><span>{date_04_01 === '' ? '당일' : date_04_01}</span></a>
                                      <div className="select-list">
                                        <ul>
                                          <li><a href="#none" onClick={onChangeSelect} className='on'><span>월요일</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>화요일</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>수요일</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>목요일</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>금요일</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>토요일</span></a></li>
                                          <li><a href="#none" onClick={onChangeSelect}><span>일요일</span></a></li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="select-box date-type">
                                      <a href="#none" className="select-value" value={date_04_02} name="date_04_02" onClick={onSelect}><span>{date_04_02 === '' ? '9:00 AM' : date_04_02}</span></a>
                                      <div className="select-list">
                                          <ul>
                                            <li><a href="#none" onClick={onChangeSelect} className='on'><span>9:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>0:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>1:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>2:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>3:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>4:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>5:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>6:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>7:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>8:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>9:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>10:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>11:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>12:00 AM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>1:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>2:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>3:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>4:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>5:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>6:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>7:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>8:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>9:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>10:00 PM</span></a></li>
                                            <li><a href="#none" onClick={onChangeSelect}><span>11:00 PM</span></a></li>
                                          </ul>
                                      </div>
                                    </div>
                                    <span className='utc-txt'>(UTC+09:00)</span>
                                  </div>
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </dd>
                  </dl>
                  <dl className='row flx-baseline'>
                    <dt>
                      <p className='tit'>캘린더 업데이트</p>
                      <p className='info'>캘린더 업데이트가 필요한 상황을 선택해주세요.</p>
                    </dt>
                    <dd>
                      <div className='input-row'>
                        <div className='setting-contents'>
                          <ul>
                            <li>
                              <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                <input type="checkbox" id="service_03_01" checked={service_03_01} value="1" name="service_03_01"/>
                                <label htmlFor="service_03_01"><span>일정이 새롭게 생성되었거나 일정에 초대되었을 때</span></label>
                              </div>
                            </li>
                            <li>
                              <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                <input type="checkbox" id="service_03_02" checked={service_03_02} value="1" name="service_03_02"/>
                                <label htmlFor="service_03_02"><span>일정의 제목이나 시각, 장소가 수정되었을 때</span></label>
                              </div>
                            </li>
                            <li>
                              <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                <input type="checkbox" id="service_03_03" checked={service_03_03} value="1" name="service_03_03"/>
                                <label htmlFor="service_03_03"><span>일정이 취소되거나 삭제되었을 때</span></label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className='connect-row-item'>
                <div className='title'><strong>커넥트 설정</strong></div>
                <div className='content'>
                  <dl className='row'>
                    <dt>
                      <p className='tit'>프로필 설정</p>
                      <p className='info'>팀 내에서 이 커넥트 항목이 메시지를 보낼 때의 프로필 이미지와 이름을 지정하실 수 있습니다.</p>
                    </dt>
                    <dd>
                      <div className='input-row'>
                        <a href='#none' className='btn-profile'>
                          <img src={getPublicAssetPath('static/icon_google.png')} alt="google"></img>
                          <span>Edit</span>
                        </a>
                        <Input type="text" className='input-type'></Input>
                      </div>
                    </dd>
                  </dl>
                  <dl className='row'>
                    <dt>
                      <p className='tit'>토픽 / JANDI 선택 </p>
                      <p className='info'>연동 서비스 또는 메시지를 받을 토픽 또는 1:1 메시지를 선택할 수 있습니다. 연동 설정 이후에도 변경 가능합니다.</p>
                    </dt>
                    <dd>
                      <div className='input-row'>
                        <div className="select-box type-full">
                          <a href="#none" title="검색필드 선택" className="select-value fc-green" name='topicVal' onClick={onSelect}><span>{topicVal === '' ? '그룹에 속한 대화방 1' : topicVal}</span></a>
                          <div className="select-list custom-select">
                            <div className='search-box'>
                              <div className='search-input-box'>
                                <i className='icon-ic-search'></i>
                                <Input type='text' placeholder='검색어를 입력해주세요.' value={searchVal} className='input-type' onChange={(e) => setSearchVal(e.currentTarget.value)}></Input>
                              </div>
                            </div>

                            {/* custom-select-wrap */}
                            {
                              !searchVal && (
                                <div className='custom-select-wrap'>
                                  <dl className='option-wrap'>
                                    <dt className='tit'>토픽</dt>
                                    <dd>
                                      <div className='folder-group'>
                                        <div className='folder-tit'><span className='icon-ic-folder-open'>새폴더</span></div>
                                        <ul>
                                          <li><a href='#none' onClick={onChangeSelect} className='on'>그룹에 속한 대화방 1</a></li>
                                          <li><a href='#none' onClick={onChangeSelect}>그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2</a></li>
                                        </ul>
                                      </div>
                                      <div className='folder-group'>
                                        <div className='folder-tit'><span className='icon-ic-folder-open'>새폴더</span></div>
                                        <ul>
                                          <li><a href='#none' onClick={onChangeSelect}>그룹에 속한 대화방 11</a></li>
                                          <li><a href='#none' onClick={onChangeSelect}>그룹에 속한 대화방 12</a></li>
                                        </ul>
                                      </div>
                                      <div className=''>{/* [D]: 그룹 아닐 경우 folder-group 제거*/}
                                        <ul>
                                          <li><a href='#none' onClick={onChangeSelect}>구룹아냐</a></li>
                                          <li><a href='#none' onClick={onChangeSelect}>구룹아닌방</a></li>
                                        </ul>
                                      </div>
                                    </dd>
                                  </dl>
                                  <dl className='option-wrap'>
                                    <dt className='tit'>채팅</dt>
                                    <dd>
                                      <div className='folder-group'>
                                        <div className='folder-tit'><span className='icon-ic-folder-open'>새폴더</span></div>
                                        <ul>
                                          <li><a href='#none'>모든 대화방<i className="icon-ic-lock"></i><i className="icon-ic-bell-slash"></i></a></li>
                                          <li><a href='#none'>참여한 대화방<i className="icon-ic-board"></i><i className="icon-ic-bell-slash"></i></a></li>
                                        </ul>
                                      </div>
                                      <div className='folder-group'>
                                        <div className='folder-tit'><span className='icon-ic-folder-open'>새폴더</span></div>
                                        <ul>
                                          <li><a href='#none'>모든 대화방</a></li>
                                          <li><a href='#none'>참여한 대화방</a></li>
                                        </ul>
                                      </div>
                                    </dd>
                                  </dl>
                                </div>
                              )
                            }
                            {/* //custom-select-wrap */}

                            {/* search-list-wrap */}
                            {
                              searchVal && (
                              <div className='search-list-wrap'>
                                <p className='tit'>7개의 결과가 있습니다.</p>
                                <ul>
                                  <li><a href='#none' onClick={onChangeSelect}>1. 테스트</a> </li>
                                  <li><a href='#none' onClick={onChangeSelect}>2. 테스트방2</a> </li>
                                  <li><a href='#none' onClick={onChangeSelect}>1. 테스트</a> </li>
                                  <li><a href='#none' onClick={onChangeSelect}>1. 테스트</a> </li>
                                </ul>
                                <p className='tit no-result'>결과가 없습니다.</p>
                              </div>
                              )
                            }
                            {/* search-list-wrap */}
                          </div>
                        </div>{/* //select-box */}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className='connect-row-item'>
                <div className='title'><strong>언어 설정</strong></div>
                <div className='content'>
                  <dl className='row'>
                    <dt>
                      <p className='tit'>언어 설정</p>
                      <p className='info'>수신할 메시지의 언어를 선택합니다.</p>
                    </dt>
                    <dd>
                      <div className='input-row'>
                        <div className="select-box type-full">
                          <a href="#none" title="검색필드 선택" className="select-value" value={langVal} name="langVal" onClick={onSelect}><span>{langVal === '' ? '한국어' : langVal}</span></a>
                          <div className="select-list">
                              <ul>
                                <li><a href="#none" onClick={onChangeSelect} className='on'><span>한국어</span></a></li>
                                <li><a href="#none" onClick={onChangeSelect}><span>English</span></a></li>
                                <li><a href="#none" onClick={onChangeSelect}><span>日本語</span></a></li>
                                <li><a href="#none" onClick={onChangeSelect}><span>简体中文</span></a></li>
                                <li><a href="#none" onClick={onChangeSelect}><span>繁體中文</span></a></li>
                                <li><a href="#none" onClick={onChangeSelect}><span>Tiếng Việt </span></a></li>
                              </ul>
                          </div>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <button type='button' className='full-btn' >연동 추가하기</button>
            </div>{/* //detail-wrapper */}
          </div>
        </div>
      </div>
    </div>
    
    {/* [D] : 수정하기 */}
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_google.png')} alt="google"></img></p>
            <div className='info'>
                <div><strong>김지영</strong><span>의 GoogleCalendar</span></div>
                <p>2021-12-06에 생성됨</p>
            </div>
            <div className='connect-right-box'>
              <label className="switch on" labefor="unit">
                <span className='txt'>작동중</span>
                <Input type="checkbox" id=""/>
                <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
              </label>
              <button type='button' className='btn-icon'><i className="icon-ic-delete"></i><span className='hidden'>삭제하기</span></button>
            </div>
          </div>
        </div>
      </div>{/* //detail-header */}
      <div className='detail-content connect'>
        <div className='connect-row-item'>
            <div className='title'><strong>계정 설정</strong></div>
            <div className='content'>
              <dl className='row'>
                <dt>
                  <p className='tit'>계정 인증</p>
                  <p className='info'>연동 서비스 추가를 위해서는 계정 인증이 필요합니다.</p>
                </dt>
                <dd>
                  <div className='input-row'>
                    <button type='button'>인증된 계정</button>
                    <div className="select-box type-full">
                      <a href="#none" title="검색필드 선택" className="select-value" value={accoutVal} name="accoutVal" onClick={onSelect}>
                        {/* [D] : 로딩 시 노출 */}
                        {/* <span>
                            <div className='loading'>
                            <span>불러오는 중...</span><div className='loader'><span></span></div>
                          </div>
                        </span> */}
                        {/* //[D] : 로딩 case */}
                        <span>{accoutVal === '' ? 'jandi@tosslab.com' : accoutVal}</span>
                      </a>
                      <div className="select-list account-type">
                          <ul>
                            <li><a href="#none" onClick={onChangeSelect} className='on'><span className='icon-ic-user-white'>jandi@tosslab.com</span></a><button type='button' className='btn-delete icon-ic-close'></button></li>
                            <li><a href="#none" onClick={onChangeSelect}><span className='icon-ic-user-white'>jandi02@tosslab.com</span></a><button type='button' className='btn-delete icon-ic-close'></button></li>
                            <li><a href="#none" onClick={onChangeSelect}><span className='icon-ic-user-white'>jandi03@tosslab.com</span></a><button type='button' className='btn-delete icon-ic-close'></button></li>
                            <li><a href="#none"><span className='icon-ic-user-add'>계정 추가하기</span></a></li>
                          </ul>
                      </div>
                    </div>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        <div className='connect-row-item'>
          <div className='title'><strong>서비스 설정</strong></div>
          <div className='content'>
            <dl className='row flx-baseline'>
              <dt>
                <p className='tit'>알림 설정</p>
                <p className='info'>일정에 대한 알림을 보내드립니다.</p>
              </dt>
              <dd>
                <div className='input-row'>
                  <div className='setting-contents'>
                    <ul>
                      <li>
                        <div className='custom-checkbox none-hover' onClick={onChangeCheckbox}> 
                          <input type="checkbox" id="service_01_01" checked={service_01_01} value="1" name="service_01_01"/>
                          <label htmlFor="service_01_01">
                            <div className='setting-item'>
                              <div className="select-box date-type">
                                <a href="#none" className="select-value" value={date_01_01} name="date_01_01" onClick={onSelect}><span>{date_01_01 === '' ? '정각' : date_01_01}</span></a>
                                <div className="select-list">
                                    <ul>
                                      <li><a href="#none" onClick={onChangeSelect} className='on'><span>정각</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>1분</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>5분전</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>10분전</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>15분전</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>30분전</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>1시간 전</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>2시간 전</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>4시간 전</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>1일 전</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>1 giờ trước</span></a></li>
                                    </ul>
                                </div>
                              </div>
                              <span className='utc-txt'>(UTC+09:00)</span>
                            </div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className='custom-checkbox none-hover' onClick={onChangeCheckbox}>
                          <input type="checkbox" id="service_01_01" checked={service_01_02} value="1" name="service_01_02"/>
                          <label htmlFor="service_01_02">
                            <div className='setting-item'>
                              <strong>종일 일정</strong>
                              <div className="select-box date-type">
                                <a href="#none" className="select-value" value={date_02_01} name="date_02_01" onClick={onSelect}><span>{date_02_01 === '' ? '당일' : date_02_01}</span></a>
                                <div className="select-list">
                                  <ul>
                                    <li><a href="#none" onClick={onChangeSelect} className='on'><span>당일</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>하루 전</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>이틀 전</span></a></li>
                                  </ul>
                                </div>
                              </div>
                              <div className="select-box date-type">
                                <a href="#none" className="select-value" value={date_02_02} name="date_02_02" onClick={onSelect}><span>{date_02_02 === '' ? '9:00 AM' : date_02_02}</span></a>
                                <div className="select-list">
                                    <ul>
                                      <li><a href="#none" onClick={onChangeSelect} className='on'><span>9:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>0:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>1:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>2:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>3:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>4:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>5:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>6:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>7:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>8:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>9:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>10:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>11:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>12:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>1:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>2:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>3:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>4:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>5:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>6:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>7:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>8:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>9:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>10:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>11:00 PM</span></a></li>
                                    </ul>
                                </div>
                              </div>
                              <span className='utc-txt'>(UTC+09:00)</span>
                            </div>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </dd>
            </dl>
            <dl className='row flx-baseline'>
              <dt>
                <p className='tit'>일정 요약</p>
                <p className='info'>한주간 또는 하루의 일정을 요약해 알려드립니다.</p>
              </dt>
              <dd>
                <div className='input-row'>
                  <div className='setting-contents'>
                    <ul>
                      <li>
                        <div className='custom-checkbox none-hover' onClick={onChangeCheckbox}>
                          <input type="checkbox" id="service_02_01" checked={service_02_01} value="1" name="service_02_01"/>
                          <label htmlFor="service_02_01">
                            <div className='setting-item'>
                              <strong>매일</strong>
                              <div className="select-box date-type">
                                <a href="#none" className="select-value" value={date_03_01} name="date_03_01" onClick={onSelect}><span>{date_03_01 === '' ? '정각' : date_03_01}</span></a>
                                <div className="select-list">
                                  <ul>
                                    <li><a href="#none" onClick={onChangeSelect} className='on'><span>9:00 AM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>0:00 AM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>1:00 AM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>2:00 AM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>3:00 AM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>4:00 AM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>5:00 AM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>6:00 AM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>7:00 AM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>8:00 AM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>9:00 AM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>10:00 AM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>11:00 AM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>12:00 AM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>1:00 PM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>2:00 PM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>3:00 PM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>4:00 PM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>5:00 PM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>6:00 PM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>7:00 PM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>8:00 PM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>9:00 PM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>10:00 PM</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>11:00 PM</span></a></li>
                                  </ul>
                              </div>
                              </div>
                              <span className='utc-txt'>(UTC+09:00)</span>
                            </div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className='custom-checkbox none-hover' onClick={onChangeCheckbox}>
                          <input type="checkbox" id="service_02_02" checked={service_02_02} value="1" name="service_02_02"/>
                          <label htmlFor="service_02_02">
                            <div className='setting-item'>
                              <strong>매주</strong>
                              <div className="select-box date-type">
                                <a href="#none" className="select-value" value={date_04_01} name="date_04_01" onClick={onSelect}><span>{date_04_01 === '' ? '당일' : date_04_01}</span></a>
                                <div className="select-list">
                                  <ul>
                                    <li><a href="#none" onClick={onChangeSelect} className='on'><span>월요일</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>화요일</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>수요일</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>목요일</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>금요일</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>토요일</span></a></li>
                                    <li><a href="#none" onClick={onChangeSelect}><span>일요일</span></a></li>
                                  </ul>
                                </div>
                              </div>
                              <div className="select-box date-type">
                                <a href="#none" className="select-value" value={date_04_02} name="date_04_02" onClick={onSelect}><span>{date_04_02 === '' ? '9:00 AM' : date_04_02}</span></a>
                                <div className="select-list">
                                    <ul>
                                      <li><a href="#none" onClick={onChangeSelect} className='on'><span>9:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>0:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>1:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>2:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>3:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>4:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>5:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>6:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>7:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>8:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>9:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>10:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>11:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>12:00 AM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>1:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>2:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>3:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>4:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>5:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>6:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>7:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>8:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>9:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>10:00 PM</span></a></li>
                                      <li><a href="#none" onClick={onChangeSelect}><span>11:00 PM</span></a></li>
                                    </ul>
                                </div>
                              </div>
                              <span className='utc-txt'>(UTC+09:00)</span>
                            </div>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </dd>
            </dl>
            <dl className='row flx-baseline'>
              <dt>
                <p className='tit'>캘린더 업데이트</p>
                <p className='info'>캘린더 업데이트가 필요한 상황을 선택해주세요.</p>
              </dt>
              <dd>
                <div className='input-row'>
                  <div className='setting-contents'>
                    <ul>
                      <li>
                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                          <input type="checkbox" id="service_03_01" checked={service_03_01} value="1" name="service_03_01"/>
                          <label htmlFor="service_03_01"><span>일정이 새롭게 생성되었거나 일정에 초대되었을 때</span></label>
                        </div>
                      </li>
                      <li>
                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                          <input type="checkbox" id="service_03_02" checked={service_03_02} value="1" name="service_03_02"/>
                          <label htmlFor="service_03_02"><span>일정의 제목이나 시각, 장소가 수정되었을 때</span></label>
                        </div>
                      </li>
                      <li>
                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                          <input type="checkbox" id="service_03_03" checked={service_03_03} value="1" name="service_03_03"/>
                          <label htmlFor="service_03_03"><span>일정이 취소되거나 삭제되었을 때</span></label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <div className='connect-row-item'>
          <div className='title'><strong>커넥트 설정</strong></div>
          <div className='content'>
            <dl className='row'>
              <dt>
                <p className='tit'>프로필 설정</p>
                <p className='info'>팀 내에서 이 커넥트 항목이 메시지를 보낼 때의 프로필 이미지와 이름을 지정하실 수 있습니다.</p>
              </dt>
              <dd>
                <div className='input-row'>
                  <a href='#none' className='btn-profile'>
                    <img src={getPublicAssetPath('static/icon_google.png')} alt="google"></img>
                    <span>Edit</span>
                  </a>
                  <Input type="text" placeholder='Google 캘린더' className='input-type'></Input>
                </div>
              </dd>
            </dl>
            <dl className='row'>
              <dt>
                <p className='tit'>토픽 / JANDI 선택 </p>
                <p className='info'>연동 서비스 또는 메시지를 받을 토픽 또는 1:1 메시지를 선택할 수 있습니다. 연동 설정 이후에도 변경 가능합니다.</p>
              </dt>
              <dd>
                <div className='input-row'>
                  <div className="select-box type-full">
                    <a href="#none" title="검색필드 선택" className="select-value fc-green" name='topicVal' onClick={onSelect}><span>{topicVal === '' ? '그룹에 속한 대화방 1' : topicVal}</span></a>
                    <div className="select-list custom-select">
                      <div className='search-box'>
                        <div className='search-input-box'>
                          <i className='icon-ic-search'></i>
                          <Input type='text' placeholder='검색어를 입력해주세요.' value={searchVal} className='input-type' onChange={(e) => setSearchVal(e.currentTarget.value)}></Input>
                        </div>
                      </div>

                      {/* custom-select-wrap */}
                      {
                        !searchVal && (
                          <div className='custom-select-wrap'>
                            <dl className='option-wrap'>
                              <dt className='tit'>토픽</dt>
                              <dd>
                                <div className='folder-group'>
                                  <div className='folder-tit'><span className='icon-ic-folder-open'>새폴더</span></div>
                                  <ul>
                                    <li><a href='#none' onClick={onChangeSelect} className='on'>그룹에 속한 대화방 1</a></li>
                                    <li><a href='#none' onClick={onChangeSelect}>그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2</a></li>
                                  </ul>
                                </div>
                                <div className='folder-group'>
                                  <div className='folder-tit'><span className='icon-ic-folder-open'>새폴더</span></div>
                                  <ul>
                                    <li><a href='#none' onClick={onChangeSelect}>그룹에 속한 대화방 11</a></li>
                                    <li><a href='#none' onClick={onChangeSelect}>그룹에 속한 대화방 12</a></li>
                                  </ul>
                                </div>
                                <div className=''>{/* [D]: 그룹 아닐 경우 folder-group 제거*/}
                                  <ul>
                                    <li><a href='#none' onClick={onChangeSelect}>구룹아냐</a></li>
                                    <li><a href='#none' onClick={onChangeSelect}>구룹아닌방</a></li>
                                  </ul>
                                </div>
                              </dd>
                            </dl>
                            <dl className='option-wrap'>
                              <dt className='tit'>채팅</dt>
                              <dd>
                                <div className='folder-group'>
                                  <div className='folder-tit'><span className='icon-ic-folder-open'>새폴더</span></div>
                                  <ul>
                                    <li><a href='#none'>모든 대화방<i className="icon-ic-lock"></i><i className="icon-ic-bell-slash"></i></a></li>
                                    <li><a href='#none'>참여한 대화방<i className="icon-ic-board"></i><i className="icon-ic-bell-slash"></i></a></li>
                                  </ul>
                                </div>
                                <div className='folder-group'>
                                  <div className='folder-tit'><span className='icon-ic-folder-open'>새폴더</span></div>
                                  <ul>
                                    <li><a href='#none'>모든 대화방</a></li>
                                    <li><a href='#none'>참여한 대화방</a></li>
                                  </ul>
                                </div>
                              </dd>
                            </dl>
                          </div>
                        )
                      }
                      {/* //custom-select-wrap */}

                      {/* search-list-wrap */}
                      {
                        searchVal && (
                        <div className='search-list-wrap'>
                          <p className='tit'>7개의 결과가 있습니다.</p>
                          <ul>
                            <li><a href='#none' onClick={onChangeSelect}>1. 테스트</a> </li>
                            <li><a href='#none' onClick={onChangeSelect}>2. 테스트방2</a> </li>
                            <li><a href='#none' onClick={onChangeSelect}>1. 테스트</a> </li>
                            <li><a href='#none' onClick={onChangeSelect}>1. 테스트</a> </li>
                          </ul>
                          <p className='tit no-result'>결과가 없습니다.</p>
                        </div>
                        )
                      }
                      {/* search-list-wrap */}
                    </div>
                  </div>{/* //select-box */}
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <div className='connect-row-item'>
          <div className='title'><strong>언어 설정</strong></div>
          <div className='content'>
            <dl className='row'>
              <dt>
                <p className='tit'>언어 설정</p>
                <p className='info'>수신할 메시지의 언어를 선택합니다.</p>
              </dt>
              <dd>
                <div className='input-row'>
                  <div className="select-box type-full">
                    <a href="#none" title="검색필드 선택" className="select-value" value={langVal} name="langVal" onClick={onSelect}><span>{langVal === '' ? '한국어' : langVal}</span></a>
                    <div className="select-list">
                        <ul>
                          <li><a href="#none" onClick={onChangeSelect} className='on'><span>한국어</span></a></li>
                          <li><a href="#none" onClick={onChangeSelect}><span>English</span></a></li>
                          <li><a href="#none" onClick={onChangeSelect}><span>日本語</span></a></li>
                          <li><a href="#none" onClick={onChangeSelect}><span>简体中文</span></a></li>
                          <li><a href="#none" onClick={onChangeSelect}><span>繁體中文</span></a></li>
                          <li><a href="#none" onClick={onChangeSelect}><span>Tiếng Việt </span></a></li>
                        </ul>
                    </div>
                  </div>
                </div>
              </dd>
            </dl>
          </div>
         </div>
        <button type='button' className='full-btn'>수정하기</button>
      </div>{/* //detail-wrapper */}
    </div>
  </>);
};

export default GoogleCalendar;
