/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../../lib/produce';

export const GET_GOOGLECALENDAR_CALENDARLIST = 'connect/googleCalendar/GET_GOOGLECALENDAR_CALENDARLIST';
export const SET_GOOGLECALENDAR_CALENDARLIST = 'connect/googleCalendar/SET_GOOGLECALENDAR_CALENDARLIST';
export const PUT_GOOGLECALENDAR = 'connect/googleCalendar/PUT_GOOGLECALENDAR';
export const PUT_AUTHENTICATIONS = 'connect/googleCalendar/PUT_AUTHENTICATIONS';

export const getGooglecalendarCalendarlist = () => ({ type: GET_GOOGLECALENDAR_CALENDARLIST });
export const setGooglecalendarCalendarlist = (data) => ({ type: SET_GOOGLECALENDAR_CALENDARLIST, data });
export const putGooglecalendar = () => ({ type: PUT_GOOGLECALENDAR });
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
    default:
      break;
  }
});

export default reducer;
