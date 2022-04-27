let LEVEL = {
  BOT: -1,  //bot
  ASSOCIATE: 0, //준회원
  OWNER: 1, //소유자
  MANAGER: 2, //관리자
  MEMBER: 3  //정회원
};

export const getTextFromRankId = (rankId, levelTable) => {
  return getTextFromLevel(levelTable[rankId]);
}

function getTextFromLevel(level) {
  let text;

  switch (level) {
    case 0:
      text = '@authority-associate';
      break;
    case 1:
      text = '@authority-owner';
      break;
    case 2:
      // text = '@authority-admin';
      text = '@dashboard-member-admin';
      break;
    case 3:
      text = '@authority-member';
      break;
    default:
      text = '';
      break;
  }

  return text;
}

export const getCssFromMember = (member, levelTable) => {
  let rankId = member.rankId;
  let css = '';

  if (member.status === 'inactive') {
    css = 'of-inactive'
  } else {
    if (is('MEMBER', rankId, levelTable)) {
      css = 'of-member';
    } else if (is('MANAGER', rankId, levelTable)) {
      css = 'of-admin';
    } else if (is('OWNER', rankId, levelTable)) {
      css = 'of-team-owner';
    } else if (is('ASSOCIATE', rankId, levelTable)) {
      css = 'of-associated';
    }
  }

  return css;
}

function is(levelName, compareRoleId, levelTable) {
  let compareLevelName = _getLevelNameByRankId(compareRoleId, true, levelTable);
  levelName = !_.isArray(levelName) ? [levelName] : levelName;

  return _.indexOf(levelName, compareLevelName) !== -1;
}

function _getLevelNameByRankId(rankId, isIgnoreError, levelTable) {
  let level = levelTable[rankId];
  let levelName;

  _.forEach(LEVEL, function(value, key) {
    if (level === value) {
      levelName = key;
      return false;
    }
  });

  if (!isIgnoreError && (!levelName || _.isUndefined(_levelTable[rankId]))) {
    console.error(LEVEL, _levelTable);
  }

  return levelName;
}
