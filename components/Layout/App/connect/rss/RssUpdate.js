/* eslint-disable max-len */
import React, {useEffect, useState, useRef, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/rss/rss';
import { template1 } from '../../../../../service/connect';
import Thumbnail from "../../../../ui/Thumbnail/Thumbnail";
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';
import { banner } from '../../../../../service/banner';
import {deleteConnect, modules as connectModules, updateStatus} from '../../../../../store/connect/connect';

const RssUpdate = () => {
  const connectType = 'rss';
  const dispatch = useDispatch();
  const router = useRouter();
  const { team, rss, user, connect } = useSelector((state) => {
    return state;
  });
  const [rooms, setRooms] = useState([]);
  const { creators } = modules;


  /** variable - checkbox,selectbox,swiper ...  **/
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

      // load
      for (const topic of topics) {
        console.log( topic , rss.input.roomId )
        if (topic.id === rss.input.roomId) {
          const loadTarget = document.querySelectorAll('.custom-select-wrap a');
          for (const target of loadTarget) {
            console.log( target )
          }
          // select(loadTarget, data);
          break;
        }
      }
      for (const chat of user.rooms.chats) {
        console.log( chat , rss.input.roomId )
        if (chat.id === rss.input.roomId) {
          for (const bot of user.rooms.bots) {
            if (chat.companionId === bot.id) {
              console.log('call!!')
              const loadTarget = document.querySelectorAll('.custom-select-wrap a');
              for (const target of loadTarget) {
                if (bot.name === target.textContent) {
                  select({currentTarget: target}, bot);
                  break;
                }
              }
              break;
            }
          }
          break;
        }
      }
      // select(e, data);
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
      if (e.type) {
        e.stopPropagation();
        e.preventDefault();
      }
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


  const handleToggleStatus = (e) => {
    const data = {
      teamId: team.teamId,
      id: rss.teamsRss.id,
      status: e.target.closest('.switch').classList.contains('on') ? 'enabled' : 'disabled',
      type: 'rss',
    };
    console.log(data);
    dispatch(updateStatus(data));
    // e.target.closest('.switch').classList.toggle('on');
    // TODO: remove
    template1.set('statusClss', e.target.closest('.switch').classList.contains('on') ? 'switch' : 'switch on');
  };
  const deletedConnect = () => {
    // TODO: 삭제할 때 confirm
    const data = {...rss.teamsRss, type: connectType};
    dispatch(deleteConnect(data));
  };
  useEffect(() => {
    template1.initialize({
      dispatch,
      router,
      connectType: 'rss',
      modules,
      load: creators.getTeamsRss,
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
              <div><strong>{rss.input.memberName}</strong><span>의 Rss</span></div>
              <p>{rss.input.createAt}에 생성됨</p></div>
            <div className='connect-right-box'>
              <label className={rss.input.statusClss} labefor="unit">
                <span className='txt'>작동중</span>
                <Input type="checkbox" id=""/>
                <a href="#none" className="slider" onClick={(e) => handleToggleStatus(e)}></a>
              </label>
              <button type='button' className='btn-icon' onClick={deletedConnect}><i className="icon-ic-delete"></i><span className='hidden'>삭제하기</span></button>
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
                         onChange={(e) => template1.set('feedUrl', e.target.value)}
                         value={rss.input.feedUrl}
                         disabled='disabled'
                  ></Input>
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <button type='button' className='full-btn' onClick={(e) => template1.connect(e, { rss })}>연동 추가하기</button>
      </div>{/* //detail-wrapper */}
  </div>
</>);
};

export default RssUpdate;
/**
 * TODO: input disabled cursor
 * TODO: load data thumnail set
 * TODO: load data topics set
 * TODO: load data creator set
 * TODO: load data createdAt set
 */