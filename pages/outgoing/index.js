import React from 'react';
import wrapper from '../../store/configureStore';
import Outgoing from '../../components/connect/interlock/outgoing/Outgoing';

const Page = () => <Outgoing />;

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
