export const state = () => {
  return {
    user: null,
  };
};

export const actions = {
  async getBuku({ state }) {
    const user = await state.user;
    return user.data.bukus;
  },
  keluarKontributor({ commit }) {
    commit("resetState");
    $nuxt.$router.push({ name: "u-kontributor-masuk" });
  },
  keluarAdmin({ commit }) {
    commit("resetState");
    $nuxt.$router.push({ name: "u-admin" });
  },
  pushBuku({ commit }, buku) {
    commit("pushBuku", buku);
  },
};

export const mutations = {
  getBuku(state) {
    return state.user.data.bukus;
  },
  resetState(state) {
    state.user = null;
  },
  pushBuku(state, buku) {
    const user = state.user;
    user.data.bukus.push(buku);
  },
  getIdUser(state) {
    return state.user.data.id;
  },
};
export const strict = false;
