/* eslint-disable max-len,no-param-reassign,default-param-last,no-shadow,no-restricted-syntax */
import produce from '../../../lib/produce';
import { util } from '../../../service/util';
import {
  getTeamsGoogleCalendar,
  postTeamsGoogleCalendar,
  putTeamsGoogleCalendarSetting,
} from '../../../api/connect/WebAdmin/GoogleCalendar/googleCalendar';
import {
  deleteAuthentications,
  getAuthenticationGoogleCalendarCalendarList,
} from '../../../api/connect/Authentication/authentication';

export const initialModules = [
  /**
   * 구글 캘린더에 등록된 캘린더 리스트를 반환하는 API
   */
  {
    type: 'get',
    name: 'AUTHENTICATION_GOOGLE_CALENDAR_CALENDAR_LIST',
    data: false,
    api: getAuthenticationGoogleCalendarCalendarList,
    watch: 'googleCalendarCalendarList',
  },
  { type: 'set', name: 'AUTHENTICATION_GOOGLE_CALENDAR_CALENDAR_LIST', data: true },
  /**
   * 구글 캘린더 Connect 연동 정보를 반환하는 API
   */
  {
    type: 'get',
    name: 'TEAMS_GOOGLE_CALENDAR',
    data: true,
    api: getTeamsGoogleCalendar,
  },
  {
    type: 'set',
    name: 'TEAMS_GOOGLE_CALENDAR',
    data: true,
  },
  /**
   * 구글 캘린더와 Connect 연동을 하는 API
   */
  {
    type: 'post',
    name: 'TEAMS_GOOGLE_CALENDAR',
    data: false,
    api: postTeamsGoogleCalendar,
  },
  /**
   * 구글 캘린더 Connect 연동 설정을 변경하는 API
   */
  {
    type: 'put',
    name: 'TEAMS_GOOGLE_CALENDAR_SETTING',
    data: true,
    api: putTeamsGoogleCalendarSetting,
  },
  /**
   * 연동 서비스 인증 삭제
   */
  {
    type: 'delete',
    name: 'AUTHENTICATIONS',
    data: true,
    api: deleteAuthentications,
  },
  /**
   * 사용자 정의 데이터
   */
  {
    type: 'set',
    name: 'INPUT_GOOGLE_CALENDAR',
    data: true,
  },
  /**
   * 사용자 정의 데이터
   */
  {
    type: 'set',
    name: 'INPUT_GOOGLE_CALENDAR_VALUE',
    data: true,
  },
];
export const modules = (() => util.createModule(initialModules, 'googleCalendar'))();
export const initialState = {
  connects: [],
  teamsConnect: [],
  authentication: [],
  authenticationGoogleCalendarCalendarList: [],
  teamsGoogleCalendar: {
    id: 0,
  },
  input: {
    googleId: '',
    calendarId: '',
    calendarSummary: '',
    roomId: '',
    botName: '',
    botThumbnailFile: '',
    lang: '',
    hasNotificationBefore: false,
    notificationBefore: '0s',
    hasAllDayNotification: false,
    allDayNotificationBeforeDates: '0d',
    allDayNotificationHour: '24',
    hasDailyScheduleSummary: false,
    dailyScheduleSummary: '24',
    hasWeeklyScheduleSummary: false,
    weeklyScheduleSummaryHour: '24',
    weeklyScheduleSummaryDayOfWeek: 'MO',
    newEventNotification: false,
    updatedEventNotification: false,
    cancelledEventNotification: false,
    langText: '한국어',
    searchCalText: '',
    selectedAuthentication: '',
    selectedCal: '',
    searchText: '',
    selectedTopic: 'JANDI',
    searchRooms: [],
    searchFilters: [],
    searchCalFilters: [],
    member: { name: '' },
  },
  getMinute: {
    '0s': '정각',
    '1m': '1분',
    '5m': '정각3',
    '10m': '정각4',
    '15m': '정각5',
    '1h': '정각6',
    '2h': '정각7',
    '4h': '정각8',
    '1d': '정각9',
  },
  getMinuteList: [
    { text: '@jnd-connect-43', value: '0s' },
    { text: '@jnd-connect44', value: '1m' },
    { text: '@jnd-connect-45', value: '5m' },
    { text: '@jnd-connect-46', value: '10m' },
    { text: '@jnd-connect-47', value: '15m' },
    { text: '@jnd-connect-48', value: '30m' },
    { text: '@jnd-connect-49', value: '1h' },
    { text: '@jnd-connect-50', value: '2h' },
    { text: '@jnd-connect-51', value: '4h' },
    { text: '@jnd-connect-52', value: '1d' },
    // {text: '@jnd-connect-43', value: '0s'},
    // {text: '@jnd-connect44', value: '1m'},
    // {text: '@jnd-connect-45', value: '5m'},
    // {text: '@jnd-connect-46', value: '10m'},
    // {text: '@jnd-connect-47', value: '15m'},
    // {text: '@jnd-connect-48', value: '30m'},
    // {text: '@jnd-connect-49', value: '1h'},
    // {text: '@jnd-connect-50', value: '2h'},
    // {text: '@jnd-connect-51', value: '4h'},
    // {text: '@jnd-connect-52', value: '1d'},
  ],
  getHour: {
    24: '0:00 AM',
    1: '1:00 AM',
    2: '2:00 AM',
    3: '3:00 AM',
    4: '4:00 AM',
    5: '5:00 AM',
    6: '6:00 AM',
    7: '7:00 AM',
    8: '8:00 AM',
    9: '9:00 AM',
    10: '10:00 AM',
    11: '11:00 AM',
    12: '12:00 PM',
    13: '1:00 PM',
    14: '2:00 PM',
    15: '3:00 PM',
    16: '4:00 PM',
    17: '5:00 PM',
    18: '6:00 PM',
    19: '7:00 PM',
    20: '8:00 PM',
    21: '9:00 PM',
    22: '10:00 PM',
    23: '11:00 PM',
  },
  getHourList: [
    {text: '@jnd-connect-58', value: 24},
    {text: '@jnd-connect-59', value: 1},
    {text: '@jnd-connect-60', value: 2},
    {text: '@jnd-connect-61', value: 3},
    {text: '@jnd-connect-62', value: 4},
    {text: '@jnd-connect-63', value: 5},
    {text: '@jnd-connect-64', value: 6},
    {text: '@jnd-connect-65', value: 7},
    {text: '@jnd-connect-66', value: 8},
    {text: '@jnd-connect-67', value: 9},
    {text: '@jnd-connect-68', value: 10},
    {text: '@jnd-connect-69', value: 11},
    {text: '@jnd-connect-70', value: 12},
    {text: '@jnd-connect-71', value: 13},
    {text: '@jnd-connect-72', value: 14},
    {text: '@jnd-connect-73', value: 15},
    {text: '@jnd-connect-74', value: 16},
    {text: '@jnd-connect-75', value: 17},
    {text: '@jnd-connect-76', value: 18},
    {text: '@jnd-connect-77', value: 19},
    {text: '@jnd-connect-78', value: 20},
    {text: '@jnd-connect-79', value: 21},
    {text: '@jnd-connect-80', value: 22},
    {text: '@jnd-connect-81', value: 23}
  ],
  getDate: {
    '0d': '당일',
    '1d': '하루 전',
    '2d': '이틀 전',
  },
  getDateList: [
    {text: '@jnd-connect-55', value: '0d'},
    {text: '@jnd-connect-56', value: '1d'},
    {text: '@jnd-connect-57', value: '2d'}
  ],
  getDay: {
    'MO': '월요일',
    'TU': '화요일',
    'WE': '수요일',
    'TH': '목요일',
    'FR': '금요일',
    'SA': '토요일',
    'SU': '일요일',
  },
  getDayList: [
    {text: '@jnd-connect-90', value: 'MO'},
    {text: '@jnd-connect-91', value: 'TU'},
    {text: '@jnd-connect-92', value: 'WE'},
    {text: '@jnd-connect-93', value: 'TH'},
    {text: '@jnd-connect-94', value: 'FR'},
    {text: '@jnd-connect-95', value: 'SA'},
    {text: '@jnd-connect-96', value: 'SU'}
  ]
};

const { types } = modules;
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case types.SET_AUTHENTICATION_GOOGLE_CALENDAR_CALENDAR_LIST:
    case types.SET_TEAMS_GOOGLE_CALENDAR:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    case types.SET_INPUT_GOOGLE_CALENDAR_VALUE:
      draft.input[action.data.data.key] = action.data.data.value;
      break;
    default:
      break;
  }
});

export default reducer;
