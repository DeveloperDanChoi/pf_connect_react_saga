import React from 'react';
import wrapper from '../../../../store/configureStore';
import AdminConnectPlug from '../../../../components/Layout/App/connects/admin/AdminConnectPlug';
import { getTheme } from '../../../../service/theme';

const Page = () => <AdminConnectPlug />;

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
