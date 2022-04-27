import React from 'react';
import wrapper from '../../store/configureStore';
import Trello from '../../components/connect/interlock/trello';

const TrelloIndex = () => <Trello />;

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

export default TrelloIndex;
