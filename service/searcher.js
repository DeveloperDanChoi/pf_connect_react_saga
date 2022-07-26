/* eslint-disable no-restricted-syntax,guard-for-in */
/**
 * TODO: 검색 관련 통합
 */

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
  /**
   * 아이템 선택<br>
   * @param e
   * @param data
   */
  function select2(e, data) {
    e.stopPropagation();
    e.preventDefault();
    const target = e.currentTarget;
    const selectLists = target.closest('.select-list').querySelectorAll('li a');
    const { name } = target.closest('.select-box').firstChild;

    selectLists.forEach((list) => list.classList.remove('on'));
    target.classList.toggle('on');
    target.closest('.select-box').classList.toggle('on');

    searcher.set(name, data.value);
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
    select2,
  };
})();

/**
 * 검색 모듈
 * TODO: 1차
 */
export const searcherCal = (() => {
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
    console.log( target )
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
    searcher.set('searchCalText', e.target.value);
    searcher.set('searchCalFilters', (() => {
      const arr = [];

      for (const cal of that.googleCalendar.authenticationGoogleCalendarCalendarList) {
        for (const list of cal.list) {
          if (list.summary.indexOf(e.target.value) > -1) {
            arr.push(list);
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
    searcher.set('selectedCal', target.innerText);
    searcher.set('calendarId', data.id);
    searcher.set('calendarSummary', data.summary);

    selectLists.forEach((list) => list.classList.remove('on'));
    target.classList.toggle('on');
    target.closest('.select-box').classList.toggle('on');
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
    change,
    select,
  };
})();
export const searcherRepo = (() => {
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
    console.log( target )
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
    searcher.set('searchRepoText', e.target.value);
    searcher.set('searchRepoFilters', (() => {
      const arr = [];

      for (const repo of that.github.authenticationGithubReposList.repos) {
        for (const list of repo.lists) {
          if (list.name.indexOf(e.target.value) > -1) {
            arr.push(list);
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
    searcher.set('selectedRepo', target.innerText);
    searcher.set('hookRepoId', data.id);
    searcher.set('hookRepoName', data.name);

    selectLists.forEach((list) => list.classList.remove('on'));
    target.classList.toggle('on');
    target.closest('.select-box').classList.toggle('on');
  }

  function initialize(data) {
    for (const item in data) {
      that[item] = data[item];
    }

    console.log(that.github);

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
export const searcherBoard = (() => {
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
    console.log( target )
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
    searcher.set('searchBoardText', e.target.value);
    searcher.set('searchBoardFilters', (() => {
      const arr = [];

      for (const board of that.trello.authenticationTrelloBoardsList.boards) {
        if (board.name.indexOf(e.target.value) > -1) {
          arr.push(board);
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
    console.log(0, e, data)
    e.stopPropagation();
    e.preventDefault();
    const target = e.currentTarget;
    const selectLists = target.closest('.select-list').querySelectorAll('li a');
    const { name } = target.closest('.select-box').firstChild;
console.log(1)
    // selects[1]({
    //   ...selects[0],
    //   [name]: target.innerText,
    // });
    searcher.set('selectedBoard', target.innerText);
    searcher.set('trelloBoardId', data.id);
    searcher.set('trelloBoardName', data.name);
    console.log(2)
    selectLists.forEach((list) => list.classList.remove('on'));
    target.classList.toggle('on');
    target.closest('.select-box').classList.toggle('on');
    console.log(3)
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
    change,
    select,
  };
})();
export const searcherAuth = (() => {
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
    console.log( target )
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

    searcher.set('selectedAuthentication', target.innerText);
    if (data.authenticationName) {
      searcher.set('googleId', data.authenticationName);
    } else {
      searcher.set('connectId', data.connectId);
    }

    selectLists.forEach((list) => list.classList.remove('on'));
    target.classList.toggle('on');
    target.closest('.select-box').classList.toggle('on');
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
