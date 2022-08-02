/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,react/jsx-no-duplicate-props,guard-for-in,operator-assignment,no-unreachable,object-curly-newline,react/no-unescaped-entities,react/jsx-no-comment-textnodes,space-before-function-paren,array-callback-return */
import React, {
  useEffect, useRef, Fragment,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import { modules } from '../../../../../store/connect/figma/figma';
import { template1 } from '../../../../../service/connect';
import Thumbnail from '../../../../ui/Thumbnail/Thumbnail';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { banner } from '../../../../../service/banner';
import {
  searcher, searcherAuth, searcherLanguage, searcherRepo,
} from '../../../../../service/searcher';
import { LANGUAGE2 } from '../../../../../constants/type';

const Figma = () => {
  const connectType = 'figma';
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    team, figma, user, connect,
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
    // shouldSwiperUpdate: false,
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
    template1.set('hookEventChecked', {
      ...figma.input.hookEventChecked,
      [target.name]: !target.checked,
    });
  };

  useEffect(() => {
    if (user.rooms.chats.length === 0) return;
    searcher.initialize({
      dispatch, document, team, user, figma, connectType, set: creators.setInputFigma,
    });
    searcherLanguage.initialize({
      dispatch, document, team, user, figma, connectType, set: creators.setInputFigma,
    });
  }, [user.rooms]);

  useEffect(() => {
    template1.initialize({
      dispatch,
      router,
      connectType: 'figma',
      modules,
      load: creators.getTeamsFigma,
      connect: [creators.postTeamsFigma, creators.putTeamsFigmaSetting],
      disconnect: creators.deleteAuthentications,
      set: creators.setInputFigma,
    }, false);
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
            <li><a onClick={tab.change} id="1" className='on'>서비스 소개</a></li>
            <li><a onClick={tab.change} id="2">연동하기</a></li>
          </ul>
        </div>
        <div className='tab-content'>
          <div className='tab-cont on'>
            <div className='detail-content'>
              <div className='info-wrap'>
                <img src={getPublicAssetPath('static/figma/ko/info/img_info.png')} alt="서비스 소개"></img>{/* [D] : static/커넥트명/언어코드/img_info.png */}
                <div className='info-box'>
                  <strong>figma</strong>
                  <p>figma은 Git 버전 컨트롤 시스템에 기반한 오픈소스 프로젝트를 위한 소셜 저장소입니다.<br/>figma을 잔디와 연동하게 되면, figma 브랜치의 Commit, Comments, Pull Request와 같은 다양한 변동 사항을 팀 내에서 메시지로 수신할 수 있습니다.</p>
                </div>
                <button type='button' onClick={() => banner.help(user)}>더 알아보기<i className='icon-ic-arrow-right-up'></i></button>
              </div>
            </div>
          </div>
          <div className='tab-cont'>
              <div className='detail-content connect'>
                {/* [D] : 계정 인증 전 case */}
                { figma.input.authenticationId === '' && <>
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
                </>}
                {/* [D] : 계정 인증 후 case */}
                {figma.input.authenticationId !== '' && <>
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
                          <span>인증된 계정</span>
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
                              <span>{figma.input.selectedAuthentication}</span>
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
                                                <button type='button' className='btn-delete icon-ic-close' onClick={(e) => template1.disconnect(e, figma.input)}></button>
                                              </li>
                                            );
                                          }
                                        })
                                      }
                                      {/* figma 1계정*/}
                                      {/*<li><a href="#none"><span className='icon-ic-user-add'>계정 추가하기</span></a></li>*/}
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
                  <div className='title'><strong>커넥트 설정</strong></div>
                  <div className='content'>
                    <dl className='row'>
                      <dt>
                        <p className='tit'>프로필 설정</p>
                        <p className='info'>팀 내에서 이 커넥트 항목이 메시지를 보낼 때의 프로필 이미지와 이름을 지정하실 수 있습니다.</p>
                      </dt>
                      <dd>
                        <div className='input-row'>
                          <Thumbnail state={figma} parent={template1} />
                          <Input type="text"
                                 className='input-type'
                                 onChange={(e) => template1.set('botName', e.target.value)}
                                 value={figma.input.botName}
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
                              <span>{figma.input.selectedTopic}</span>
                            </a>
                            <div className="select-list custom-select">
                              <div className='search-box'>
                                <div className='search-input-box'>
                                  <i className='icon-ic-search'></i>
                                  <Input type='text'
                                         placeholder='검색어를 입력해주세요.'
                                         className='input-type'
                                         value={figma.input.searchText}
                                         onChange={(e) => searcher.change(e)}
                                  ></Input>
                                </div>
                              </div>

                              {/* custom-select-wrap */}
                              {
                                figma.input.searchText === '' && (
                                  <div className='custom-select-wrap'>
                                    <dl className='option-wrap'>
                                      <dt className='tit'>토픽</dt>
                                      <dd>
                                        {
                                          figma.input.searchRooms.map((roomsData, roomsIndex) => (<Fragment key={roomsIndex}>
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
                                figma.input.searchText !== '' && (
                                  <div className='search-list-wrap'>
                                    {
                                      figma.input.searchFilters.length > 0
                                      && <>
                                        <p className='tit'>{figma.input.searchFilters.length}개의 결과가 있습니다.</p>
                                        <ul>
                                          {
                                            figma.input.searchFilters.map((roomData, roomIndex) => (
                                              <li key={roomIndex}>
                                                <a onClick={(e) => searcher.select(e, roomData)}>{roomData.name}</a>
                                              </li>
                                            ))
                                          }
                                        </ul>
                                      </>
                                    }
                                    {figma.input.searchFilters.length === 0 && <p className='tit no-result'>결과가 없습니다.</p>}
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
                            ><span>{figma.input.langText}</span></a>
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
                <button type='button' className='full-btn' onClick={(e) => template1.connect(e, figma)}>연동 추가하기</button>
              </>}
              </div>{/* //detail-wrapper */}
            </div>
          </div>
      </div>
    </div>
  </>);
};

export default Figma;
/**
 * TODO: 인증된 계정 button cursor
 */
