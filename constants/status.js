/**
 * Http Response status
 */
export const HTTP_RESPONSE = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  GONE: 410,
  INTERNAL_SERVER_ERR: 500,
  NOT_IMPLEMENTED: 501,
  SERVICE_UNAVAILABLE: 503,
};

/**
 * Invitation Object status
 */
export const INVITATION = {
  ACCEPTED: 'accepted',
  CANCELED: 'canceled',
  DECLIEND: 'decliend',
  EXPIRED: 'expired',
  PENDING: 'pending',
  STOPPED: 'stopped',
};

/**
 * Account Object status
 * - CAPTCHA status 확인 필요
 */
export const ACCOUNT = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  INACTIVE: 'inactive',
  CAPTCHA: 'captcha',
};

/**
 * Team Object status
 */
export const TEAM = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
};

/**
 * LEVEL 을 ENUM 으로 정의
 * @type {{OWNER: number, MANAGER: number, MEMBER: number, ASSOCIATE: number}}
 */
export const LEVEL = {
  BOT: -1,
  //준회원
  ASSOCIATE: 0,
  //소유자
  OWNER: 1,
  //관리자
  MANAGER: 2,
  //정회원
  MEMBER: 3
};

export const KEY_MAP = {
  'GUIDE_TOPIC_FOLDER': 0,
  'GUIDE_CONNECT': 1,
  'TUTORIAL_VER3_WELCOME': 2,
  'TUTORIAL_VER3_POPOVER': 3,
  'STICKER_DINGO': 4,
  'STICKER_MALLOW': 5,
  'STICKER_DINGO_v2': 6,
  'STICKER_DAVID': 7,
  'STICKER_CONFIRM': 8,
  'STICKER_TMON': 9,
  'STICKER_FRANKY': 10,
  'ADD_ON_OPTION_MESSAGE_READ': 11,
  'STICKER_ANIPANG': 12,
  'STICKER_ARACHI': 13,
  'TODO_TUTORIAL': 14,
  'ADD_ON_OPTION_ORG_READ':15,
  'ORG_MNG_OPTION_READ':16,
  'STICKER_MINDA': 17,
  'STICKER_ONESTORE':18,
  'RETURN_KEY_SET':19,
  'STICKER_EBICHU':20,
  'USER_THEMA_WHITE':21,
  'USER_THEMA_DARK':22,
  'LOCK_SCREEN':23,
  'GNB_DRIVE_NEW':33
};

export const PLAN = {
  FREE: 'free',
  STANDARD: 'standard',
  ENTERPRISE: 'enterprise'
};

/**
 * LEVEL이 정렬되어야 할 때의 ORDER
 * @type {{0: number, 1: number, 2: number, 3: number}}
 */
export const LEVEL_ORDER = {
  // 준회원은 제일 마지막
  0: 3,
  1: 0,
  2: 1,
  3: 2
};

export const STATUS_MAP = {
  'enabled': true,
  'disabled': true,
  'inactive': true
};

export const ACTION_TO_OWNER = '1';
export const ACTION_TO_MANAGER = '2';
export const ACTION_TO_MEMBER = '3';
export const ACTION_DISABLE_MEMBER = '4';
export const ACTION_SEND_INVITE = '5';
export const ACTION_CANCEL_INVITE = '6';
export const ACTION_ENABLE_MEMBER = '7';
export const ACTION_DELETE_MEMBER = '8';

export const ANOTHER_LANGUAGE_MAP = {
  'en': 'en',
  'ko': 'kr',
  'zh-cn': 'zh-cn',
  'zh-tw': 'zh-tw',
  'ja': 'jp',
  'vi': 'vi'
}

export const VENDOR = {
  inicis: 'INICIS',
  stripe: 'STRIPE'
}

export const URL_FAQ = {
  'ko': 'https://jandi.zendesk.com/hc/ko',
  'en': 'https://jandi.zendesk.com/hc/en-us',
  'ja': 'https://jandi.zendesk.com/hc/ja',
  'zh-cn': 'https://jandi.zendesk.com/hc/zh-cn',
  'zh-tw': 'https://jandi.zendesk.com/hc/zh-tw',
  'vi': 'https://jandi.zendesk.com/hc/en-us',
};

export default {};
