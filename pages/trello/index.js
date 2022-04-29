import React from 'react';
import wrapper from '../../store/configureStore';
import Trello from '../../components/connect/interlock/trello/Trello';

const Page = () => <Trello />;

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
