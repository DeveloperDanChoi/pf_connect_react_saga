import React from 'react';
import wrapper from '../../../store/configureStore';
import DevNotion from "../../../components/Layout/Developer/notion/DevNotion";

const Page = () => <DevNotion />;

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
