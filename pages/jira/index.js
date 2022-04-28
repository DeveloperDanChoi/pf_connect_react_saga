import React from 'react';
import wrapper from '../../store/configureStore';
import Jira from '../../components/connect/interlock/jira';

const JiraIndex = () => <Jira />;

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

export default JiraIndex;
