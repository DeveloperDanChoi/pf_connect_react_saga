/* eslint-disable max-len */
import React, { useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/incoming/incoming';
import { template1 } from '../../../../../service/connect';
import Thumbnail from "../../../../ui/Thumbnail/Thumbnail";
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';
/* swiper */
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation]);

const Incoming = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { team, incoming } = useSelector((state) => {
    // console.log('incoming state !!', state);
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
      connectType: 'incoming',
      modules,
      list: creators.getTeamsToken,
      load: creators.getTeamsIncoming,
      connect: [creators.postTeamsIncoming, creators.putTeamsIncomingSetting],
      disconnect: creators.deleteAuthentications,
      set: creators.setInputIncoming,
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
            <p className='img-box'><img src={getPublicAssetPath('static/icon_webhook.png')} alt="webhook"></img></p>
            <div className='info'>
                <strong>Webhook 수신 (Incoming Webhook)</strong>
                <p>생산성, 커스터마이징</p>
            </div>
          </div>
        </div>
      </div>{/* //detail-header */}
      <div className='tab-container'>
        <div className='tab-menu'>
          <ul>
            <li><a href='#none' onClick={onTabChange} id="1" className='on'>서비스 소개</a></li>
            <li><a href='#none' onClick={onTabChange} id="2">사용방법</a></li>
            <li><a href='#none' onClick={onTabChange} id="3">연동하기</a></li>
          </ul>
        </div>
        <div className='tab-content'>
          <div className='tab-cont on'>
            <div className='detail-content'>
              <div className='info-wrap'>
                <img src={getPublicAssetPath('static/incoming/ko/info/img_info.png')} alt="서비스 소개"></img>{/* [D] : static/커넥트명/언어코드/img_info.png */}
                <div className='info-box'>
                  <strong>Webhook 수신 (Incoming Webhook)</strong>
                  <p>Incoming Webhook은 잔디로 전송된 데이터를 잔디 내의 메시지로 수신할 수 있는 기능입니다.<br/>약간의 노력으로 뉴스 기사를 잔디 메시지로 받아보는 등 다양한 기능을 구현하여 사용할 수 있습니다.</p>
                </div>
                <button type='button'>더 알아보기<i className='icon-ic-arrow-right-up'></i></button>
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
                    <img src={getPublicAssetPath('static/incoming/ko/contents/img_contents_01.png')} alt="사용방법"></img>{/* [D] : static/커넥트명/언어코드/img_contents.png */}
                    <p className="inner-cont-info"><strong className='badge'>1</strong><span className='txt'>원하는 옵션을 설정한 뒤, <em> 연동 추가하기 (Webhook URL 생성하기)</em> 버튼을 눌러 Webhook URL을 생성해주세요.</span></p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='inner-cont'>
                    <img src={getPublicAssetPath('static/incoming/ko/contents/img_contents_02.png')} alt="사용방법"></img>
                    <p className="inner-cont-info"><strong className='badge'>2</strong><span className='txt'>생성된 <em>Webhook URL</em>을 복사해주세요.</span></p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='inner-cont'>
                    <div className='introduction-code-cont'>
                      <p className='tit'><i className='icon-ic-info'></i> Webhook이란?</p>
                      <p className='txt'>웹훅(Webhook)이란 잔디에 잔디가 정한 포맷에 일치하는 데이터를 수신하여 지정된 대화에 메시지 형태로 전송해주는 기능을 말합니다. 현재 잔디 커넥트에서 지원하지 않고 있는 서비스라도 웹훅 발신(Outgoing Webhook)을 지원하는 경우 잔디와 연동하여 변동 사항에 대해 메시지를 수신할 수 있습니다.</p>
                      <p className='txt02'>request에는 반드시 <em className='fw-bold'>Accept</em>와 <em className='fw-bold'>Content-Type</em>을 다음과 같이 지정해줘야 합니다.<br/>또한 JANDI Webhook은 restful API로 동작하기 때문에 http method를 POST로 하지 않으시면 정상적으로 등록되지 않습니다.</p>
                      <div className="introduction-code-view">
                          <div className="code-line"><span>Accept: application/vnd.tosslab.jandi-v2+json</span></div>
                          <div className="code-line"><span>Content-Type: application/json</span></div>
                      </div>
                    </div>
                    <p className="inner-cont-info"><strong className='badge'>3</strong><span className='txt'>HTTP POST request를 복사한 <em>Webhook URL로 전송</em>해주시면 됩니다.</span></p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='inner-cont'>
                    <div className='introduction-code-cont'>
                      <div className="introduction-code-view simple-type">
                        <div className="code-line"><span>&#123;</span></div>
                        <div className="code-line dept1"><span>"body" : "[[PizzaHouse]](http://url_to_text) You have a new Pizza order.",</span><p className='comment'>//Body text (Required)</p></div>
                        <div className="code-line dept1"><span>"connectColor" : "#FAC11B",</span><p className='comment'>//Hex code color of attachment ba</p></div>
                        <div className="code-line dept1"><span>"connectInfo" : [&#123;</span></div>
                        <div className="code-line dept2"><span>"title" : "Topping",</span><p className='comment'>//1st attachment area title</p></div>
                        <div className="code-line dept2"><span> "description" : "Pepperoni"</span><p className='comment'>//1st attachment description</p></div>
                        <div className="code-line dept1"><span>&#125;,</span></div>
                        <div className="code-line dept1"><span>&#123;</span></div>
                        <div className="code-line dept2"><span> "title": "Location",</span><p className='comment'>//2nd attachment area title</p></div>
                        <div className="code-line dept2"><span> "description": "Empire State Building, 5th Ave, New York",</span><p className='comment'>//2nd attachement description</p></div>
                        <div className="code-line dept1"><span>&#125;]</span></div>
                        <div className="code-line"><span>&#125;</span></div>
                      </div>
                    </div>
                    <p className="inner-cont-info"><strong className='badge'>4</strong><span className='txt'>POST request의 포맷은 위와 같습니다.</span></p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='inner-cont'>
                    <div className='introduction-code-cont'>
                      <div className="introduction-code-view simple-type">
                          <div className="code-line"><span>curl \</span></div>
                          <div className="code-line dept1"><span>-X POST https://wh.jandi.com/connect-api/webhook/279/a2193aaf48969417578e486be1f61058 \</span></div>
                          <div className="code-line dept1"><span>-H "Accept: application/vnd.tosslab.jandi-v2+json" \</span></div>
                          <div className="code-line dept1"><span>-H "Content-Type: application/json" \</span></div>
                          <div className="code-line dept1"><span>--data-binary '&#123;"body":"[[PizzaHouse]](http://url_to_text) You have a new Pizza order.","connectColor":"#FAC11B","connectInfo":[&#123;"title":"Topping","description":"Pepperoni"},</span></div>
                          <div className="code-line"><span>&#123;"title":"Location","description":"Empire State Building, 5th Ave, New York","imageUrl":"Url_to_text"}]}'</span></div>
                      </div>
                    </div>
                    <p className="inner-cont-info"><strong className='badge'>5</strong><span className='txt'>다음은 curl request의 샘플입니다.</span></p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='inner-cont'>
                    <img src={getPublicAssetPath('static/incoming/ko/contents/img_contents_03.png')} alt="사용방법"></img>
                    <p className="inner-cont-info"><strong className='badge'>6</strong><span className='txt'>이렇게 수신된 메시지는 선택된 대화에 다음과 같이 전송됩니다.<br/>프로필 이미지와 이름 변경이 필요할 경우 수정이 가능합니다. 더 궁금한 점이 있으시면 <a href='#none' className='fc-blue'>잔디 고객센터</a>로 문의해주시기 바랍니다.</span></p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className='tab-cont'>
            <div className='detail-content connect'>
              <div className='connect-row-item'>
                <div className='title'><strong>서비스 설정</strong></div>
                <div className='content'>
                  <dl className='row'>
                    <dt>
                      <p className='tit'>시작 키워드 입력</p>
                      <p className='info'>입력한 키워드로 시작하는 메시지에 한해 Webhook을 전달합니다. 파일, 투표 또는 댓글에는 적용되지 않습니다. (특수 문자, 공백은 입력할 수 없으며, 각 언어 별 자연어 또는 숫자만 가능합니다)</p>
                    </dt>
                    <dd>
                      <div className='input-row'>
                        <Input type="text" className='input-type' placeholder='키워드를 입력해주세요. (1개만 설정가능합니다.)'></Input>
                      </div>
                    </dd>
                  </dl>
                  <dl className='row'>
                    <dt>
                      <p className='tit'>토큰</p>
                      <p className='info'>Webhook 발송 시 페이로드에 토큰이 추가되어 전달됩니다.<br/>Webhook 수신 시 인증용으로 사용하실 수 있습니다.</p>
                    </dt>
                    <dd>
                      <div className='input-row'>
                        <div className='input-copy-box mgr8'>
                          <Input type="text" className='input-icon' value={'a7f1bf14120ce43ba9545ask45asd'} readOnly={true}></Input>
                        </div>
                        <button type='button' className='mgr8'>복사</button>
                        <button type='button'>다시 생성하기</button>
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
                          <img src={getPublicAssetPath('static/icon_webhook.png')} alt="webhook"></img>
                          <span>Edit</span>
                        </a>
                        <Input type="text" className='input-type' value='incoming'></Input>
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
            </div>
          </div>
        </div>
      </div>
    </div>{/* //detail-wrapper */}
  </>);
};

export default Incoming;
