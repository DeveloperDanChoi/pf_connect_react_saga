/* eslint-disable no-restricted-syntax,guard-for-in */
export const template1 = (() => {
  const that = {
    dispatch: {},
    connectType: '',
  };

  /**
   * 인증
   */
  function authorize() {
    const url = `https://www.jandi.io/connect/auth/${that.connectType}?callbackEventName=popupDone`;
    const target = that.connectType === 'googleCalendar' ? 'googleAuth' : 'connectAuth';
    // TODO: popupDone callback ??
    // const popup
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
    that.dispatch(data.call(null, { connectId, teamId: 279 }));
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
  function connect(e, data) {
    if (that.router.query.id && that.router.query.id !== '') {
      data.connectId = that.router.query.id;
      that.dispatch(that.connect[1].call(null, data));
    } else {
      console.log('this !!');
      that.dispatch(that.connect[0].call(null, data));
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

  function initialize(data, isList = true) {
    for (const item in data) {
      that[item] = data[item];
    }
    console.log(that);

    // TODO: 다른 체크 방법 검토
    // if (!that.router.components['/']) {
    if (isList) list(that.list);
    // }

    if (that.router.query.id && that.router.query.id !== '') {
      load(that.load, that.router.query.id);
    }
  }
  return {
    initialize,
    list,
    load,
    disconnect,
    authorize,
    connect,
    set,
  };
})();

export default {};
