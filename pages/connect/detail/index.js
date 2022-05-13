import React from 'react';
import wrapper from '../../../store/configureStore';
import MyConnectPlug from '../../../components/connect/teams/MyConnectPlug';

const Page = () => <MyConnectPlug />;

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
