/* eslint-disable max-len */
import React, {
  useEffect, useRef, Fragment,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import { modules } from '../../../../../store/connect/incoming/incoming';
import { template1 } from '../../../../../service/connect';
import Thumbnail from '../../../../ui/Thumbnail/Thumbnail';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { searcher, searcherLanguage } from '../../../../../service/searcher';

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

  /* custom checkbox */
  const onChangeCheckbox = (e) => {
    if (e.target.localName !== 'label') return;

    e.preventDefault();
    const target = e.currentTarget.querySelector('input');
    template1.set(target.name, !incoming.input[target.name]);
  };

  useEffect(() => {
    // if (user.rooms.chats.length === 0) return;
    searcher.initialize({
      dispatch, document, team, user, incoming, connectType, set: creators.setInputIncoming,
    });
    searcherLanguage.initialize({
      dispatch, document, team, user, incoming, connectType, set: creators.setInputIncoming,
    });
  }, [user.rooms]);

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

  /**
   * 새로고침 했을 때 member mapping
   */
  useEffect(() => {
    // TODO: 여기서 해야하는가?
    if (incoming.teamsIncoming.id > 0) {
      for (const item in incoming.teamsIncoming) {
        template1.set(item, incoming.teamsIncoming[item]);
      }
    }
    if (incoming.teamsIncoming.id > 0 && team.teamsMembers.length === 0) {
      // dispatch(teamModules.creators.getTeamsMemberProfiles(
      //   { teamId: team.teamId, memberId: googleCalendar.teamsGoogleCalendar.memberId },
      // ));
    }
  }, [incoming.teamsIncoming, team.teamsMembers]);

  return (<>
    {/* [D] : 수정하기 */}
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_webhook.png')} alt="webhook"></img></p>
            <div className='info'>
                <strong>Webhook 수신 (Incoming Webhook)</strong>
                <p>생산성, 커스터마이징</p>
            </div>
            <div className='connect-right-box'>
              <label className="switch on" labefor="unit">
                <span className='txt'>작동중</span>
                <Input type="checkbox" id=""/>
                <a href="#none" className="slider"></a>
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
                                        <a href='#none' onClick={(e) => searcher.select(e, roomData)}>{roomData.name}</a>
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
                    <Input type="text"
                           className='input-icon'
                           value={incoming.teamsToken.webhookUrl}
                           readOnly={true}>
                    </Input>
                  </div>
                  <button type='button'>복사</button>
                </div>
              </dd>
            </dl>
          </div>
        </div>
        {/* //[D] : 연동 추가하기 완료될 경우 노출 */}
        <button type='button' className='full-btn' >수정하기</button>
      </div>
    </div>
  </>);
};

export default Incoming;
