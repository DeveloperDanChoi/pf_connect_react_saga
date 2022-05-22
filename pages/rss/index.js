import React from 'react';
import wrapper from '../../store/configureStore';
import RSS from '../../components/connect/interlock/rss/RSS';
import { getTheme } from '../../service/theme';

const Page = () => <RSS />;

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
