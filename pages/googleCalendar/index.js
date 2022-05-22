import React from 'react';
import wrapper from '../../store/configureStore';
import GoogleCalendar from '../../components/connect/interlock/googlecalendar/GoogleCalendar';
import { getTheme } from '../../service/theme';

const Page = () => <GoogleCalendar />;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    await getTheme(store, ctx);
    return {
      props: {
        pageInfo: {
          headerDisabled: false,
          isMobile: false,
          theme: store.getState().theme.theme,
        },
      },
    };
  },
);

export default Page;
