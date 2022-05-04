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
    name: 'GOOGLECALENDAR_CALENDARLIST',
    data: false,
    api: getAuthenticationGoogleCalendarCalendarList,
    watch: 'googleCalendarCalendarList',
  },
  { type: 'set', name: 'GOOGLECALENDAR_CALENDARLIST', data: true },
  /**
   * 구글 캘린더 Connect 연동 정보를 반환하는 API
   */
  {
    type: 'get',
    name: 'GOOGLECALENDAR',
    data: true,
    api: getTeamsGoogleCalendar,
  },
  {
    type: 'set',
    name: 'GOOGLECALENDAR',
    data: true
  },
  /**
   * 구글 캘린더와 Connect 연동을 하는 API
   */
  {
    type: 'post',
    name: 'GOOGLECALENDAR',
    data: false,
    api: postTeamsGoogleCalendar,
  },
  /**
   * 구글 캘린더 Connect 연동 설정을 변경하는 API
   */
  {
    type: 'put',
    name: 'GOOGLECALENDAR_SETTING',
    data: true,
    api: putTeamsGoogleCalendarSetting
  },
  /**
   * 연동 서비스 인증 삭제
   */
  {
    type: 'put',
    name: 'AUTHENTICATIONS',
    data: true,
    api: deleteAuthentications,
  },
];
export const modules = (() => util.createModule(initialModules))();

export const initialState = {
  connects: [],
  teamsConnect: [],
  authentication: [],
};

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case modules.types.SET_GOOGLECALENDAR_CALENDARLIST:
      draft.calendarList = action.data;
      break;
    case modules.types.SET_GOOGLECALENDAR:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    default:
      break;
  }
});

export default reducer;
