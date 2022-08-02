/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,react/jsx-no-duplicate-props,guard-for-in,operator-assignment,no-unreachable,object-curly-newline,react/no-unescaped-entities,react/jsx-no-comment-textnodes,space-before-function-paren,array-callback-return */
import React, {
  useEffect, useRef, Fragment,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import SwiperCore, { Navigation } from 'swiper';
import { Input } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { modules, initialModules } from '../../../../../store/connect/bitbucket/bitbucket';
import { template1 } from '../../../../../service/connect';
import Thumbnail from '../../../../ui/Thumbnail/Thumbnail';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { banner } from '../../../../../service/banner';
import { searcher, searcherLanguage } from '../../../../../service/searcher';
import { LANGUAGE2, LANGUAGE3, LANGUAGE4 } from '../../../../../constants/type';
import { util } from '../../../../../service/util';
import 'swiper/css';

SwiperCore.use([Navigation]);

const Bitbucket = () => {
  const connectType = 'bitbucket';
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    team, bitbucket, user, connect,
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

  /* 연동하기 탭 disabled */
  const onDisabledContent = () => {
    document.querySelector('.connect').classList.toggle('disabled');
    document.querySelector('.full-btn').toggleAttribute('disabled');
  };
  const onClick = () => {
    onDisabledContent();
  };

  useEffect(() => {
    template1.initialize({
      dispatch,
      router,
      connectType,
      modules,
      initialModules,
      list: creators.getTeamsToken,
      load: creators.getTeamsBitbucket,
      connect: [creators.postTeamsBitbucket, creators.putTeamsBitbucketSetting],
      set: creators.setInputBitbucket,
    }, false);
  }, []);

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

    // default roomId
    template1.set('roomId', util.initTopic(user.rooms));
    // default language
    template1.set('lang', user.user.account.lang);
    template1.set('langText', LANGUAGE4[user.user.account.lang]);
  }, [user.rooms]);

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
            <li><a onClick={tab.change} id="2">사용방법</a></li>
            <li><a onClick={tab.change} id="3">연동하기</a></li>
          </ul>
        </div>
        <div className='tab-content'>
          <div className='tab-cont on'>
            <div className='detail-content'>
              <div className='info-wrap'>
                <img src={getPublicAssetPath('static/bitbucket/ko/info/img_info.png')} alt="서비스 소개"></img>{/* [D] : static/커넥트명/언어코드/img_info.png */}
                <div className='info-box'>
                  <strong>Bitbucket</strong>
                  <p>Bitbucket Cloud는 Atlassian사의 협업형 Git 솔루션입니다. Bitbucket Cloud를 잔디와 연동하면, Repository의 Commit, Comments, Pull Request와 같은 다양한 변동 사항을 팀 내에서 메시지로 수신할 수 있습니다. <span className='fc-gray'>(참고 : 현재 Bitbucket Cloud만 지원되며, Bitbucket Server는 준비중입니다)</span></p>
                </div>
                <button type='button' onClick={() => banner.help(user)}>더 알아보기<i className='icon-ic-arrow-right-up'></i></button>
              </div>
            </div>
          </div>
          <div className='tab-cont'>
            <div className='detail-content type-swiper'>
              <Swiper
                ref={swiperRef}
                {...swiperOptions}
              >
                <SwiperSlide>
                  <div className='inner-cont'>
                    <img src={getPublicAssetPath('static/bitbucket/ko/contents/img_contents_01.png')} alt="사용방법"></img>{/* [D] : static/커넥트명/언어코드/img_contents.png */}
                    <p className="inner-cont-info"><strong className='badge'>1</strong><span className='txt'>원하는 옵션을 설정한 뒤, <em> 연동 추가하기 (Webhook URL 생성하기)</em> 버튼을 눌러 Webhook URL을 생성해주세요.</span></p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='inner-cont'>
                    <img src={getPublicAssetPath('static/bitbucket/ko/contents/img_contents_02.png')} alt="사용방법"></img>
                    <p className="inner-cont-info"><strong className='badge'>2</strong><span className='txt'>생성된 <em>Webhook URL</em>을 복사해주세요.</span></p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='inner-cont'>
                    <img src={getPublicAssetPath('static/bitbucket/ko/contents/img_contents_03.png')} alt="사용방법"></img>
                    <p className="inner-cont-info"><strong className='badge'>3</strong><span className='txt'>알림을 받기를 원하는 <em>Repository</em>의 설정 화면에서 <em>Webhooks 메뉴</em>를 누르시고 Add webhook 버튼을 클릭해주세요.</span></p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='inner-cont'>
                    <img src={getPublicAssetPath('static/bitbucket/ko/contents/img_contents_04.png')} alt="사용방법"></img>
                    <p className="inner-cont-info"><strong className='badge'>4</strong><span className='txt'>URL란에 잔디 커넥트에서 생성한 <em>Webhook URL</em>을 붙여넣어주세요.</span></p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='inner-cont'>
                    <img src={getPublicAssetPath('static/bitbucket/ko/contents/img_contents_05.png')} alt="사용방법"></img>
                    <p className="inner-cont-info"><strong className='badge'>5</strong><span className='txt'><em>"Choose from a full list of triggers"</em> 옵션을 선택해주세요. Triggers 옵션으로 잔디에서 받고자 하는 <em>이벤트 종류를 선택</em>할 수 있습니다. 설정 완료 후 Save 버튼을 클릭해주세요. </span></p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className='tab-cont'>
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
                                              {/* TODO: icon 적용할 것 */}
                                              <li><a className='on'
                                                     onClick={(e) => searcher.select(e, botData)}>{botData.name}
                                              </a></li>
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
                                                  <a onClick={(e) => searcher.select(e, roomData)}>{roomData.name}</a>
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
                                    <li>
                                      <a className={LANGUAGE3[lang] === bitbucket.input.lang ? 'on' : ''}
                                         onClick={(e) => searcherLanguage.select(e, LANGUAGE2[lang])}>
                                        <span>{lang}</span>
                                      </a>
                                    </li>
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
              {/* [D] : 연동 추가하기 완료될 경우 노출 */}
              { bitbucket.input.webhookUrl !== '' && <>
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
                          <Input type="text" className='input-icon' value={bitbucket.input.webhookUrl} readOnly></Input>
                        </div>
                        <button type='button'>복사</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <button type='button' className='full-btn' onClick={(e) => template1.connect(e, bitbucket)}>생성 완료 (Webhook URL을 해당 서비스에 등록해주세요)</button>{/* [D] : 연동 추가하기 완료될 경우 */}
              </> }
              { bitbucket.input.webhookUrl === '' && <>
              <button type='button' className='full-btn' onClick={() => template1.list(creators.getTeamsToken)}>연동 추가하기 (Webhook URL 생성하기)</button>
              </> }
            </div>{/* //detail-wrapper */}
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default Bitbucket;
/**
 * TODO: 검색어 없을 경우 영역 활성 안되는 문제
 */
