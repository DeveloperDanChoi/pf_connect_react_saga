export const template1 = (() => {
  const variable = {
    dispatch: {},
    connectType: '',
  };

  /**
   * 연동 리스트
   * @param data
   */
  function list(data) {
    // variable.dispatch(getGooglecalendarCalendarlist());
    console.log( data )
    variable.dispatch(data.call());
  }

  function load(data, connectId) {
    variable.dispatch(data.call(null, connectId));
  }

  /**
   * 인증 계정 삭제
   * @param e
   * @param data
   * @param action
   */
  function disconnect(e, data, action) {
    variable.dispatch(action.call(null, data));
  }

  function connect(e, data, action) {
    variable.dispatch(action.call(null, data));
  }

  /**
   * 인증
   */
  function authorize() {
    const url = `https://www.jandi.io/connect/auth/${variable.connectType}?callbackEventName=popupDone`;
    const target = variable.connectType === 'googleCalendar' ? 'googleAuth' : 'connectAuth';
    // TODO: popupDone callback ??
    // const popup
    window.open(
      url,
      target,
      'resizable=no, scrollbars=1, toolbar=no, menubar=no, status=no, directories=no, width=1024, height=768',
    );
  }

  function initialize(data) {
    for (const item in data) {
      variable[item] = data[item];
    }
  }
  return {
    initialize,
    list,
    load,
    disconnect,
    authorize,
    connect,
  };
})();

export default {};
