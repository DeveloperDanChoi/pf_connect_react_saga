/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,react/jsx-no-duplicate-props,guard-for-in,operator-assignment,no-unreachable,object-curly-newline,react/no-unescaped-entities,react/jsx-no-comment-textnodes */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import NotionInsert from "./NotionInsert";
import NotionUpdate from "./NotionUpdate";

const Notion = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log( router.query.id )
    return;
    if (!router.query.id) {
      const prefix = '/app/connect';
      Router.push(`${prefix}/github?id=25092`, `${prefix}/github`);
    }
  }, []);

  return (<>
    { !router.query.id && <NotionInsert /> }
    { router.query.id && router.query.id !== '' && <NotionUpdate /> }
  </>);
};

export default Notion;
