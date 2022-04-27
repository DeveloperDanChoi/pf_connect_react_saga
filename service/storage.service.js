// eslint-disable-next-line import/prefer-default-export
export const Storage = (function() {
  let _cache = {
    storage: {},
    cookie: {},
  };
  let _session = {
    accessToken: null
  };

  let PREFIX = '_jd_.';

  let KEYS = {
    UUID: 'uuid',
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    TOKEN_TYPE: 'token_type',
    LAST_STATE: 'last-state',
    ACCOUNT_ID: 'account_id',
    TEAM_ID: 'team_id',
    MEMBER_ID: 'member_id',
    TEAM_NAME: 'team_name',
    LAST_LANG: 'last_lang',
    LEFT_TOPICS_ORDER: 'left_topic_order',
    AUTO_SIGN_IN: 'should_auto_sign_in',
    BEARER_TYPE: 'bearer',
    DRIVE_VIEW: 'drive_view',
    DRIVE_LAST: 'drive_last',
    DRIVE_SORT: 'drive_sort',
    DRIVE_LIST_SORT: 'drive_list_sort',
    DRIVE_LIST_TOGGLE: 'drive_list_toggle',
    ZOOM_ACCESS_TOKEN: 'zoom_access_token',
    TODO_LIST_OPTION: 'todo_list_option'
  };

  /**
   * app.local.storage localStorageHelper 통합
   * @param {*} key
   * @param {*} value
   */
  function set(key, value) {
    // localStorageService.set(key, value);
    localStorage.setItem(PREFIX + key, value);
  }

  /**
   * app.local.storage localStorageHelper 통합
   * @param {*} key
   */
  function get(key) {
    // return localStorageService.get(key);
    return localStorage.getItem(PREFIX + key);
  }

  /**
   * app.local.storage localStorageHelper 통합
   * @param {*} key
   */
  function remove(key) {
    // localStorageService.remove(key);
    localStorage.removeItem(PREFIX + key);
  }

  /**
   *
   * localStorage Code below.
   *
   * When removing localStorage, currently,
   * it deletes everything stored in localStorage including 'last-state'.
   *
   */
  //////////////////////////////////////////
  //
  //      token
  //
  ///////////////////////////////
  function setTokenLocal(tokenData) {
    setAccessTokenLocal(tokenData.access_token);
    setRefreshTokenLocal(tokenData.refresh_token);
    setTokenTypeLocal(tokenData.token_type);

  }

  // access_token getter & setter
  function setAccessTokenLocal(access_token) {
    _setLocalStorage(KEYS.ACCESS_TOKEN, access_token);
  }

  function getAccessTokenLocal() {
    return _getLocalStorage(KEYS.ACCESS_TOKEN);
  }

  // refresh_token getter & setter
  function setRefreshTokenLocal(refresh_token) {
    _setLocalStorage(KEYS.REFRESH_TOKEN, refresh_token);
  }

  function getRefreshTokenLocal() {
    return _getLocalStorage(KEYS.REFRESH_TOKEN);
  }

  // token_type getter & setter
  function setTokenTypeLocal(token_type) {
    _setLocalStorage(KEYS.TOKEN_TYPE, token_type);
  }

  function getTokenTypeLocal() {
    return _getLocalStorage(KEYS.TOKEN_TYPE);
  }

  function setLastLang(lang) {
    _setLocalStorage(KEYS.LAST_LANG, lang);
  }

  function getLastLang() {
    return _getLocalStorage(KEYS.LAST_LANG);
  }

  function hasAccessTokenLocal() {
    return getAccessTokenLocal();
  }

  //////////////////////////////////////////
  //
  //      Last State
  //
  ///////////////////////////////
  function setLastStateLocal(last_state) {
    _setLocalStorage(KEYS.LAST_STATE, last_state);
  }

  function getLastStateLocal() {
    return _getLocalStorage(KEYS.LAST_STATE);
  }

  function removeLastStateLocal() {
    _removeLocalStorage(KEYS.LAST_STATE);
  }

  //////////////////////////////////////////
  //
  //      Account Info
  //
  ///////////////////////////////
  function setAccountInfoLocal(accountId, teamId, memberId, teamName) {
    _setLocalStorage(KEYS.ACCOUNT_ID, accountId);
    _setLocalStorage(KEYS.TEAM_ID, teamId);
    _setLocalStorage(KEYS.MEMBER_ID, memberId);
    _setLocalStorage(KEYS.TEAM_NAME, teamName);
  }

  function getAccountIdLocal() {
    return _getLocalStorage(KEYS.ACCOUNT_ID);
  }

  function getTeamIdLocal() {
    return _getLocalStorage(KEYS.TEAM_ID);
  }

  function getMemberIdLocal() {
    return _getLocalStorage(KEYS.MEMBER_ID);
  }

  /**
   * 드라이브 보기설정 (DRIVE_VIEW / get)
   */
  function getDriveViewTypeStorage(){
    return _getLocalStorage(KEYS.DRIVE_VIEW);
  }

  /**
   * 마지막 드라이브/폴더 (DRIVE_LAST / get)
   */
  function getDriveLastStorage(){
    return _getLocalStorage(KEYS.DRIVE_LAST);
  }

  /**
   * 드라이브 아이템 정렬 (DRIVE_SORT / get)
   */
  function getDriveLastSortStorage(){
    return _getLocalStorage(KEYS.DRIVE_SORT);
  }

  /**
   * 드라이브 리스트 정렬 (DRIVE_LIST_SORT / get)
   */
  function getDriveListLastSortStorage(){
    return _getLocalStorage(KEYS.DRIVE_LIST_SORT);
  }

  /**
   * 드라이브 리스트 > 공개 설정별 타이틀 영역 토글상태 유지
   */
  function getDriveListLastToggleStorage(){
    return _getLocalStorage(KEYS.DRIVE_LIST_TOGGLE);
  }


  /**
   * 드라이브 보기설정 (set)
   */
  function setDriveViewTypeStorage(token_type) {
    _setLocalStorage(KEYS.DRIVE_VIEW, token_type);
  }

  /**
   * 마지막 드라이브/폴더 (set)
   */
  function setDriveLastStorage(token_type) {
    _setLocalStorage(KEYS.DRIVE_LAST, token_type);
  }

  /**
   * 드라이브 아이템 정렬 (DRIVE_SORT / set)
   */
  function setDriveLastSortStorage(token_type) {
    _setLocalStorage(KEYS.DRIVE_SORT, token_type);
  }

  /**
   * 드라이브 리스트 정렬 (DRIVE_LIST_SORT / set)
   */
  function setDriveListLastSortStorage(token_type) {
    _setLocalStorage(KEYS.DRIVE_LIST_SORT, token_type);
  }

  /**
   * 드라이브 리스트 정렬 > 공개 설정별 > 타이틀 클릭 유지
   */
  function setDriveListLastToggleStorage(token_type) {
    _setLocalStorage(KEYS.DRIVE_LIST_TOGGLE, token_type);
  }

  function setTodoListSortOptionStorage(token_type) {
    _setLocalStorage(KEYS.TODO_LIST_OPTION, token_type);
  }

  function getTodoListSortOptionStorage(){
    return _getLocalStorage(KEYS.TODO_LIST_OPTION);
  }

  /*
   Removes
   access_token
   refresh_token
   account_id
   team_id
   member_id
   in localStorage.

   Basically, everything except last_state.
   */
  function removeLocal() {
    _.each(KEYS, function(key) {
      if (key !== KEYS.LAST_STATE && key !== KEYS.DRIVE_VIEW && key !== KEYS.DRIVE_LAST && key !== KEYS.DRIVE_SORT && key !== KEYS.DRIVE_LIST_SORT  ) {
        _removeLocalStorage(key);
      }
    });
  }

  /**
   * left 토픽의 정렬방식을 설정한다
   * @param {String} order - 'default'|'latest'
   */
  function setLeftTopicsOrder(order) {
    _setLocalStorage(KEYS.LEFT_TOPICS_ORDER, order);
  }

  /**
   * left 토픽의 정렬방식을 가져온다
   * @return {String}
   */
  function getLeftTopicsOrder() {
    return _getLocalStorage(KEYS.LEFT_TOPICS_ORDER) || 'default';
  }

  /**
   *
   * $window.sessionStorage
   *
   * Storing two objects.
   * When user signs in, it automatically stores sign in info on $window.sessionStorage.
   *
   *  access_token : access_token
   *
   *  Currently not storing 'teamId' and 'userId'.
   *
   *  If $window.session has token and corresponding prefix, it is good to 'autologin' for now.
   *
   */

  //////////////////////////////////////////
  //
  //      token
  //
  ///////////////////////////////
  function setTokenSession(tokenData) {
    setAccessTokenSession(tokenData.access_token);
    setRefreshTokenSession(tokenData.refresh_token);
    setTokenTypeSession(tokenData.token_type);
  }

  function setAccessTokenSession(access_token) {
    // $window.sessionStorage.access_token = access_token;
    sessionStorage.access_token = access_token;
  }

  function getAccessTokenSession() {
    return sessionStorage.getItem(PREFIX + 'access_token');
  }

  function setRefreshTokenSession(refresh_token) {
    // $window.sessionStorage.refresh_token = refresh_token;
    sessionStorage.refresh_token = refresh_token;
  }

  function getRefreshTokenSession() {
    // return $window.sessionStorage.refresh_token;
    return sessionStorage.refresh_token;
  }

  function setTokenTypeSession(token_type) {
    // $window.sessionStorage.token_type = token_type;
    sessionStorage.token_type = token_type;
  }

  function getTokenTypeSession() {
    // return $window.sessionStorage.token_type;
    return sessionStorage.token_type;
  }

  // checking window session storage.
  function hasAccessTokenSession() {
    return getAccessTokenSession();
  }

  //////////////////////////////////////////
  //
  //      Account Info
  //
  ///////////////////////////////
  function setAccountInfoSession(accountId, teamId, memberId, teamName) {
    // $window.sessionStorage.account_id = accountId;
    // $window.sessionStorage.team_id = teamId;
    // $window.sessionStorage.member_id = memberId;
    // $window.sessionStorage.team_name = teamName;
    sessionStorage.account_id = accountId;
    sessionStorage.team_id = teamId;
    sessionStorage.member_id = memberId;
    sessionStorage.team_name = teamName;
  }

  function getAccountIdSession() {
    // return $window.sessionStorage.account_id;
    return sessionStorage.account_id;
  }

  function getTeamIdSession() {
    // return $window.sessionStorage.team_id;
    return sessionStorage.team_id;
  }

  function getMemberIdSession() {
    // return $window.sessionStorage.member_id;
    return sessionStorage.member_id;
  }

  // Removes everything in $window.sessionStorage.
  function removeSession() {
    // delete $window.sessionStorage.access_token;
    // delete $window.sessionStorage.refresh_token;
    // delete $window.sessionStorage.account_id;
    // delete $window.sessionStorage.team_id;
    // delete $window.sessionStorage.member_id;
    // $window.sessionStorage.clear();
    delete sessionStorage.access_token;
    delete sessionStorage.refresh_token;
    delete sessionStorage.account_id;
    delete sessionStorage.team_id;
    delete sessionStorage.member_id;
  }

  /**
   * $CookieStore
   * @param tokenData
   */

  function setTokenCookie(tokenData) {
    _session.accessToken = tokenData && tokenData.access_token;
    // console.dir(tokenData)
    setLocalStorageCookie(KEYS.ACCESS_TOKEN, tokenData.access_token, true);
    setLocalStorageCookie(KEYS.REFRESH_TOKEN, tokenData.refresh_token, true);
    setLocalStorageCookie(KEYS.TOKEN_TYPE, tokenData.token_type, true);
  }

  /**
   * account 정보를 쿠키로 저장한다.
   * @param {object} account
   */
  function setAccountCookie(account) {
    setLocalStorageCookie(KEYS.UUID, account.uuid, true);
  }

  function getAccountCookie() {
    return getLocalStorageCookie(KEYS.UUID) || false;
  }

  function getAccessTokenCookie() {
    return getLocalStorageCookie(KEYS.ACCESS_TOKEN) || false;
  }

  function getRefreshTokenCookie() {
    if (isValidValue(getLocalStorageCookie(KEYS.REFRESH_TOKEN)))
      return getLocalStorageCookie(KEYS.REFRESH_TOKEN);

    return false;
  }

  function getTokenTypeCookie() {
    if (isValidValue(getLocalStorageCookie(KEYS.TOKEN_TYPE)))
      return getLocalStorageCookie(KEYS.TOKEN_TYPE);

    return false;
  }

  function removeCookie() {
    _session.accessToken = null;
    _removeLocalStorageCookie(KEYS.ACCESS_TOKEN);
    _removeLocalStorageCookie(KEYS.REFRESH_TOKEN);
    _removeLocalStorageCookie(KEYS.TOKEN_TYPE);
    _removeLocalStorageCookie(KEYS.UUID);
    setShouldAutoSignIn(false);
  }

  function setShouldAutoSignIn(autoSignIn) {
    setLocalStorageCookie(KEYS.AUTO_SIGN_IN, autoSignIn, true);
  }

  function shouldAutoSignIn() {
    var value = getLocalStorageCookie(KEYS.AUTO_SIGN_IN);
    if (typeof value == 'string' && value == 'true') return true;
    if (typeof value == 'boolean' && value ) return true;

    return false;
  }



  function isValidValue (input) {
    if(angular.isUndefined(input) || input === null || input == 'undefined') return false;
    return true;
  }


  // Call below two functions not worrying about getting invalid value for both 'access_token' and 'refresh_token'.
  // If browser contains invalid value, it will detect such case and return false.
  function getAccessToken () {
    const token = getAccessTokenCookie() || getAccessTokenLocal() || getAccessTokenSession();
    return token || false;
  }
  function getRefreshToken () {
    var token = getRefreshTokenCookie() || getRefreshTokenLocal() || getRefreshTokenSession();
    return token || false;
  }

  function getTeamName() {
    if (isValidValue(_getLocalStorage(KEYS.TEAM_NAME)))
      return _getLocalStorage(KEYS.TEAM_NAME);

    // return $window.sessionStorage.team_name;
    return sessionStorage.team_name;
  }

  /**
   * set cookie
   * @param {String} name
   * @param {String} value
   */
  function setCookie(prefix, name, value) {
    var cookie = _decookie(prefix);

    cookie[name] = value;

    _encookie(prefix, cookie);
  }

  function setCookieForZoom(prefix, name) {
    setLocalStorageCookie(KEYS.ZOOM_ACCESS_TOKEN, name, true);
  }

  /**
   * get cookie
   * @param {String} name
   * @returns {String}
   */
  function getCookie(prefix, name) {
    return _decookie(prefix)[name];
  }

  function _decookie(prefix) {
    var cookie;

    cookie = getLocalStorageCookie(prefix);
    if (cookie != null) {
      cookie = JSON.parse(cookie);
    } else {
      cookie = {};
    }

    return cookie;
  }

  /**
   * local storage 에 값을 저장한다.
   * @param {String} key
   * @param {String} value
   * @private
   */
  function _setLocalStorage(key, value) {
    _cache.storage[key] = value;
    // localStorageService.set(key, value);
    localStorage.setItem(PREFIX + key, value);
  }

  /**
   * local storage 에서 값을 꺼내온다.
   * @param {String} key
   * @returns {String}
   * @private
   */
  function _getLocalStorage(key) {
    // return _cache.storage[key] || localStorageService.get(key);
    return _cache.storage[key] || localStorage.getItem(PREFIX + key);
  }

  /**
   * local storage 의 key 값에 해당하는 값을 제거한다.
   * @param {String} key
   * @private
   */
  function _removeLocalStorage(key) {
    delete _cache.storage[key];
    // localStorageService.remove(key);
    localStorage.removeItem(PREFIX + key);
  }

  /**
   * cookie 에 값을 저장한다.
   * @param {String} key
   * @param {String} value
   * @param {Boolean} [shouldBeCached=false] - 캐시가 되어야하는지 여부
   * @param {Number} [expiryDay] - 만료기간(day 기준)
   * @private
   */
  function setLocalStorageCookie(key, value, shouldBeCached, expiryDay) {
    if (shouldBeCached) {
      _cache.cookie[key] = value;
    }
    // localStorageService.cookie.set(key, value, expiryDay);
    _setCookie(key, value, expiryDay);
  }

  /**
   * cookie 에서 값을 꺼내온다.
   * @param {String} key
   * @returns {String}
   * @private
   */
  function getLocalStorageCookie(key) {
    // return _cache.cookie[key] || localStorageService.cookie.get(key);
    return _cache.cookie[key] || _getCookie(key);
  }

  /**
   * cookie 의 key 값에 해당하는 값을 제거한다.
   * @param {String} key
   * @private
   */
  function _removeLocalStorageCookie(key) {
    delete _cache.cookie[key];
    // localStorageService.cookie.remove(key);
    _removeCookie(key);
  }

  function _encookie(prefix, cookie) {
    setLocalStorageCookie(prefix, JSON.stringify(cookie), true);
  }

  function _setCookie(key, value, miuntes) {
    const exdate = new Date();
    exdate.setMinutes(exdate.getMinutes() + miuntes);
    value = escape(value) + ((miuntes == null) ? '' : '; expires=' + exdate.toUTCString());
    document.cookie = PREFIX + key + '=' + value;
  }

  function _getCookie(key) {
    const value = document.cookie.match('(^|;) ?' + PREFIX + key + '=([^;]*)(;|$)');
    return value ? value[2] : null;
  }

  function _removeCookie(key) {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() - 100);
    document.cookie = PREFIX + key + '=; expires=' + exdate.toUTCString();
  }

  return {
    getAccessToken,
    get
  }
})();
