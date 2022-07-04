/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,react/jsx-no-duplicate-props,guard-for-in,operator-assignment,no-unreachable,object-curly-newline,react/no-unescaped-entities,react/jsx-no-comment-textnodes,space-before-function-paren,array-callback-return */
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
