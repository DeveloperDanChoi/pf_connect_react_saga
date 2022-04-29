import React from 'react';
import wrapper from '../../store/configureStore';
import RSS from '../../components/connect/interlock/rss/RSS';

const Page = () => <RSS />;

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
