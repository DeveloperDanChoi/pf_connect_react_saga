/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/jira/jira';
import { template1 } from '../../../../../service/connect';
import Thumbnail from "../../../../ui/Thumbnail/Thumbnail";
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';

const Jira = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { team, jira } = useSelector((state) => {
    console.log('Jira state !!', state);
    return state;
  });
  const { creators } = modules;

  const [searchVal, setSearchVal] = useState(''); /* [D] 임시.  댄이 작업에 맞게 수정해주심 됩니다. */

  /* custom select box value */
  const [selects, setSelects] = useState({
    langVal: '',
    topicVal: '',
    accoutVal: '',
    topicSearchVal: '',
  });
  const { langVal, topicVal } = selects;

  /* custon select */
  const onSelect = (e) => {
    const selectBoxs = document.querySelectorAll('.select-box');
    selectBoxs.forEach((selectbox) => selectbox.classList.remove('on'));
    e.target.closest('.select-box').classList.toggle('on');
  };

  const onChangeSelect = (e) => {
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
      connectType: 'jira',
      modules,
      list: creators.getTeamsToken,
      load: creators.getTeamsJira,
      connect: [creators.postTeamsJira, creators.putTeamsJiraSetting],
      set: creators.setInputJira,
    });
  }, []);

  return (<>
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_jira.png')} alt="jira"></img></p>
            <div className='info'>
                <strong>김지영</strong><span>의 Jira</span>
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
      <div className='detail-connect-wrapper'>
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
                <p className='tit'>프로필 설정</p>
                <p className='info'>팀 내에서 이 커넥트 항목이 메시지를 보낼 때의 프로필 이미지와 이름을 지정하실 수 있습니다.</p>
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
        <div className='connect-row-item webhook'>{/* [P] : webhook URL 등록 일 경우 webhook 클래스 추가 */}
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
          <button type='button' className='full-btn'>수정하기</button>
      </div>{/* //detail-wrapper */}
    </div>
  </>);
};

export default Jira;
