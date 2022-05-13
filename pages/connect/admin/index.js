import React from 'react';
import wrapper from '../../../store/configureStore';
import AdminConnectPlug from '../../../components/connect/teams/AdminConnectPlug';

const Page = () => <AdminConnectPlug />;

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
