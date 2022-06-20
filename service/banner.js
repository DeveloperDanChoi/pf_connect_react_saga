import { helpUrl, surveyUrl } from '../constants/path';

/**
 * 배너
 * @type {{help: help, survey: survey}}
 */
export const banner = (() => {
  /**
   * 더 알아보기<br>
   */
  const help = ({ user }) => {
    window.open(helpUrl[user.account.lang]);
  };
  /**
   * 서비스 추가 요청하기<br>
   */
  const survey = ({ user }) => {
    // window.open(surveyUrl.ko + '?email=' + primary.email);
    window.open(surveyUrl[user.account.lang]);
  };
  return {
    help, survey,
  };
})();
