import React from 'react';
import wrapper from '../../../store/configureStore';
import DevFigma from "../../../components/Layout/Developer/figma/DevFigma";

const Page = () => <DevFigma />;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    return {
      props: {
        pageInfo: {
          headerDisabled: false,
          isMobile: false,
        },
      },
    };
  },
);

export default Page;
