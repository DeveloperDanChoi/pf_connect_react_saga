const CONTROL_MENU = [
  {
    id: 'dashboard',
    title: '@dashboard',
    iconClass: 'fn-13 icon-graph',
    mobIconClass: 'icon-ic-dashboard',
    requiredPlan: '',
    requiredAuthority: 'MANAGER',
    pathName: ''
  },
  {
    id: 'memberControl',
    title: '@admin-member-control-title',
    iconClass: 'fn-18 icon-users-line',
    mobIconClass: 'icon-ic-people',
    requiredPlan: '',
    requiredAuthority: 'MANAGER',
    pathName: 'memberManagement',
    orgSwitch: false
  },
  {
    id: 'orgControl',
    title: '@admin-org',
    iconClass: 'fn-17 icon-users-line',
    mobIconClass: 'icon-ic-people',
    requiredPlan: '',
    hasSeen: true,
    hasSeenList: [
      {key: 'ORG_MNG_OPTION_READ', value: true}
    ],
    requiredAuthority: 'MANAGER',
    pathName: 'organization',
    orgSwitch: true
  },
  {
    id: 'teamManage',
    title: '@admin-team-manage-title',
    iconClass: 'fn-15 icon-wrench-line',
    mobIconClass: 'icon-ic-wrench',
    requiredPlan: '',
    requiredAuthority: 'MANAGER',
    pathName: 'team'
  },
  {
    id: 'downloadHistory',
    title: '@tracking_title',
    iconClass: 'fn-18 icon-download',
    requiredPlan: '',
    requiredAuthority: 'MANAGER',
    pathName: 'downloadHistory'
  },
  /**
   * hasSeen, hasSeenList 가 추가되었습니다.
   * hasSeen 현재 탭을 사용자가 클릭하여 내용을 보았는 지 확인하는 속성입니다.
   * hasSeenList 부가 기능이 새롭게 추가되면 내용 확인 속성을 갱신해야 함으로 키와 값에 대해 배열을 등록합니다.
   */
  {
    id: 'addOnSetting',
    title: '@additional-function-settings',
    iconClass: 'fn-20 icon-tuner',
    mobIconClass: 'icon-ic-add-on',
    requiredPlan: '',
    hasSeen: true,
    hasSeenList: [
      {key: 'ADD_ON_OPTION_ORG_READ', value: true}
    ],
    requiredAuthority: 'MANAGER',
    pathName: 'addOnSetting'
  },

  {
    id: 'securitySetting',
    title: '@security_setting_title',
    iconClass: 'fn-20 icon-lock',
    mobIconClass: 'icon-ic-lock-bold',
    requiredPlan: '',
    hasSeen: true,
    requiredAuthority: 'MANAGER',
    pathName: 'securitySetting'
  },

  {
    id: 'paymentSetting',
    title: '@teamsetting_tab_payment',
    iconClass: 'fn-20 icon-card-line',
    mobIconClass: 'icon-ic-card',
    requiredPlan: '',
    hasSeen: true,
    requiredAuthority: 'MANAGER',
    pathName: 'paymentSetting'
  }
];

export default { CONTROL_MENU };
