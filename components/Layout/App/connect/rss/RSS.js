/* eslint-disable max-len */
import React, { useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/rss/rss';
import { template1 } from '../../../../../service/connect';
import Thumbnail from "../../../../ui/Thumbnail/Thumbnail";
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';

const RSS = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { team, rss } = useSelector((state) => {
    console.log('rss state !!', state);
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
  /* custom select box value */
  const [selects, setSelects] = useState({
    topicVal: '',
  });
  const { topicVal } = selects;

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
      connectType: 'rss',
      modules,
      load: creators.getTeamsRss,
      connect: [creators.postTeamsRss, creators.putTeamsRssSetting],
      set: creators.setInputRss,
    }, false);
  }, []);

  return (<>



  <p>---- 퍼블</p>
  {/* [D] : 연동하기 */}
  <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_rss.png')} alt="rss"></img></p>
            <div className='info'>
                <strong>RSS 구독</strong>
                <p>콘텐츠, 미디어 및 뉴스</p>
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
                <img src={getPublicAssetPath('static/rss/ko/info/img_info.png')} alt="서비스 소개"></img>{/* [D] : static/커넥트명/언어코드/img_info.png */}
                <div className='info-box'>
                  <strong>RSS 구독</strong>
                  <p>RSS는 손쉽게 블로그 또는 뉴스를 구독할 수 있는 인터넷 규약입니다. <br/>RSS 연동을 이용하시면 업무에 도움되는 블로그 또는 뉴스 포스트를 토픽 내에서 메시지로 수신하실 수 있습니다.</p>
                </div>
                <button type='button'>더 알아보기<i className='icon-ic-arrow-right-up'></i></button>
              </div>
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
                        <a href='#none' className='btn-profile'>
                          <img src={getPublicAssetPath('static/icon_rss.png')} alt="rss"></img><span>Edit</span>
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
                                          <li><a href='#none'>모든 대화방</a></li>
                                          <li><a href='#none'>참여한 대화방</a></li>
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
                  <dl className='row'>
                    <dt>
                      <p className='tit'>RSS 주소</p>
                      <p className='info'>구독하려는 RSS 주소를 입력해주세요.</p>
                    </dt>
                    <dd>
                      <div className='input-row'>
                        <Input type="text" className='input-type' placeholder='URL을 입력해주세요.'></Input>
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
            <p className='img-box'><img src={getPublicAssetPath('static/icon_rss.png')} alt="rss"></img></p>
            <div className="info">
              <div><strong>김지영</strong><span>의 Rss</span></div>
              <p>2021-12-06에 생성됨</p></div>
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
                  <a href='#none' className='btn-profile'>
                    <img src={getPublicAssetPath('static/icon_rss.png')} alt="rss"></img><span>Edit</span>
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
                                    <li><a href='#none'>모든 대화방</a></li>
                                    <li><a href='#none'>참여한 대화방</a></li>
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
            <dl className='row'>
              <dt>
                <p className='tit'>RSS 주소</p>
                <p className='info'>구독하려는 RSS 주소를 입력해주세요.</p>
              </dt>
              <dd>
                <div className='input-row'>
                  <Input type="text" className='input-type' placeholder='URL을 입력해주세요.'></Input>
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <button type='button' className='full-btn'>연동 추가하기</button>
      </div>{/* //detail-wrapper */}
  </div>
</>);
};

export default RSS;
/**
 * TODO: file 이벤트 전파 이슈?
 */