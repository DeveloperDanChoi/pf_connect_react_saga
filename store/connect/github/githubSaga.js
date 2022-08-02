/* eslint-disable max-len,no-empty-function,no-restricted-syntax */
import {
  call, put, select,
} from 'redux-saga/effects';
import { initialModules, modules } from './github';
import {
  getAuthenticationGithubReposList,
  deleteAuthentications,
} from '../../../api/connect/Authentication/authentication';
import {
  getTeamsGithub,
  postTeamsGithub,
  putTeamsGithubSetting,
} from '../../../api/connect/WebAdmin/Github/github';
import { reduxModule } from "../../../service/reduxModule";
import { getV1AdminTeamsMembers } from "../../../api/team/Admin/admin";
import { util } from "../../../service/util";
import { converter } from "../../../service/converter";
import { redirectToMain } from "../../../lib/helpers/routeHelper";
import { Toast } from "../../../components/ui/Toast/Toast";

const { creators } = modules;
export const saga = (() => ({
  /**
   * 인증된 GitHub 정보와 해당 유저의 repositories 리스트 조회<br>
   */
  * getAuthenticationGithubReposList() {
    // TODO: 정보가 있을 경우에만 call
    const result = yield call(getAuthenticationGithubReposList);
    if (result) {
      yield put(creators.setAuthenticationGithubReposList(result.data));
    }
  },
  /**
   * 단일 Github Connect 조회<br>
   * 멤버 정보가 없을 경우 함께 불러와야 함<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<*>>, void, *>}
   */
  * getTeamsGithub(data) {
    const { team, github } = yield select((state) => state);
    // load initialModule
    const { request, api } = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(request.params, { ...data.data, teamId: team.teamId });

    const result = yield call(api, request);
    const resultMembers = yield call(getV1AdminTeamsMembers, result.data.teamId);

    for (const member of resultMembers.data.records) {
      if (member.id === result.data.memberId) {
        yield put(creators.setInputGithub({ key: 'member', value: member }));
        break;
      }
    }

    // TODO: 제거 하거나 편집일 떄 input -> teams 데이터로 변경
    yield put(creators.setTeamsGithub(result.data));

    for (const key in result.data) {
      yield put(creators.setInputGithub({ key, value: result.data[key] }));
    }

    // event mapping
    const hookEventChecked = { ...github.input.hookEventChecked };
    for (const eventName of result.data.hookEvent) {
      if (github.getHookEvent[eventName]) {
        hookEventChecked[github.getHookEvent[eventName]] = true;
      }
    }
    yield put(creators.setInputGithub({ key: 'hookEventChecked', value: hookEventChecked }));
    yield put(creators.setInputGithub({ key: 'type', value: 'github' }));
    yield put(creators.setInputGithub({ key: 'createdAt', value: util.dateFormat(result.data.createdAt) }));
    yield put(creators.setInputGithub({
      key: 'selectedRepo',
      value: result.data.hookRepoName.replace(`${result.data.authenticationName}/`, ''),
    }));
    yield put(creators.setInputGithub({ key: 'statusClss', value: converter.statusClss(result.data.status) }));
  },
  /**
   * Github Connect 설정 생성<br>
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * postTeamsGithub(data) {
    const { team, github } = yield select((state) => state);
    // load initialModule
    const { request, api } = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(request.body, data.data);
    // custom request data
    request.params.teamId = team.teamId;
    request.body.hookRepoName = `${github.authenticationGithubReposList.authenticationName}/${data.data.hookRepoName}`;
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
   * Github Connect 설정 수정<br>
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * putTeamsGithubSetting(data) {
    // load initialModule
    const { request, api } = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(request.body, data.data);
    request.body.connectId = data.data.id;
    request.params.teamId = data.data.teamId;
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

    yield put(creators.getAuthenticationGithubReposList());
  },
  /**
   * 사용자 정의 데이터<br>
   * @param data
   * @returns
   */
  * setInputGithub(data) {
    yield put(creators.setInputGithubValue(data));
  },
  /**
   * 사용자 정의 데이터<br>
   * @param data
   * @returns
   */
  * setInputGithubValue() {},
}))();

export default function* githubSaga() {}
