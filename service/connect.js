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
    // const url = `https://www.jandi.io/connect/auth/${that.connectType}?callbackEventName=popupDone`;
    const url = `https://www.jandi.io/connect/auth/${that.connectType}?callbackEventName=popupDone`;
    const target = that.connectType === 'googleCalendar' ? 'googleAuth' : 'connectAuth';
    // TODO: popupDone callback ??
    // const popup
    window.open(
        url,
        target,
        'resizable=no, scrollbars=1, toolbar=no, menubar=no, status=no, directories=no, width=1024, height=768',
    );
    // let { win, pp } = obj.input;
    // const url = `https://www.jandi.io/connect/auth/${that.connectType}?callbackEventName=popupDone`;
    // const target = that.connectType === 'googleCalendar' ? 'googleAuth' : 'connectAuth';
    // TODO: popupDone callback ??
    // const popup
    //
    // console.log( obj, win, pp )
    //
    // win.popupDone = function() {
    //   console.log('asdkfakljslkjaslkejaflksejf')
    // }
    // win.addEventListener('popupDone', () => {
    //   console.log('asdkfakljslkjaslkejaflksejf')
    // })
    // pp = win.open(
    //   url,
    //   'http://local.jandi.io:6001/connect/callback/googleCalendar?callbackEventName=popupDone',
    //   target,
    // eslint-disable-next-line max-len
    //   'resizable=no, scrollbars=1, toolbar=no, menubar=no, status=no, directories=no, width=1024, height=768',
    // );

    // 열려 있으면 popup.location.replace(_getFullUrl(url, options.data));
    // pp.onclose = (a,b,c) => {
    //   console.log(' ok callback !! ', a, b, c)
    // }
    // 열려 있으면 popup.location.replace(_getFullUrl(url, options.data));
    // pp.onbeforeunload = function(){
    //   console.log('................')
    // };
    // 열려 있으면 popup.location.replace(_getFullUrl(url, options.data));
    // pp.addEventListener('beforeunload', function() {
    //   console.log('beforeunload !!!')
    // });
    // https://accounts.google.com/signin/oauth/consent?authuser=2&part=AJi8hAMPCleb14bS7gQgCztlgrfkWrsea69U27sZVAxFP6Vgtj3r4VSZLiQN9bVXSMSR-lUw2oEulm7RvN4BkG6fNMTRAukY35gRW41kXLyxWkNlUVO-xoQ1baK9aW8QJPxNfG79j_5Y5CjO06sO-gzmHS5_zDLJKI9Z2cKr_fcpJGM-k12jD_PvH_v2is7zVqGt6Ym3IJqc4ziReOuWCk0g2nMjasXyvnRTT1oVI-bkIXDsd1EOpKzbkbDGMm-K2Om1uDlith9HkIG7Hr6UxgvF-giJiLPhXQZDtl-byUjYbGNPEW5cDtwhHf3GCNauVDqSbLWBF-GXsOWCtSdxU2u8Ia1nzPjIh0MhayGDBDGu4S8aBCLBfNBu2PKCALWCtgEkLVu5C3ngH-Ut9hkaVwLXTOsyF1TpAF8dTg-Q7aSEx4ngh9_PtaG3Pd7zGOWYxJxDpIDITxkIai8S3nzO970lZByAYDGBL--Blp3-nhxSyS0mrXtBLqfQ_8fJie4oDdx8MZDHQJA_A_-5lZDPqPwb_f0Zy1iG93lSqKVQbQ_Ce12k3WI8RxsIBeBbhUGNdikxJ3sq1k5Hj0gj3LtcZmVRg4AzQKMo_4yUo6AWOPhwXuq4Tcx7wtNZ1qEnBsFdQr9KSQEOH-J7_eHz_1NIWwS0YKZgOx65qY0C52o4F_4XxxHq4WGeKlmv7lh1OqFVH2lVtYQqPvsrIfVKCUyrYMZ8kYbcrkzd1iJL8iyMHOdBC9FnfivaaKy5sVORGXlbLTNWHBdR3AbQ8OhnICyj2i5jeNfXhryt-10CcUQHVTPXIzf1mBSR7ZhOm2pEoxcdt_YOD_szWLAGX0l3WgQRFhVl1IpBW9U8VT6h5m0v7jvNIzVJmcXxCGApdyY_y-Y89Xa9XfRSfXEO&hl=ko&as=S939580868%3A1656082347393867&client_id=805411559439-tl7driil8hrv7pdo4953vek3opb56orb.apps.googleusercontent.com&rapt=AEjHL4OOPYxW0W_tpqLjQoka1_fyhw_43kdV-cTTvKfH2f9jecHJ6BSWArs7YW6yzgs3bs8p6t2NFNMdaytOdvQx7GETkLJQdg#
    // pp.onbeforeunload = function() {
    //   console.log('asdkfakljslkjaslkejaflksejf')
    // }
    // pp.focus();
    // template1.set('pp', pp);

    // popupDone = () => {
    //   console.log('test !!')
    // }

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
