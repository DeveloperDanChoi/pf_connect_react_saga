import React from 'react';
import wrapper from '../../store/configureStore';
import Outgoing from '../../components/connect/interlock/outgoing/Outgoing';
import { getTheme } from '../../service/theme';

const Page = () => <Outgoing />;

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
