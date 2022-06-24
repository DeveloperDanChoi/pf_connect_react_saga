/* eslint-disable max-len,no-empty-function */
import {
  call, put, select,
} from 'redux-saga/effects';
import { initialModules, modules } from './outgoing';
import {
  getTeamsOutgoing,
  postTeamsOutgoing, putTeamsOutgoingSetting,
} from '../../../api/connect/WebAdmin/Outgoing/outgoing';
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
  * getTeamsToken(data, connectType = 'outgoing') {
    const { team } = yield select((state) => state);
    // load initialModule
    const moduleData = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(moduleData.request.params, { connectType, teamId: team.teamId });

    const result = yield call(moduleData.api, moduleData.request);

    yield put(creators.setTeamsToken(result.data));

    for (const key in result.data) {
      yield put(creators.setInputOutgoing({ key, value: result.data[key] }));
    }
  },
  /**
   * Outgoing Webhook Connect 설정을 단일 조회하는 API<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<*>>, void, *>}
   */
  * getTeamsOutgoing(data) {
    const { team } = yield select((state) => state);
    // load initialModule
    const moduleData = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(moduleData.request.params, { ...data.data, teamId: team.teamId });

    const result = yield call(moduleData.api, moduleData.request);
    const resultMembers = yield call(getV1AdminTeamsMembers, result.data.teamId);

    for (const member of resultMembers.data.records) {
      if (member.id === result.data.memberId) {
        yield put(creators.setInputOutgoing({ key: 'member', value: member }));
        break;
      }
    }

    // TODO: 제거 하거나 편집일 떄 input -> teams 데이터로 변경

    yield put(creators.setTeamsOutgoing(result.data));

    for (const key in result.data) {
      yield put(creators.setInputOutgoing({ key, value: result.data[key] }));
    }

    yield put(creators.setInputOutgoing({ key: 'createdAt', value: util.dateFormat(result.data.createdAt) }));
    yield put(creators.setInputOutgoing({ key: 'statusClss', value: converter.statusClss(result.data.status) }));
  },
  /**
   * Outgoing Webhook Connect 설정을 생성하는 API<br>
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * postTeamsOutgoing(data) {
    const { team } = yield select((state) => state);
    // load initialModule
    const moduleData = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(moduleData.request.body, data.data);
    // custom request data
    moduleData.request.params.teamId = team.teamId;

    const result = yield call(moduleData.api, moduleData.request);
  },
  /**
   * Outgoing Webhook Connect 설정을 수정하는 API<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * putTeamsOutgoingSetting(data) {
    // load initialModule
    const moduleData = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(moduleData.request.body, data.data);
    moduleData.request.body.connectId = data.data.id;
    moduleData.request.params.teamId = data.data.teamId;

    const result = yield call(moduleData.api, moduleData.request);

    if (result.status !== 200) {
      console.error('update fail !!');
      yield put(creators.getTeamsOutgoing({
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
  * setInputOutgoing(data) {
    yield put(creators.setInputOutgoingValue(data));
  },
  /**
   * 사용자 정의 데이터<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputOutgoingValue() {},
}))();

export default function* outgoingSaga() {}
