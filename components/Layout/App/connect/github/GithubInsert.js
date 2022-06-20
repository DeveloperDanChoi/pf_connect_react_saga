/* eslint-disable max-len */
import React, {
  useEffect, useRef, Fragment, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import { modules } from '../../../../../store/connect/github/github';
import { template1 } from '../../../../../service/connect';
import Thumbnail from '../../../../ui/Thumbnail/Thumbnail';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { banner } from '../../../../../service/banner';
import { searcher, searcherLanguage } from '../../../../../service/searcher';
import { LANGUAGE2 } from '../../../../../constants/type';

const Github = () => {
  const connectType = 'github';
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    team, github, user, connect,
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

  /* custom check box value */
  const [checkboxs, setCheckboxs] = useState({
    commit: false,
    pullRequest: false,
    issue: false,
    branchTag: false,
    commitComment: false,
    pullRequestComment: false,
    issueComment: false,
    pullRequestReview: false,
  });

  const { commit, pullRequest, issue, branchTag, commitComment, pullRequestComment, issueComment, pullRequestReview } = checkboxs;

  /* custom checkbox */
  const onChangeCheckbox = (e) => {
    e.preventDefault();
    const target = e.currentTarget.querySelector('input');
    setCheckboxs({
      ...checkboxs,
      [target.name]: !target.checked,
    });
  };

  useEffect(() => {
    // if (user.rooms.chats.length === 0) return;

    searcher.initialize({
      dispatch,
      document,
      team,
      user,
      github,
      connectType,
      set: creators.setInputGithub,
    });
    searcherLanguage.initialize({
      dispatch,
      document,
      team,
      user,
      github,
      connectType,
      set: creators.setInputGithub,
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
                <img src={getPublicAssetPath('static/github/ko/info/img_info.png')} alt="서비스 소개"></img>{/* [D] : static/커넥트명/언어코드/img_info.png */}
                <div className='info-box'>
                  <strong>GitHub</strong>
                  <p>Github은 Git 버전 컨트롤 시스템에 기반한 오픈소스 프로젝트를 위한 소셜 저장소입니다.<br/>GitHub을 잔디와 연동하게 되면, Github 브랜치의 Commit, Comments, Pull Request와 같은 다양한 변동 사항을 팀 내에서 메시지로 수신할 수 있습니다.</p>
                </div>
                <button type='button' onClick={() => banner.help(user)}>더 알아보기<i className='icon-ic-arrow-right-up'></i></button>
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
                              <a href="javascript(void:0);:"
                                 title="검색필드 선택"
                                 className="select-value"
                                 name="accoutVal"
                              >
                                {/* [D] : 로딩 시 노출 */}
                                <span>
                                    <div className='loading'>
                                    <span>불러오는 중...</span><div className='loader'><span></span></div>
                                  </div>
                                </span>
                                {/* //[D] : 로딩 case */}
                                <span></span>
                              </a>
                              <div className="select-list account-type">
                                  <ul>
                                    <li><a href="#none" className='on'><span className='icon-ic-user-white'>jandi@tosslab.com</span></a><button type='button' className='btn-delete icon-ic-close'></button></li>
                                    <li><a href="#none" ><span className='icon-ic-user-white'>jandi02@tosslab.com</span></a><button type='button' className='btn-delete icon-ic-close'></button></li>
                                    <li><a href="#none" ><span className='icon-ic-user-white'>jandi03@tosslab.com</span></a><button type='button' className='btn-delete icon-ic-close'></button></li>
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
                            >
                              {/* [D] : 로딩 시 노출 */}
                              {/* <span>
                                  <div className='loading'>
                                  <span>불러오는 중...</span><div className='loader'><span></span></div>
                                </div>
                              </span> */}
                              {/* //[D] : 로딩 case */}
                              <span></span>
                            </a>
                            <div className="select-list custom-select">
                              <div className='search-box'>
                                <div className='search-input-box'>
                                  <i className='icon-ic-search'></i>
                                  <Input type='text'
                                         placeholder='검색어를 입력해주세요.'
                                         className='input-type'
                                  ></Input>
                                </div>
                              </div>

                              {/* custom-select-wrap */}
                              {
                                github.input.searhRepoText === '' && (
                                  <div className='custom-select-wrap'>
                                    <ul>
                                      <li><span className='tit'>Repository 선택</span></li>
                                    </ul>
                                    <dl className='option-wrap'>
                                        <dt className='tit'>tosslab</dt>
                                        <dd>
                                          <ul>
                                            <li><a href='#none'>web_client</a></li>
                                            <li><a href='#none'>web_admin</a></li>
                                            <li><a href='#none'>react_landing</a></li>
                                            <li><a href='#none'>web_client</a></li>
                                            <li><a href='#none'>web_client</a></li>
                                            <li><a href='#none'>web_client</a></li>
                                            <li><a href='#none'>web_client</a></li>
                                            <li><a href='#none'>web_client</a></li>
                                            <li><a href='#none'>web_client</a></li>
                                            <li><a href='#none'>web_client</a></li>
                                          </ul>
                                        </dd>
                                      </dl>
                                      <dl className='option-wrap'>
                                        <dt className='tit'>tosslab2</dt>
                                        <dd></dd>
                                      </dl>
                                  </div>
                                )
                              }
                              {/* //custom-select-wrap */}

                              {/* search-list-wrap */}
                              {
                                github.input.searchRepoText !== '' && (
                                <div className='search-list-wrap'>
                                  <p className='tit'>7개의 결과가 있습니다.</p>
                                  <ul>
                                  <li><a href='#none'>web_client</a></li>
                                  <li><a href='#none'>web_admin</a></li>
                                  <li><a href='#none'>react_landing</a></li>
                                  <li><a href='#none'>web_client</a></li>
                                  <li><a href='#none'>web_client</a></li>
                                  </ul>
                                  <p className='tit no-result'>결과가 없습니다.</p>
                                </div>
                                )
                              }
                              {/* search-list-wrap */}
                            </div>
                          </div>{/* //select-box */}
                          <Input type="text" className='input-type' placeholder='brach(선택사항)'></Input>
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
                            <ul>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="commit" checked={commit} value="1" name="commit"/>
                                  <label htmlFor="commit"><span>Commits</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="pullRequest" checked={pullRequest} value="1" name="pullRequest"/>
                                  <label htmlFor="pullRequest"><span>Pull Requests Opened / Closed</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="issue" checked={issue} value="1" name="issue"/>
                                  <label htmlFor="issue"><span>Issue Opened / Closed</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="branchTag" checked={branchTag} value="1" name="branchTag"/>
                                  <label htmlFor="branchTag"><span>Branch or Tag Created / Deleted</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="commitComment" checked={commitComment} value="1" name="commitComment"/>
                                  <label htmlFor="commitComment"><span>Commit Comments</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="pullRequestComment" checked={pullRequestComment} value="1" name="pullRequestComment"/>
                                  <label htmlFor="pullRequestComment"><span>Pull Request Comments</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="issueComment" checked={issueComment} value="1" name="issueComment"/>
                                  <label htmlFor="issueComment"><span>Issue Comments</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="pullRequestReview" checked={pullRequestReview} value="1" name="pullRequestReview"/>
                                  <label htmlFor="pullRequestReview"><span>Pull Request Review</span></label>
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
                            <img src={getPublicAssetPath('static/icon_github.png')} alt="github"></img>
                            <span>Edit</span>
                          </a>
                          <Input type="text" className='input-type' placeholder='Google 캘린더'></Input>
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
                <button type='button' className='full-btn' disabled>연동 추가하기</button>
              </div>{/* //detail-wrapper */}
            </div>
          </div>
      </div>
    </div>
  </>);
};

export default Github;
