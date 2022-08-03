import axios from 'axios';
import getConfig from 'next/config';
import { modules as themeModules } from '../store/theme/theme';
import { modules as teamModules } from '../store/team/team';
import { getCookie } from './cookie';

export const getTheme = async (store, ctx) => {
  const { cookie } = ctx.req.headers;
  const accessToken = getCookie(cookie, 'access_token');

  if (accessToken) {
    const result = await axios.get(
      `${getConfig().publicRuntimeConfig.API_URL}/inner-api/account`,
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

    const resultL10N = await axios.get(
      `${getConfig().publicRuntimeConfig.L10N_URL}/translation/json/web_client/ko`,
      {
        headers: {
          'connect-type': 'application/json;charset=UTF-8',
          accept: 'application/vnd.tosslab.jandi-v1+json',
          authorization: `bearer ${accessToken}`,
        },
      },
    ).catch((err) => err.response);

    if (resultL10N.status === 200) {
      console.log('l10n ok', resultL10N.data);
      // const theme = result.data.hasSeenFlags.split(',')[22] === '1' ? 'dark' : 'light';
      store.dispatch(teamModules.creators.setL10n(resultL10N.data));
    } else {
      console.log('l10n err', resultL10N);
    }
  }
};
