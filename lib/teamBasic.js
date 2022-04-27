import _ from 'lodash';
import getConfig from 'next/config';
import menuTypeConfig from '../constants/menuTypeConfig';
import { KEY_MAP, LEVEL, PLAN } from '../constants/status';

const IS_ORG = 'use';
const IS_ORGSUBLANG = 'use';

const _isPlanCheck = (_teamPlan, TYPE) => {
  let isCheck = false;

  if( !_.isEmpty(_teamPlan) && typeof _teamPlan.pricing !== "undefined" ) {
    switch (TYPE) {
      case "FREE":
        isCheck = PLAN.FREE === _teamPlan.pricing;
        break;
      case "STANDARD":
        isCheck = PLAN.STANDARD === _teamPlan.pricing;
        break;
      case "ENTERPRISE":
        isCheck = PLAN.ENTERPRISE === _teamPlan.pricing;
        break;
    }
  }
  return isCheck;
}

const _isExistAccountTag = (_account, _tag) => {
  let existTag = false;
  if ( typeof _account !== "undefined" && !_.isEmpty(_account.tags) ) {
    existTag = _.includes(_account.tags, _tag);
  }
  return existTag;
}

const _isOrgUse = (_teamPreferences) => {
  return _teamPreferences?.organizationChart === IS_ORG;
}

const isOrgSubLanguageUse = (_teamPreferences) => {
  return _teamPreferences?.organizationChartSubLanguage === IS_ORGSUBLANG;
}

const _getMenus = () => {
  const menus = JSON.parse(JSON.stringify(menuTypeConfig.CONTROL_MENU));
  //나중에 온프라미스 필요하면 추가 제어
  //const _isOnPremise = configuration.is_on_premise != "" ? true:false;
  menus[0].title = '@dashboard';
  return menus;
}

const _seenFlagGet = (key, account) => {
  let index = KEY_MAP[key];
  let flagStr;
  let flags;

  if (!_.isUndefined(account) && !_.isUndefined(index)) {
    flagStr = account.hasSeenFlags || '';
    if (flagStr !== '') {
      flags = flagStr.split(',');
      return flags[index] === '1';
    } else {
      return false;
    }
  } else {
    return false;
  }
}

/**
 * menu가 필요로하는 최소한의 팀 플랜을 확인한다.
 * @param {object} menu - menu to check
 * @returns {boolean}
 * @private
 */
const _hasMinimumPlan = (menu, teamPlan) => {
  const minimumPlan = menu.requiredPlan;
  const planClassName = _getPlanClassName(teamPlan);

  if (_.isUndefined(minimumPlan) || minimumPlan === '') {
    return true;
  }
  // standard => premium
  return 'is-' + minimumPlan === planClassName;
}

const _getPlanClassName = (teamPlan) => {
  return _isPlanCheck(teamPlan, "STANDARD") ? 'is-premium' : _isPlanCheck(teamPlan, "ENTERPRISE") ? 'is-enterprise' : '';
}

const _getPlanName = (teamPlan) => {
  if (isPlanCheck(teamPlan, "STANDARD")) {
    return "PREMIUM";
  }
  return _.isUndefined(teamPlan) ? 'FREE' : teamPlan.pricing.toUpperCase();
}

const _getPlanSubName = (teamPlan) => {
  return teamPlan.subPricing && teamPlan.subPricing !== "" ? '+' : '';
}

/**
 * level보다 compareLevel이 더 높은지 확인한다.
 * @param {string} level - name of level to be compared to
 * @param {number} memberRankId - rank id of member
 * @param {array} rankList - rankList of commonState
 * @param {boolean} isEqualTo - flag where to compare with equality
 * @returns {boolean}
 */
const isHigher = (level, memberRankId, rankList, isEqualTo) => {
  // 비교에서 기준이 되는 레벨 아이디
  var levelId = LEVEL[level];
  // 기준과 비교할 레벨 아이디
  var memberLevelId = LEVEL[_getLevelNameByRankId(rankList, memberRankId, true)];

  if (levelId === LEVEL['ASSOCIATE']) {
    // 비교 대상이 준회원일 경우
    return true;
  }

  if (isEqualTo) {
    if (memberLevelId === levelId) {
      return true;
    }
  }

  if (memberLevelId === LEVEL['ASSOCIATE']) {
    // 멤버가 associate일 경우
    return false;
  }

  // level보다 내가 작으면 더 높은 rank
  return memberLevelId < levelId;
}



/**
 * 메뉴를 볼 수 있는 권한을 가졌는지 확인한다.
 * @param {object} menu - menu object
 * @param {number} rankId - userInfo object
 * @private
 */
const _hasMinimumAuthority = (menu, rankId, rankList) => {
  return isHigher(menu.requiredAuthority, rankId, rankList, true);
}

//membership을 받아서 비교
const _isAdmin = (levelName, rankId, rankList) => {
  const compareLevelName = _getLevelNameByRankId(rankList, rankId, true) || _getLevelName(rankList, rankId);
  levelName = !_.isArray(levelName) ? [levelName] : levelName;

  return _.indexOf(levelName, compareLevelName) !== -1;
}

//id자체를 받아서 비교
const _is = (levelName, compareRoleId, rankList) => {
  const compareLevelName = _getLevelNameByRankId(rankList, compareRoleId, true);
  levelName = !_.isArray(levelName) ? [levelName] : levelName;

  return _.indexOf(levelName, compareLevelName) !== -1;
}

export const leftMenuInit = ({teamPlan, teamPreferences, rankList, userInfo}) => {
  let returnObj = {
    isAdmin: true,
    isOwner: false,
  };
  let resultMenu = [];
  let tempHasSeenObj;
  let isNotMemberMenu;
  let isSwitchMemberMenu;
  let len;

  if(userInfo.member.id === 0 || _.isEmpty(rankList)) return menuTypeConfig.CONTROL_MENU;
  let rankId = userInfo.member.rankId;

  if (!isAdmin(['OWNER', 'MANAGER'], rankId, rankList)) {
    returnObj.isAdmin = false
  }
  // 소유자 판단
  returnObj.isOwner = isAdmin(['OWNER'], rankId, rankList);

  const menus = getMenus();

  let disAcctHelp = isExistAccountTag(userInfo, 'disable_help');
  let disAcctTerms = isExistAccountTag(userInfo,'disable_terms');
  returnObj.disAcctHelp = !disAcctHelp;
  returnObj.disAcctTerms = !disAcctTerms;

  let disMemMgr = isExistAccountTag(userInfo,'disable_member_management');
  let orgMngUse = (isPlanCheck(teamPlan, "FREE")) ? false : isOrgUse(teamPreferences);

  if (menus.length > 0) {
    _.forEach(menus, (menu) => {
      if (hasMinimumPlan(menu, teamPlan)) {
        if(hasMinimumAuthority(menu, rankId, rankList)){
          isNotMemberMenu = _.isUndefined(menu.orgSwitch);
          // 2. 멤버관리 메뉴라면..조직도 사용시->조직관리선택, 미사용시 멤버관리
          isSwitchMemberMenu = (!isNotMemberMenu && menu.orgSwitch === orgMngUse);

          if( isNotMemberMenu || isSwitchMemberMenu ){
            // accoutn tag가 설정되면 조직관리/멤버관리 메뉴 미노출
            if( !disMemMgr || !isSwitchMemberMenu ){
              resultMenu.push(menu);
            }
            // 사용자의 페이지 확인 여부를 위한 리스트가 속성으로 존재하면
            if (menu.hasOwnProperty('hasSeenList')) {
              // 위의 배열의 길이
              len = menu.hasSeenList.length;

              // 키 값을 돌며 어카운드 정보에서 값을 가져와 저장
              /*for (let i = 0; i < len; i++) {

                tempHasSeenObj = menu.hasSeenList[i];
                tempHasSeenObj.value = seenFlagGet(tempHasSeenObj.key, userInfo);

                // 안본 속성이 있는 경우 값을 재정의
                if (menu.hasSeen && !tempHasSeenObj.value) {
                  menu.hasSeen = false;
                }
              }*/
            }
          }
        }
      }
    });
  }
  returnObj.resultMenu = resultMenu;

  return returnObj;
}

const _getMentionName = (user, teamPreferences) => {
  if (_.isUndefined(user)) return;

  const orgUse = isOrgUse(teamPreferences);
  const useOrgSubLang = isOrgSubLanguageUse(teamPreferences);
  const isMrj = user.type === 'bot';

  let _memberName = user.nameSet.name;
  if (orgUse && useOrgSubLang && !isMrj) {
    if (!_.isNull(user.nameSet.secondName) &&
        user.nameSet.secondName !== "" &&
        user.nameSet.secondName !== user.nameSet.name &&
        !_.isUndefined(user.nameSet.secondName)) {
      _memberName = `${user.nameSet.name}_${user.nameSet.secondName}`;
    } else {
      _memberName = user.nameSet.name;
    }
  }
  return _memberName;
}

export const is = _is;
export const isPlanCheck = _isPlanCheck;
export const isExistAccountTag = _isExistAccountTag;
export const isOrgUse = _isOrgUse;
export const getMenus = _getMenus;
export const hasMinimumPlan = _hasMinimumPlan;
export const isAdmin = _isAdmin;
export const seenFlagGet = _seenFlagGet;
export const getPlanClassName = _getPlanClassName;
export const getPlanName = _getPlanName;
export const getPlanSubName = _getPlanSubName;
export const getMentionName = _getMentionName;

export default {};
