import React from 'react';

// eslint-disable-next-line import/no-unresolved
import wrapper from 'store/configureStore';
import { getTheme } from '../service/theme';


const Page = () => <></>;

export const getServerSideProps = wrapper.getServerSideProps(
  // eslint-disable-next-line no-unused-vars
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
