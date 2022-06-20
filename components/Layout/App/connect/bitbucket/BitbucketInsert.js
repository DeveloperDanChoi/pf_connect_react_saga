/* eslint-disable max-len */
import React, {useEffect, useState, useRef, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/bitbucket/bitbucket';
import { template1 } from '../../../../../service/connect';
import Thumbnail from "../../../../ui/Thumbnail/Thumbnail";
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';
/* swiper */
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import {modules as connectModules} from "../../../../../store/connect/connect";
import {banner} from "../../../../../service/banner";

SwiperCore.use([ Navigation]);

const Bitbucket = () => {
  const connectType = 'bitbucket';
  const dispatch = useDispatch();
  const router = useRouter();
  const { team, bitbucket, user, connect } = useSelector((state) => {
    return state;
  });
  const [rooms, setRooms] = useState([]);
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
      if(swiperRef.current) {setTimeout(()=> swiperRef.current.swiper.update());} //swiper observer
      e.preventDefault();
      const menu = document.querySelectorAll('.tab-menu li a');
      const content = document.querySelectorAll('.tab-cont');

      for(let i = 0; i < menu.length; i++) {
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
    return { change, disabled, toggle }
  })();


  /* 연동하기 탭 disabled */
  const onDisabledContent = () => {
    document.querySelector('.connect').classList.toggle('disabled');
    document.querySelector('.full-btn').toggleAttribute('disabled');
  };
  //연동 추가하기
  const onClick = (e) => {
    onDisabledContent();
  }

  /**
   * 검색 모듈
   * TODO: 1차 샘플링
   */
  const searcher = ((
      keyward,
      dispatch,
      selects,
      filters) => {
    const open = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const target = e.currentTarget.closest('.select-box');
      const selectBoxs = document.querySelectorAll('.select-box');
      if (target.classList.contains('on')) {
        target.classList.remove('on');
      } else {
        selectBoxs.forEach((selectbox) => selectbox.classList.remove('on'));
        target.classList.add('on');
      }
    };

    /**
     * @deprecated
     */
    function fields() {
      return [
        { value: 0, field: 'member.name', label: '생성자', class: 'on' },
        { value: 1, field: '', label: '연동된 토픽 / JANDI', class: '' },
        { value: 2, field: 'bot.name', label: '커넥트', class: '' },
      ];
    }
    function change(e) {
      keyward[1](e.target.value);

      filters[1]((() => {
        const arr = [];

        for (const topic of user.rooms.topics) {
          if (topic.name.indexOf(e.target.value) > -1) {
            arr.push(topic);
          }
        }

        for (const bot of user.rooms.bots) {
          console.log(bot)
          if (bot.name.indexOf(e.target.value) > -1) {
            for (const chat of user.rooms.chats) {
              if (bot.id === chat.companionId) {
                arr.push(bot);
              }
            }
          }
        }

        return arr;
      })());
    }
    function initialize(document) {
      if (Object.keys(user.rooms).length === 0) return;

      const { folders } = user.rooms;
      const topics = (({topics}) => {
        const newTopics = [];
        for (const topic of topics) {
          newTopics.push({ ...topic, parent: false });
        }
        return newTopics;
      })(user.rooms);
      const newRooms = [];

      for (const folder of folders) {
        newRooms.push({
          ...folder,
          rooms: ((rooms) => {
            const newRooms = [];
            for (const room of rooms) {
              for (const topic of topics) {
                if (room === topic.id) {
                  topic.parent = true;
                  newRooms.push(topic);
                  break;
                }
              }
            }
            return newRooms;
          })(folder.rooms)
        });
      }

      for (const topic of topics) {
        if (!topic.parent) {
          newRooms.push(topic);
        }
      }

      setRooms(newRooms);
    }
    function value() {
      return keyward[0];
    }
    function searchText() {
      return selects[0].searchText;
    }
    function search() {
      const filters = [];
      const searchType = document.querySelector('.select-list .on');
      const query = fields()[searchType.getAttribute('value')].value;

      for (const item of connect.teamsConnect[connectType]) {
        if (query === 0 && item.member && item.member.name && item.member.name.indexOf(keyward[0]) > -1) {
          filters.push(item);
        }
      }
      dispatch(connectModules.creators.setTeamsConnectDetail(filters));
    }
    function select(e, data) {
      e.stopPropagation();
      e.preventDefault();
      const target = e.currentTarget;
      const selectLists = target.closest('.select-list').querySelectorAll('li a');
      const { name } = target.closest('.select-box').firstChild;

      selects[1]({
        ...selects[0],
        [name]: target.innerText,
      });
      selectLists.forEach((list) => list.classList.remove('on'));
      target.classList.toggle('on');
      target.closest('.select-box').classList.toggle('on');

      for (const chat of user.rooms.chats) {
        if (chat.companionId === data.id) {
          template1.set('roomId', chat.id);
          break;
        }
      }
    }
    function filter() {
      return filters[0];
    }
    return {
      initialize,
      fields, open,
      change,
      value,
      search,
      select,
      searchText,
      filter,
    }
  })(useState(''), dispatch, useState({ searchText: '' }), useState([]));
  useEffect(() => {
    searcher.initialize(document);
  }, [user.rooms]);

  useEffect(() => {
    template1.initialize({
      dispatch,
      router,
      connectType: 'bitbucket',
      modules,
      list: creators.getTeamsToken,
      load: creators.getTeamsBitbucket,
      connect: [creators.postTeamsBitbucket, creators.putTeamsBitbucketSetting],
      set: creators.setInputBitbucket,
    });
  }, []);

  return (<>
    {/* [D] : 연동하기 */}
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          { connect.connectsObj[connectType] &&
              <div className='connect-info-box'>
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
            <li><a href='#none' onClick={tab.change} id="2">사용방법</a></li>
            <li><a href='#none' onClick={tab.change} id="3">연동하기</a></li>
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
                            <span>{searcher.searchText() === '' ? '' : searcher.searchText()}</span>
                          </a>
                          <div className="select-list custom-select">
                            <div className='search-box'>
                              <div className='search-input-box'>
                                <i className='icon-ic-search'></i>
                                <Input type='text'
                                       placeholder='검색어를 입력해주세요.'
                                       className='input-type'
                                       value={searcher.value()}
                                       onChange={(e) => searcher.change(e)}
                                ></Input>
                              </div>
                            </div>

                            {/* custom-select-wrap */}
                            {
                                searcher.value() === '' && (
                                    <div className='custom-select-wrap'>
                                      <dl className='option-wrap'>
                                        <dt className='tit'>토픽</dt>
                                        <dd>
                                          {
                                            rooms.map((roomsData, roomsIndex) => (<Fragment key={roomsIndex}>
                                              {roomsData.seq &&
                                                  <div className='folder-group'>
                                                    <div className='folder-tit'><span
                                                        className='icon-ic-folder-open'>{roomsData.name}</span></div>
                                                    <ul>
                                                      {roomsData.rooms.map((roomData, roomIndex) => (<Fragment key={roomIndex}>
                                                        <li><a href='#none' onClick={(e) => searcher.select(e, roomData)}>{roomData.name}</a></li>
                                                      </Fragment>))}
                                                    </ul>
                                                  </div>
                                              }
                                              {!roomsData.seq &&
                                                  <div>
                                                    <ul>
                                                      <li><a href='#none' onClick={(e) => searcher.select(e, roomData)}>{roomsData.name}</a></li>
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
                                searcher.value() !== '' && (
                                    <div className='search-list-wrap'>
                                      {
                                          searcher.filter().length > 0 &&
                                          <>
                                            <p className='tit'>{searcher.filter().length}개의 결과가 있습니다.</p>
                                            <ul>
                                              {
                                                searcher.filter().map((roomData, roomIndex) => (
                                                    <li key={roomIndex}><a href='#none' onClick={(e) => searcher.select(e, roomData)}>{roomData.name}</a></li>
                                                ))
                                              }
                                            </ul>
                                          </>
                                      }
                                      {searcher.filter().length === 0 && <p className='tit no-result'>결과가 없습니다.</p>}
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
                          <a href="#none" title="검색필드 선택" className="select-value" name="langVal" ><span></span></a>
                          <div className="select-list">
                              <ul>
                                <li><a href="#none" className='on'><span>한국어</span></a></li>
                                <li><a href="#none" ><span>English</span></a></li>
                                <li><a href="#none" ><span>日本語</span></a></li>
                                <li><a href="#none" ><span>简体中文</span></a></li>
                                <li><a href="#none" ><span>繁體中文</span></a></li>
                                <li><a href="#none" ><span>Tiếng Việt </span></a></li>
                              </ul>
                          </div>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              {/* [D] : 연동 추가하기 완료될 경우 노출 */}
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
              {/* //[D] : 연동 추가하기 완료될 경우 노출 */}
              <button type='button' className='full-btn' onClick={onClick}>연동 추가하기 (Webhook URL 생성하기)</button>
              <button type='button' className='full-btn' onClick={onClick} disabled>생성 완료 (Webhook URL을 해당 서비스에 등록해주세요)</button>{/* [D] : 연동 추가하기 완료될 경우 */}
            </div>{/* //detail-wrapper */}
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default Bitbucket;
