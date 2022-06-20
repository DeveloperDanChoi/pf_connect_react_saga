/* eslint-disable no-restricted-syntax,guard-for-in */
/**
 * 검색 모듈
 * TODO: 1차
 */
export const searcher = (() => {
  const that = {
    dispatch: {},
    connectType: '',
  };

  /**
   * 아이템 선택 리스트<br>
   */
  function open(e) {
    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget.closest('.select-box');
    const selectBoxs = that.document.querySelectorAll('.select-box');
    if (target.classList.contains('on')) {
      target.classList.remove('on');
    } else {
      selectBoxs.forEach((selectbox) => selectbox.classList.remove('on'));
      target.classList.add('on');
    }
  }

  /**
   * 검색어 변경됐을 때<br>
   * @param e
   */
  function change(e) {
    searcher.set('searchText', e.target.value);
    searcher.set('searchFilters', (() => {
      const arr = [];

      for (const topic of that.user.rooms.topics) {
        if (topic.name.indexOf(e.target.value) > -1) {
          arr.push(topic);
        }
      }

      for (const bot of that.user.rooms.bots) {
        if (bot.name.indexOf(e.target.value) > -1) {
          for (const chat of that.user.rooms.chats) {
            if (bot.id === chat.companionId) {
              arr.push(bot);
            }
          }
        }
      }

      return arr;
    })());
  }

  /**
   * 아이템 선택<br>
   * @param e
   * @param data
   */
  function select(e, data) {
    e.stopPropagation();
    e.preventDefault();
    const target = e.currentTarget;
    const selectLists = target.closest('.select-list').querySelectorAll('li a');
    const { name } = target.closest('.select-box').firstChild;

    // selects[1]({
    //   ...selects[0],
    //   [name]: target.innerText,
    // });
    searcher.set('selectedTopic', target.innerText);

    selectLists.forEach((list) => list.classList.remove('on'));
    target.classList.toggle('on');
    target.closest('.select-box').classList.toggle('on');

    if (data.viewType === 'chat') {
      searcher.set('roomId', data.id);
    } else {
      for (const chat of that.user.rooms.chats) {
        if (chat.companionId === data.id) {
          searcher.set('roomId', chat.id);
          break;
        }
      }
    }
  }

  function initialize(data) {
    for (const item in data) {
      that[item] = data[item];
    }

    const { folders } = that.user.rooms;
    const topics = ((topicsData) => {
      const newTopics = [];
      for (const topic of topicsData) {
        newTopics.push({ ...topic, parent: false });
      }
      return newTopics;
    })(that.user.rooms.topics);
    const newRooms = [];

    for (const folder of folders) {
      newRooms.push({
        ...folder,
        rooms: ((rooms) => {
          const newRoom = [];
          for (const room of rooms) {
            for (const topic of topics) {
              if (room === topic.id) {
                topic.parent = true;
                newRoom.push(topic);
                break;
              }
            }
          }
          return newRoom;
        })(folder.rooms),
      });
    }

    for (const topic of topics) {
      if (!topic.parent) {
        newRooms.push(topic);
      }
    }

    searcher.set('searchRooms', newRooms);
  }

  /**
   * 해당 서비스에서 접근 가능한 연동 리스트<br>
   * @param data
   */
  function set(key, value) {
    that.dispatch(that.set.call(null, { key, value }));
  }

  return {
    initialize,
    set,
    open,
    change,
    select,
  };
})();

/**
 * 검색 모듈
 * TODO: 1차
 */
export const searcherLanguage = (() => {
  const that = {
    dispatch: {},
    connectType: '',
  };

  /**
   * 아이템 선택 리스트<br>
   */
  function open(e) {
    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget.closest('.select-box');
    const selectBoxs = that.document.querySelectorAll('.select-box');
    if (target.classList.contains('on')) {
      target.classList.remove('on');
    } else {
      selectBoxs.forEach((selectbox) => selectbox.classList.remove('on'));
      target.classList.add('on');
    }
  }

  /**
   * 아이템 선택<br>
   * @param e
   * @param data
   */
  function select(e, data) {
    e.stopPropagation();
    e.preventDefault();
    const target = e.currentTarget;
    const selectLists = target.closest('.select-list').querySelectorAll('li a');
    const { name } = target.closest('.select-box').firstChild;

    // selects[1]({
    //   ...selects[0],
    //   [name]: target.innerText,
    // });
    searcher.set('langText', target.innerText);

    selectLists.forEach((list) => list.classList.remove('on'));
    target.classList.toggle('on');
    target.closest('.select-box').classList.toggle('on');

    searcher.set('lang', data);
  }

  function initialize(data) {
    for (const item in data) {
      that[item] = data[item];
    }
  }

  /**
   * 해당 서비스에서 접근 가능한 연동 리스트<br>
   * @param data
   */
  function set(key, value) {
    that.dispatch(that.set.call(null, { key, value }));
  }

  return {
    initialize,
    set,
    open,
    select,
  };
})();
