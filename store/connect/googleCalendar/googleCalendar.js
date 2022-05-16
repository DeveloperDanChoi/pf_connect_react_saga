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
  input: {},
};

const { types } = modules;
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case types.SET_AUTHENTICATION_GOOGLE_CALENDAR_CALENDAR_LIST:
      draft.calendarList = action.data;
      break;
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
