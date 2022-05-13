/* eslint-disable comma-dangle,no-undef,max-len,no-restricted-syntax,no-restricted-globals */
import {
  all, call, fork, put, select, takeLatest,
} from 'redux-saga/effects';
import { getTeamV2 } from '../../api/inner/validations';
import {
  AUTHORIZE,
  DOMAIN_CHECK_ERROR,
  domainCheckError,
} from './authority';
import { setTeam, setTeamId } from '../team/team';
import {
  setConnects,
  setTeamsConnect,
  setAuthentication,
} from '../connect/connect';
import {
  setUser,
} from '../user/user';
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
  getAccountMembersV2,
  getAccountV3,
} from '../../api/inner/account';
import {
  getStartAccountV2,
} from '../../api/start/start';
import {
  redirectToLoginAndList,
} from '../../lib/helpers/routeHelper';
import { getCookie, hasAccessToken } from '../../lib/cookie';

/**
 * 인증에 문제가 있을 경우 로그인화면으로 이동
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
    if (result.status === 200 && result.data.valid) {
      // const result2 = yield call(
      //     getAccountMembersV2,
      // );
      // console.log( result2 )
      if (result.status === 200) {
        const { teamId } = result.data;
        yield put(setTeamId(teamId));

        const apis = [
          call(getConnect),
          call(getTeamsConnect, teamId),
          call(getAuthenticationList, teamId),
          call(getStartAccountV2),
          call(getAccountV3),
        ];

        if (history.state.url === '/googleCalendar') {
          apis.push(call(getAuthenticationGoogleCalendarCalendarList));
        } else if (history.state.url !== '/') {
          console.log(history.state);
        }

        const results = yield all(apis);

        if (results[0].status === 200) {
          yield put(setConnects(((data) => {
            for (const item of data) {
              item.display = 'block';
            }
            return data;
          })(results[0].data.connects)));
        }

        if (results[1].status === 200) {
          yield put(setTeamsConnect(results[1].data));
        }

        yield put(setAuthentication(results[2].data));

        if (results[3].status === 200) {
          yield put(setTeam(_.filter(results[3].data.memberships, (d) => d.teamId === teamId)[0]));
        }

        if (results[4].status === 200) {
          yield put(setUser(results[4].data));
        }

        if (history.state.url === '/googleCalendar') {
          yield put(googleCalendarModules.creators.setAuthenticationGoogleCalendarCalendarList(results[results.length - 1].data));
        }

        isUnauthorized = false;
      }
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
