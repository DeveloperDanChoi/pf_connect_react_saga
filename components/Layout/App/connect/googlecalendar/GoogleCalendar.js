/* eslint-disable max-len,import/no-unresolved,no-unused-vars,no-param-reassign,prefer-template,no-useless-concat,arrow-body-style,operator-linebreak,space-in-parens,keyword-spacing,no-plusplus,no-restricted-syntax,radix,prefer-const,consistent-return,comma-spacing,default-case,no-use-before-define,indent,quote-props,spaced-comment,object-curly-spacing,function-paren-newline,padded-blocks,comma-dangle,semi,array-bracket-spacing,no-undef,quotes,import/order,react/jsx-no-duplicate-props,guard-for-in,operator-assignment,no-unreachable,object-curly-newline,react/no-unescaped-entities,react/jsx-no-comment-textnodes,space-before-function-paren */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import GoogleCalendarInsert from './GoogleCalendarInsert';
import GoogleCalendarUpdate from './GoogleCalendarUpdate';
import { util } from '../../../../../service/util';

const GoogleCalendar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isUpdate = router.query.id && router.query.id !== '';

  useEffect(() => util.devCase1(router, "googleCalendar", "25452", true), []);

  return (<>
    { !isUpdate && <GoogleCalendarInsert /> }
    { isUpdate && <GoogleCalendarUpdate /> }
  </>);
};

export default GoogleCalendar;
