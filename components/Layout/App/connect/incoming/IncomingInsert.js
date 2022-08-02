/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,react/jsx-no-duplicate-props,guard-for-in,operator-assignment,no-unreachable,object-curly-newline,react/no-unescaped-entities,react/jsx-no-comment-textnodes */
import React, {
  useEffect, useRef, Fragment,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { modules, initialModules } from '../../../../../store/connect/incoming/incoming';
import { template1 } from '../../../../../service/connect';
import Thumbnail from '../../../../ui/Thumbnail/Thumbnail';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { banner } from '../../../../../service/banner';
import { searcher, searcherLanguage } from '../../../../../service/searcher';
import { util } from '../../../../../service/util';
import 'swiper/css';

SwiperCore.use([Navigation]);

const Incoming = () => {
  const connectType = 'incoming';
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    team, incoming, user, connect,
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
    if (e.target.localName !== 'label') return;

    e.preventDefault();
    const target = e.currentTarget.querySelector('input');
    template1.set(target.name, !incoming.input[target.name]);
  };

  useEffect(() => {
    template1.initialize({
      dispatch,
      router,
      connectType,
      modules,
      initialModules,
      list: creators.getTeamsToken,
      load: creators.getTeamsIncoming,
      connect: [creators.postTeamsIncoming, creators.putTeamsIncomingSetting],
      disconnect: creators.deleteAuthentications,
      set: creators.setInputIncoming,
    }, false);
  }, []);

  useEffect(() => {
    searcher.initialize({
      dispatch,
      document,
      team,
      user,
      incoming,
      connectType,
      set: creators.setInputIncoming,
    });
    searcherLanguage.initialize({
      dispatch,
      document,
      team,
      user,
      incoming,
      connectType,
      set: creators.setInputIncoming,
    });

    // default roomId
    template1.set('roomId', util.initTopic(user.rooms));
  }, [user.rooms]);

  return (<>
    {/* [D] : 연동하기 */}
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          { connect.connectsObj[connectType]
          && <div className='connect-info-box'>
            <p className='img-box'><img src={connect.connectsObj[connectType].botThumbnail} alt="incoming"></img></p>
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
                <img src={getPublicAssetPath('static/incoming/ko/info/img_info.png')} alt="서비스 소개"></img>{/* [D] : static/커넥트명/언어코드/img_info.png */}
                <div className='info-box'>
                  <strong>Webhook 수신 (Incoming Webhook)</strong>
                  <p>Incoming Webhook은 잔디로 전송된 데이터를 잔디 내의 메시지로 수신할 수 있는 기능입니다.<br/>약간의 노력으로 뉴스 기사를 잔디 메시지로 받아보는 등 다양한 기능을 구현하여 사용할 수 있습니다.</p>
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
                    <p className="inner-cont-info"><strong className='badge'>6</strong><span className='txt'>이렇게 수신된 메시지는 선택된 대화에 다음과 같이 전송됩니다.<br/>프로필 이미지와 이름 변경이 필요할 경우 수정이 가능합니다. 더 궁금한 점이 있으시면 <a className='fc-blue'>잔디 고객센터</a>로 문의해주시기 바랍니다.</span></p>
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
                        <Thumbnail state={incoming} parent={template1} />
                        <Input type="text"
                               className='input-type'
                               onChange={(e) => template1.set('botName', e.target.value)}
                               value={incoming.input.botName}
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
                            <span>{incoming.input.selectedTopic}</span>
                          </a>
                          <div className="select-list custom-select">
                            <div className='search-box'>
                              <div className='search-input-box'>
                                <i className='icon-ic-search'></i>
                                <Input type='text'
                                       placeholder='검색어를 입력해주세요.'
                                       className='input-type'
                                       value={incoming.input.searchText}
                                       onChange={(e) => searcher.change(e)}
                                ></Input>
                              </div>
                            </div>

                            {/* custom-select-wrap */}
                            {
                              incoming.input.searchText === '' && (
                                <div className='custom-select-wrap'>
                                  <dl className='option-wrap'>
                                    <dt className='tit'>토픽</dt>
                                    <dd>
                                      {
                                        incoming.input.searchRooms.map((roomsData, roomsIndex) => (<Fragment key={roomsIndex}>
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
                              incoming.input.searchText !== '' && (
                                <div className='search-list-wrap'>
                                  {
                                    incoming.input.searchFilters.length > 0
                                    && <>
                                      <p className='tit'>{incoming.input.searchFilters.length}개의 결과가 있습니다.</p>
                                      <ul>
                                        {
                                          incoming.input.searchFilters.map((roomData, roomIndex) => (
                                            <li key={roomIndex}>
                                              <a onClick={(e) => searcher.select(e, roomData)}>{roomData.name}</a>
                                            </li>
                                          ))
                                        }
                                      </ul>
                                    </>
                                  }
                                  {incoming.input.searchFilters.length === 0 && <p className='tit no-result'>결과가 없습니다.</p>}
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
            { incoming.input.webhookUrl !== '' && <>
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
                          <Input type="text" className='input-icon' value={incoming.input.webhookUrl} readOnly></Input>
                        </div>
                        <button type='button'>복사</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <button type='button' className='full-btn' onClick={(e) => template1.connect(e, incoming)}>생성 완료 (Webhook URL을 해당 서비스에 등록해주세요)</button>{/* [D] : 연동 추가하기 완료될 경우 */}
            </> }
            { incoming.input.webhookUrl === '' && <>
              <button type='button' className='full-btn' onClick={() => template1.list(creators.getTeamsToken)}>연동 추가하기 (Webhook URL 생성하기)</button>
            </> }
            </div>
          </div>
        </div>
      </div>
    </div>{/* //detail-wrapper */}
  </>);
};

export default Incoming;
