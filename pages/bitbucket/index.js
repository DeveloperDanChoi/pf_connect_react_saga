import React from 'react';
import wrapper from '../../store/configureStore';
import Bitbucket from '../../components/connect/interlock/bitbucket/Bitbucket';

const Page = () => <Bitbucket />;

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
