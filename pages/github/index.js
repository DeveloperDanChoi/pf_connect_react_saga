import React from 'react';
import wrapper from '../../store/configureStore';
import Github from '../../components/connect/interlock/github/Github';

const Page = () => <Github />;

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
