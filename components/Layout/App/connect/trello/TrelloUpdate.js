/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,react/jsx-no-duplicate-props,guard-for-in,operator-assignment,no-unreachable,object-curly-newline */
import React, {
  useEffect, Fragment,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import { modules } from '../../../../../store/connect/trello/trello';
import { template1 } from '../../../../../service/connect';
import Thumbnail from '../../../../ui/Thumbnail/Thumbnail';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import {
  searcher, searcherAuth, searcherLanguage, searcherBoard,
} from '../../../../../service/searcher';
import { LANGUAGE2 } from '../../../../../constants/type';
import { updateStatus } from '../../../../../store/connect/connect';

const Trello = () => {
  const connectType = 'trello';
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    team, trello, user, connect,
  } = useSelector((state) => state);
  const { creators } = modules;

  const onChangeCheckbox = (e) => {
    e.preventDefault();
    const target = e.currentTarget.querySelector('input');
    template1.set(target.name, !trello.input[target.name]);
  };

  useEffect(() => {
    // if (user.rooms.chats.length === 0) return;
    searcher.initialize({
      dispatch,
      document,
      team,
      user,
      trello,
      connectType,
      set: creators.setInputTrello,
    });
    searcherLanguage.initialize({
      dispatch,
      document,
      team,
      user,
      trello,
      connectType,
      set: creators.setInputTrello,
    });
  }, [user.rooms]);

  useEffect(() => {
    template1.initialize({
      dispatch,
      router,
      connectType,
      modules,
      list: creators.getAuthenticationTrelloBoardsList,
      load: creators.getTeamsTrello,
      status: updateStatus,
      connect: [creators.postTeamsTrello, creators.putTeamsTrelloSetting],
      disconnect: creators.deleteAuthentications,
      set: creators.setInputTrello,
    });
  }, []);

  useEffect(() => {
    searcherBoard.initialize({
      dispatch, document, team, user, trello, connectType, set: creators.setInputTrello,
    });
    searcherAuth.initialize({
      dispatch, document, team, user, trello, connectType, set: creators.setInputTrello,
    });

    // template1.set('authenticationId', trello.authenticationtrelloReposList.authenticationId);
    // template1.set('selectedAuthentication', trello.authenticationtrelloReposList.authenticationName);
  }, [trello.authenticationTrelloBoardsList]);

  return (<>
    {/* [D] : 수정하기 */}
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_trello.png')} alt="trello"></img></p>
            <div className='info'>
              <div><strong>{trello.input.member.name}</strong><span>의 Trello</span></div>
              <p>{trello.input.createdAt}에 생성됨</p>
            </div>
            <div className='connect-right-box'>
              <label className={trello.input.statusClss} labefor="unit">
                <span className='txt'>작동중</span>
                <Input type="checkbox" id=""/>
                <a href="#none" className="slider" onClick={(e) => template1.status(e, trello)}></a>
              </label>
              <button type='button' className='btn-icon' onClick={() => template1.deleteConnect(trello, router)}><i className="icon-ic-delete"></i><span className='hidden'>삭제하기</span></button>
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
                    >
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
        <button type='button' className='full-btn' onClick={(e) => template1.connect(e, trello)}>수정하기</button>
      </div>{/* //detail-wrapper */}
    </div>
  </>);
};

export default Trello;
/**
 * TODO: To.sia 계정 리스트 편집 불가 cursor 모양 disabled
 * TODO: To.sia 인증된 계정 버튼 X 라벨 O
 * TODO: 불러오는중.. 노출 안되는 문제
 */
