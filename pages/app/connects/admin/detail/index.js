import React from 'react';
import wrapper from '../../../../../store/configureStore';
import { getTheme } from '../../../../../service/theme';
import ConnectPlug from "../../../../../components/Layout/App/connects/admin/detail/ConnectPlug";

const Page = () => <ConnectPlug />;

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
