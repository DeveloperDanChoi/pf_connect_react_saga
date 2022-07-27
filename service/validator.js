export const validator = (() => {
  const initializing = ({ team, user }) => team.teamId === 0 || user.user.member.id === 0;

  return {
    initializing,
  };
})();

export default {};
