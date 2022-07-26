import { STORAGE_PREFIX } from '../constants/value';

export const getCookie = (cookie, name) => {
  if (!cookie) return undefined;

  name = STORAGE_PREFIX + name;
  const matches = cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export default {};
