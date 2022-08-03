import axios from 'axios';
import getConfig from 'next/config';
import { modules as themeModules } from '../store/theme/theme';
import { getCookie } from './cookie';

export const getL10N = async (store, ctx) => {
  const { cookie } = ctx.req.headers;
  const accessToken = getCookie(cookie, 'access_token');

  if (accessToken) {
    const result = await axios.get(
      `${getConfig().publicRuntimeConfig.API_URL}/translation/json/web_client/ko`,
      {
        headers: {
          'connect-type': 'application/json;charset=UTF-8',
          accept: 'application/vnd.tosslab.jandi-v3+json',
          authorization: `bearer ${accessToken}`,
        },
      },
    ).catch((err) => console.error(err));

    if (result && result.status === 200) {
      const theme = result.data.hasSeenFlags.split(',')[22] === '1' ? 'dark' : 'light';
      store.dispatch(themeModules.creators.setTheme(theme));
    }
  }
};
