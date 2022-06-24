/* eslint-disable max-len */
import React, {
  useEffect, useRef, Fragment, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { modules } from '../../../../../store/connect/trello/trello';
import { template1 } from '../../../../../service/connect';
import Thumbnail from '../../../../ui/Thumbnail/Thumbnail';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { banner } from '../../../../../service/banner';
import { searcher, searcherAuth, searcherLanguage, searcherBoard, } from '../../../../../service/searcher';
import { LANGUAGE2 } from '../../../../../constants/type';

const Trello = () => {
  const connectType = 'trello';
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    team, trello, user, connect,
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
    e.preventDefault();
    const target = e.currentTarget.querySelector('input');
    template1.set(target.name, !trello.input[target.name]);
  };

  useEffect(() => {
    // if (user.rooms.chats.length === 0) return;
    searcher.initialize({
      dispatch, document, team, user, trello, connectType, set: creators.setInputTrello,
    });
    searcherLanguage.initialize({
      dispatch, document, team, user, trello, connectType, set: creators.setInputTrello,
    });
  }, [user.rooms]);

  useEffect(() => {
    template1.initialize({
      dispatch,
      router,
      connectType: 'trello',
      modules,
      list: creators.getAuthenticationTrelloBoardsList,
      load: creators.getTeamsTrello,
      connect: [creators.postTeamsTrello, creators.putTeamsTrelloSetting],
      disconnect: creators.deleteAuthentications,
      set: creators.setInputTrello,
    }, false);
  }, []);

  useEffect(() => {
    for (const item of connect.authentication) {
      if (item.id === 'trello' && item.datas[item.datas.length - 1].status === 'created') {
        template1.list(creators.getAuthenticationTrelloBoardsList);
        break;
      }
    }
  }, [connect.authentication]);

  useEffect(() => {
    searcherBoard.initialize({
      dispatch, document, team, user, trello, connectType, set: creators.setInputTrello,
    });
    searcherAuth.initialize({
      dispatch, document, team, user, trello, connectType, set: creators.setInputTrello,
    });
  }, [trello.authenticationTrelloBoardsList]);

  return (<>
    {/* [D] : 연동하기 */}
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_trello.png')} alt="trello"></img></p>
            <div className='info'>
                <strong>Trello</strong>
                <p>프로젝트 관리, 생산성</p>
            </div>
          </div>
        </div>
      </div>{/* //detail-header */}
      <div className='tab-container'>
        <div className='tab-menu'>
          <ul>
            <li><a href='#none' onClick={tab.change} id="1">서비스 소개</a></li>
            <li><a href='#none' onClick={tab.change} id="2" className='on'>연동하기</a></li>
          </ul>
        </div>
        <div className='tab-content'>
          <div className='tab-cont'>
            <div className='detail-content'>
              <div className='info-wrap'>
                <img src={getPublicAssetPath('static/trello/ko/info/img_info.png')} alt="서비스 소개"></img>{/* [D] : static/커넥트명/언어코드/img_info.png */}
                <div className='info-box'>
                  <strong>Trello</strong>
                  <p>Trello는 인터랙티브한 방식으로 할 일 관리를 할 수 있는 협업툴입니다.<br/>Trello를 잔디와 연동하게 되면, 각 카드나 보드의 변동 사항을 잔디 팀 내에서 메시지로 받을 수 있습니다.</p>
                </div>
                <button type='button' onClick={() => banner.help(user)}>더 알아보기<i className='icon-ic-arrow-right-up'></i></button>
              </div>
            </div>
          </div>
          <div className='tab-cont on'>
            <div className='detail-content connect'>
              {
                (() => {
                  /* [D] : 계정 인증 전 case */
                  if (trello.authenticationTrelloBoardsList.authenticationId === '') {
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
                                  {
                                    (() => {
                                      if (trello.authenticationTrelloBoardsList.authenticationName === '') {
                                        return (<>
                                          <span>
                                            <div className='loading'>
                                              <span>불러오는 중...</span><div className='three_quarters_loader'><span></span></div>
                                            </div>
                                          </span>
                                          <span>&nbsp;</span>
                                        </>);
                                      }
                                      return (<span>{trello.authenticationTrelloBoardsList.authenticationName}</span>);
                                    })()
                                  }
                                </a>
                                <div className="select-list account-type">
                                  <ul>
                                    <li>
                                      <a href="#none"><span className='icon-ic-user-white'>{trello.authenticationTrelloBoardsList.authenticationName}</span></a>
                                      <button type='button' className='btn-delete icon-ic-close' onClick={(e) => template1.disconnect(e, trello.input)}></button>
                                    </li>
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
                          <dl className='row'>
                            <dt>
                              <p className='tit'>Board 선택</p>
                              <p className='info'>알림을 받고자 하는 보드(Board)를 선택해주세요.</p>
                            </dt>
                            <dd>
                              <div className='input-row'>
                                <div className="select-box list-type mgr8">
                                  <a href="#none"
                                     title="검색필드 선택"
                                     className="select-value"
                                     name='topicVal'
                                     onClick={searcherBoard.open}
                                  ><span>{trello.input.selectedBoard}</span>
                                  </a>
                                  <div className="select-list custom-select">
                                    <div className='search-box'>
                                      <div className='search-input-box'>
                                        <i className='icon-ic-search'></i>
                                        <Input type='text'
                                               placeholder='검색어를 입력해주세요.'
                                               className='input-type'
                                               value={trello.input.searchBoardText}
                                               onChange={searcherBoard.change}
                                        ></Input>
                                      </div>
                                    </div>

                                    {/* custom-select-wrap */}
                                    {
                                      trello.input.searchBoardText === '' && (
                                        <div className='custom-select-wrap'>
                                          <ul>
                                            <li><span className='tit'>Board 선택</span></li>
                                          </ul>
                                          <dl className='option-wrap'>
                                            <dt className='tit'></dt>
                                            <dd>
                                              <ul>{
                                                trello.authenticationTrelloBoardsList.boards.map((boardData, boardIndex) => (
                                                  <li key={boardIndex}>
                                                    <a href='#none' onClick={(e) => searcherBoard.select(e, boardData)}>{boardData.name}</a>
                                                  </li>
                                                ))
                                              }</ul>
                                            </dd>
                                          </dl>
                                        </div>
                                      )
                                    }
                                    {/* //custom-select-wrap */}

                                    {/* search-list-wrap 검샋결과가 있을 경우 owner 제외 */}
                                    {
                                      trello.input.searchBoardText !== '' && (
                                        <div className='search-list-wrap'>
                                          {
                                            trello.input.searchBoardFilters.length > 0
                                            && <>
                                              <p className='tit'>{trello.input.searchBoardFilters.length}개의 결과가 있습니다.</p>
                                              <ul>
                                                {
                                                  trello.input.searchBoardFilters.map((boardData, boardIndex) => (
                                                    <li key={boardIndex}>
                                                      <a href='#none' onClick={(e) => searcherBoard.select(e, boardData)}>{boardData.name}</a>
                                                    </li>
                                                  ))
                                                }
                                              </ul>
                                            </>
                                          }
                                          {trello.input.searchBoardFilters.length === 0 && <p className='tit no-result'>결과가 없습니다.</p>}
                                        </div>
                                      )
                                    }
                                    {/* search-list-wrap */}
                                  </div>
                                </div>{/* //select-box */}
                              </div>
                            </dd>
                          </dl>
                          <dl className='row flx-baseline'>
                            <dt>
                              <p className='tit'>메시지 옵션 설정</p>
                              <p className='info'>해당 옵션대로 이벤트가 발생할 때마다 메시지가 수신됩니다.</p>
                            </dt>
                            <dd>
                              <div className='input-row'>
                                <div className='setting-contents'>
                                  <div className='setting-group'>
                                    <p>카드</p>
                                    <ul>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showCardCreated" checked={trello.input.showCardCreated} value="1" name="showCardCreated" readOnly />
                                          <label htmlFor="showCardCreated"><span>카드가 생성되었을 때</span></label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showCardMoved" checked={trello.input.showCardMoved} value="1" name="showCardMoved" readOnly />
                                          <label htmlFor="showCardMoved"><span>카드가 옮겨졌을 때</span></label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showCardRenamed" checked={trello.input.showCardRenamed} value="1" name="showCardRenamed" readOnly />
                                          <label htmlFor="showCardRenamed"><span>카드 이름이 변경되었을 때</span></label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showCardCommentCreated" checked={trello.input.showCardCommentCreated} value="1" name="showCardCommentCreated" readOnly />
                                          <label htmlFor="showCardCommentCreated"><span>코멘트가 카드에 추가되었을 때</span></label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showCardAttachmentCreated" checked={trello.input.showCardAttachmentCreated} value="1" name="showCardAttachmentCreated" readOnly />
                                          <label htmlFor="showCardAttachmentCreated"><span>첨부 파일이 카드에 추가되었을 때</span></label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showCardDescriptionUpdated" checked={trello.input.showCardDescriptionUpdated} value="1" name="showCardDescriptionUpdated" readOnly />
                                          <label htmlFor="showCardDescriptionUpdated"><span>설명(Description)이 변경되었을 때</span></label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showCardDueDateUpdated" checked={trello.input.showCardDueDateUpdated} value="1" name="showCardDueDateUpdated" readOnly />
                                          <label htmlFor="showCardDueDateUpdated"><span>마감일(Due date)이 변경되었을 때</span></label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showCardLabelCreated" checked={trello.input.showCardLabelCreated} value="1" name="showCardLabelCreated" readOnly />
                                          <label htmlFor="showCardLabelCreated"><span>라벨(Label)이 변경되었을 때</span></label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showCardMemberCreated" checked={trello.input.showCardMemberCreated} value="1" name="showCardMemberCreated" readOnly />
                                          <label htmlFor="showCardMemberCreated"><span>카드에 멤버가 추가되었을 때</span></label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showCardArchived" checked={trello.input.showCardArchived} value="1" name="showCardArchived" readOnly />
                                          <label htmlFor="showCardArchived"><span>카드가 archive 또는 unarchive되었을 때</span></label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className='setting-group'>
                                    <p>리스트</p>
                                    <ul>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showListCreated" checked={trello.input.showListCreated} value="1" name="showListCreated" readOnly />
                                          <label htmlFor="showListCreated"><span>리스트가 생성되었을 때</span></label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showListRenamed" checked={trello.input.showListRenamed} value="1" name="showListRenamed" readOnly />
                                          <label htmlFor="showListRenamed"><span>리스트 이름이 바뀌었을 때</span></label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showBoardListFromMoved" checked={trello.input.showBoardListFromMoved} value="1" name="showBoardListFromMoved" readOnly />
                                          <label htmlFor="showBoardListFromMoved"><span>리스트가 다른 보드로 옮겨졌을 때</span></label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showListArchived" checked={trello.input.showListArchived} value="1" name="showListArchived" readOnly />
                                          <label htmlFor="showListArchived"><span>리스트가 archive 또는 unarchive되었을 때</span></label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showBoardRenamed" checked={trello.input.showBoardRenamed} value="1" name="showBoardRenamed" readOnly />
                                          <label htmlFor="showBoardRenamed"><span>보드 이름이 바뀌었을 때</span></label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showBoardMemberCreated" checked={trello.input.showBoardMemberCreated} value="1" name="showBoardMemberCreated" readOnly />
                                          <label htmlFor="showBoardMemberCreated"><span>보드에 멤버가 추가되었을 때</span></label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className='setting-group'>
                                    <p>체크리스트</p>
                                    <ul>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showCardChecklistCreated" checked={trello.input.showCardChecklistCreated} value="1" name="showCardChecklistCreated" readOnly />
                                          <label htmlFor="showCardChecklistCreated"><span>체크리스트가 카드에 추가되었을 때</span></label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showCardChecklistItemCreated" checked={trello.input.showCardChecklistItemCreated} value="1" name="showCardChecklistItemCreated" readOnly />
                                          <label htmlFor="showCardChecklistItemCreated"><span>체크리스트 아이템이 생성되었을 때</span></label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                          <input type="checkbox" id="showCardChecklistItemUpdated" checked={trello.input.showCardChecklistItemUpdated} value="1" name="showCardChecklistItemUpdated" readOnly />
                                          <label htmlFor="showCardChecklistItemUpdated"><span>체크리스트 아이템이 완료(Complete)/미완료(Incomplete)로 될 때</span></label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
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
                                <Thumbnail state={trello} parent={template1} />
                                <Input type="text"
                                       className='input-type'
                                       onChange={(e) => template1.set('botName', e.target.value)}
                                       value={trello.input.botName}
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
                                    <span>{trello.input.selectedTopic}</span>
                                  </a>
                                  <div className="select-list custom-select">
                                    <div className='search-box'>
                                      <div className='search-input-box'>
                                        <i className='icon-ic-search'></i>
                                        <Input type='text'
                                               placeholder='검색어를 입력해주세요.'
                                               className='input-type'
                                               value={trello.input.searchText}
                                               onChange={(e) => searcher.change(e)}
                                        ></Input>
                                      </div>
                                    </div>

                                    {/* custom-select-wrap */}
                                    {
                                      trello.input.searchText === '' && (
                                        <div className='custom-select-wrap'>
                                          <dl className='option-wrap'>
                                            <dt className='tit'>토픽</dt>
                                            <dd>
                                              {
                                                trello.input.searchRooms.map((roomsData, roomsIndex) => (<Fragment key={roomsIndex}>
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
                                      trello.input.searchText !== '' && (
                                        <div className='search-list-wrap'>
                                          {
                                            trello.input.searchFilters.length > 0
                                            && <>
                                              <p className='tit'>{trello.input.searchFilters.length}개의 결과가 있습니다.</p>
                                              <ul>
                                                {
                                                  trello.input.searchFilters.map((roomData, roomIndex) => (
                                                    <li key={roomIndex}>
                                                      <a href='#none' onClick={(e) => searcher.select(e, roomData)}>{roomData.name}</a>
                                                    </li>
                                                  ))
                                                }
                                              </ul>
                                            </>
                                          }
                                          {trello.input.searchFilters.length === 0 && <p className='tit no-result'>결과가 없습니다.</p>}
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
                                  ><span>{trello.input.langText}</span></a>
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
                      <button type='button' className='full-btn' onClick={(e) => template1.connect(e, trello)}>연동 추가하기</button>
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

export default Trello;
