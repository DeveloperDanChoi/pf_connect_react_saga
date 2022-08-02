/* eslint-disable max-len,no-empty-function */
import {
  call, put, select,
} from 'redux-saga/effects';
import { initialModules, modules } from './trello';
import {
  getAuthenticationTrelloBoardsList,
  deleteAuthentications,
} from '../../../api/connect/Authentication/authentication';
import {
  getTeamsTrello,
  postTeamsTrello, putTeamsTrelloSetting,
} from '../../../api/connect/WebAdmin/Trello/trello';
import { getV1AdminTeamsMembers } from '../../../api/team/Admin/admin';
import { util } from '../../../service/util';
import { reduxModule } from '../../../service/reduxModule';
import { converter } from '../../../service/converter';
import { template1 } from "../../../service/connect";
import { redirectToMain } from "../../../lib/helpers/routeHelper";
import { Toast } from "../../../components/ui/Toast/Toast";

const { creators } = modules;
export const saga = (() => ({
  /**
   * Webhook Trello Board List 조회<br>
   */
  * getAuthenticationTrelloBoardsList() {
    const result = yield call(getAuthenticationTrelloBoardsList);

    yield put(creators.setAuthenticationTrelloBoardsList(result.data));
    yield put(creators.setInputTrello({ key: 'authenticationId', value: result.data.authenticationId }));
    yield put(creators.setInputTrello({ key: 'selectedAuthentication', value: result.data.authenticationName }));
  },
  /**
   * Connect Trello Service 조회<br>
   * 멤버 정보가 없을 경우 함께 불러와야 함<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<*>>, void, *>}
   */
  * getTeamsTrello(data) {
    const { team } = yield select((state) => state);
    // load initialModule
    const { request, api } = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(request.params, { ...data.data, teamId: team.teamId });

    const result = yield call(api, request);
    const resultMembers = yield call(getV1AdminTeamsMembers, team.teamId);

    for (const member of resultMembers.data.records) {
      if (member.id === result.data.memberId) {
        yield put(creators.setInputTrello({ key: 'member', value: member }));
        break;
      }
    }

    // TODO: 제거 하거나 편집일 떄 input -> teams 데이터로 변경
    yield put(creators.setTeamsTrello(result.data));
    // yield put(creators.setInputRss({ key: 'botThumbnailFile', value: result.data.botThumbnailFile }));
    for (const key in result.data) {
      yield put(creators.setInputTrello({ key, value: result.data[key] }));
    }
    yield put(creators.setInputTrello({ key: 'type', value: 'trello' }));
    yield put(creators.setInputTrello({ key: 'createdAt', value: util.dateFormat(result.data.createdAt) }));
    yield put(creators.setInputTrello({ key: 'statusClss', value: converter.statusClss(result.data.status) }));
  },
  /**
   * Connect Trello Service 생성<br>
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * postTeamsTrello(data) {
    const { team } = yield select((state) => state);
    // load initialModule
    const { request, api } = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(request.body, data.data);
    // custom request data
    request.params.teamId = team.teamId;
    request.body.botThumbnailFile = util.base64ToBlob(data.data.botThumbnailFile);

    // validation
    const validMsg = reduxModule.modules.validate(request.validate, request.body);

    if (validMsg !== '') {
      yield put(Toast.show({ msg: validMsg, type: 'warning' }));
      return;
    }

    // request save
    const result = yield call(api, request);

    if (result.status === 200) {
      redirectToMain();
      return;
    }

    switch (result.status) {
      case 400:
      case 403:
        switch (result.data.code) {
          case 40305:
            yield put(Toast.show({ msg: result.data.msg, type: 'error' }));
            break;
          default:
            yield put(Toast.show({ msg: result.data.msg, type: 'error' }));
        }
        break;
      case 500:
        yield put(Toast.show({ msg: result.data.msg, type: 'error' }));
        break;
      default:
        yield put(Toast.show({ msg: result.data.msg, type: 'error' }));
    }
  },
  /**
   * Connect Trello Service 설정 변경<br>
   * @param data
   * @returns
   */
  * putTeamsTrelloSetting(data) {
    // load initialModule
    const { request, api } = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(request.body, data.data);
    // custom request data
    request.body.connectId = data.data.id;
    request.params.teamId = data.data.teamId;
    request.body.trelloBoardId = data.data.webhookTrelloBoardId;
    request.body.trelloBoardName = data.data.webhookTrelloBoardName;
    request.body.botThumbnailFile = util.base64ToBlob(data.data.botThumbnailFile);

    // validation
    const validMsg = reduxModule.modules.validate(request.validate, request.body);

    if (validMsg !== '') {
      yield put(Toast.show({ msg: validMsg, type: 'warning' }));
      return;
    }

    // request save
    const result = yield call(api, request);

    if (result.status === 200) {
      redirectToMain();
      return;
    }

    switch (result.status) {
      case 400:
      case 403:
        switch (result.data.code) {
          case 40305:
            yield put(Toast.show({ msg: result.data.msg, type: 'error' }));
            break;
          default:
            yield put(Toast.show({ msg: result.data.msg, type: 'error' }));
        }
        break;
      case 500:
        yield put(Toast.show({ msg: result.data.msg, type: 'error' }));
        break;
      default:
        yield put(Toast.show({ msg: result.data.msg, type: 'error' }));
    }
  },
  /**
   * 연동 서비스 인증 삭제<br>
   * @param data
   * @returns
   */
  * deleteAuthentications(data) {
    const { authenticationId } = data.data;
    const result = yield call(deleteAuthentications, { authenticationId });
    // yield put(creators.setInputTrello({ key: 'authenticationId', value: '' }));
    // yield put(creators.setInputTrello({ key: 'selectedAuthentication', value: '' }));
    yield put(creators.getAuthenticationTrelloBoardsList());
  },
  /**
   * 사용자 정의 데이터v
   * @param data
   * @returns
   */
  * setInputTrello(data) {
    yield put(creators.setInputTrelloValue(data));
  },
  /**
   * 사용자 정의 데이터<br>
   * @param data
   * @returns
   */
  * setInputTrelloValue() {},
}))();

export default function* trelloSaga() {}
