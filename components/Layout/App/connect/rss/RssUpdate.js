/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,react/jsx-no-duplicate-props,guard-for-in,operator-assignment,no-unreachable,object-curly-newline */
import React, {
  useEffect, Fragment,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import { modules } from '../../../../../store/connect/rss/rss';
import { template1 } from '../../../../../service/connect';
import Thumbnail from '../../../../ui/Thumbnail/Thumbnail';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { searcher, searcherLanguage } from '../../../../../service/searcher';
import {deleteConnect, modules as connectModules, updateStatus} from '../../../../../store/connect/connect';

const RssUpdate = () => {
  const connectType = 'rss';
  const dispatch = useDispatch();
  const router = useRouter();
  const { team, rss, user, connect } = useSelector((state) => {
    return state;
  });
  const { creators } = modules;

  useEffect(() => {
    // if (user.rooms.chats.length === 0) return;
    searcher.initialize({
      dispatch,
      document,
      team,
      user,
      rss,
      connectType,
      set: creators.setInputRss,
    });
  }, [user.rooms]);

  useEffect(() => {
    template1.initialize({
      dispatch,
      router,
      connectType,
      modules,
      load: creators.getTeamsRss,
      status: updateStatus,
      connect: [creators.postTeamsRss, creators.putTeamsRssSetting],
      set: creators.setInputRss,
    }, false);
  }, []);

  return (<>
  {/* [D] : 수정하기 */}
  <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_rss.png')} alt="rss"></img></p>
            <div className="info">
              <div><strong>{rss.input.member.name}</strong><span>의 Rss</span></div>
              <p>{rss.input.createdAt}에 생성됨</p></div>
            <div className='connect-right-box'>
              <label className={rss.input.statusClss} labefor="unit">
                <span className='txt'>작동중</span>
                <Input type="checkbox" id=""/>
                <a href="#none" className="slider" onClick={(e) => template1.status(e, rss)}></a>
              </label>
              <button type='button' className='btn-icon' onClick={() => template1.deleteConnect(rss, router)}><i className="icon-ic-delete"></i><span className='hidden'>삭제하기</span></button>
            </div>
          </div>
        </div>
      </div>{/* //detail-header */}

      <div className='detail-content connect'>
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
                <Thumbnail state={rss} parent={template1} />
                <Input type="text"
                       className='input-type'
                       onChange={(e) => template1.set('botName', e.target.value)}
                       value={rss.input.botName}
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
                    <span>{rss.input.selectedTopic}</span>
                  </a>
                  <div className="select-list custom-select">
                    <div className='search-box'>
                      <div className='search-input-box'>
                        <i className='icon-ic-search'></i>
                        <Input type='text'
                               placeholder='검색어를 입력해주세요.'
                               className='input-type'
                               value={rss.input.searchText}
                               onChange={(e) => searcher.change(e)}
                        ></Input>
                      </div>
                    </div>

                    {/* custom-select-wrap */}
                    {
                      rss.input.searchText === '' && (
                        <div className='custom-select-wrap'>
                          <dl className='option-wrap'>
                            <dt className='tit'>토픽</dt>
                            <dd>
                              {
                                rss.input.searchRooms.map((roomsData, roomsIndex) => (<Fragment key={roomsIndex}>
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
                      rss.input.searchText !== '' && (
                        <div className='search-list-wrap'>
                          {
                            rss.input.searchFilters.length > 0
                            && <>
                              <p className='tit'>{rss.input.searchFilters.length}개의 결과가 있습니다.</p>
                              <ul>
                                {
                                  rss.input.searchFilters.map((roomData, roomIndex) => (
                                    <li key={roomIndex}>
                                      <a href='#none' onClick={(e) => searcher.select(e, roomData)}>{roomData.name}</a>
                                    </li>
                                  ))
                                }
                              </ul>
                            </>
                          }
                          {rss.input.searchFilters.length === 0 && <p className='tit no-result'>결과가 없습니다.</p>}
                        </div>
                      )
                    }
                    {/* search-list-wrap */}
                  </div>
                </div>{/* //select-box */}
              </div>
            </dd>
          </dl>
          <dl className='row'>
            <dt>
              <p className='tit'>RSS 주소</p>
              <p className='info'>구독하려는 RSS 주소를 입력해주세요.</p>
            </dt>
            <dd>
              <div className='input-row'>
                <Input type="text"
                       className='input-type'
                       placeholder='URL을 입력해주세요.'
                       value={rss.input.feedUrl}
                       disabled
                ></Input>
              </div>
            </dd>
          </dl>
        </div>
      </div>
      <button type='button' className='full-btn' onClick={(e) => template1.connect(e, rss)}>수정하기</button>
    </div>{/* //detail-wrapper */}
  </div>
</>);
};

export default RssUpdate;
/**
 * TODO: input disabled cursor
 * TODO: load data thumnail set
 * TODO: load data topics set
 */
