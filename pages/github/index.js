import React from 'react';
import wrapper from '../../store/configureStore';
import Github from '../../components/connect/interlock/github/Github';
import { getTheme } from '../../service/theme';

const Page = () => <Github />;

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
