import React from 'react';
import wrapper from '../../../../store/configureStore';
import MyConnectPlug from '../../../../components/Layout/App/connects/detail/MyConnectPlug';
import { getTheme } from '../../../../service/theme';

const Page = () => <MyConnectPlug />;

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
