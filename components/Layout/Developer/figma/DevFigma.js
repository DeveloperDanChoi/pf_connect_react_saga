/* eslint-disable max-len,import/no-unresolved */
import React, {useEffect, useRef, useState} from 'react';
import {connect_api} from "../../../../api/_call";
import {getCookie} from "../../../../service/cookie";
import axios from "axios";
import getConfig from "next/config";
import {modules as themeModules} from "../../../../store/theme/theme";

const cssWrapper = {
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: 0,
  overflow: 'hidden',
  zIndex: 10,
  background: '#fffefc',
};
const cssLabel = 'color: brown; padding: 5px; ';
const cssValue = 'padding: 5px; ';
const cssMenu = {
  position: 'absolute',
  top: 0,
  width: '100%',
  padding: '1rem'
};
const cssHistoryTab = {
  position: 'absolute',
  top: '3rem',
  width: '100%',
  padding: '1rem',
  display: 'flex',
};
const cssResult = {
  marginTop: '6.1rem',
  height: '90vh',
  overflow: 'auto',
};
const cssColorBlue = 'color: blue; ';
const cssButton = {
  margin: '0 1rem',
};
const cssImg = 'align-items: flex-start; display: flex;';

const DevFigma = () => {

  const [token, setToken] = useState();
  const [idInput, setIdInput] = useState('wHTeGiw2kFqtPnV6PHQxWc');
  const [figmaUrl, setFigmaUrl] = useState('');
  const [hisTab, setHisTab] = useState([]);
  const [hisTabNm, setHisTabNm] = useState([]);
  const figmaFav = 'https://www.figma.com/oauth?client_id=IZ1eQO3vEbhj2z9sUJbqSH&redirect_uri=http://localhost:8080/authroize&scope=file_read&state=state&response_type=code';

  /**
   * 토큰 정보
   * @returns {Promise<void>}
   */
  const getToken = async () => {
    const result = await axios.get('http://localhost:8080/notion/token',
        {
          headers: {
            'connect-type': 'application/json;charset=UTF-8',
            'accept': 'application/vnd.tosslab.jandi-v1+json',
          },
        },
    ).catch((err) => console.error(err));

    setToken(result.data);
  };

  useEffect(() => {
    // getToken();
  }, []);

  /**
   * 토큰이 있을 경우 특정 데이터 호출
   */
  useEffect(() => {
    if (!token) return;
    console.log( token )
    // apiUrl({type: 'get', url: 'https://api.notion.com/v1/blocks/cdd93a05c84845b5ba9d33962b1caa67/children'});
  }, [token]);

  const handleClick = () => {
    window.open('https://www.figma.com/oauth?' +
        [ 'client_id=IZ1eQO3vEbhj2z9sUJbqSH',
          'response_type=code',
          'redirect_uri=http://localhost:8080/figmaCallback',
          'scope=file_read',
          'state=state',
        ].join('&')
    );
  }

  /**
   * 객체
   * @param content
   * @param data
   * @param item
   * @param depth
   * @returns {*}
   */
  const addElemenObject = (content, data, item, depth = 0) => {
    content += '<div style="display: flex; padding-left: ' + depth + 'rem;" class="' + depth + '">';
    content += '<div style="' + cssLabel + '">' + item + '</div>';
    content += '<div style="' + cssValue + '">' + typeof data[item] + '</div>';
    content += '</div>';
    return content;
  };
  /**
   * 배열
   * @param content
   * @param data
   * @param item
   * @param depth
   * @returns {*}
   */
  const addElementArray = (content, data, item, depth = 0) => {
    content += '<div style="display: flex; padding-left: ' + depth + 'rem; height: 10px" class="' + depth + '">';
    content += '<div style="width: 10rem">' + '-' + '</div>';
    content += '<div>' + '' + '</div>';
    content += '</div>';
    return content;
  };
  const addImg = (value, style = 'width: 100%; ') => {
    return '<img src="' + value + '" style="' + style + '"></img>';
  };
  const addDiv = (value, style = 'width: 100%; ') => {
    return '<div " style="' + style + '">' + value + '</div>';
  };
  /**
   * 문자
   * @param content
   * @param data
   * @param item
   * @param depth
   * @returns {*}
   */
  const addElemenString = (content, data, item, depth = 0) => {
    content += '<div style="display: flex; padding-left: ' + depth + 'rem" class="' + depth + '">';
    content += '<div style="' + cssLabel + '">' + item + '</div>';
    if (typeof data[item] === 'string' &&
        ( data[item].indexOf('.jpg') > -1 ||
            item === 'thumbnailUrl' ||
            item === 'img_url'
        )
    ) {
      content += '<div style="' + cssValue + '">' + addImg(data[item]) + '</div>';
    } else if(item === 'url') {
      content += '<div style="' + cssValue + cssImg + '" class="linked" data-target="' + data[item] + '">' + addImg(notionFav, 'width: 16px;') + addDiv(data[item], 'padding-left: 5px;') + '</div>';
    } else {
      content += '<div style="' + cssValue + '">' + data[item] + '</div>';
    }
    content += '</div>';
    return content;
  };
  const addElement = (content, data, depth = 0) => {
    depth++;

    for (const item in data) {
      // console.log( typeof data[item] )
      if (typeof data[item] === 'object') {
        if (data[item] && parseInt(item) > -1) {
          content = addElementArray(content, data, item, depth);
        } else {
          content = addElemenObject(content, data, item, depth);
        }
        content = addElement(content, data[item], depth);
      } else {
        content = addElemenString(content, data, item, depth);
      }
    }

    return content;
  };

  /**
   * json > table 변환
   * @param data
   */
  const view = (data) => {
    const el = document.getElementById('view-result')
    let content = addElement('', data);
    // for (const item in data) {
    //   content += '<div>' + item + '</div>';
    // }
    el.innerHTML = content;

    el.querySelectorAll('.clicked').forEach((_el,i) => {
      _el.addEventListener('click', (e) => {
        const type = (() => {
          switch(e.target.dataset.target) {
            case "page":
              return 'blocks/';
            case "user":
              return 'users/';
          }
        })();
        apiUrl({
          type: 'get',
          url: 'https://api.notion.com/v1/' + type + e.target.textContent,
        });
      });
    });

    el.querySelectorAll('.linked').forEach((_el,i) => {
      _el.addEventListener('click', (e) => {
        window.open(e.target.innerText);
      });
    });

    // el.innerHTML = JSON.stringify( data );
  };

  /**
   * TODO: token 하드코딩 -> url 동적처리
   * @param data
   * @returns {Promise<void>}
   */
  const localLoad = async (data) => {
    const result = await axios.get('http://localhost:8080/figma/token',
        data,
        {
          headers: {
            'Notion-Version': '2022-02-22',
            'connect-type': 'application/json;charset=UTF-8',
            'accept': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        },
    ).catch((err) => console.error(err));
    //secret_Mrh7rbN1yleMynoBWcg7wX7jdv7EHl3ELzauseialhi

    console.log( result );
  };

  const handleClickReq = async (data, e) => {
    const result = await axios.post('http://localhost:8080/figma/dynamic/request',
        data,
        {
          headers: {
            'Notion-Version': '2022-02-22',
            'connect-type': 'application/json;charset=UTF-8',
            'accept': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        },
    ).catch((err) => console.error(err));
    //secret_Mrh7rbN1yleMynoBWcg7wX7jdv7EHl3ELzauseialhi

    console.log( result );
    if (result) {
      view( result.data );
      const arr = [...hisTab];
      arr.push( result.data );
      setHisTab(arr);

      const arr2 = [...hisTabNm];
      arr2.push( e ? e.target.textContent : 'history' );
      setHisTabNm(arr2);
    }
  };

  const apiUrl = async (data, e) => {
    await handleClickReq(data, e);
  };
  const apiUrl2 = async (data, e) => {
    data.url = data.url + '/' + idInput;
    await handleClickReq(data, e);
  };
  const apiUrl3 = async (data, e) => {
    data.url = data.url.replace('{file_id}', idInput);
    await handleClickReq(data, e);
  };

  const handleClickLoad = (data) => {
    view(data);
  };

  return (<>
    <div style={cssWrapper}>
      <div style={cssMenu}>
        <button style={cssButton} onClick={handleClick}>인증하기</button>
        <button style={cssButton} onClick={() => localLoad()}>token</button>
        <button style={cssButton} onClick={(e) => apiUrl({type: 'get', url: 'https://api.figma.com/v1/me'}, e)}>user</button>
        <button style={cssButton} onClick={(e) => apiUrl({type: 'get', url: 'https://api.figma.com/v1/teams/1110036243356958775/projects'}, e)}>team</button>
        <button style={cssButton} onClick={(e) => apiUrl({type: 'get', url: 'https://api.figma.com/v1/projects/57170555/files'}, e)}>project</button>
        <button style={cssButton} onClick={(e) => apiUrl3({type: 'get', url: 'https://api.figma.com/v1/files/{file_id}'}, e)}>file</button>
        <button style={cssButton} onClick={(e) => apiUrl3({type: 'get', url: 'https://api.figma.com/v1/files/{file_id}/comments'}, e)}>comments</button>
        <input style={cssButton} placeholder="id" value={idInput} onChange={(e) => setIdInput(e.target.value)} />
      </div>
      <div style={cssHistoryTab}>
        { hisTab.map((data, i) => (
            <div key={i} style={cssButton} onClick={() => handleClickLoad(data)}
            >{hisTabNm[i]}{i}</div>
        )) }
      </div>
      <div id={"view-result"} style={cssResult}></div>
    </div>
  </>);
};
export default DevFigma;
