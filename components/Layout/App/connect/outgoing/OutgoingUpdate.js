/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,react/jsx-no-duplicate-props,guard-for-in,operator-assignment,no-unreachable,object-curly-newline */
import React, {
  useEffect, useState, useRef, Fragment,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import { modules } from '../../../../../store/connect/outgoing/outgoing';
import { template1 } from '../../../../../service/connect';
import Thumbnail from '../../../../ui/Thumbnail/Thumbnail';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { searcher, searcherLanguage } from '../../../../../service/searcher';
import { updateStatus } from "../../../../../store/connect/connect";

const Outgoing = () => {
  const connectType = 'outgoing';
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    team, outgoing, user, connect,
  } = useSelector((state) => state);
  const { creators } = modules;

  useEffect(() => {
    // if (user.rooms.chats.length === 0) return;
    searcher.initialize({
      dispatch,
      document,
      team,
      user,
      outgoing,
      connectType,
      set: creators.setInputOutgoing,
    });
  }, [user.rooms]);

  useEffect(() => {
    template1.initialize({
      dispatch,
      router,
      connectType,
      modules,
      list: creators.getTeamsToken,
      load: creators.getTeamsOutgoing,
      status: updateStatus,
      connect: [creators.postTeamsOutgoing, creators.putTeamsOutgoingSetting],
      set: creators.setInputOutgoing,
    });
  }, []);

  return (<>
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_webhook.png')} alt="webhook"></img></p>
            <div className='info'>
              <div><strong>{outgoing.input.member.name}</strong><span>의 Webhook 발신 (Outgoing Webhook)</span></div>
              <p>{outgoing.input.createdAt}에 생성됨</p>
            </div>
            <div className='connect-right-box'>
              <label className="switch on" labefor="unit">
                <span className='txt'>작동중</span>
                <Input type="checkbox" id=""/>
                <a href="#none" className="slider" onClick={(e) => template1.status(e, outgoing)}></a>
              </label>
              <button type='button' className='btn-icon' onClick={() => template1.deleteConnect(outgoing, router)}><i className="icon-ic-delete"></i><span className='hidden'>삭제하기</span></button>
            </div>
          </div>
        </div>
      </div>{/* //detail-header */}
      <div className='detail-content connect'>
        <div className='connect-row-item'>
          <div className='title'><strong>서비스 설정</strong></div>
          <div className='content'>
            <dl className='row'>
              <dt>
                <p className='tit'>시작 키워드 입력</p>
                <p className='info'>입력한 키워드로 시작하는 메시지에 한해 Webhook을 전달합니다. 파일, 투표 또는 댓글에는 적용되지 않습니다. (특수 문자, 공백은 입력할 수 없으며, 각 언어 별 자연어 또는 숫자만 가능합니다)</p>
              </dt>
              <dd>
                <div className='input-row'>
                  <Input type="text"
                         className='input-type'
                         placeholder='키워드를 입력해주세요. (1개만 설정가능합니다.)'
                         value={outgoing.input.keyword}
                         onChange={(e) => template1.set('keyword', e.target.value)}
                  ></Input>
                </div>
              </dd>
            </dl>
            <dl className='row'>
              <dt>
                <p className='tit'>토큰</p>
                <p className='info'>Webhook 발송 시 페이로드에 토큰이 추가되어 전달됩니다.<br/>Webhook 수신 시 인증용으로 사용하실 수 있습니다.</p>
              </dt>
              <dd>
                <div className='input-row'>
                  <div className='input-copy-box mgr8'>
                    <Input type="text" className='input-icon' value={'a7f1bf14120ce43ba9545ask45asd'} readOnly={true}></Input>
                  </div>
                  <button type='button' className='mgr8'>복사</button>
                  <button type='button'>다시 생성하기</button>
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
                  <Thumbnail state={outgoing} parent={template1} />
                  <Input type="text"
                         className='input-type'
                         onChange={(e) => template1.set('botName', e.target.value)}
                         value={outgoing.input.botName}
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
                      <span>{outgoing.input.selectedTopic}</span>
                    </a>
                    <div className="select-list custom-select">
                      <div className='search-box'>
                        <div className='search-input-box'>
                          <i className='icon-ic-search'></i>
                          <Input type='text'
                                 placeholder='검색어를 입력해주세요.'
                                 className='input-type'
                                 value={outgoing.input.searchText}
                                 onChange={(e) => searcher.change(e)}
                          ></Input>
                        </div>
                      </div>

                      {/* custom-select-wrap */}
                      {
                        outgoing.input.searchText === '' && (
                          <div className='custom-select-wrap'>
                            <dl className='option-wrap'>
                              <dt className='tit'>토픽</dt>
                              <dd>
                                {
                                  outgoing.input.searchRooms.map((roomsData, roomsIndex) => (<Fragment key={roomsIndex}>
                                    {roomsData.seq
                                    && <div className='folder-group'>
                                      <div className='folder-tit'>
                                        <span className='icon-ic-folder-open'>{roomsData.name}</span>
                                      </div>
                                      <ul>
                                        {roomsData.rooms.map((roomData, roomIndex) => (<Fragment key={roomIndex}>
                                          <li><a onClick={(e) => searcher.select(e, roomData)}>{roomData.name}</a></li>
                                        </Fragment>))}
                                      </ul>
                                    </div>
                                    }
                                    {!roomsData.seq
                                    && <div>
                                      <ul>
                                        <li><a onClick={(e) => searcher.select(e, roomsData)}>{roomsData.name}</a></li>
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
                                        <li><a onClick={(e) => searcher.select(e, botData)}>{botData.name}</a></li>
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
                        outgoing.input.searchText !== '' && (
                          <div className='search-list-wrap'>
                            {
                              outgoing.input.searchFilters.length > 0
                              && <>
                                <p className='tit'>{outgoing.input.searchFilters.length}개의 결과가 있습니다.</p>
                                <ul>
                                  {
                                    outgoing.input.searchFilters.map((roomData, roomIndex) => (
                                      <li key={roomIndex}>
                                        <a onClick={(e) => searcher.select(e, roomData)}>{roomData.name}</a>
                                      </li>
                                    ))
                                  }
                                </ul>
                              </>
                            }
                            {outgoing.input.searchFilters.length === 0 && <p className='tit no-result'>결과가 없습니다.</p>}
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
                <p className='tit'>URL </p>
                <p className='info'>잔디에서 발송되는 Webhook을 수신할 대상 URL을 입력해주세요.</p>
              </dt>
              <dd>
                <div className='input-row'>
                  <Input type='text'
                         placeholder='URL을 입력해주세요.'
                         className='input-type'
                         value={outgoing.input.webhookUrl}
                         onChange={(e) => template1.set('webhookUrl', e.target.value)}
                  ></Input>
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <button type='button' className='full-btn' onClick={(e) => template1.connect(e, outgoing)}>수정하기</button>
      </div>{/* //detail-wrapper */}
    </div>
  </>);
};

export default Outgoing;
