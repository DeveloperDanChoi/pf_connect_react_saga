import React from 'react';
import wrapper from '../../store/configureStore';
import Trello from '../../components/connect/interlock/trello/Trello';
import { getTheme } from '../../service/theme';

const Page = () => <Trello />;

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
