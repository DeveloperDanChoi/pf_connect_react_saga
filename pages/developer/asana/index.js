import React from 'react';
import wrapper from '../../../store/configureStore';
import DevAsana from "../../../components/Layout/Developer/asana/DevAsana";

const Page = () => <DevAsana />;

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
