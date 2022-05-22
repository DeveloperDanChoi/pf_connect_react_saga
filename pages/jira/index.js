import React from 'react';
import wrapper from '../../store/configureStore';
import Jira from '../../components/connect/interlock/jira/Jira';
import { getTheme } from '../../service/theme';

const Page = () => <Jira />;

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
