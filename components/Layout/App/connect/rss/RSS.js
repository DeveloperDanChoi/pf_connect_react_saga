/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,react/jsx-no-duplicate-props,guard-for-in,operator-assignment,no-unreachable,object-curly-newline */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import RssInsert from './RssInsert';
import RssUpdate from './RssUpdate';
import { util } from '../../../../../service/util';

const RSS = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => util.devCase1(router, "rss", "25468", false), []);

  return (<>
    { !router.query.id && <RssInsert /> }
    { router.query.id && router.query.id !== '' && <RssUpdate /> }
  </>);
};

export default RSS;
/**
 * TODO: file 이벤트 전파 이슈?
 */
