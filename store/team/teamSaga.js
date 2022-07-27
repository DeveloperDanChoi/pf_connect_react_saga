import {call, put, select} from 'redux-saga/effects';
import { getV1AdminTeamsMemberProfiles, getV1AdminTeamsMembers } from '../../api/team/Admin/admin';
import { getAccountV4TeamsRooms } from '../../api/start/start';
import {getTeamsConnect} from "../../api/connect/WebAdmin/webAdmin";
import { modules as teamModules } from '../team/team';

const { creators } = teamModules;
export const saga = (() => ({
  /**
   * 팀 멤버의 목록 조회<br>
   */
  * getTeamsMembers(data) {
    const result = yield call(getV1AdminTeamsMembers, data.data);
    yield put(creators.setTeamsMembers(result.data.records));
  },
  /**
   * 팀 멤버의 프로필 조회<br>
   */
  * getTeamsMemberProfiles(data) {
    const result = yield call(getV1AdminTeamsMemberProfiles, data.data);
    yield put(creators.setTeamsMemberProfile(result.data.records));
  },
  /**
   *
   */
  * getTeamsRooms(data) {
    const result = yield call(getAccountV4TeamsRooms, data.data);
    console.log(result);
    // yield put(creators.setTeamsRooms(result.data.records));
  },
}))();

export default function* teamSaga() {}
