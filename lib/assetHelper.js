import getConfig from 'next/config';

const { publicRuntimeConfig: { ASSET_DIR, BASE_PATH } } = getConfig();

/**
 * Manage assets path helpers in js!
 * css 파일에 필요한 url은 asset의 상대 경로를 직접 넣어줘야함
 *  - styled-components로 구현할 경우에는 이 Helper로 통일이 가능함
 */
export const getPublicAssetPath = (asset) => {
  const dirPrefix = ASSET_DIR ? 'public/' : '';

  return `${ASSET_DIR || BASE_PATH}/${dirPrefix}${asset}`;
};

export default {};
