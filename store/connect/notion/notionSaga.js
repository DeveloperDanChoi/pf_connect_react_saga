/* eslint-disable max-len,no-empty-function */
import {
  call, put, select,
} from 'redux-saga/effects';
import { initialModules, modules } from './notion';
import {
  getAuthenticationNotionList,
} from '../../../api/connect/Authentication/authentication';
import {
  getTeamsBitbucket,
  postTeamsBitbucket, putTeamsBitbucketSetting,
} from '../../../api/connect/WebAdmin/Bitbucket/bitbucket';
import { getTeamsToken } from '../../../api/connect/WebAdmin/webAdmin';
import { getV1AdminTeamsMembers } from "../../../api/team/Admin/admin";
import { util } from "../../../service/util";
import { reduxModule } from "../../../service/reduxModule";
import { converter } from "../../../service/converter";
import {getAuthenticationGithubReposList} from "../../../api/connect/Authentication/authentication";

const { creators } = modules;
export const saga = (() => ({
  /**
   *
   */
  * getAuthenticationNotionList() {
    const result = yield call(getAuthenticationNotionList);
    console.log( result )
    if (result && result.data !== '') {
      yield put(creators.setAuthenticationNotionList(result.data));
    }
  },
  /**
   * Webhook용 Token을 요청하는 API<br>
   */
  * getTeamsToken(data, connectType = 'notion') {
    const { team } = yield select((state) => state);
    // load initialModule
    const moduleData = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(moduleData.request.params, { connectType, teamId: team.teamId });

    const result = yield call(moduleData.api, moduleData.request);

    yield put(creators.setTeamsToken(result.data));

    for (const key in result.data) {
      yield put(creators.setInputNotion({ key, value: result.data[key] }));
    }
  },
  /**
   * Notion Connect 설정을 단일 조회하는 API<br>
   * 멤버 정보가 없을 경우 함께 불러와야 함<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<*>>, void, *>}
   */
  * getTeamsNotion(data) {
    const { team } = yield select((state) => state);
    // load initialModule
    const moduleData = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(moduleData.request.params, { ...data.data, teamId: team.teamId });

    const result = yield call(moduleData.api, moduleData.request);
    const resultMembers = yield call(getV1AdminTeamsMembers, result.data.teamId);

    for (const member of resultMembers.data.records) {
      if (member.id === result.data.memberId) {
        yield put(creators.setInputNotion({ key: 'member', value: member }));
        break;
      }
    }

    // TODO: 제거 하거나 편집일 떄 input -> teams 데이터로 변경
    yield put(creators.setTeamsNotion(result.data));

    for (const key in result.data) {
      yield put(creators.setInputNotion({ key, value: result.data[key] }));
    }

    yield put(creators.setInputNotion({ key: 'createdAt', value: util.dateFormat(result.data.createdAt) }));
    yield put(creators.setInputNotion({ key: 'statusClss', value: converter.statusClss(result.data.status) }));
  },
  /**
   * Bitbucket Connect 설정을 생성하는 API<br>
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * postTeamsNotion(data) {
    const { team } = yield select((state) => state);
    // load initialModule
    const moduleData = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(moduleData.request.body, data.data);
    // custom request data
    moduleData.request.params.teamId = team.teamId;

    // moduleData.request.body.botThumbnailFile = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfmBxMDBAyT2UEoAAADXElEQVRIx53VW4jVVRTH8c9/5szMucyZi1qiJpUWZRDUg5XWSz30INVDEApZEEKSloSKiN3UCKmMNFB8sLAQoQiCCAJRokANLIIQsYcgJQov6My5zpyZM6uH83cYZWYM1+IPm83a371+67/3XkkAGVlZeQVFvfr0m2GmmWaYoV+vXgXhrIP2ugBJa50kKFrhSbcqKsjL6tIpo00SRjU01NVUtZuvd8xR7ziRLkYSeR96ZSgpqamqKBk04ErqA0pKqmqGcb/Nlkn+8YH9qi1EEs84dKrwhj+U1TU0hTYZXbIKinpSRX0qvnfWWuvNGvWNrU63tC9R+MK3+iw3V28quKhbXi5V057qXWeHXY57L/Pocx6w3ZdGxO6IVSF6YleMxI3tUCyI2fFRlCNqsT2ymRSuZJMz3jYHoalpRMOw4bSEVWUVZVV3OmqTE97PLVjv93EADfv8aommkrKKipqauiHDGkbEeGSi6Wu321nwyAQAnHQSdOjQKSurxxwFBd2K497rsAMGoOM6QJe1HlJQUJCXSw9Fh4x2bRPi+hxw9QReY7O85g7/x5LJAVd3GTZoSE3dQj2puCOqBhRsMnNCPTKT0es2OqKhbsg62yTCCQedtsgW3ZNueY2Fh830l/MG7fEDEutsxWIrdd0YkPeipen4su0ugU7EhOSnAcAYuiX40Z40r8lsSgA87UGwx09TxkwLWGizHC56V3mK0GkBTc9aDo7adzMSQrtN7kL4xLFJg6cFwCIbZfC3/cZuBsBKT4ErU0hokJtiaYtesMXcKfFtTmk8ft3ponVZLrqkicXWpbNjkwAO+22Z56+ZHPapw/jKC86B1Vbo0u/e8Vt41TL+tSP7+bbeM46PT45q86o+efPMB332Wq3fPRPyG/9VkcRb0TwWt4WYH2eneVBHohpX4nycizdDrIqI2J1B+Nh9S1dst8YVx4SaWtpmKsqptx7Uqqq6qvMowlArB7EgfhmJDSG6Y17Mip7IRnuYxDsiH/0xJx6LnyPqsTwZv2VPOHR59uu+M6ZTTk5eXnf6mPakX1G3gry8W/RyyJqkVQfwsp214p9G5eRkderUob3Vl8KYptEJzeKCwz5zMblaSmS8ZIO7MaSqoqykZMCgQQMGlZRUVFTVDSm32ut/QGWUEmvgYHoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDctMTlUMDM6MDQ6MDArMDA6MDCGDi0QAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA3LTE5VDAzOjA0OjAwKzAwOjAw91OVrAAAAABJRU5ErkJggg==';
    // moduleData.request.body.botThumbnailFile = 'https://cdn.jandi.io/files-profile/de206a049c9acbbb29d772c1ce7830e3';
    moduleData.request.body.botThumbnailFile = (base64 => {
      var base64ToBlob = function(base64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(base64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);

          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          var byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });

        return blob;
      }

      var block = base64.split(';');

      // 이미지의 컨텐츠 유형을 얻는다.
      var contentType = block[0].split(':')[1]; // 이 경우 'image/jpeg', 'image/png', 'image/gif'

      // 이미지의 순수 데이터를 얻는다.
      var realData = block[1].split(',')[1]; // 이 경우 '/gj.........Tf/5z0L/2vs1lb4eGcnUco//Z'

      // 이미지의 순수 데이터를 Blob 유형으로 변환한다.
      var blob = base64ToBlob(realData, contentType);
      return blob;
    })(data.data.thumbnail);

    // moduleData.request.body.botThumbnailFile = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfmBxMDBAyT2UEoAAADXElEQVRIx53VW4jVVRTH8c9/5szMucyZi1qiJpUWZRDUg5XWSz30INVDEApZEEKSloSKiN3UCKmMNFB8sLAQoQiCCAJRokANLIIQsYcgJQov6My5zpyZM6uH83cYZWYM1+IPm83a371+67/3XkkAGVlZeQVFvfr0m2GmmWaYoV+vXgXhrIP2ugBJa50kKFrhSbcqKsjL6tIpo00SRjU01NVUtZuvd8xR7ziRLkYSeR96ZSgpqamqKBk04ErqA0pKqmqGcb/Nlkn+8YH9qi1EEs84dKrwhj+U1TU0hTYZXbIKinpSRX0qvnfWWuvNGvWNrU63tC9R+MK3+iw3V28quKhbXi5V057qXWeHXY57L/Pocx6w3ZdGxO6IVSF6YleMxI3tUCyI2fFRlCNqsT2ymRSuZJMz3jYHoalpRMOw4bSEVWUVZVV3OmqTE97PLVjv93EADfv8aommkrKKipqauiHDGkbEeGSi6Wu321nwyAQAnHQSdOjQKSurxxwFBd2K497rsAMGoOM6QJe1HlJQUJCXSw9Fh4x2bRPi+hxw9QReY7O85g7/x5LJAVd3GTZoSE3dQj2puCOqBhRsMnNCPTKT0es2OqKhbsg62yTCCQedtsgW3ZNueY2Fh830l/MG7fEDEutsxWIrdd0YkPeipen4su0ugU7EhOSnAcAYuiX40Z40r8lsSgA87UGwx09TxkwLWGizHC56V3mK0GkBTc9aDo7adzMSQrtN7kL4xLFJg6cFwCIbZfC3/cZuBsBKT4ErU0hokJtiaYtesMXcKfFtTmk8ft3ponVZLrqkicXWpbNjkwAO+22Z56+ZHPapw/jKC86B1Vbo0u/e8Vt41TL+tSP7+bbeM46PT45q86o+efPMB332Wq3fPRPyG/9VkcRb0TwWt4WYH2eneVBHohpX4nycizdDrIqI2J1B+Nh9S1dst8YVx4SaWtpmKsqptx7Uqqq6qvMowlArB7EgfhmJDSG6Y17Mip7IRnuYxDsiH/0xJx6LnyPqsTwZv2VPOHR59uu+M6ZTTk5eXnf6mPakX1G3gry8W/RyyJqkVQfwsp214p9G5eRkderUob3Vl8KYptEJzeKCwz5zMblaSmS8ZIO7MaSqoqykZMCgQQMGlZRUVFTVDSm32ut/QGWUEmvgYHoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDctMTlUMDM6MDQ6MDArMDA6MDCGDi0QAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA3LTE5VDAzOjA0OjAwKzAwOjAw91OVrAAAAABJRU5ErkJggg==';
    // moduleData.request.body.botThumbnailFile = data.data.thumbnail;
    console.log(moduleData.request, data.data);
    const result = yield call(moduleData.api, moduleData.request);
  },
  /**
   * Notion Connect 설정을 수정하는 API<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * putTeamsNotionSetting(data) {
    // load initialModule
    const moduleData = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(moduleData.request.body, data.data);
    moduleData.request.body.connectId = data.data.id;
    moduleData.request.params.teamId = data.data.teamId;

    const result = yield call(moduleData.api, moduleData.request);

    if (result.status !== 200) {
      console.error('update fail !!');
      yield put(creators.getTeamsNotion({
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
  * setInputNotion(data) {
    yield put(creators.setInputNotionValue(data));
  },
  /**
   * 사용자 정의 데이터<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputNotionValue() {},
}))();

export default function* notionSaga() {}
