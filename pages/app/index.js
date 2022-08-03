import React from 'react';

import wrapper from '../../store/configureStore';
import { getTheme } from '../../service/theme';

const Page = () => <></>;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    await getTheme(store, ctx);
    return {
      props: {
        pageInfo: {
          headerDisabled: false,
          isMobile: false,
          theme: store.getState().theme.theme,
          l10n: store.getState().team.l10n,
        },
      },
    };
  },
);

export default Page;
