/* eslint-disable max-len */
import React, { useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/trello/trello';
import { template1 } from '../../../../../service/connect';
import Thumbnail from "../../../../ui/Thumbnail/Thumbnail";
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';

const Trello = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { team, trello } = useSelector((state) => {
    // console.log('Trello state !!', state);
    return state;
  });
  const { creators } = modules;

  /*==== UI ====*/
  
  /** variable - checkbox,selectbox,swiper ...  **/
  const [searchVal, setSearchVal] = useState(''); /* [D] 임시 */
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
  const [checkboxs, setCheckboxs] = useState({
    card_01: false,
    card_02: false,
    card_03: false,
    card_04: false,
    card_05: false,
    card_06: false,
    card_07: false,
    card_08: false,
    card_09: false,
    card_10: false,
    list_01: false,
    list_02: false,
    list_03: false,
    list_04: false,
    list_05: false,
    list_06: false,
    chklist_01: false,
    chklist_02: false,
    chklist_03: false,
  });
  /* custom select box value */
  const [selects, setSelects] = useState({
    langVal: '',
    topicVal: '',
    accoutVal: '',
    boardVal: '',
  });

  const { langVal, topicVal, accoutVal, boardVal } = selects;
  const { card_01, card_02, card_03, card_04, card_05, card_06, card_07, card_08, card_09, card_10, list_01, list_02, list_03, list_04, list_05, list_06, chklist_01, chklist_02, chklist_03 } = checkboxs;

  /** (s)common function  **/

  /* custom checkbox */
  const onChangeCheckbox = (e) => {
    e.preventDefault();
    const target = e.currentTarget.querySelector('input');
    setCheckboxs({
      ...checkboxs,
      [target.name]: !target.checked,
    });
  };

  /* (s) custom select */
  const onSelect = (e) => {
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
  /* custom select - select option */
  const onChangeSelect = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const target = e.currentTarget;
    const selectLists = target.closest('.select-list').querySelectorAll('li a');
    const { name } = target.closest('.select-box').firstChild;

    setSelects({
      ...selects,
      [name]: target.innerText,
    });
    selectLists.forEach((list) => list.classList.remove('on'));
    target.classList.toggle('on');
    target.closest('.select-box').classList.toggle('on');
  };
  useEffect(() => {
    const selectBoxs = document.querySelectorAll('.select-box');
    document.querySelector('body').addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.closest('.select-box') === null) {
        selectBoxs.forEach((selectbox) => {
          if (selectbox.classList.contains('on')) { selectbox.classList.toggle('on'); }
        });
      }
    });
  }, []);
  /* (e) custom select */

  /* tab */
  const onTabChange = (e) => {
    if(swiperRef.current) {setTimeout(()=> swiperRef.current.swiper.update());} //swiper observer
    e.preventDefault();
    const menu = document.querySelectorAll('.tab-menu li a');
    const content = document.querySelectorAll('.tab-cont');

    for(let i = 0; i < menu.length; i++) {
      content[i].classList.remove('on');
      menu[i].classList.remove('on');
    }
    content[e.currentTarget.id - 1].classList.add('on');
    e.currentTarget.classList.add('on');
  };
  /* 연동하기 탭 disabled */
  const onDisabledContent = () => {
    document.querySelector('.connect').classList.toggle('disabled');
    document.querySelector('.full-btn').toggleAttribute('disabled');
  };
  /* switch toggle */
  const onToggle = (e) => {
    e.target.closest('.switch').classList.toggle('on');
    onDisabledContent();
  };
  /** (e)common function  **/

  /*==== UI ====*/
  useEffect(() => {
    template1.initialize({
      dispatch,
      router,
      connectType: 'trello',
      modules,
      list: creators.getAuthenticationTrelloBoardsList,
      load: creators.getTeamsTrello,
      connect: [creators.postTeamsTrello, creators.putTeamsTrelloSetting],
      disconnect: creators.deleteAuthentications,
      set: creators.setInputTrello,
    });
  }, []);

  return (<>
    {/* [D] : 연동하기 */}
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_trello.png')} alt="trello"></img></p>
            <div className='info'>
                <strong>Trello</strong>
                <p>프로젝트 관리, 생산성</p>
            </div>
          </div>
        </div>
      </div>{/* //detail-header */}
      <div className='tab-container'>
        <div className='tab-menu'>
          <ul>
            <li><a href='#none' onClick={onTabChange} id="1" className='on'>서비스 소개</a></li>
            <li><a href='#none' onClick={onTabChange} id="2">연동하기</a></li>
          </ul>
        </div>
        <div className='tab-content'>
          <div className='tab-cont on'>
            <div className='detail-content'>
              <div className='info-wrap'>
                <img src={getPublicAssetPath('static/trello/ko/info/img_info.png')} alt="서비스 소개"></img>{/* [D] : static/커넥트명/언어코드/img_info.png */}
                <div className='info-box'>
                  <strong>Trello</strong>
                  <p>Trello는 인터랙티브한 방식으로 할 일 관리를 할 수 있는 협업툴입니다.<br/>Trello를 잔디와 연동하게 되면, 각 카드나 보드의 변동 사항을 잔디 팀 내에서 메시지로 받을 수 있습니다.</p>
                </div>
                <button type='button'>더 알아보기<i className='icon-ic-arrow-right-up'></i></button>
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
                <div className='title'><strong>서비스 설정</strong></div>
                <div className='content'>
                  <dl className='row'>
                    <dt>
                      <p className='tit'>Board 선택</p>
                      <p className='info'>알림을 받고자 하는 보드(Board)를 선택해주세요.</p>
                    </dt>
                    <dd>
                      <div className='input-row'>
                        <div className="select-box list-type mgr8 type-full">
                          <a href="#none" title="검색필드 선택" className="select-value" name='boardVal' onClick={onSelect}><span>{boardVal === '' ? 'Board 선택' : boardVal}</span></a>
                          <div className="select-list custom-select">
                            <div className='search-box'>
                              <div className='search-input-box'>
                                <i className='icon-ic-search'></i>
                                <Input type='text' placeholder='검색어를 입력해주세요.' value={searchVal} className='input-type' onChange={(e) => setSearchVal(e.currentTarget.value)}></Input>
                              </div>
                            </div>

                            {/* custom-select-wrap */}
                            {
                              !searchVal && (
                                <div className='custom-select-wrap'>
                                  <ul>
                                    <li><span className='tit'>Board 선택</span></li>
                                  </ul>
                                  <dl className='option-wrap'>
                                    <dt className='tit'></dt>
                                    <dd>
                                      <ul>
                                        <li><a href='#none' onClick={onChangeSelect}>보드111111111</a></li>
                                        <li><a href='#none' onClick={onChangeSelect}>보드111111111</a></li>
                                      </ul>
                                    </dd>
                                  </dl>
                                </div>
                              )
                            }
                            {/* //custom-select-wrap */}

                            {/* search-list-wrap */}
                            {
                              searchVal && (
                              <div className='search-list-wrap'>
                                <p className='tit'>7개의 결과가 있습니다.</p>
                                <ul>
                                  <li><a href='#none' onClick={onChangeSelect}>보드111111111</a></li>
                                  <li><a href='#none' onClick={onChangeSelect}>보드111111111</a></li>
                                </ul>
                                <p className='tit no-result'>결과가 없습니다.</p>
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
                                  <input type="checkbox" id="card_01" checked={card_01} value="1" name="card_01"/>
                                  <label htmlFor="card_01"><span>카드가 생성되었을 때</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="card_02" checked={card_02} value="1" name="card_02"/>
                                  <label htmlFor="card_02"><span>카드가 옮겨졌을 때</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="card_03" checked={card_03} value="1" name="card_03"/>
                                  <label htmlFor="card_03"><span>카드 이름이 변경되었을 때</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="card_04" checked={card_04} value="1" name="card_04"/>
                                  <label htmlFor="card_04"><span>코멘트가 카드에 추가되었을 때</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="card_05" checked={card_05} value="1" name="card_05"/>
                                  <label htmlFor="card_05"><span>첨부 파일이 카드에 추가되었을 때</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="card_06" checked={card_06} value="1" name="card_06"/>
                                  <label htmlFor="card_06"><span>설명(Description)이 변경되었을 때</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="card_07" checked={card_07} value="1" name="card_07"/>
                                  <label htmlFor="card_07"><span>마감일(Due date)이 변경되었을 때</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="card_08" checked={card_08} value="1" name="card_08"/>
                                  <label htmlFor="card_08"><span>라벨(Label)이 변경되었을 때</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="card_09" checked={card_09} value="1" name="card_09"/>
                                  <label htmlFor="card_09"><span>카드에 멤버가 추가되었을 때</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="card_10" checked={card_10} value="1" name="card_10"/>
                                  <label htmlFor="card_10"><span>카드가 archive 또는 unarchive되었을 때</span></label>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className='setting-group'>
                            <p>리스트</p>
                            <ul>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="list_01" checked={list_01} value="1" name="list_01"/>
                                  <label htmlFor="list_01"><span>리스트가 생성되었을 때</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="list_02" checked={list_02} value="1" name="list_02"/>
                                  <label htmlFor="list_02"><span>리스트 이름이 바뀌었을 때</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="list_03" checked={list_03} value="1" name="list_03"/>
                                  <label htmlFor="list_03"><span>리스트가 다른 보드로 옮겨졌을 때</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="list_04" checked={list_04} value="1" name="list_04"/>
                                  <label htmlFor="list_04"><span>리스트가 archive 또는 unarchive되었을 때</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="list_05" checked={list_05} value="1" name="list_05"/>
                                  <label htmlFor="list_05"><span>보드 이름이 바뀌었을 때</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="list_06" checked={list_06} value="1" name="list_06"/>
                                  <label htmlFor="list_06"><span>보드에 멤버가 추가되었을 때</span></label>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className='setting-group'>
                            <p>체크리스트</p>
                            <ul>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="chklist_01" checked={chklist_01} value="1" name="chklist_01"/>
                                  <label htmlFor="chklist_01"><span>체크리스트가 카드에 추가되었을 때</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="chklist_02" checked={chklist_02} value="1" name="chklist_02"/>
                                  <label htmlFor="chklist_02"><span>체크리스트 아이템이 생성되었을 때</span></label>
                                </div>
                              </li>
                              <li>
                                <div className='custom-checkbox' onClick={onChangeCheckbox}>
                                  <input type="checkbox" id="chklist_03" checked={chklist_03} value="1" name="chklist_03"/>
                                  <label htmlFor="chklist_03"><span>체크리스트 아이템이 완료(Complete)/미완료(Incomplete)로 될 때</span></label>
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
                        <a href='#none' className='btn-profile'>
                          <img src={getPublicAssetPath('static/icon_trello.png')} alt="trello"></img>
                          <span>Edit</span>
                        </a>
                        <Input type="text" className='input-type'></Input>
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
                          <a href="#none" title="검색필드 선택" className="select-value fc-green" name='topicVal' onClick={onSelect}><span>{topicVal === '' ? '그룹에 속한 대화방 1' : topicVal}</span></a>
                          <div className="select-list custom-select">
                            <div className='search-box'>
                              <div className='search-input-box'>
                                <i className='icon-ic-search'></i>
                                <Input type='text' placeholder='검색어를 입력해주세요.' value={searchVal} className='input-type' onChange={(e) => setSearchVal(e.currentTarget.value)}></Input>
                              </div>
                            </div>

                            {/* custom-select-wrap */}
                            {
                              !searchVal && (
                                <div className='custom-select-wrap'>
                                  <dl className='option-wrap'>
                                    <dt className='tit'>토픽</dt>
                                    <dd>
                                      <div className='folder-group'>
                                        <div className='folder-tit'><span className='icon-ic-folder-open'>새폴더</span></div>
                                        <ul>
                                          <li><a href='#none' onClick={onChangeSelect} className='on'>그룹에 속한 대화방 1</a></li>
                                          <li><a href='#none' onClick={onChangeSelect}>그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2</a></li>
                                        </ul>
                                      </div>
                                      <div className='folder-group'>
                                        <div className='folder-tit'><span className='icon-ic-folder-open'>새폴더</span></div>
                                        <ul>
                                          <li><a href='#none' onClick={onChangeSelect}>그룹에 속한 대화방 11</a></li>
                                          <li><a href='#none' onClick={onChangeSelect}>그룹에 속한 대화방 12</a></li>
                                        </ul>
                                      </div>
                                      <div className=''>{/* [D]: 그룹 아닐 경우 folder-group 제거*/}
                                        <ul>
                                          <li><a href='#none' onClick={onChangeSelect}>구룹아냐</a></li>
                                          <li><a href='#none' onClick={onChangeSelect}>구룹아닌방</a></li>
                                        </ul>
                                      </div>
                                    </dd>
                                  </dl>
                                  <dl className='option-wrap'>
                                    <dt className='tit'>채팅</dt>
                                    <dd>
                                      <div className='folder-group'>
                                        <div className='folder-tit'><span className='icon-ic-folder-open'>새폴더</span></div>
                                        <ul>
                                          <li><a href='#none'>모든 대화방<i className="icon-ic-lock"></i><i className="icon-ic-bell-slash"></i></a></li>
                                          <li><a href='#none'>참여한 대화방<i className="icon-ic-board"></i><i className="icon-ic-bell-slash"></i></a></li>
                                        </ul>
                                      </div>
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

                            {/* search-list-wrap */}
                            {
                              searchVal && (
                              <div className='search-list-wrap'>
                                <p className='tit'>7개의 결과가 있습니다.</p>
                                <ul>
                                  <li><a href='#none' onClick={onChangeSelect}>1. 테스트</a> </li>
                                  <li><a href='#none' onClick={onChangeSelect}>2. 테스트방2</a> </li>
                                  <li><a href='#none' onClick={onChangeSelect}>1. 테스트</a> </li>
                                  <li><a href='#none' onClick={onChangeSelect}>1. 테스트</a> </li>
                                </ul>
                                <p className='tit no-result'>결과가 없습니다.</p>
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
                          <a href="#none" title="검색필드 선택" className="select-value" value={langVal} name="langVal" onClick={onSelect}><span>{langVal === '' ? '한국어' : langVal}</span></a>
                          <div className="select-list">
                              <ul>
                                <li><a href="#none" onClick={onChangeSelect} className='on'><span>한국어</span></a></li>
                                <li><a href="#none" onClick={onChangeSelect}><span>English</span></a></li>
                                <li><a href="#none" onClick={onChangeSelect}><span>日本語</span></a></li>
                                <li><a href="#none" onClick={onChangeSelect}><span>简体中文</span></a></li>
                                <li><a href="#none" onClick={onChangeSelect}><span>繁體中文</span></a></li>
                                <li><a href="#none" onClick={onChangeSelect}><span>Tiếng Việt </span></a></li>
                              </ul>
                          </div>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <button type='button' className='full-btn'>연동 추가하기</button>
            </div>{/* //detail-wrapper */}
          </div>
        </div>
      </div>
    </div>
    {/* [D] : 수정하기 */}
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_trello.png')} alt="trello"></img></p>
            <div className='info'>
                <div><strong>김지영</strong><span>의 trello</span></div>
                <p>2021-12-06에 생성됨</p>
            </div>
            <div className='connect-right-box'>
              <label className="switch on" labefor="unit">
                <span className='txt'>작동중</span>
                <Input type="checkbox" id=""/>
                <a href="#none" className="slider" onClick={(e) => onToggle(e)}></a>
              </label>
              <button type='button' className='btn-icon'><i className="icon-ic-delete"></i><span className='hidden'>삭제하기</span></button>
            </div>
          </div>
        </div>
      </div>{/* //detail-header */}
      <div className='detail-content'>
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
                      <a href="#none" title="검색필드 선택" className="select-value" value={accoutVal} name="accoutVal" onClick={onSelect}>
                        {/* [D] : 로딩 시 노출 */}
                        {/* <span>
                            <div className='loading'>
                            <span>불러오는 중...</span><div className='loader'><span></span></div>
                          </div>
                        </span> */}
                        {/* //[D] : 로딩 case */}
                        <span>{accoutVal === '' ? 'jandi@tosslab.com' : accoutVal}</span>
                      </a>
                      <div className="select-list account-type">
                          <ul>
                            <li><a href="#none" onClick={onChangeSelect} className='on'><span className='icon-ic-user-white'>jandi@tosslab.com</span></a><button type='button' className='btn-delete icon-ic-close'></button></li>
                            <li><a href="#none" onClick={onChangeSelect}><span className='icon-ic-user-white'>jandi02@tosslab.com</span></a><button type='button' className='btn-delete icon-ic-close'></button></li>
                            <li><a href="#none" onClick={onChangeSelect}><span className='icon-ic-user-white'>jandi03@tosslab.com</span></a><button type='button' className='btn-delete icon-ic-close'></button></li>
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
                <p className='tit'>Board 선택</p>
                <p className='info'>알림을 받고자 하는 보드(Board)를 선택해주세요.</p>
              </dt>
              <dd>
                <div className='input-row'>
                  <div className="select-box list-type mgr8 type-full">
                    <a href="#none" title="검색필드 선택" className="select-value" name='boardVal' onClick={onSelect}><span>{boardVal === '' ? 'Board 선택' : boardVal}</span></a>
                    <div className="select-list custom-select">
                      <div className='search-box'>
                        <div className='search-input-box'>
                          <i className='icon-ic-search'></i>
                          <Input type='text' placeholder='검색어를 입력해주세요.' value={searchVal} className='input-type' onChange={(e) => setSearchVal(e.currentTarget.value)}></Input>
                        </div>
                      </div>

                      {/* custom-select-wrap */}
                      {
                        !searchVal && (
                          <div className='custom-select-wrap'>
                            <ul>
                              <li><span className='tit'>Board 선택</span></li>
                            </ul>
                            <dl className='option-wrap'>
                              <dt className='tit'></dt>
                              <dd>
                                <ul>
                                  <li><a href='#none' onClick={onChangeSelect}>보드111111111</a></li>
                                  <li><a href='#none' onClick={onChangeSelect}>보드111111111</a></li>
                                </ul>
                              </dd>
                            </dl>
                          </div>
                        )
                      }
                      {/* //custom-select-wrap */}

                      {/* search-list-wrap */}
                      {
                        searchVal && (
                        <div className='search-list-wrap'>
                          <p className='tit'>7개의 결과가 있습니다.</p>
                          <ul>
                            <li><a href='#none' onClick={onChangeSelect}>보드111111111</a></li>
                            <li><a href='#none' onClick={onChangeSelect}>보드111111111</a></li>
                          </ul>
                          <p className='tit no-result'>결과가 없습니다.</p>
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
                            <input type="checkbox" id="card_01" checked={card_01} value="1" name="card_01"/>
                            <label htmlFor="card_01"><span>카드가 생성되었을 때</span></label>
                          </div>
                        </li>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="card_02" checked={card_02} value="1" name="card_02"/>
                            <label htmlFor="card_02"><span>카드가 옮겨졌을 때</span></label>
                          </div>
                        </li>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="card_03" checked={card_03} value="1" name="card_03"/>
                            <label htmlFor="card_03"><span>카드 이름이 변경되었을 때</span></label>
                          </div>
                        </li>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="card_04" checked={card_04} value="1" name="card_04"/>
                            <label htmlFor="card_04"><span>코멘트가 카드에 추가되었을 때</span></label>
                          </div>
                        </li>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="card_05" checked={card_05} value="1" name="card_05"/>
                            <label htmlFor="card_05"><span>첨부 파일이 카드에 추가되었을 때</span></label>
                          </div>
                        </li>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="card_06" checked={card_06} value="1" name="card_06"/>
                            <label htmlFor="card_06"><span>설명(Description)이 변경되었을 때</span></label>
                          </div>
                        </li>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="card_07" checked={card_07} value="1" name="card_07"/>
                            <label htmlFor="card_07"><span>마감일(Due date)이 변경되었을 때</span></label>
                          </div>
                        </li>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="card_08" checked={card_08} value="1" name="card_08"/>
                            <label htmlFor="card_08"><span>라벨(Label)이 변경되었을 때</span></label>
                          </div>
                        </li>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="card_09" checked={card_09} value="1" name="card_09"/>
                            <label htmlFor="card_09"><span>카드에 멤버가 추가되었을 때</span></label>
                          </div>
                        </li>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="card_10" checked={card_10} value="1" name="card_10"/>
                            <label htmlFor="card_10"><span>카드가 archive 또는 unarchive되었을 때</span></label>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className='setting-group'>
                      <p>리스트</p>
                      <ul>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="list_01" checked={list_01} value="1" name="list_01"/>
                            <label htmlFor="list_01"><span>리스트가 생성되었을 때</span></label>
                          </div>
                        </li>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="list_02" checked={list_02} value="1" name="list_02"/>
                            <label htmlFor="list_02"><span>리스트 이름이 바뀌었을 때</span></label>
                          </div>
                        </li>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="list_03" checked={list_03} value="1" name="list_03"/>
                            <label htmlFor="list_03"><span>리스트가 다른 보드로 옮겨졌을 때</span></label>
                          </div>
                        </li>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="list_04" checked={list_04} value="1" name="list_04"/>
                            <label htmlFor="list_04"><span>리스트가 archive 또는 unarchive되었을 때</span></label>
                          </div>
                        </li>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="list_05" checked={list_05} value="1" name="list_05"/>
                            <label htmlFor="list_05"><span>보드 이름이 바뀌었을 때</span></label>
                          </div>
                        </li>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="list_06" checked={list_06} value="1" name="list_06"/>
                            <label htmlFor="list_06"><span>보드에 멤버가 추가되었을 때</span></label>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className='setting-group'>
                      <p>체크리스트</p>
                      <ul>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="chklist_01" checked={chklist_01} value="1" name="chklist_01"/>
                            <label htmlFor="chklist_01"><span>체크리스트가 카드에 추가되었을 때</span></label>
                          </div>
                        </li>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="chklist_02" checked={chklist_02} value="1" name="chklist_02"/>
                            <label htmlFor="chklist_02"><span>체크리스트 아이템이 생성되었을 때</span></label>
                          </div>
                        </li>
                        <li>
                          <div className='custom-checkbox' onClick={onChangeCheckbox}>
                            <input type="checkbox" id="chklist_03" checked={chklist_03} value="1" name="chklist_03"/>
                            <label htmlFor="chklist_03"><span>체크리스트 아이템이 완료(Complete)/미완료(Incomplete)로 될 때</span></label>
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
                  <a href='#none' className='btn-profile'>
                    <img src={getPublicAssetPath('static/icon_trello.png')} alt="trello"></img>
                    <span>Edit</span>
                  </a>
                  <Input type="text" className='input-type'></Input>
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
                    <a href="#none" title="검색필드 선택" className="select-value fc-green" name='topicVal' onClick={onSelect}><span>{topicVal === '' ? '그룹에 속한 대화방 1' : topicVal}</span></a>
                    <div className="select-list custom-select">
                      <div className='search-box'>
                        <div className='search-input-box'>
                          <i className='icon-ic-search'></i>
                          <Input type='text' placeholder='검색어를 입력해주세요.' value={searchVal} className='input-type' onChange={(e) => setSearchVal(e.currentTarget.value)}></Input>
                        </div>
                      </div>

                      {/* custom-select-wrap */}
                      {
                        !searchVal && (
                          <div className='custom-select-wrap'>
                            <dl className='option-wrap'>
                              <dt className='tit'>토픽</dt>
                              <dd>
                                <div className='folder-group'>
                                  <div className='folder-tit'><span className='icon-ic-folder-open'>새폴더</span></div>
                                  <ul>
                                    <li><a href='#none' onClick={onChangeSelect} className='on'>그룹에 속한 대화방 1</a></li>
                                    <li><a href='#none' onClick={onChangeSelect}>그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2그룹에 속한 대화방 2</a></li>
                                  </ul>
                                </div>
                                <div className='folder-group'>
                                  <div className='folder-tit'><span className='icon-ic-folder-open'>새폴더</span></div>
                                  <ul>
                                    <li><a href='#none' onClick={onChangeSelect}>그룹에 속한 대화방 11</a></li>
                                    <li><a href='#none' onClick={onChangeSelect}>그룹에 속한 대화방 12</a></li>
                                  </ul>
                                </div>
                                <div className=''>{/* [D]: 그룹 아닐 경우 folder-group 제거*/}
                                  <ul>
                                    <li><a href='#none' onClick={onChangeSelect}>구룹아냐</a></li>
                                    <li><a href='#none' onClick={onChangeSelect}>구룹아닌방</a></li>
                                  </ul>
                                </div>
                              </dd>
                            </dl>
                            <dl className='option-wrap'>
                              <dt className='tit'>채팅</dt>
                              <dd>
                                <div className='folder-group'>
                                  <div className='folder-tit'><span className='icon-ic-folder-open'>새폴더</span></div>
                                  <ul>
                                    <li><a href='#none'>모든 대화방<i className="icon-ic-lock"></i><i className="icon-ic-bell-slash"></i></a></li>
                                    <li><a href='#none'>참여한 대화방<i className="icon-ic-board"></i><i className="icon-ic-bell-slash"></i></a></li>
                                  </ul>
                                </div>
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

                      {/* search-list-wrap */}
                      {
                        searchVal && (
                        <div className='search-list-wrap'>
                          <p className='tit'>7개의 결과가 있습니다.</p>
                          <ul>
                            <li><a href='#none' onClick={onChangeSelect}>1. 테스트</a> </li>
                            <li><a href='#none' onClick={onChangeSelect}>2. 테스트방2</a> </li>
                            <li><a href='#none' onClick={onChangeSelect}>1. 테스트</a> </li>
                            <li><a href='#none' onClick={onChangeSelect}>1. 테스트</a> </li>
                          </ul>
                          <p className='tit no-result'>결과가 없습니다.</p>
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
                    <a href="#none" title="검색필드 선택" className="select-value" value={langVal} name="langVal" onClick={onSelect}><span>{langVal === '' ? '한국어' : langVal}</span></a>
                    <div className="select-list">
                        <ul>
                          <li><a href="#none" onClick={onChangeSelect} className='on'><span>한국어</span></a></li>
                          <li><a href="#none" onClick={onChangeSelect}><span>English</span></a></li>
                          <li><a href="#none" onClick={onChangeSelect}><span>日本語</span></a></li>
                          <li><a href="#none" onClick={onChangeSelect}><span>简体中文</span></a></li>
                          <li><a href="#none" onClick={onChangeSelect}><span>繁體中文</span></a></li>
                          <li><a href="#none" onClick={onChangeSelect}><span>Tiếng Việt </span></a></li>
                        </ul>
                    </div>
                  </div>
                </div>
              </dd>
            </dl>
          </div>
         </div>
        <button type='button' className='full-btn'>수정하기</button>
      </div>{/* //detail-wrapper */}
    </div>
  </>);
};

export default Trello;
