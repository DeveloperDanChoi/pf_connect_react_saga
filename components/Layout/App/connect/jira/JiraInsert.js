/* eslint-disable max-len */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/jira/jira';
import { template1 } from '../../../../../service/connect';
import Thumbnail from "../../../../ui/Thumbnail/Thumbnail";
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';
/* swiper */
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { banner } from "../../../../../service/banner";

SwiperCore.use([ Navigation]);

const Jira = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { team, jira } = useSelector((state) => {
    console.log('Jira state !!', state);
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
    langVal: '',
    topicVal: '',
    accoutVal: '',
    topicSearchVal: '',
  });
  const { langVal, topicVal } = selects;

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
      connectType: 'jira',
      modules,
      list: creators.getTeamsToken,
      load: creators.getTeamsJira,
      connect: [creators.postTeamsJira, creators.putTeamsJiraSetting],
      set: creators.setInputJira,
    });
  }, []);

  //연동 추가하기
  const onClick = (e) => {
    onDisabledContent();
  }

  return (<>
    {/* [D] : 연동하기 */}
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_jira.png')} alt="jira"></img></p>
            <div className='info'>
                <strong>JIRA</strong>
                <p>이슈 추적, 프로젝트 관리</p>
            </div>
          </div>
        </div>
      </div>{/* //detail-header */}
      <div className='tab-container'>
        <div className='tab-menu'>
          <ul>
            <li><a href='#none' onClick={onTabChange} id="1">서비스 소개</a></li>
            <li><a href='#none' onClick={onTabChange} id="2" className='on'>사용방법</a></li>
            <li><a href='#none' onClick={onTabChange} id="3">연동하기</a></li>
          </ul>
        </div>
        <div className='tab-content'>
          <div className='tab-cont'>
            <div className='detail-content'>
              <div className='info-wrap'>

                <img src={getPublicAssetPath('static/jira/ko/info/img_info.png')} alt="서비스 소개"></img>{/* [D] : static/커넥트명/언어코드/img_info.png */}
                <div className='info-box'>
                  <strong>JIRA</strong>
                  <p>Atlassian사의 프로젝트 매니지먼트 툴입니다.<br/>JIRA를 잔디와 연동하게 되면, 각 JIRA 이슈들의 상태 변경이나 업데이트 현황을 잔디 팀 내에서 메시지로 받을 수 있습니다.</p>
                </div>
                <button type='button' onClick={() => banner.help(user)}>더 알아보기<i className='icon-ic-arrow-right-up'></i></button>
              </div>
            </div>
          </div>
          <div className='tab-cont on'>
            <div className='detail-content type-swiper'>
               <Swiper
                ref={swiperRef}
                {...swiperOptions}
              >
                <SwiperSlide>
                  <div className='inner-cont'>
                    <img src={getPublicAssetPath('static/jira/ko/contents/img_contents_01.png')} alt="사용방법"></img>{/* [D] : static/커넥트명/언어코드/img_contents.png */}
                    <p className="inner-cont-info"><strong className='badge'>1</strong><span className='txt'>원하는 옵션을 설정한 뒤, <em> 연동 추가하기 (Webhook URL 생성하기)</em> 버튼을 눌러 Webhook URL을 생성해주세요.</span></p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='inner-cont'>
                    <img src={getPublicAssetPath('static/jira/ko/contents/img_contents_02.png')} alt="사용방법"></img>
                    <p className="inner-cont-info"><strong className='badge'>2</strong><span className='txt'>생성된 <em>Webhook URL</em>을 복사해주세요.</span></p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='inner-cont'>
                    <img src={getPublicAssetPath('static/jira/ko/contents/img_contents_03.png')} alt="사용방법"></img>
                    <p className="inner-cont-info"><strong className='badge'>3</strong><span className='txt'>JIRA에 관리자 계정으로 로그인 후 <em> System 메뉴</em>로 진입해주세요.</span></p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='inner-cont'>
                    <img src={getPublicAssetPath('static/jira/ko/contents/img_contents_04.png')} alt="사용방법"></img>
                    <p className="inner-cont-info"><strong className='badge'>4</strong><span className='txt'>왼쪽 메뉴들 중 <em>Advanced 섹션</em>에서 <em>Webhooks 메뉴</em>를 선택해주세요.</span></p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='inner-cont'>
                    <img src={getPublicAssetPath('static/jira/ko/contents/img_contents_05.png')} alt="사용방법"></img>
                    <p className="inner-cont-info"><strong className='badge'>5</strong><span className='txt'><em>웹훅 만들기(Create a Webhook)</em> 버튼을 클릭하신 뒤, 잔디 커넥트에서 생성한 <em>Webhook URL</em>을 붙여넣어주세요. </span></p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='inner-cont'>
                    <img src={getPublicAssetPath('static/jira/ko/contents/img_contents_06.png')} alt="사용방법"></img>
                    <p className="inner-cont-info"><strong className='badge'>6</strong><span className='txt'>구독하고자 하는 <em>이벤트들을 선택</em>하신 뒤 만들기(Create) 버튼을 눌러 설정을 저장해주세요.</span></p>
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
                        <a href='#none' className='btn-profile'>
                          <img src={getPublicAssetPath('static/icon_jira.png')} alt="jira"></img>
                          <span>Edit</span>
                        </a>
                        <Input type="text" className='input-type' value='JIRA'></Input>
                      </div>
                    </dd>
                  </dl>
                  <dl className='row'>
                    <dt>
                      <p className='tit'>토픽 / JANDI 선택</p>
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

export default Jira;
