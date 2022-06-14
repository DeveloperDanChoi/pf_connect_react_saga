import {call, put, select} from "redux-saga/effects";
import {getV1AdminTeamsMembers} from "../../api/team/Admin/admin";
import {getTeamsConnect} from "../../api/connect/WebAdmin/webAdmin";
import {modules as teamModules} from "../team/team";

const { creators } = teamModules;
export const saga = (() => ({
    /**
     * 팀 멤버의 목록 조회<br>
     */
    * getTeamsMembers(data) {
        const result = yield call(getV1AdminTeamsMembers, data.data);
        yield put(creators.setTeamsMembers(result.data.records));
    },
}))();

export default function* teamSaga() {}
