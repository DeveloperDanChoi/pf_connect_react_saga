import React from 'react';
import wrapper from '../../store/configureStore';
import Incoming from '../../components/connect/interlock/incoming/Incoming';

const Page = () => <Incoming />;

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
