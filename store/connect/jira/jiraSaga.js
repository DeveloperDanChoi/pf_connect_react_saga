/* eslint-disable max-len,no-empty-function */
import {
  call, put, select,
} from 'redux-saga/effects';
import { initialModules, modules } from './jira';
import {
  getTeamsJira,
  postTeamsJira,
  putTeamsJiraSetting,
} from '../../../api/connect/WebAdmin/Jira/jira';
import { getTeamsToken } from '../../../api/connect/WebAdmin/webAdmin';
import { getV1AdminTeamsMembers } from "../../../api/team/Admin/admin";
import { util } from "../../../service/util";
import { reduxModule } from "../../../service/reduxModule";
import { converter } from "../../../service/converter";

const { creators } = modules;
export const saga = (() => ({
  /**
   * Webhook용 Token을 요청하는 API<br>
   */
  * getTeamsToken(data) {
    const result = yield call(getTeamsToken, { connectType: 'jira', teamId: 279 });
    yield put(creators.setTeamsToken(result.data));
  },
  /**
   * Jira Connect 설정을 단일 조회하는 API<br>
   * 멤버 정보가 없을 경우 함께 불러와야 함<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<*>>, void, *>}
   */
  * getTeamsJira(data) {
    const { team } = yield select((state) => state);
    // load initialModule
    const moduleData = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(moduleData.request.params, { ...data.data, teamId: team.teamId });

    const result = yield call(moduleData.api, moduleData.request);
    const resultMembers = yield call(getV1AdminTeamsMembers, result.data.teamId);

    for (const member of resultMembers.data.records) {
      if (member.id === result.data.memberId) {
        yield put(creators.setInputJira({ key: 'member', value: member }));
        break;
      }
    }

    // TODO: 제거 하거나 편집일 떄 input -> teams 데이터로 변경
    yield put(creators.setTeamsJira(result.data));

    for (const key in result.data) {
      yield put(creators.setInputJira({ key, value: result.data[key] }));
    }

    yield put(creators.setInputJira({ key: 'createdAt', value: util.dateFormat(result.data.createdAt) }));
    yield put(creators.setInputJira({ key: 'statusClss', value: converter.statusClss(result.data.status) }));
  },
  /**
   * Jira Connect 설정을 생성하는 API<br>
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * postTeamsJira(data) {
    const params = {
      botName: 'Jira_OK',
      defaultBotName: 'Jira',
      lang: 'ko',
      webhookToken: data.data.jira.teamsToken.webhookToken,
      roomId: 20128232,
    };
    const result = yield call(postTeamsJira, { teamId: 279, data: params });
  },
  /**
   * Jira Connect 설정을 수정하는 API<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * putTeamsJiraSetting(data) {
    // load initialModule
    const moduleData = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(moduleData.request.body, data.data);
    moduleData.request.body.connectId = data.data.id;
    moduleData.request.params.teamId = data.data.teamId;

    const result = yield call(moduleData.api, moduleData.request);

    if (result.status !== 200) {
      console.error('update fail !!');
      yield put(creators.getTeamsJira({
        connectId: moduleData.request.body.connectId,
        teamId: moduleData.request.params.teamId,
      }));
    }
  },
  /**
   * 사용자 정의 데이터<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputJira(data) {
    yield put(creators.setInputJiraValue(data));
  },
  /**
   * 사용자 정의 데이터<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputJiraValue() {},
}))();

export default function* jiraSaga() {}
