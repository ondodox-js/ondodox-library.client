export const state = () => {
  return {
    user: null,
  };
};
export const mutations = {
  reset(state) {
    state.user = null;
  },
};
export const strict = false;
