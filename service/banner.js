import {helpUrl, surveyUrl} from "../constants/path";

/**
 * 배너
 * @type {{link: link, close: close}}
 */
export const banner = (() => {
  /**
   * 더 알아보기<br>
   */
  const help = ({user}) => {
    window.open(helpUrl[user.account.lang]);
  };
  /**
   * 서비스 추가 요청하기<br>
   */
  const survey = ({user}) => {
    // window.open(surveyUrl.ko + '?email=' + primary.email);
    window.open(surveyUrl[user.account.lang]);
  };
  return {
    help, survey,
  };
})();
