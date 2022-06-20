import React from 'react';
import wrapper from '../../../../store/configureStore';
import Bitbucket from '../../../../components/Layout/App/connect/bitbucket/Bitbucket';
import { getTheme } from '../../../../service/theme';
import Notion from "../../../../components/Layout/App/connect/notion/Notion";
import Figma from "../../../../components/Layout/App/connect/figma/Figma";

const Page = () => <Figma />;

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
