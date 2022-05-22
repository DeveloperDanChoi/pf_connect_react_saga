import React from 'react';
import wrapper from '../../store/configureStore';
import Incoming from '../../components/connect/interlock/incoming/Incoming';
import { getTheme } from '../../service/theme';

const Page = () => <Incoming />;

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
