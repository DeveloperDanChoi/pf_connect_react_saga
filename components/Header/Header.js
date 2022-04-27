import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import { getPlanClassName, getPlanName, getPlanSubName } from '../../lib/teamBasic';

const Header = (props) => {
  const { team, teamPlan } = useSelector((state) => state.team);

  return (<>
    <div className="jnd-connect-setting-container opac-zero"
         ng-class="{
      'opac-out': isClose
    }">
      <aside className="jnd-connect-hpanel non-selectable _header">
        <div className="jnd-connect-lpanel-submenu flex-row-box">
          <div className="btn-connect-back _btnConnect flex-fix" ng-click="historyBack()"
               tooltip="{{'@jnd-connect-1'|translate}}"
               tooltip-class="connect-header-tooltip-l"
               tooltip-placement="bottom"
               tooltip-append-to-body="true">
            <i className="icon-long-arrow-left fn-17"></i>
          </div>
          <div className="header-title jnd-connect-title flex-rel">
        <span>
          <i className="jnd-connect-logo"></i>
          잔디커넥트
        </span>
          </div>
          <div className="btn-connect-exit _btnConnect flex-fix flex-end" ng-click="close();"
               tooltip="{{'@jnd-connect-2'|translate}}"
               tooltip-class="connect-header-tooltip-r"
               tooltip-placement="bottom"
               tooltip-append-to-body="true">
            <i className="icon-delete fn-14"></i>
          </div>
        </div>
      </aside>
      <div className="jnd-connect-container full-screen ">
        <div ng-switch="current.union.name" className="_container">
          <div className="jnd-connect-contents _connectScrollContainer" ng-switch-default>
            <jnd-connect-loading ng-show="isLoading"></jnd-connect-loading>
            <div ng-show="isBannerShow && !isLoading" className="connect-union-banner _bannerTop"
                 ng-class="{'is-animate':!isLoading}">
              <div className="inner-background"></div>
              <div className="inner-wrapper">
                <button type="button" className="close fn-14" ng-click="closeBanner()"><i
                    className="icon-delete fn-13"></i></button>
                <span className="banner-description" ng-bind-html="::'@jnd-connect-28'|translate"></span>
                <div className="connect-banner-img"></div>
                <a className=" btn-s1 btn-ok btn-rounded-edge banner-button link"
                   href="{{::helpUrl}}"
                   target="_blank">
                  <span>@common-learn-more</span><i className="icon-long-arrow-right fn-13"></i>
                </a>
              </div>
            </div>
            <div className="integration-service gate" ng-show="!isLoading">
              <p className="connect-union-label fn-14 _card">@jnd-connect-available-service</p>
              <jnd-connect-card
                  ng-repeat="union in unions"></jnd-connect-card>
              <div className="connect-union-survey _card">
                <span className="survey-description">@jnd-connect-29</span>
                <a href="{{surveyUrl}}" className="btn btn-ok btn-rounded-edge banner-button jnd-cursor-pointer"
                   target="_blank">
                  <span>@jnd-connect-30</span>
                </a>
              </div>
            </div>
          </div>
          <div ng-switch-when="outgoing"
               jnd-connect-scroll>
            <jnd-connect-outgoing jnd-data-current="current" jnd-connect-scroll>
            </jnd-connect-outgoing>
          </div>
          <div ng-switch-when="bitbucket">
            <jnd-connect-webhook jnd-data-current="current" jnd-connect-scroll>
            </jnd-connect-webhook>
          </div>
          <div ng-switch-when="googleCalendar"
               jnd-connect-scroll>
            <jnd-connect-union-auth ng-if="current.isShowAuth" jnd-data-current="current"></jnd-connect-union-auth>
            <jnd-connect-google-calendar ng-if="!current.isShowAuth" jnd-data-current="current" jnd-connect-scroll>
            </jnd-connect-google-calendar>
          </div>
          <div ng-switch-when="github">
            <jnd-connect-union-auth ng-if="current.isShowAuth" jnd-data-current="current"></jnd-connect-union-auth>
            <jnd-connect-github ng-if="!current.isShowAuth" jnd-data-current="current" jnd-connect-scroll>
            </jnd-connect-github>
          </div>
          <div ng-switch-when="trello"
               jnd-connect-scroll>
            <jnd-connect-union-auth ng-if="current.isShowAuth" jnd-data-current="current"></jnd-connect-union-auth>
            <jnd-connect-trello ng-if="!current.isShowAuth" jnd-data-current="current" jnd-connect-scroll>
            </jnd-connect-trello>
          </div>
          <div ng-switch-when="jira"
               jnd-connect-scroll>
            <jnd-connect-webhook jnd-data-current="current" jnd-connect-scroll>
            </jnd-connect-webhook>
          </div>
          <div ng-switch-when="rss"
               jnd-connect-scroll>
            <jnd-connect-rss jnd-data-current="current" jnd-connect-scroll>
            </jnd-connect-rss>
          </div>
          <div ng-switch-when="incoming"
               jnd-connect-scroll>
            <jnd-connect-webhook jnd-data-current="current" jnd-connect-scroll>
            </jnd-connect-webhook>
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default withRouter(Header);
