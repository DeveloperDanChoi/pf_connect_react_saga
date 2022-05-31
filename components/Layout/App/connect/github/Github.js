/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { modules } from '../../../../../store/connect/github/github';
import { template1 } from '../../../../../service/connect';
import Thumbnail from '../../../../ui/Thumbnail/Thumbnail';
import { getPublicAssetPath } from '../../../../../lib/assetHelper';
import { Input } from 'antd';

const Github = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { team, github } = useSelector((state) => {
    // console.log('Github state !!', state);
    return state;
  });
  const { creators } = modules;

  const [searchVal, setSearchVal] = useState(''); /* [D] 임시.  댄이 작업에 맞게 수정해주심 됩니다. */

  /* custom check box value */
  const [checkboxs, setCheckboxs] = useState({
    commit: false,
    pullRequest: false,
    issue: false,
    branchTag: false,
    commitComment: false,
    pullRequestComment: false,
    issueComment: false,
    pullRequestReview: false,
  });
  /* custom select box value */
  const [selects, setSelects] = useState({
    langVal: '',
    topicVal: '',
    accoutVal: '',
    repositoryVal: '',
  });

  const { langVal, topicVal, accoutVal, repositoryVal } = selects;
  const { commit, pullRequest, issue, branchTag, commitComment, pullRequestComment, issueComment, pullRequestReview } = checkboxs;

  /* custon checkbox */
  const onChangeCheckbox = (e) => {
    e.preventDefault();
    const target = e.currentTarget.querySelector('input');
    setCheckboxs({
      ...checkboxs,
      [target.name]: !target.checked,
    });
  }

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
      connectType: 'github',
      modules,
      list: creators.getAuthenticationGithubReposList,
      load: creators.getTeamsGithub,
      connect: [creators.postTeamsGithub, creators.putTeamsGithubSetting],
      disconnect: creators.deleteAuthentications,
      set: creators.setInputGithub,
    });
  }, []);

  return (<>
    <div className='detail-container'>
      <div className='detail-header'>
        <div className='inner'>
          <div className='connect-info-box'>
            <p className='img-box'><img src={getPublicAssetPath('static/icon_github.png')} alt="github"></img></p>
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
                      <a href="#none" title="검색필드 선택" className="select-value" value={accoutVal} name="accoutVal" onClick={onSelect}><span>{accoutVal === '' ? 'jandi@tosslab.com' : accoutVal}</span></a>
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
                <p className='tit'>Repository 선택</p>
                <p className='info'>알림을 받고자 하는 Repository/Branch를 선택해주세요.</p>
              </dt>
              <dd>
                <div className='input-row'>
                  <div className="select-box repository mgr8">
                    <a href="#none" title="검색필드 선택" className="select-value" name='topicVal' onClick={onSelect}><span>{topicVal === '' ? 'Repository 선택' : topicVal}</span></a>
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
                            <ul>
                              <li><span className='tit'>Repository 선택</span></li>
                            </ul>
                             <dl className='option-wrap'>
                                <dt className='tit'>tosslab</dt>
                                <dd>
                                  <ul>
                                    <li><a href='#none' onClick={onChangeSelect}>web_client</a></li>
                                    <li><a href='#none' onClick={onChangeSelect}>web_admin</a></li>
                                    <li><a href='#none' onClick={onChangeSelect}>react_landing</a></li>
                                    <li><a href='#none' onClick={onChangeSelect}>web_client</a></li>
                                    <li><a href='#none' onClick={onChangeSelect}>web_client</a></li>
                                    <li><a href='#none' onClick={onChangeSelect}>web_client</a></li>
                                    <li><a href='#none' onClick={onChangeSelect}>web_client</a></li>
                                    <li><a href='#none' onClick={onChangeSelect}>web_client</a></li>
                                    <li><a href='#none' onClick={onChangeSelect}>web_client</a></li>
                                    <li><a href='#none' onClick={onChangeSelect}>web_client</a></li>
                                  </ul>
                                </dd>
                              </dl>
                              <dl className='option-wrap'>
                                <dt className='tit'>tosslab2</dt>
                                <dd></dd>
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
                          <li><a href='#none' onClick={onChangeSelect}>web_client</a></li>
                          <li><a href='#none' onClick={onChangeSelect}>web_admin</a></li>
                          <li><a href='#none' onClick={onChangeSelect}>react_landing</a></li>
                          <li><a href='#none' onClick={onChangeSelect}>web_client</a></li>
                          <li><a href='#none' onClick={onChangeSelect}>web_client</a></li>
                          </ul>
                          <p className='tit no-result'>결과가 없습니다.</p>
                        </div>
                        )
                      }
                      {/* search-list-wrap */}
                    </div>
                  </div>{/* //select-box */}
                  <Input type="text" className='input-type' placeholder='brach(선택사항)'></Input>
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
                    <ul>
                      <li>
                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                          <input type="checkbox" id="commit" checked={commit} value="1" name="commit"/>
                          <label htmlFor="commit"><span>Commits</span></label>
                        </div>
                      </li>
                      <li>
                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                          <input type="checkbox" id="pullRequest" checked={pullRequest} value="1" name="pullRequest"/>
                          <label htmlFor="pullRequest"><span>Pull Requests Opened / Closed</span></label>
                        </div>
                      </li>
                      <li>
                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                          <input type="checkbox" id="issue" checked={issue} value="1" name="issue"/>
                          <label htmlFor="issue"><span>Issue Opened / Closed</span></label>
                        </div>
                      </li>
                      <li>
                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                          <input type="checkbox" id="branchTag" checked={branchTag} value="1" name="branchTag"/>
                          <label htmlFor="branchTag"><span>Branch or Tag Created / Deleted</span></label>
                        </div>
                      </li>
                      <li>
                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                          <input type="checkbox" id="commitComment" checked={commitComment} value="1" name="commitComment"/>
                          <label htmlFor="commitComment"><span>Commit Comments</span></label>
                        </div>
                      </li>
                      <li>
                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                          <input type="checkbox" id="pullRequestComment" checked={pullRequestComment} value="1" name="pullRequestComment"/>
                          <label htmlFor="pullRequestComment"><span>Pull Request Comments</span></label>
                        </div>
                      </li>
                      <li>
                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                          <input type="checkbox" id="issueComment" checked={issueComment} value="1" name="issueComment"/>
                          <label htmlFor="issueComment"><span>Issue Comments</span></label>
                        </div>
                      </li>
                      <li>
                        <div className='custom-checkbox' onClick={onChangeCheckbox}>
                          <input type="checkbox" id="pullRequestReview" checked={pullRequestReview} value="1" name="pullRequestReview"/>
                          <label htmlFor="pullRequestReview"><span>Pull Request Review</span></label>
                        </div>
                      </li>
                    </ul>
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
                    <img src={getPublicAssetPath('static/icon_github.png')} alt="github"></img>
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
                    <a href="#none" title="검색필드 선택" className="select-value cl-green" name='repositoryVal' onClick={onSelect}><span>{repositoryVal === '' ? '그룹에 속한 대화방 1' : repositoryVal}</span></a>
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
        <button type='button' className='full-btn'>수정하기</button>
      </div>{/* //detail-wrapper */}
    </div>
  </>);
};

export default Github;
