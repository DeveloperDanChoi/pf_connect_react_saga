/* eslint-disable no-restricted-syntax,guard-for-in */
import { modules as githubModules } from '../store/connect/github/github';
// import { Toast } from '../components/ui/Toast/Toast';

export const template1 = (() => {
  const that = {
    dispatch: {},
    connectType: '',
  };

  /**
   * 인증
   */
  // function authorize(e, obj) {
  function authorize() {
    // const url = `http://local.jandi.io:6001/connect/auth/${that.connectType}?callbackEventName=popupDone`;
    const url = `https://www.jandi.io/connect/auth/${that.connectType}?callbackEventName=popupDone`;
    const target = that.connectType === 'googleCalendar' ? 'googleAuth' : 'connectAuth';

    window.open(
        url,
        target,
        'resizable=no, scrollbars=1, toolbar=no, menubar=no, status=no, directories=no, width=1024, height=768',
    );
  }

  /**
   * 해당 서비스에서 접근 가능한 연동 리스트<br>
   * @param data
   */
  function list(data) {
    that.dispatch(data.call());
  }

  /**
   * 연동 설정 정보<br>
   * 연동된 설정 정보를 편집할 때 호출<br>
   * @param data
   * @param connectId
   */
  function load(data, connectId) {
    that.dispatch(data.call(null, { connectId }));
  }

  /**
   * 해당 서비스의 인증 계정 삭제<br>
   * @param e
   * @param data
   * @param action
   */
  function disconnect(e, data) {
    that.dispatch(that.disconnect.call(null, data));
  }

  /**
   * 잔디와 연동을 위한 설정 정보<br>
   * @param e
   * @param data
   * @param action
   */
  function connect(e, { input }) {
    // that.dispatch(Toast.show({ msg: 'message', type: 'error' }));
    // console.log( data , that.router.query)
    if (that.router.query.id && that.router.query.id !== '') {
      // data.connectId = that.router.query.id;
      that.dispatch(that.connect[1].call(null, input));
    } else {
      that.dispatch(that.connect[0].call(null, input));
    }
    // that.dispatch(action.call(null, data));
  }

  /**
   * 해당 서비스에서 접근 가능한 연동 리스트<br>
   * @param data
   */
  function set(key, value) {
    that.dispatch(that.set.call(null, { key, value }));
  }

  /**
   * 상태 변경 enabled/disabled<br>
   * @param data
   */
  function status(e, { input }) {
    that.dispatch(that.status.call(null, input, e));
  }

  /**
   * 연결 삭제<br>
   * @param data
   */
  function deleteConnect({ input }, router) {
    that.dispatch(that.deleteConnect.call(null, input, router));
  }

  function initialize(data, isList = true) {
    for (const item in data) {
      that[item] = data[item];
    }

    // addEventListeners();

    // TODO: 다른 체크 방법 검토
    // if (!that.router.components['/']) {
    if (isList) list(that.list);
    // }

    if (that.router.query.id && that.router.query.id !== '') {
      load(that.load, that.router.query.id);
    }
  }

  /**
   * TODO: HOLD
   * 마크업에 불필요한 정보 노출 문제
   */
  // function addEventListeners() {
  //   const doc = document;
  //
  //   const root = doc.getElementById('googleCalendarWrapper');
  //   console.log( root )
  //   for (const elementId in that.elements) {
  //     const el = doc.getElementById(that.connectType + '-' + elementId);
  //     if (el) {
  //       el.dataset.key = elementId;
  //       console.log( el )
  //       el.addEventListener('change', (e) => {
  //         // console.log('changed !!' ,  e);
  //         template1.set(el.dataset.key, e.target.value);
  //       });
  //     }
  //   }
  // }
  function allModules() {
    return {
      github: githubModules,
    };
  }

  return {
    initialize,
    list,
    load,
    disconnect,
    authorize,
    connect,
    set,
    status,
    deleteConnect,
    allModules,
  };
})();
