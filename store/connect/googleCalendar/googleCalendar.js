/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../../lib/produce';
import { util } from '../../../service/util';

export const GET_GOOGLECALENDAR_CALENDARLIST = 'connect/googleCalendar/GET_GOOGLECALENDAR_CALENDARLIST';
export const GET_GOOGLECALENDAR = 'connect/googleCalendar/GET_GOOGLECALENDAR';
export const SET_GOOGLECALENDAR = 'connect/googleCalendar/SET_GOOGLECALENDAR';
export const SET_GOOGLECALENDAR_CALENDARLIST = 'connect/googleCalendar/SET_GOOGLECALENDAR_CALENDARLIST';
export const POST_GOOGLECALENDAR = 'connect/googleCalendar/POST_GOOGLECALENDAR';
export const PUT_GOOGLECALENDAR_SETTING = 'connect/googleCalendar/PUT_GOOGLECALENDAR_SETTING';
export const PUT_AUTHENTICATIONS = 'connect/googleCalendar/PUT_AUTHENTICATIONS';

export const getGooglecalendarCalendarlist = () => ({ type: GET_GOOGLECALENDAR_CALENDARLIST });
export const setGooglecalendarCalendarlist = (data) => ({ type: SET_GOOGLECALENDAR_CALENDARLIST, data });
export const getGooglecalendarCalendar = (data) => ({ type: GET_GOOGLECALENDAR, data });
export const setGooglecalendarCalendar = (data) => ({ type: SET_GOOGLECALENDAR, data });
export const postGooglecalendar = () => ({ type: POST_GOOGLECALENDAR });
export const putGooglecalendarSetting = (data) => ({ type: PUT_GOOGLECALENDAR_SETTING, data });
export const putAuthentications = (data) => ({ type: PUT_AUTHENTICATIONS, data });

export const initialState = {
  connects: [],
  teamsConnect: [],
  authentication: [],
};

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SET_GOOGLECALENDAR_CALENDARLIST:
      draft.calendarList = action.data;
      break;
    case SET_GOOGLECALENDAR:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    default:
      break;
  }
});

export default reducer;
