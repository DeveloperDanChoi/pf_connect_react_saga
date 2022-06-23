/* eslint-disable max-len */
import React, {
  useEffect, Fragment,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import { modules } from '../../../../../store/connect/googleCalendar/googleCalendar';
import { template1 } from '../../../../../service/connect';
import Thumbnail from '../../../../ui/Thumbnail/Thumbnail';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import {
  searcher, searcherAuth, searcherLanguage, searcherCal,
} from '../../../../../service/searcher';
import { LANGUAGE2 } from '../../../../../constants/type';

const GoogleCalendar = () => {
  const connectType = 'googleCalendar';
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    team, googleCalendar, user,
  } = useSelector((state) => state);
  const { creators } = modules;

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
  }, []);

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
    {/* [D] : 수정하기 */}
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_google.png')} alt="google"></img></p>
            <div className='info'>
              <div><strong>{googleCalendar.input.member.name}</strong><span>의 GoogleCalendar</span></div>
              <p>{googleCalendar.input.createdAt}에 생성됨</p>
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
                    >
                    {
                      (() => {
                        if (googleCalendar.input.selectedAuthentication === '') {
                          return (<>
                            <span>
                              <div className='loading'>
                                <span>불러오는 중...</span><div className='three_quarters_loader'><span></span></div>
                              </div>
                            </span>
                            <span>&nbsp;</span>
                          </>);
                        }
                        return (<span>{googleCalendar.input.selectedAuthentication}</span>);
                      })()
                    }
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
                        <li><a href="#none" onClick={template1.authorize}><span className='icon-ic-user-add'>계정 추가하기</span></a></li>
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
                    >
                    {
                      (() => {
                        if (googleCalendar.input.selectedCal === '') {
                          return (<>
                            <span>
                              <div className='loading'>
                                <span>불러오는 중...</span><div className='three_quarters_loader'><span></span></div>
                              </div>
                            </span>
                            <span>&nbsp;</span>
                          </>);
                        }
                        return (<span>{googleCalendar.input.selectedCal}</span>);
                      })()
                    }
                    </a>
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
        <button type='button' className='full-btn' onClick={(e) => template1.connect(e, googleCalendar)}>수정하기</button>
      </div>{/* //detail-wrapper */}
    </div>
  </>);
};

export default GoogleCalendar;
/**
 * TODO: To.sia 계정 리스트, 캘린더 리스트 편집 불가 cursor 모양 disabled
 * TODO: To.sia 인증된 계정 버튼 X 라벨 O
 */
