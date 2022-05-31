/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/outgoing/outgoing';
import { template1 } from '../../../../../service/connect';
import Thumbnail from "../../../../ui/Thumbnail/Thumbnail";
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';

const Outgoing = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { team, outgoing } = useSelector((state) => {
    return state;
  });
  const { creators } = modules;

  const [searchVal, setSearchVal] = useState(''); /* [D] 임시.  댄이 작업에 맞게 수정해주심 됩니다. */

  /* custom select box value */
  const [selects, setSelects] = useState({
    topicVal: '',
});
  const { topicVal } = selects;

  /* custon select */
  const onSelect = (e) => {
    e.stopPropagation();
    const selectBoxs = document.querySelectorAll('.select-box');
    selectBoxs.forEach((selectbox) => selectbox.classList.remove('on'));
    e.target.closest('.select-box').classList.toggle('on');
  };

  const onChangeSelect = (e) => {
    e.stopPropagation();
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
  /* // custon select */

  // 비활성화 toggle
  const onToggle = (e) => {
    e.target.closest('.switch').classList.toggle('on');
    document.querySelector('.detail-connect-wrapper').classList.toggle('disabled');
    document.querySelector('.full-btn').toggleAttribute('disabled');
  };

  useEffect(() => {
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
  }, []);

  return (<>
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_webhook.png')} alt="webhook"></img></p>
            <div className='info'>
                <strong>Webhook 발신 (Outgoing Webhook)</strong>
                <p>생산성, 커스터마이징</p>
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
      <div className='detail-connect-wrapper'>
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
                    <a href="#none" title="검색필드 선택" className="select-value cl-green" name='topicVal' onClick={onSelect}><span>{topicVal === '' ? '그룹에 속한 대화방 1' : topicVal}</span></a>
                    <div className="select-list custom-select">
                      <div className='search-box'>
                        <div className='search-input-box'>
                          <i className='icon-ic-search'></i>
                          <Input type='text' placeholder='검색어를 입력해주세요.' value={searchVal} className='input-type' onChange={(e) => setSearchVal(e.currentTarget.value)}></Input>
                        </div>
                      </div>

                      {/* custon-select-wrap */}
                      {
                        !searchVal && (
                          <div className='custon-select-wrap'>
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
                                <div className=''>{/* [D]: 그룹 아닐 경우 */}
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
                      {/* //custon-select-wrap */}

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
                <p className='tit'>URL </p>
                <p className='info'>잔디에서 발송되는 Webhook을 수신할 대상 URL을 입력해주세요.</p>
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

export default Outgoing;
