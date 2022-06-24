/* eslint-disable max-len */
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import { Input } from 'antd';
import { getPublicAssetPath } from '../../../../../../lib/assetHelper';
import Router, {useRouter} from "next/router";
import {modules as teamModules} from "../../../../../../store/team/team";
import {modules as connectModules} from "../../../../../../store/connect/connect";

const ConnectPlugHeader = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { connect, team, user } = useSelector((state) => (state));
  const [connectType, setConnectType] = useState('');
  const [inputVal, setInputVal] = useState('');
  const [searchKeyward, setSearchKeyward] = useState([
    { label: '생성자', class: 'on' },
    { label: '연동된 토픽 / JANDI', class: '' },
    { label: '커넥트', class: '' },
  ]);

  useEffect(() => {
    console.log('searchList')

  }, []);

  /**
   * 검색 모듈
   * TODO: 1차 샘플링
   */
  const searcher = ((keyward, dispatch) => {
    const open = (e) => {
      e.stopPropagation();
      const selectBoxs = document.querySelectorAll('.select-box');
      if (e.target.closest('.select-box').classList.contains('on')) {
        e.target.closest('.select-box').classList.remove('on');
      } else {
        selectBoxs.forEach((selectbox) => selectbox.classList.remove('on'));
        e.target.closest('.select-box').classList.add('on');
      }
    };
    function fields() {
      return [
        { value: 0, field: 'member.name', label: '생성자', class: 'on' },
        { value: 1, field: '', label: '연동된 토픽 / JANDI', class: '' },
        { value: 2, field: 'bot.name', label: '커넥트', class: '' },
      ];
    }
    function change(e) {
      keyward[1](e.target.value);
    }
    function initialize(document) {
    }
    function value() {
      return keyward[0];
    }
    function search() {
      const filters = [];
      const searchType = document.querySelector('.select-list .on');
      const query = fields()[searchType.getAttribute('value')].value;

      for (const item of connect.teamsConnect[connectType]) {
        if (query === 0 && item.member && item.member.name && item.member.name.indexOf(keyward[0]) > -1) {
          filters.push(item);
        }
      }
      dispatch(connectModules.creators.setTeamsConnectDetail(filters));
    }
    return {
      initialize,
      fields, open,
      change,
      value,
      search,
    }
  })(useState(''), dispatch);

  useEffect(() => {
    searcher.initialize(document);
  }, []);

  /**
   * 올바른 접근이 아닐 경우 튕김
   * TODO: 공통화
   */
  useEffect(() => {
    if (router.asPath.indexOf('?') === -1) {
      Router.push('/app', '/app');
    }

    setConnectType(router.asPath.split('?')[1].split('#')[0]);
  }, []);
  useEffect(() => {
    if (connectType === '' || Object.keys(connect.connectsObj).length === 0) return;

    if (!connect.connectsObj[connectType]) {
      Router.push('/app', '/app');
    }
  }, [connectType, connect.connectsObj]);

  const [selectVal, setSelectVal] = useState('');

  /* switch toggle */
  const onToggle = (e) => {
    e.target.closest('.switch').classList.toggle('on');
    e.target.closest('tr').classList.toggle('disabled');
  };
  /* custom selectbox  */
  /* custom selectbox */
  useEffect(() => {
    const select = document.querySelectorAll('.select-list a');
    const selectBox = document.querySelector('.select-box');
    select.forEach((box) => {
      box.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        setSelectVal(e.currentTarget.innerText);

        select.forEach((el) => {
          el.classList.remove('on');
        });
        target.classList.add('on');
        selectBox.classList.toggle('on');
      })
    });
    const handleClickBody = (e) => {
      e.preventDefault();
      if ((e.target.closest('.select-box') === null && selectBox.classList.contains('on'))) {
        selectBox.classList.toggle('on');
      }
    };
    document.querySelector('body').addEventListener('click', handleClickBody);

    return () => {
      document.querySelector('body').removeEventListener('click', handleClickBody);
    };

  }, []);

  return (<>
    <div className='detail-header'>
      <div className='inner'>
        <div className='connect-info-box'>
          { connect.connectsObj[connectType] &&
              <>
                <p className='img-box'>
                  <img src={connect.connectsObj[connectType].botThumbnail}
                       alt={connect.connectsObj[connectType].name}></img>
                </p>
                <div className='info'>
                  <strong className="info-tit">{connect.connectsObj[connectType].label}</strong>
                  <p>{connect.connectsObj[connectType].category}</p>
                </div>
              </>
          }
          <div className="board-search-bar">
            <div className="select-box">
              <a href="#none" title="검색필드 선택" className="select-value" value={selectVal}
                 onClick={searcher.open}><span>{selectVal === '' ? '생성자' : selectVal}</span></a>
              <div className="select-list">
                <ul>
                  {
                    searcher.fields().map((data, i) => (
                      <li key={i}><a href="#none" className={data.class} value={data.value}><span>{data.label}</span></a></li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <Input
                type="text"
                placeholder="검색어를 입력하세요."
                title="검색어 입력"
                value={searcher.value()}
                onChange={searcher.change}></Input>
            <button type="button"
                    className="search-btn"
                    // disabled={searcher.value() === ''}
                    onClick={searcher.search}
            >검색</button>
          </div>
        </div>
      </div>
    </div>
  </>);
};
export default ConnectPlugHeader;
/**
 * TODO: 페이징
 * TODO: 이미지 radius
 * TODO: 토픽명 매핑
 */
