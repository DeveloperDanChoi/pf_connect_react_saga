import React from 'react';

// eslint-disable-next-line import/no-unresolved
import wrapper from 'store/configureStore';

const Page = () => <></>;

export const getServerSideProps = wrapper.getServerSideProps(
  // eslint-disable-next-line no-unused-vars
  (store) => async (ctx) => ({
    props: {
      pageInfo: {
        headerDisabled: false,
        isMobile: false,
      },
    },
  }),
);

export default Page;
