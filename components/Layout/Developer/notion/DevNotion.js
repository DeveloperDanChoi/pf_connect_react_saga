/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks */
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

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
  padding: '1rem',
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

const DevNotion = () => {

  const [token, setToken] = useState();
  const [idInput, setIdInput] = useState('');
  const [notionUrl, setNotionUrl] = useState('');
  const [hisTab, setHisTab] = useState([]);
  const notionFav = 'https://www.notion.so/image/https%3A%2F%2Ffiles.readme.io%2F4029db5-favicon.ico?table=block&id=972213bd-5909-49ed-b07e-839b4f4b119c&spaceId=7f901789-bf95-4b59-92aa-17988ff2b0c7&userId=e767df02-f0e3-43ef-a79d-3b8d4039cff7&cache=v2';

  /**
   * 토큰 정보
   * @returns {Promise<void>}
   */
  const getToken = async () => {
    const result = await axios.get('http://localhost:8080/notion/token',
      {
        headers: {
          'connect-type': 'application/json;charset=UTF-8',
          accept: 'application/vnd.tosslab.jandi-v1+json',
        },
      },
    ).catch((err) => console.error(err));

    setToken(result.data);
  };

  useEffect(() => {
    getToken();
  }, []);

  /**
   * 토큰이 있을 경우 특정 데이터 호출
   */
  useEffect(() => {
    if (!token) return;
    console.log(token);
    // apiUrl({type: 'get', url: 'https://api.notion.com/v1/blocks/cdd93a05c84845b5ba9d33962b1caa67/children'});
  }, [token]);

  const handleClick = () => {
    window.open(`https://api.notion.com/v1/oauth/authorize?${
      ['response_type=code',
        'client_id=1a291f86-bd7f-4573-84bd-2a46c9c5dcc7',
        'redirect_uri=http://localhost:8080/notionCallback',
        // 'redirect_uri=http://05a0-58-151-209-130.ngrok.io/notionCallback',
        // 'redirect_uri=https://zapier.com/dashboard/auth/oauth/return/NotionCLIAPI',
        'owner=user',
        // 'state=1648084461.251121828443',
        '',
      ].join('&')}`);
  };

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
        ( data[item].indexOf('.jpg') > -1 || item === 'avatar_url' )
    ) {
      content += '<div style="' + cssValue + '">' + addImg(data[item]) + '</div>';
    } else if(item === 'id' && data.object) {
      content += '<div style="' + cssValue + cssColorBlue + '" class="clicked" data-target="' + data.object + '">' + data[item] + '</div>';
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
    const el = document.getElementById('view-result');
    let content = addElement('', data);
    // for (const item in data) {
    //   content += '<div>' + item + '</div>';
    // }
    el.innerHTML = content;

    el.querySelectorAll('.clicked').forEach((_el,i) => {
      _el.addEventListener('click', (e) => {
        const type = (() => {
          switch(e.target.dataset.target) {
            case 'page':
              return 'blocks/';
            case 'user':
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

  const handleClickReq = async (data) => {
    const result = await axios.post('http://localhost:8080/notion/dynamic/request',
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
    }
  };

  const apiUrl = async (data) => {
    await handleClickReq(data);
  };
  const apiUrl2 = async (data) => {
    data.url = data.url + '/' + idInput;
    await handleClickReq(data);
  };
  const apiUrl3 = async (data) => {
    data.url = data.url.replace('{block_id}', idInput);
    await handleClickReq(data);
  };

  const handleClickLoad = (data) => {
    view(data);
  };

  return (<>
    <div style={cssWrapper}>
      <div style={cssMenu}>
        <button style={cssButton} onClick={handleClick}>인증하기</button>
        <button style={cssButton} onClick={() => apiUrl({type: 'post', url: 'https://api.notion.com/v1/search'})}>search</button>
        <button style={cssButton} onClick={() => apiUrl({type: 'get', url: 'https://api.notion.com/v1/users'})}>users</button>
        <button style={cssButton} onClick={() => apiUrl2({type: 'get', url: 'https://api.notion.com/v1/pages'})}>pages</button>
        <button style={cssButton} onClick={() => apiUrl3({type: 'get', url: 'https://api.notion.com/v1/blocks/{block_id}'})}>blocks</button>
        <button style={cssButton} onClick={() => apiUrl3({type: 'get', url: 'https://api.notion.com/v1/blocks/{block_id}/children'})}>blocks children</button>
        <input style={cssButton} placeholder="id" value={idInput} onChange={(e) => setIdInput(e.target.value)} />
      </div>
      <div style={cssHistoryTab}>
        { hisTab.map((data, i) => (
            <div key={i} style={cssButton} onClick={() => handleClickLoad(data)}
            >history{i}</div>
        )) }
      </div>
      <div id={'view-result'} style={cssResult}/>
    </div>
  </>);
};
export default DevNotion;
