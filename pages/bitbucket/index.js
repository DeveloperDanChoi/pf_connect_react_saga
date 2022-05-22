import React from 'react';
import wrapper from '../../store/configureStore';
import Bitbucket from '../../components/connect/interlock/bitbucket/Bitbucket';
import { getTheme } from '../../service/theme';

const Page = () => <Bitbucket />;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    await getTheme(store, ctx);
    return {
      props: {
        pageInfo: {
          headerDisabled: false,
          isMobile: false,
          theme: store.getState().theme.theme,
        },
      },
    };
  },
);

export default Page;
