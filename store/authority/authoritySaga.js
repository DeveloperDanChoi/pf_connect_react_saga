/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,react/jsx-no-duplicate-props,guard-for-in,operator-assignment,no-unreachable,object-curly-newline,react/no-unescaped-entities,react/jsx-no-comment-textnodes,space-before-function-paren,array-callback-return,import/no-duplicates,import/named,no-restricted-globals */
import {
  all, call, fork, put, select, takeLatest,
} from 'redux-saga/effects';
import { getTeamV2 } from '../../api/inner/validations';
import {
  AUTHORIZE,
  DOMAIN_CHECK_ERROR,
  domainCheckError,
} from './authority';
import { modules as teamModules } from '../team/team';
import { modules as connectModules } from '../connect/connect';
import {
  setTeamsConnect,
  setAuthentication,
} from '../connect/connect';
import { modules as userModules } from '../user/user';
import { modules as googleCalendarModules } from '../connect/googleCalendar/googleCalendar';

import {
  getConnect,
  getTeamsConnect,
} from '../../api/connect/WebAdmin/webAdmin';
import {
  getAuthenticationList,
  getAuthenticationGoogleCalendarCalendarList,
} from '../../api/connect/Authentication/authentication';
import {
  getL10N,
  getAccountV4TeamsMe,
} from '../../api/start/start';
import {
  redirectToLoginAndList,
} from '../../lib/helpers/routeHelper';
import { getCookie, hasAccessToken } from '../../lib/cookie';
import { getV1AdminTeamsTopics, getV1AdminTeams } from '../../api/team/Admin/admin';
import { getV1TeamsStart } from '../../api/connect/ConnectStart/connectStart';

/**
 * 인증에 문제가 있을 경우 로그인화면으로 이동<br>
 * TODO: api success fail 공통화
 * @param action
 * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): *)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): *)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): *)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<{data: *, type: string}>>|SimpleEffect<"CALL", CallEffectDescriptor<(function(): *)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(): *)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(): *)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
 */
function* authorize(action) {
  let isUnauthorized = true;

  try {
    if (!hasAccessToken() || !getCookie('refresh_token')) {
      return;
    }

    const result = yield call(
      getTeamV2,
      action.data === 'local' ? 'tosslab' : action.data,
    );

    // 유효한 팀일 경우에만
    if (result.status === 200 && result.data.valid) {
      const { teamId } = result.data;
      yield put(teamModules.creators.setTeamId(teamId));

      const apis = [
        call(getConnect),//TODO: new system api, 커넥트 전체 앱 목록
        // call(getTeamsConnect, teamId), // 팀에 연결된 커넥트 정보
        call(getAuthenticationList, teamId), // 내가 인증한 커넥트 정보
        call(getAccountV4TeamsMe, teamId), // TODO: email 요청할 것, 내 정보
        call(getV1TeamsStart, teamId), // 내가 참여한 토픽 정보
        call(getV1AdminTeamsTopics, teamId), // 팀의 공개 토픽 정보
        call(getV1AdminTeams, teamId), // 팀 정보
      ];

      // TODO: 직링크에 대한 데이터 처리
      if (history.state.url === '/googleCalendar') {
        // apis.push(call(getAuthenticationGoogleCalendarCalendarList));
      } else if (history.state.url !== '/') {
        console.log(history.state);
      }

      const [ connect, /*teamsConnect, */ authenticationList, accountV4TeamsMe, v1TeamsStart, v1AdminTeamsTopics, v1AdminTeams, svc ] = yield all(apis);

      if (connect.status === 200) {
        yield put(connectModules.creators.setConnects(((data) => {
          for (const item of data) {
            item.display = 'block';
          }
          return data;
        })(connect.data.connects)));
      }

      // TODO: MFA

      yield put(connectModules.creators.setAuthentication(authenticationList.data));

      yield put(userModules.creators.setUser(accountV4TeamsMe.data));

      yield put(userModules.creators.setRooms(v1TeamsStart.data));

      yield put(teamModules.creators.setRooms(v1AdminTeamsTopics.data));

      yield put(teamModules.creators.setTeam(v1AdminTeams.data));

      /*

      if (history.state.url === '/googleCalendar') {
        yield put(googleCalendarModules.creators.setAuthenticationGoogleCalendarCalendarList(svc.data));
      }
      */

      // TODO: 고용량 데이터?
      // const resultL10N = yield call(
      //   getL10N,
      //   accountV4TeamsMe.data.account.lang,
      // );
      // yield put(teamModules.creators.setL10n(resultL10N.data));

      isUnauthorized = false;
    }
  } catch (e) {
    console.error(e);
  } finally {
    if (isUnauthorized) {
      redirectToLoginAndList();
    }
  }
}
/*
function* redirectToLoginAndList(action) {
  try {
    console.log('action >>', action)
  } catch ({ response }) {
    console.log("redirectToLoginAndList error>>>", response);
  }
}
*/

function* watchAuthorize() {
  yield takeLatest(AUTHORIZE, authorize);
}
function* watchDomainCheckError() {
  yield takeLatest(DOMAIN_CHECK_ERROR, redirectToLoginAndList);
}

export default function* authoritySaga() {
  yield all([
    fork(watchAuthorize),
    fork(watchDomainCheckError),
  ]);
}
