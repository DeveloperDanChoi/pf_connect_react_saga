import React from 'react';
import wrapper from '../../../../store/configureStore';
import Bitbucket from '../../../../components/Layout/App/connect/bitbucket/Bitbucket';
import { getTheme } from '../../../../service/theme';
import Asana from "../../../../components/Layout/App/connect/asana/Asana";

const Page = () => <Asana />;

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
