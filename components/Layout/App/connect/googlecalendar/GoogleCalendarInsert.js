/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,react/jsx-no-duplicate-props,guard-for-in,operator-assignment,no-unreachable,object-curly-newline,react/no-unescaped-entities,react/jsx-no-comment-textnodes,space-before-function-paren */
import React, {
  useEffect, useRef, Fragment,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import { modules } from '../../../../../store/connect/googleCalendar/googleCalendar';
import { template1 } from '../../../../../service/connect';
import Thumbnail from '../../../../ui/Thumbnail/Thumbnail';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { banner } from '../../../../../service/banner';
import {
  searcher, searcherAuth, searcherLanguage, searcherCal,
} from '../../../../../service/searcher';
import { LANGUAGE2 } from '../../../../../constants/type';
import {Toast} from "../../../../ui/Toast/Toast";

const GoogleCalendar = () => {
  const connectType = 'googleCalendar';
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    team, googleCalendar, user, connect,
  } = useSelector((state) => state);
  const { creators } = modules;

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

  /**
   *
   * @type {{change: change, disabled: disabled, toggle: toggle}}
   */
  const tab = (() => {
    /**
     *
     * @param e
     */
    const change = (e) => {
      if (swiperRef.current) {
        setTimeout(() => swiperRef.current.swiper.update());
      } // swiper observer
      e.preventDefault();
      const menu = document.querySelectorAll('.tab-menu li a');
      const content = document.querySelectorAll('.tab-cont');

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < menu.length; i++) {
        content[i].classList.remove('on');
        menu[i].classList.remove('on');
      }
      content[e.currentTarget.id - 1].classList.add('on');
      e.currentTarget.classList.add('on');
    };
    /**
     *
     */
    const disabled = () => {
      document.querySelector('.connect').classList.toggle('disabled');
      document.querySelector('.full-btn').toggleAttribute('disabled');
    };
    /**
     *
     * @param e
     */
    const toggle = (e) => {
      e.target.closest('.switch').classList.toggle('on');
      disabled();
    };
    return { change, disabled, toggle };
  })();

  /* custom checkbox */
  const onChangeCheckbox = (e) => {
    if (e.target.localName !== 'label') return;

    e.preventDefault();
    const target = e.currentTarget.querySelector('input');
    template1.set(target.name, !googleCalendar.input[target.name]);
  };

  useEffect(() => {
    // if (user.rooms.chats.length === 0) return;
    searcher.initialize({
      dispatch, document, team, user, googleCalendar, connectType, set: creators.setInputGoogleCalendar,
    });
    searcherLanguage.initialize({
      dispatch, document, team, user, googleCalendar, connectType, set: creators.setInputGoogleCalendar,
    });
  }, [user.rooms]);

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

    window.popupDone = function() {
      console.log('callback !!!!')
    }
    window.addEventListener('popupDone', () => {
      console.log('callback good !!')
    });
    window.onunload = function() {
      console.log('..............');
    }

    template1.set('win', window);
    template1.set('pp', {});
  }, []);

  useEffect(() => {
    console.log(googleCalendar.input);
  }, [googleCalendar.input.pp]);

  useEffect(() => {
    if (googleCalendar.authenticationGoogleCalendarCalendarList.length === 0) return;

    searcherCal.initialize({
      dispatch, document, team, user, googleCalendar, connectType, set: creators.setInputGoogleCalendar,
    });
    searcherAuth.initialize({
      dispatch, document, team, user, googleCalendar, connectType, set: creators.setInputGoogleCalendar,
    });

    template1.set('authenticationId', googleCalendar.authenticationGoogleCalendarCalendarList[0].authenticationId);
    template1.set('selectedAuthentication', googleCalendar.authenticationGoogleCalendarCalendarList[0].authenticationName);
    template1.set('selectedCal', googleCalendar.authenticationGoogleCalendarCalendarList[0].list[0].summary);
  }, [googleCalendar.authenticationGoogleCalendarCalendarList]);

  return (<>
    {/* [D] : 연동하기 */}
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          { connect.connectsObj[connectType]
          && <div className='connect-info-box'>
            <p className='img-box'><img src={connect.connectsObj[connectType].botThumbnail} alt="rss"></img></p>
            <div className='info'>
              <strong>{connect.connectsObj[connectType].label}</strong>
              <p>{connect.connectsObj[connectType].category}</p>
            </div>
          </div>
          }
        </div>
      </div>{/* //detail-header */}

      <div className='tab-container'>
        <div className='tab-menu'>
          <ul>
            <li><a href='#none' onClick={tab.change} id="1" className='on'>서비스 소개</a></li>
            <li><a href='#none' onClick={tab.change} id="2">연동하기</a></li>
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
                <button type='button' onClick={() => banner.help(user)}>더 알아보기<i className='icon-ic-arrow-right-up'></i></button>
              </div>
            </div>
          </div>
          <div className='tab-cont'>
            <div className='detail-content connect'>
              {
                (() => {
                  /* [D] : 계정 인증 전 case */
                  if (googleCalendar.authenticationGoogleCalendarCalendarList.length === 0) {
                    return (
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
                                <button type='button' onClick={template1.authorize}>계정 인증하기</button>
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    );
                  }
                  /* [D] : 계정 인증 후 case */
                  return (<>
                    {/* 계정 설정 */}
                    <div className='connect-row-item'>
                      <div className='title'><strong>계정 설정</strong></div>
                      <div className='content'>
                        {/* 계정 인증 */}
                        <dl className='row'>
                          <dt>
                            <p className='tit'>계정 인증</p>
                            <p className='info'>연동 서비스 추가를 위해서는 계정 인증이 필요합니다.</p>
                          </dt>
                          <dd>
                            <div className='input-row'>
                              <button type='button'>인증된 계정</button>
                              <div className="select-box type-full">
                                <a href="javascript(void:0);:"
                                   title="검색필드 선택"
                                   className="select-value"
                                   name="accoutVal"
                                   onClick={searcherAuth.open}
                                >
                                  {/* [D] : 로딩 시 노출 */}
                                  {false &&
                                  <span>
                                    <div className='loading'>
                                    <span>불러오는 중...</span><div className='three_quarters_loader'><span></span></div>
                                  </div>
                                </span>
                                  }
                                  {/* //[D] : 로딩 case */}
                                  <span>{googleCalendar.input.selectedAuthentication}</span>
                                </a>
                                <div className="select-list account-type">
                                  <ul>
                                    {
                                      googleCalendar.authenticationGoogleCalendarCalendarList.map((authData, authIndex) => (
                                      <li key={authIndex}>
                                        <a onClick={(e) => searcherAuth.select(e, authData)} href="#none"><span className='icon-ic-user-white'>{authData.authenticationName}</span></a>
                                        <button type='button' className='btn-delete icon-ic-close' onClick={(e) => template1.disconnect(e, googleCalendar.input)}></button>
                                      </li>
                                      ))
                                    }
                                      <li><a href="#none" onClick={(e) => template1.authorize(e, googleCalendar)}><span className='icon-ic-user-add'>계정 추가하기</span></a></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                    {/* 서비스 설정 */}
                    <div className='connect-row-item'>
                      <div className='title'><strong>서비스 설정</strong></div>
                      <div className='content'>
                        {/* 캘린더 설정 */}
                        <dl className='row'>
                          <dt>
                            <p className='tit'>캘린더 선택</p>
                            <p className='info'>일정 알림 메시지를 받고자 하는 캘린더를 선택해주세요.</p>
                          </dt>
                          <dd>
                            <div className='input-row'>
                              <div className="select-box list-type mgr8">
                                <a href="#none"
                                   title="검색필드 선택"
                                   className="select-value"
                                   name='topicVal'
                                   onClick={searcherCal.open}
                                ><span>{googleCalendar.input.selectedCal}</span></a>
                                <div className="select-list custom-select">
                                  <div className='search-box'>
                                    <div className='search-input-box'>
                                      <i className='icon-ic-search'></i>
                                      <Input type='text'
                                             placeholder='검색어를 입력해주세요.'
                                             className='input-type'
                                             value={googleCalendar.input.searchCalText}
                                             onChange={searcherCal.change}
                                      ></Input>
                                    </div>
                                  </div>
                                  {
                                    (() => {
                                      if (googleCalendar.input.searchCalText === '') {
                                        return (
                                          <div className='custom-select-wrap'>{
                                            googleCalendar.authenticationGoogleCalendarCalendarList.map((calData, calIndex) => (
                                              <dl key={calIndex} className='option-wrap'>
                                                <dt className='tit'>{calData.authenticationName}</dt>
                                                <dd>
                                                  <ul>{
                                                    calData.list.map((listData, listIndex) => (
                                                      <li key={listIndex}>
                                                        <a href='#none' onClick={(e) => searcherCal.select(e, listData)}>{listData.summary}</a>
                                                      </li>
                                                    ))
                                                  }</ul>
                                                </dd>
                                              </dl>
                                            ))
                                          }</div>
                                        );
                                      }
                                      return (
                                        <div className='search-list-wrap'>{
                                          (() => {
                                            if (googleCalendar.input.searchCalFilters.length === 0) {
                                              return (<p className='tit no-result'>결과가 없습니다.</p>);
                                            }
                                            return (<>
                                              <p className='tit'>{googleCalendar.input.searchCalFilters.length}개의 결과가 있습니다.</p>
                                              <ul>{
                                                  googleCalendar.input.searchCalFilters.map((calData, calIndex) => (
                                                    <li key={calIndex}>
                                                      <a href='#none'
                                                         onClick={(e) => searcherCal.select(e, calData)}>{calData.summary}</a>
                                                    </li>
                                                  ))
                                              }</ul>
                                            </>);
                                          })()
                                        }</div>
                                      );
                                    })()
                                  }
                                </div>
                              </div>{/* //select-box */}
                            </div>
                          </dd>
                        </dl>
                        {/* 알림 설정 */}
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
                                      <input type="checkbox" id="hasNotificationBefore" checked={googleCalendar.input.hasNotificationBefore} name="hasNotificationBefore" readOnly />
                                      <label htmlFor="notificationBefore">
                                        <div className='setting-item'>
                                          <div className="select-box date-type">
                                            <a href="#none"
                                               className="select-value"
                                               name="notificationBefore"
                                               onClick={searcher.open}
                                            ><span>{googleCalendar.getMinute[googleCalendar.input.notificationBefore]}</span></a>
                                            <div className="select-list">
                                              <ul>{
                                                  googleCalendar.getMinuteList.map((data, i) => (
                                                    <li key={i}><a href="#none" onClick={(e) => searcher.select2(e, data)}><span>{data.text}</span></a></li>
                                                  ))
                                              }</ul>
                                            </div>
                                          </div>
                                          <span className='utc-txt'>(UTC+09:00)</span>
                                        </div>
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className='custom-checkbox none-hover' onClick={onChangeCheckbox}>
                                      <input type="checkbox" id="hasAllDayNotification" checked={googleCalendar.input.hasAllDayNotification} name="hasAllDayNotification" readOnly />
                                      <label htmlFor="service_01_02">
                                        <div className='setting-item'>
                                          <strong>종일 일정</strong>
                                          <div className="select-box date-type">
                                            <a href="#none"
                                               className="select-value"
                                               name="allDayNotificationBeforeDates"
                                               onClick={searcher.open}
                                            ><span>{googleCalendar.getDate[googleCalendar.input.allDayNotificationBeforeDates]}</span></a>
                                            <div className="select-list">
                                              <ul>{
                                                  googleCalendar.getDateList.map((data, i) => (
                                                    <li key={i}><a href="#none" onClick={(e) => searcher.select2(e, data)}><span>{data.text}</span></a></li>
                                                  ))
                                              }</ul>
                                            </div>
                                          </div>
                                          <div className="select-box date-type">
                                            <a href="#none"
                                               className="select-value"
                                               name="allDayNotificationHour"
                                               onClick={searcher.open}
                                            ><span>{googleCalendar.getHour[googleCalendar.input.allDayNotificationHour]}</span></a>
                                            <div className="select-list">
                                              <ul>{
                                                googleCalendar.getHourList.map((data, i) => (
                                                  <li key={i}><a href="#none" onClick={(e) => searcher.select2(e, data)}><span>{data.text}</span></a></li>
                                                ))
                                              }</ul>
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
                        {/* 일정 요약 */}
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
                                      <input type="checkbox" id="hasDailyScheduleSummary" checked={googleCalendar.input.hasDailyScheduleSummary} name="hasDailyScheduleSummary" readOnly />
                                      <label htmlFor="dailyScheduleSummary">
                                        <div className='setting-item'>
                                          <strong>매일</strong>
                                          <div className="select-box date-type">
                                            <a href="#none"
                                               className="select-value"
                                               name="dailyScheduleSummary"
                                               onClick={searcher.open}
                                            ><span>{googleCalendar.getHour[googleCalendar.input.dailyScheduleSummary]}</span></a>
                                            <div className="select-list">
                                              <ul>{
                                                googleCalendar.getHourList.map((data, i) => (
                                                  <li key={i}><a href="#none" onClick={(e) => searcher.select2(e, data)}><span>{data.text}</span></a></li>
                                                ))
                                              }</ul>
                                            </div>
                                          </div>
                                          <span className='utc-txt'>(UTC+09:00)</span>
                                        </div>
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className='custom-checkbox none-hover' onClick={onChangeCheckbox}>
                                      <input type="checkbox" id="hasWeeklyScheduleSummary" checked={googleCalendar.input.hasWeeklyScheduleSummary} name="hasWeeklyScheduleSummary" readOnly />
                                      <label htmlFor="service_02_02">
                                        <div className='setting-item'>
                                          <strong>매주</strong>
                                          <div className="select-box date-type">
                                            <a href="#none"
                                               className="select-value"
                                               name="weeklyScheduleSummaryDayOfWeek"
                                               onClick={searcher.open}
                                            ><span>{googleCalendar.getDay[googleCalendar.input.weeklyScheduleSummaryDayOfWeek]}</span></a>
                                            <div className="select-list">
                                              <ul>{
                                                googleCalendar.getDayList.map((data, i) => (
                                                  <li key={i}><a href="#none" onClick={(e) => searcher.select2(e, data)}><span>{data.text}</span></a></li>
                                                ))
                                              }</ul>
                                            </div>
                                          </div>
                                          <div className="select-box date-type">
                                            <a href="#none"
                                               className="select-value"
                                               name="weeklyScheduleSummaryHour"
                                               onClick={searcher.open}
                                            ><span>{googleCalendar.getHour[googleCalendar.input.weeklyScheduleSummaryHour]}</span></a>
                                            <div className="select-list">
                                              <ul>{
                                                googleCalendar.getHourList.map((data, i) => (
                                                  <li key={i}><a href="#none" onClick={(e) => searcher.select2(e, data)}><span>{data.text}</span></a></li>
                                                ))
                                              }</ul>
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
                        {/* 캘린더 업데이트 */}
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
                                      <input type="checkbox" id="newEventNotification" checked={googleCalendar.input.newEventNotification} name="newEventNotification" readOnly />
                                      <label htmlFor="service_03_01"><span>일정이 새롭게 생성되었거나 일정에 초대되었을 때</span></label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                      <input type="checkbox" id="updatedEventNotification" checked={googleCalendar.input.updatedEventNotification} name="updatedEventNotification" readOnly />
                                      <label htmlFor="service_03_02"><span>일정의 제목이나 시각, 장소가 수정되었을 때</span></label>
                                    </div>
                                  </li>
                                  <li>
                                    <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                      <input type="checkbox" id="cancelledEventNotification" checked={googleCalendar.input.cancelledEventNotification} name="cancelledEventNotification" readOnly />
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
                    {/* 서비스 설정 > 커넥트 설정 */}
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
                              <Thumbnail state={googleCalendar} parent={template1} />
                              <Input type="text"
                                     className='input-type'
                                     onChange={(e) => template1.set('botName', e.target.value)}
                                     value={googleCalendar.input.botName}
                              ></Input>
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
                                <a href="#none"
                                   title="검색필드 선택"
                                   className="select-value fc-green"
                                   name='searchText'
                                   onClick={searcher.open}>
                                  <span>{googleCalendar.input.selectedTopic}</span>
                                </a>
                                <div className="select-list custom-select">
                                  <div className='search-box'>
                                    <div className='search-input-box'>
                                      <i className='icon-ic-search'></i>
                                      <Input type='text'
                                             placeholder='검색어를 입력해주세요.'
                                             className='input-type'
                                             value={googleCalendar.input.searchText}
                                             onChange={(e) => searcher.change(e)}
                                      ></Input>
                                    </div>
                                  </div>

                                  {/* custom-select-wrap */}
                                  {
                                    googleCalendar.input.searchText === '' && (
                                      <div className='custom-select-wrap'>
                                        <dl className='option-wrap'>
                                          <dt className='tit'>토픽</dt>
                                          <dd>
                                            {
                                              googleCalendar.input.searchRooms.map((roomsData, roomsIndex) => (<Fragment key={roomsIndex}>
                                                {roomsData.seq
                                                && <div className='folder-group'>
                                                  <div className='folder-tit'>
                                                    <span className='icon-ic-folder-open'>{roomsData.name}</span>
                                                  </div>
                                                  <ul>
                                                    {roomsData.rooms.map((roomData, roomIndex) => (<Fragment key={roomIndex}>
                                                      <li><a href='#none' onClick={(e) => searcher.select(e, roomData)}>{roomData.name}</a></li>
                                                    </Fragment>))}
                                                  </ul>
                                                </div>
                                                }
                                                {!roomsData.seq
                                                && <div>
                                                  <ul>
                                                    <li><a href='#none' onClick={(e) => searcher.select(e, roomsData)}>{roomsData.name}</a></li>
                                                  </ul>
                                                </div>
                                                }
                                              </Fragment>))
                                            }
                                          </dd>
                                        </dl>
                                        <dl className='option-wrap'>
                                          <dt className='tit'>채팅</dt>
                                          <dd>
                                            {
                                              user.rooms.bots.map((botData, botIndex) => (
                                                <div key={botIndex}>
                                                  <ul>
                                                    <li><a href='#none' onClick={(e) => searcher.select(e, botData)}>{botData.name}</a></li>
                                                  </ul>
                                                </div>
                                              ))
                                            }
                                          </dd>
                                        </dl>
                                      </div>
                                    )
                                  }
                                  {/* //custom-select-wrap */}

                                  {/* search-list-wrap 검샋결과가 있을 경우 폴더는 제외 */}
                                  {
                                    googleCalendar.input.searchText !== '' && (
                                      <div className='search-list-wrap'>
                                        {
                                          googleCalendar.input.searchFilters.length > 0
                                          && <>
                                            <p className='tit'>{googleCalendar.input.searchFilters.length}개의 결과가 있습니다.</p>
                                            <ul>
                                              {
                                                googleCalendar.input.searchFilters.map((roomData, roomIndex) => (
                                                  <li key={roomIndex}>
                                                    <a href='#none' onClick={(e) => searcher.select(e, roomData)}>{roomData.name}</a>
                                                  </li>
                                                ))
                                              }
                                            </ul>
                                          </>
                                        }
                                        {googleCalendar.input.searchFilters.length === 0 && <p className='tit no-result'>결과가 없습니다.</p>}
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
                                <a href="#none"
                                   title="검색필드 선택"
                                   className="select-value"
                                   name="langVal"
                                   onClick={searcherLanguage.open}
                                ><span>{googleCalendar.input.langText}</span></a>
                                <div className="select-list">
                                  <ul>
                                    {
                                      Object.keys(LANGUAGE2).map((lang, langIndex) => (
                                        <Fragment key={langIndex}>
                                          <li><a href="#none" onClick={(e) => searcherLanguage.select(e, LANGUAGE2[lang])}><span>{lang}</span></a></li>
                                        </Fragment>
                                      ))
                                    }
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <button type='button' className='full-btn' onClick={(e) => template1.connect(e, googleCalendar)}>연동 추가하기</button>
                  </>);
                })()
              }
            </div>{/* //detail-wrapper */}
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default GoogleCalendar;
