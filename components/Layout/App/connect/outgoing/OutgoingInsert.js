/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,react/jsx-no-duplicate-props,guard-for-in,operator-assignment,no-unreachable,object-curly-newline,react/no-unescaped-entities,react/jsx-no-comment-textnodes */
import React, {
  useEffect, useState, useRef, Fragment,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { modules } from '../../../../../store/connect/outgoing/outgoing';
import { template1 } from '../../../../../service/connect';
import Thumbnail from '../../../../ui/Thumbnail/Thumbnail';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { banner } from '../../../../../service/banner';
import { searcher, searcherLanguage } from '../../../../../service/searcher';

SwiperCore.use([Navigation]);

const Outgoing = () => {
  const connectType = 'outgoing';
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    team, outgoing, user, connect,
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

  useEffect(() => {
    // if (user.rooms.chats.length === 0) return;
    searcher.initialize({
      dispatch, document, team, user, outgoing, connectType, set: creators.setInputOutgoing,
    });
  }, [user.rooms]);

  useEffect(() => {
    if (team.teamId === 0) return;

    template1.initialize({
      dispatch,
      router,
      connectType: 'outgoing',
      modules,
      list: creators.getTeamsToken,
      load: creators.getTeamsOutgoing,
      connect: [creators.postTeamsOutgoing, creators.putTeamsOutgoingSetting],
      set: creators.setInputOutgoing,
    });
  }, [team.teamId]);

  return (<>
    {/* [D] : 연동하기 */}
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_webhook.png')} alt="webhook outgoing"></img></p>
            <div className='info'>
                <strong>Webhook 발신 (Outgoing Webhook)</strong>
                <p>생산성, 커스터마이징</p>
            </div>
          </div>
        </div>
      </div>{/* //detail-header */}
      <div className='tab-container'>
        <div className='tab-menu'>
          <ul>
            <li><a href='#none' onClick={tab.change} id="1">서비스 소개</a></li>
            <li><a href='#none' onClick={tab.change} id="2">사용방법</a></li>
            <li><a href='#none' onClick={tab.change} id="3" className='on'>연동하기</a></li>
          </ul>
        </div>
        <div className='tab-content'>
          <div className='tab-cont'>
            <div className='detail-content'>
              <div className='info-wrap'>
                <img src={getPublicAssetPath('static/outgoing/ko/info/img_info.png')} alt="서비스 소개"></img>{/* [D] : static/커넥트명/언어코드/img_info.png */}
                <div className='info-box'>
                  <strong>Webhook 발신 (Outgoing Webhook)</strong>
                  <p>Webhook 발신 (Outgoing Webhook)은 특정 키워드를 포함한 메시지가 잔디에서 발생하였을 때 외부 서버로 전달할 수 있는 기능입니다. 외부 서버 개발을 통해 사내 서비스 연동, 챗봇 등으로 다양하게 활용할 수 있습니다.</p>
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
                    <div className='introduction-code-cont'>
                      <p className='tit'><i className='icon-ic-info'></i> Outgoing Webhook Payload와 Response</p>
                      <p className='txt'>잔디에서 발생하는 Outgoing Webhook의 데이터 포맷과 해당 요청에 대한 응답에 대한 안내입니다.</p>
                      <div className="introduction-code-view">
                          <div className="code-line"><span>&#123;</span></div>
                          <div className="code-line dept1"><span>"token" : "YE1ronbbuoZkq7h3J5KMI4Tn",</span></div>
                          <div className="code-line dept1"><span>"teamName" : "Toss Lab, Inc.",</span></div>
                          <div className="code-line dept1"><span>"roomName" : "토스랩 코리아",</span></div>
                          <div className="code-line dept1"><span>"writer" : &#123;</span></div>
                          <div className="code-line dept2"><span>"id" : "20135452",</span></div>
                          <div className="code-line dept2"><span>"name" : "김잔디",</span></div>
                          <div className="code-line dept2"><span>"email" : "jandi.kim@tosslab.com",</span></div>
                          <div className="code-line dept2"><span>"phoneNumber" : "01012345678",</span></div>
                          <div className="code-line dept1"><span>&#125;,</span></div>
                          <div className="code-line dept1"><span>"text" : "/날씨 내일 대전 날씨 어때?",</span></div>
                          <div className="code-line dept1"><span>"data" : "내일 대전 날씨 어때?",</span></div>
                          <div className="code-line dept1"><span>"keyword" : "날씨",</span></div>
                          <div className="code-line dept1"><span>"createdAt" : "2017-05-15T11:34:11.266Z"</span></div>
                          <div className="code-line dept1"><span>"platform" : "web",</span></div>
                          <div className="code-line dept1"><span>"ip" : "123.456.789.12",</span></div>
                          <div className="code-line"><span>&#125;</span></div>
                      </div>
                    </div>
                    <p className="inner-cont-info"><em className='bullet'>Outgoing Data</em> : 등록된 시작 키워드에 포함된 메시지가 작성될 경우, 등록된 URL로 POST 요청을 보냅니다. 포함되는 데이터는 위와 같습니다.</p>
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
                    <p className="inner-cont-info"><em className='bullet'>Responding :</em><span>POST 요청에 대한 응답 값을 통해 커넥트를 설정한 대화방에 메시지를 작성할 수 있습니다. 응답 data format과 메시지 출력은 outgoing Webhook Connect와 동일합니다. <span className='fc-gray'>(위 format과 다른 응답은 무시하며, "200 OK" 응답이 아닌 그외 모든 응답 또한 별도로 처리되지 않습니다.)</span></span></p>
                    <p className="inner-cont-info"><em className='bullet'>Additional Formatting :</em><span>body 부분에 "굵게", "링크삽입" 등 메시지 효과를 표현할 수 있는 markdown 적용이 가능합니다. 더 궁금한 점이 있으시면 <a href='#none' className='fc-blue'>잔디 고객센터</a>로 문의해주시기 바랍니다.</span></p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className='tab-cont on'>
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
                        <Input type="text"
                               className='input-type'
                               placeholder='키워드를 입력해주세요. (1개만 설정가능합니다.)'
                               value={outgoing.input.keyword}
                               onChange={(e) => template1.set('keyword', e.target.value)}
                        ></Input>
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
                          <Input type="text" className='input-icon' value={outgoing.input.webhookUrl} readOnly></Input>
                        </div>
                        <button type='button' className='mgr8'>복사</button>
                        <button type='button' onClick={() => template1.list(creators.getTeamsToken)}>다시 생성하기</button>
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
                        <Thumbnail state={outgoing} parent={template1} />
                        <Input type="text"
                               className='input-type'
                               onChange={(e) => template1.set('botName', e.target.value)}
                               value={outgoing.input.botName}
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
                            <span>{outgoing.input.selectedTopic}</span>
                          </a>
                          <div className="select-list custom-select">
                            <div className='search-box'>
                              <div className='search-input-box'>
                                <i className='icon-ic-search'></i>
                                <Input type='text'
                                       placeholder='검색어를 입력해주세요.'
                                       className='input-type'
                                       value={outgoing.input.searchText}
                                       onChange={(e) => searcher.change(e)}
                                ></Input>
                              </div>
                            </div>

                            {/* custom-select-wrap */}
                            {
                              outgoing.input.searchText === '' && (
                                <div className='custom-select-wrap'>
                                  <dl className='option-wrap'>
                                    <dt className='tit'>토픽</dt>
                                    <dd>
                                      {
                                        outgoing.input.searchRooms.map((roomsData, roomsIndex) => (<Fragment key={roomsIndex}>
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
                              outgoing.input.searchText !== '' && (
                                <div className='search-list-wrap'>
                                  {
                                    outgoing.input.searchFilters.length > 0
                                    && <>
                                      <p className='tit'>{outgoing.input.searchFilters.length}개의 결과가 있습니다.</p>
                                      <ul>
                                        {
                                          outgoing.input.searchFilters.map((roomData, roomIndex) => (
                                            <li key={roomIndex}>
                                              <a href='#none' onClick={(e) => searcher.select(e, roomData)}>{roomData.name}</a>
                                            </li>
                                          ))
                                        }
                                      </ul>
                                    </>
                                  }
                                  {outgoing.input.searchFilters.length === 0 && <p className='tit no-result'>결과가 없습니다.</p>}
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
                      <p className='tit'>URL </p>
                      <p className='info'>잔디에서 발송되는 Webhook을 수신할 대상 URL을 입력해주세요.</p>
                    </dt>
                    <dd>
                      <div className='input-row'>
                        <Input type='text'
                               placeholder='URL을 입력해주세요.'
                               className='input-type'
                               value={outgoing.input.webhookUrl}
                               onChange={(e) => template1.set('webhookUrl', e.target.value)}
                        ></Input>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <button type='button' className='full-btn' onClick={(e) => template1.connect(e, outgoing)}>연동 추가하기</button>
            </div>{/* //detail-wrapper */}
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default Outgoing;
