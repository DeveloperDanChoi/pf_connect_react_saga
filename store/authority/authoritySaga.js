/* eslint-disable comma-dangle,no-undef,max-len */
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
import { reqUser, setUser } from '../user/user';
import {
  getConnect,
  getTeamsConnect,
} from '../../api/connect/WebAdmin/webAdmin';
import {
  getAuthenticationList,
} from '../../api/connect/Authentication/authentication';
import {
  getAccountV2,
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

    let result = yield call(
      getTeamV2,
      action.data === 'local' ? 'tosslab' : action.data,
    );
    if (result.status === 200 && result.data.valid) {
      const { teamId } = result.data;
      yield put(setTeamId(teamId));

      result = yield call(getConnect);
      if (result.status === 200) {
        yield put(setConnects(((data) => {
          // eslint-disable-next-line no-restricted-syntax
          for (const item of data) {
            item.display = 'block';
          }
          return data;
        })(result.data.connects)));
      }
      result = yield call(getTeamsConnect, teamId);
      if (result.status === 200) {
        yield put(setTeamsConnect(result.data));
      }
      result = yield call(getAuthenticationList, teamId);
      yield put(setAuthentication(result.data));
      // result = yield call(getAccountV2);
      // console.log('result1 !!' , result)
      // if (result.status === 200) {
      //   yield put(setUser(result.data));
      // }
      result = yield call(getStartAccountV2);
      console.log('result2 !!', result);
      if (result.status === 200) {
        // console.log( _.filter(result.data.memberships, (f) => f.teamId === teamId) )
        yield put(setTeam(_.filter(result.data.memberships, (d) => d.teamId === teamId)[0]));
      }

      isUnauthorized = false;
    }
  } catch ({ response }) {
    console.error(response);
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
