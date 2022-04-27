import io from 'socket.io-client';
// import getConfig from "next/config";
import { Storage } from '../storage.service';
import { JndVersion } from '../jnd.version.service';
import { api } from '../../api/_call';
import { config } from '../../lib/config';

export const SocketEventHistory = (() => {
  const SOCKET_TIME_BUFFER = 5000;
  let _eventsHistoryCallTime = new Date();
  let _queue = [];
  let _socketEvents = [];

  /**
   * socket listening to events list<br>
   * @param eventName
   * @param emitter
   */
  function addSocketEvent(eventName, emitter) {
    _socketEvents.push({ event: eventName, callback: emitter });
  }

  /**
   * 중복 호출 방지를 위한 저장소 초기화<br>
   */
  function clearQueue() {
    _queue = [];
  }

  /**
   * 처리된 데이터 추가<br>
   * @param unique
   * @private
   */
  function _addQueue(unique) {
    _queue.push(unique);
  }

  /**
   * 처리된 데이터가 있는지 확인<br>
   * @param record
   * @returns {boolean}
   * @private
   */
  function _hasQueue(record) {
    const max = _queue.length;
    let flag = false;

    for (let i = 0; i < max; i++) {
      if (_queue[i] === record.unique) {
        flag = true;
        break;
      }
    }

    return flag;
  }

  /**
   * 연결이 끊어진 동안 발생한 이벤트<br>
   * @param param
   * @param callback
   * @private
   */
  function _getHistory(param, callback) {
    api.get(`/inner-api/events?ts=${param}`, { version: 2 }).then((res) => {
      let data = [];

      if (res.data && res.data.records) {
        const records = res.data.records;

        for (let record of records) {
          if (!_hasQueue(record)) {
            data.push(record);
          }
        }
      }

      callback(data);
    }).catch(() => console.error('error !!'));
  }

  /**
   * 이벤트 처리<br>
   * @param nowTime
   */
  function apply(nowTime) {
    const callInterval = nowTime - _eventsHistoryCallTime;
    const lastTime = _eventsHistoryCallTime;

    if (callInterval < 3000) return;

    _eventsHistoryCallTime = nowTime;

    _getHistory(Math.max(lastTime - SOCKET_TIME_BUFFER, 0), records => {
      for (let data of records) {
        _trigger(data);
      }
    });
  }

  /**
   * event trigger<br>
   * @param data
   * @private
   */
  function _trigger(data) {
    for (let event of _socketEvents) {
      if (data.event === event.event) {
        event.callback(data);

        _addQueue(data.unique);
      }
    }
  }

  /**
   * @deprecated
   * @param time
   * @returns {Date}
   */
  function callTime(time) {
    if (!time) return _eventsHistoryCallTime;

    _eventsHistoryCallTime = time;
  }

  return {
    apply, addSocketEvent, clearQueue, callTime,
  };
})();

export const JndSocket = (() => {
  const PING_INTERVAL = 25000;
  const PING_TIMEOUT = 45000;
  let socket;

  /**
   * socket connect<br>
   * @returns {*}
   */
  function connect() {
    if (socket) return socket;

    socket = io(config.getConfig().socket_address, {
      transports: ['websocket'],
      forceNew: true,
      // autoConnect: false,
      //reconnection: false,
      //reconnectionAttempts: 0
    });

    _addEventListeners();

    return socket;
  }

  /**
   * socket listening to events<br>
   * @private
   */
  function _addEventListeners() {
    socket.on('open', () => {});
    socket.on('ping', () => {});
    socket.on('pong', (ms) => {});
    socket.on('jandi_pong', _sendPing);
    socket.on('connect', _connect);
    socket.on('disconnect', _disconnect);
    socket.on('ready_to_start', _emit);
    socket.on('start', _success);
    socket.on('error_start', _fail);
    socket.on('restart', _restart);
  }

  /**
   * socket success connected<br>
   * @private
   */
  function _connect() {
    _sendPing();
    SocketEventHistory.apply(new Date());
  }

  /**
   * socket disconnected<br>
   * @private
   */
  function _disconnect() {
    SocketEventHistory.clearQueue();
  }

  /**
   * ready to start 소켓 이벤트 핸들러<br>
   * 정상적으로 연결되었다고 알림<br>
   * @private
   */
  function _emit() {
    const token = Storage.getAccessToken();
    const eventName = 'start';
    const data = {
      token,
      userAgent: `JandiWeb(${JndVersion.version};) (${navigator.userAgent})`,
    };
    socket.emit(eventName, data);
  }

  /**
   * socket start success<br>
   * <br>
   * @param data : <br>
   * {<br>
   * 	"version": 1,<br>&nbsp;&nbsp;
   * 	"ts": 1438157359085,<br>&nbsp;&nbsp;
   * 	"socket_id": "r18G-iIR5o_ddHLwAAAA",<br>&nbsp;&nbsp;
   * 	"message": "Welcome to " + ACCOUNT_NAME<br>
   * }
   * @private
   */
  function _success(data) {}

  /**
   * socket start fail<br>
   * <br>
   * @param data : <br>
   * {<br>
   * 	"version": 1,<br>&nbsp;&nbsp;
   * 	"ts": 1438157359085,<br>&nbsp;&nbsp;
   * 	"message": ERROR_MESSAGE<br>
   * }
   * @private
   */
  function _fail(data) {
    console.error(data.message);
  }

  /**
   * ?
   * @deprecated
   * @param data
   * @private
   */
  function _restart(data) {}

  /**
   * 서버와 정상적인 연결상태 체크<br>
   * @private
   */
  function _sendPing() {
    setTimeout(() => socket.emit('jandi_ping', {version: 1}), PING_INTERVAL);
  }

  /**
   * socket listening to events<br>
   * @param eventName
   * @param cb
   */
  function on(eventName, cb) {
    socket.on(eventName, cb);
    SocketEventHistory.addSocketEvent(eventName, cb);
  }

  /**
   * @deprecated
   */
  function off() {}

  /**
   * @deprecated
   */
  function close() {}

  /**
   * network status<br>
   * @param e
   */
  function online(e) {
    SocketEventHistory.apply(new Date());
  }

  /**
   * network status<br>
   * @param e
   */
  function offline(e) {
    SocketEventHistory.clearQueue();
  }

  return {
    connect,
    on,
    off,
    close,
    online,
    offline,
  }
})();
