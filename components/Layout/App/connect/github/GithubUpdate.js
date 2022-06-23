/* eslint-disable max-len,no-restricted-syntax,array-callback-return,consistent-return */
import React, {
  useEffect, Fragment,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import { modules } from '../../../../../store/connect/github/github';
import { template1 } from '../../../../../service/connect';
import Thumbnail from '../../../../ui/Thumbnail/Thumbnail';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import {
  searcher, searcherAuth, searcherLanguage, searcherRepo,
} from '../../../../../service/searcher';
import { LANGUAGE2 } from '../../../../../constants/type';
import { deleteConnect, updateStatus } from '../../../../../store/connect/connect';

const Github = () => {
  const connectType = 'github';
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    team, github, user, connect,
  } = useSelector((state) => state);
  const { creators } = modules;

  const onChangeCheckbox = (e) => {
    e.preventDefault();
    const target = e.currentTarget.querySelector('input');
    template1.set('hookEventChecked', {
      ...github.input.hookEventChecked,
      [target.name]: !target.checked,
    });
  };

  useEffect(() => {
    let events = [];
    for (const hookEvent in github.input.hookEventChecked) {
      if (github.input.hookEventChecked[hookEvent]) {
        for (const item of github.getHookEventList) {
          if (item.id === hookEvent) {
            for (const evt of item.value) {
              events = [...events, evt];
            }
            break;
          }
        }
      }
    }
    template1.set('hookEvent', events);
  }, [github.input.hookEventChecked]);

  useEffect(() => {
    // if (user.rooms.chats.length === 0) return;
    searcher.initialize({
      dispatch, document, team, user, github, connectType, set: creators.setInputGithub,
    });
    searcherLanguage.initialize({
      dispatch, document, team, user, github, connectType, set: creators.setInputGithub,
    });
  }, [user.rooms]);

  useEffect(() => {
    template1.initialize({
      dispatch,
      router,
      connectType: 'github',
      modules,
      list: creators.getAuthenticationGithubReposList,
      load: creators.getTeamsGithub,
      connect: [creators.postTeamsGithub, creators.putTeamsGithubSetting],
      disconnect: creators.deleteAuthentications,
      set: creators.setInputGithub,
    });
  }, []);

  useEffect(() => {
    searcherRepo.initialize({
      dispatch, document, team, user, github, connectType, set: creators.setInputGithub,
    });
    searcherAuth.initialize({
      dispatch, document, team, user, github, connectType, set: creators.setInputGithub,
    });

    template1.set('authenticationId', github.authenticationGithubReposList.authenticationId);
    template1.set('selectedAuthentication', github.authenticationGithubReposList.authenticationName);
  }, [github.authenticationGithubReposList]);

  return (<>
    {/* [D] : 수정하기 */}
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_github.png')} alt="github"></img></p>
            <div className='info'>
                <div><strong>{github.input.member.name}</strong><span>의 Github</span></div>
                <p>{github.input.createdAt}에 생성됨</p>
            </div>
            <div className='connect-right-box'>
              <label className="switch on" labefor="unit">
                <span className='txt'>작동중</span>
                <Input type="checkbox" id=""/>
                <a href="#none" className="slider"></a>
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
                    <a href="javascript(void:0);:"
                       title="검색필드 선택"
                       className="select-value"
                       name="accoutVal"
                    >
                      {
                        (() => {
                          if (github.input.selectedAuthentication === '') {
                            return (<>
                            <span>
                              <div className='loading'>
                                <span>불러오는 중...</span><div className='three_quarters_loader'><span></span></div>
                              </div>
                            </span>
                              <span>&nbsp;</span>
                            </>);
                          }
                          return (<span>{github.input.selectedAuthentication}</span>);
                        })()
                      }
                    </a>
                    <div className="select-list account-type">
                      {
                        connect.authentication.map((authData, authIndex) => {
                          if (authData.id === connectType) {
                            return (<ul key={authIndex}>
                              {
                                authData.datas.map((data, i) => {
                                  if (data.status === 'created') {
                                    return (
                                      <li key={i}>
                                        <a href="#none"
                                           onClick={(e) => searcherAuth.select(e, data)}
                                        >
                                          <span className='icon-ic-user-white'>{data.connectId}</span>
                                        </a>
                                        <button type='button' className='btn-delete icon-ic-close' onClick={(e) => template1.disconnect(e, github.input)}></button>
                                      </li>
                                    );
                                  }
                                })
                              }
                            </ul>);
                          }
                        })
                      }
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
                <p className='tit'>Repository 선택</p>
                <p className='info'>알림을 받고자 하는 Repository/Branch를 선택해주세요.</p>
              </dt>
              <dd>
                <div className='input-row'>
                  <div className="select-box list-type mgr8">
                    <a href="#none"
                       title="검색필드 선택"
                       className="select-value"
                       name='topicVal'
                       onClick={searcherRepo.open}
                    >
                      <span>{github.input.selectedRepo}</span>
                    </a>
                    <div className="select-list custom-select">
                      <div className='search-box'>
                        <div className='search-input-box'>
                          <i className='icon-ic-search'></i>
                          <Input type='text'
                                 placeholder='검색어를 입력해주세요.'
                                 className='input-type'
                                 value={github.input.searchRepoText}
                                 onChange={searcherRepo.change}
                          ></Input>
                        </div>
                      </div>

                      {/* custom-select-wrap */}
                      {
                        github.input.searchRepoText === '' && (
                          <div className='custom-select-wrap'>
                            <ul>
                              <li><span className='tit'>Repository 선택</span></li>
                            </ul>
                            {
                              github.authenticationGithubReposList.repos.map((repoData, reposIndex) => (
                                <dl key={reposIndex} className='option-wrap'>
                                  <dt className='tit'>{repoData.owner}</dt>
                                  <dd>
                                    <ul>
                                      {
                                        repoData.lists.map((listData, listsIndex) => (
                                          <li key={listsIndex}>
                                            <a href='#none' onClick={(e) => searcherRepo.select(e, listData)}>{listData.name}</a>
                                          </li>
                                        ))
                                      }
                                    </ul>
                                  </dd>
                                </dl>
                              ))
                            }
                          </div>
                        )
                      }
                      {/* //custom-select-wrap */}

                      {/* search-list-wrap 검샋결과가 있을 경우 owner 제외 */}
                      {
                        github.input.searchRepoText !== '' && (
                          <div className='search-list-wrap'>
                            {
                              github.input.searchRepoFilters.length > 0
                              && <>
                                <p className='tit'>{github.input.searchRepoFilters.length}개의 결과가 있습니다.</p>
                                <ul>
                                  {
                                    github.input.searchRepoFilters.map((repoData, repoIndex) => (
                                      <li key={repoIndex}>
                                        <a href='#none' onClick={(e) => searcherRepo.select(e, repoData)}>{repoData.name}</a>
                                      </li>
                                    ))
                                  }
                                </ul>
                              </>
                            }
                            {github.input.searchRepoFilters.length === 0 && <p className='tit no-result'>결과가 없습니다.</p>}
                          </div>
                        )
                      }
                      {/* search-list-wrap */}
                    </div>
                  </div>{/* //select-box */}
                  <Input type="text"
                         className='input-type'
                         placeholder='brach(선택사항)'
                         value={github.input.hookBranch}
                         onChange={(e) => template1.set('hookBranch', e.target.value)}
                  ></Input>
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
                    <ul>{
                      github.getHookEventList.map((data, i) => (
                        <li key={i}>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id={data.id} checked={github.input.hookEventChecked[data.id]} name={data.id} readOnly />
                            <label htmlFor={data.id}><span>{data.text}</span></label>
                          </div>
                        </li>
                      ))
                    }</ul>
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
                  <Thumbnail state={github} parent={template1} />
                  <Input type="text"
                         className='input-type'
                         onChange={(e) => template1.set('botName', e.target.value)}
                         value={github.input.botName}
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
                      <span>{github.input.selectedTopic}</span>
                    </a>
                    <div className="select-list custom-select">
                      <div className='search-box'>
                        <div className='search-input-box'>
                          <i className='icon-ic-search'></i>
                          <Input type='text'
                                 placeholder='검색어를 입력해주세요.'
                                 className='input-type'
                                 value={github.input.searchText}
                                 onChange={(e) => searcher.change(e)}
                          ></Input>
                        </div>
                      </div>

                      {/* custom-select-wrap */}
                      {
                        github.input.searchText === '' && (
                          <div className='custom-select-wrap'>
                            <dl className='option-wrap'>
                              <dt className='tit'>토픽</dt>
                              <dd>
                                {
                                  github.input.searchRooms.map((roomsData, roomsIndex) => (<Fragment key={roomsIndex}>
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
                        github.input.searchText !== '' && (
                          <div className='search-list-wrap'>
                            {
                              github.input.searchFilters.length > 0
                              && <>
                                <p className='tit'>{github.input.searchFilters.length}개의 결과가 있습니다.</p>
                                <ul>
                                  {
                                    github.input.searchFilters.map((roomData, roomIndex) => (
                                      <li key={roomIndex}>
                                        <a href='#none' onClick={(e) => searcher.select(e, roomData)}>{roomData.name}</a>
                                      </li>
                                    ))
                                  }
                                </ul>
                              </>
                            }
                            {github.input.searchFilters.length === 0 && <p className='tit no-result'>결과가 없습니다.</p>}
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
                    ><span>{github.input.langText}</span></a>
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
        {/* disabled */}
        <button type='button' className='full-btn' onClick={(e) => template1.connect(e, github)}>수정하기</button>
      </div>{/* //detail-wrapper */}
    </div>
  </>);
};

export default Github;
/**
 * TODO: To.sia 계정 리스트 편집 불가 cursor 모양 disabled
 * TODO: To.sia 인증된 계정 버튼 X 라벨 O
 */
