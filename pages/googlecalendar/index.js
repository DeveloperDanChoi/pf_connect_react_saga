import React from 'react';
import wrapper from '../../store/configureStore';
import GoogleCalendar from '../../components/connect/interlock/googlecalendar';

const GoogleCalendarIndex = () => <GoogleCalendar />;

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

export default GoogleCalendarIndex;
