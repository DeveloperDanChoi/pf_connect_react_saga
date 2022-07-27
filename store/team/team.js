/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../lib/produce';
import { util } from '../../service/util';
import { reduxModule } from '../../service/reduxModule';

export const initialModules = [
  /**
   * Team Info
   */
  { type: 'get', name: 'TEAM', data: false },
  { type: 'set', name: 'TEAM', data: true },
  /**
   * Team ID
   */
  { type: 'get', name: 'TEAM_ID', data: false },
  { type: 'set', name: 'TEAM_ID', data: true },
  /**
   * 해당팀에 public 토픽 + 로그인한 유저의 private 토픽<br>
   */
  { type: 'get', name: 'ROOMS', data: false },
  { type: 'set', name: 'ROOMS', data: true },
  /**
   * L10N
   */
  { type: 'set', name: 'L10N', data: true },
  /**
   * 팀 멤버의 목록 조회<br>
   */
  { type: 'get', name: 'TEAMS_MEMBERS', data: false },
  { type: 'set', name: 'TEAMS_MEMBERS', data: true },
  /**
   * 팀 멤버의 프로필 조회<br>
   */
  { type: 'get', name: 'TEAMS_MEMBER_PROFILES', data: false },
  { type: 'set', name: 'TEAMS_MEMBER_PROFILES', data: true },
  /**
   * 팀 룸 조회<br>
   */
  { type: 'get', name: 'TEAMS_ROOMS', data: false },
  { type: 'set', name: 'TEAMS_ROOMS', data: true },
];
export const modules = (() => reduxModule.modules.create(initialModules, 'team'))();

export const initialState = {
  teamId: 0,
  rooms: {},
  team: {
    team: {
      team: {
        name: '',
      },
    },
  },
  teamsMembers: [],
  langList: [
    { label: '한국어', value: 'ko' },
  ],
};

const { types } = modules;
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case types.SET_TEAM:
    case types.SET_TEAM_ID:
    case types.SET_ROOMS:
    case types.SET_L10N:
    case types.SET_TEAMS_MEMBERS:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    default:
      break;
  }
});

export default reducer;
