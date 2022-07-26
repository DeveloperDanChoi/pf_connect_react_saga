/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,react/jsx-no-duplicate-props,guard-for-in,operator-assignment,no-unreachable,object-curly-newline,react/no-unescaped-entities,react/jsx-no-comment-textnodes,space-before-function-paren,array-callback-return */
import React, {
  useEffect, Fragment,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import { modules } from '../../../../../store/connect/bitbucket/bitbucket';
import { template1 } from '../../../../../service/connect';
import Thumbnail from '../../../../ui/Thumbnail/Thumbnail';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { searcher, searcherLanguage } from '../../../../../service/searcher';
import { LANGUAGE2 } from '../../../../../constants/type';
import { deleteConnect, updateStatus } from "../../../../../store/connect/connect";

const Bitbucket = () => {
  const connectType = 'bitbucket';
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    team, bitbucket, user, connect,
  } = useSelector((state) => state);
  const { creators } = modules;

  useEffect(() => {
    searcher.initialize({
      dispatch,
      document,
      team,
      user,
      bitbucket,
      connectType,
      set: creators.setInputBitbucket,
    });
    searcherLanguage.initialize({
      dispatch,
      document,
      team,
      user,
      bitbucket,
      connectType,
      set: creators.setInputBitbucket,
    });
  }, [user.rooms]);

  useEffect(() => {
    template1.initialize({
      dispatch,
      router,
      connectType,
      modules,
      list: creators.getTeamsToken,
      load: creators.getTeamsBitbucket,
      status: updateStatus,
      deleteConnect,
      connect: [creators.postTeamsBitbucket, creators.putTeamsBitbucketSetting],
      set: creators.setInputBitbucket,
    }, false);
  }, []);

  return (<>
    {/* [D] : 수정하기 */}
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_bitbucket.png')} alt="bitbucket"></img></p>
            <div className='info'>
              <div><strong>{bitbucket.input.member.name}</strong><span>의 Bitbucket</span></div>
              <p>{bitbucket.input.createdAt}에 생성됨</p>
            </div>
            <div className='connect-right-box'>
              <label className="switch on" labefor="unit">
                <span className='txt'>작동중</span>
                <Input type="checkbox" id=""/>
                <a href="#none" className="slider" onClick={(e) => template1.status(e, bitbucket)}></a>
              </label>
              <button type='button' className='btn-icon' onClick={() => template1.deleteConnect(bitbucket, router)}><i className="icon-ic-delete"></i><span className='hidden'>삭제하기</span></button>
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
                  <Thumbnail state={bitbucket} parent={template1} />
                  <Input type="text"
                         className='input-type'
                         onChange={(e) => template1.set('botName', e.target.value)}
                         value={bitbucket.input.botName}
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
                      <span>{bitbucket.input.selectedTopic}</span>
                    </a>
                    <div className="select-list custom-select">
                      <div className='search-box'>
                        <div className='search-input-box'>
                          <i className='icon-ic-search'></i>
                          <Input type='text'
                                 placeholder='검색어를 입력해주세요.'
                                 className='input-type'
                                 value={bitbucket.input.searchText}
                                 onChange={searcher.change}
                          ></Input>
                        </div>
                      </div>

                      {/* custom-select-wrap */}
                      {
                        bitbucket.input.searchText === '' && (
                          <div className='custom-select-wrap'>
                            <dl className='option-wrap'>
                              <dt className='tit'>토픽</dt>
                              <dd>
                                {
                                  bitbucket.input.searchRooms.map((roomsData, roomsIndex) => (<Fragment key={roomsIndex}>
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
                                        {/* TODO: icon 적용할 것 */}
                                        <li><a href='#none' onClick={(e) => searcher.select(e, botData)}>{botData.name}<i className="icon-ic-lock"></i><i className="icon-ic-board"></i><i className="icon-ic-bell-slash"></i></a></li>
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
                        bitbucket.input.searchText !== '' && (
                          <div className='search-list-wrap'>
                            {
                              bitbucket.input.searchFilters.length > 0
                              && <>
                                <p className='tit'>{bitbucket.input.searchFilters.length}개의 결과가 있습니다.</p>
                                <ul>
                                  {
                                    bitbucket.input.searchFilters.map((roomData, roomIndex) => (
                                      <li key={roomIndex}>
                                        <a href='#none' onClick={(e) => searcher.select(e, roomData)}>{roomData.name}</a>
                                      </li>
                                    ))
                                  }
                                </ul>
                              </>
                            }
                            {bitbucket.input.searchFilters.length === 0 && <p className='tit no-result'>결과가 없습니다.</p>}
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
                    ><span>{bitbucket.input.langText}</span></a>
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
        <div className='connect-row-item webhook'>
          <div className='title'><strong>Webhook URL 등록</strong></div>
          <div className='content'>
            <dl className='row'>
              <dt>
                <p className='tit'>Webhook URL</p>
                <p className='info'>생성된 웹훅 URL을 복사 후, 해당 서비스에 등록해주세요.</p>
              </dt>
              <dd>
                <div className='input-row'>
                  <div className='input-copy-box mgr8'>
                    <i className='icon-ic-contact'></i>
                    <Input type="text" className='input-icon' value={'https://wh.jandi.com/connectd/webhoKE3asfewaqs'} readOnly={true}></Input>
                  </div>
                  <button type='button'>복사</button>
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <button type='button' className='full-btn' onClick={(e) => template1.connect(e, bitbucket)}>수정하기</button>
      </div>{/* //detail-wrapper */}
    </div>
  </>);
};

export default Bitbucket;
