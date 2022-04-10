export const state = () => {
  return {
    kumpulanBuku: [],
    keranjang: [],
  };
};

export const mutations = {
  resetAkun(state) {
    state.kumpulanBuku = [];
    state.keranjang = [];
  },
  setBuku(state, buku) {
    state.kumpulanBuku = buku;
  },
  updateKeranjang(state, buku) {
    state.kumpulanBuku.find((e) => {
      if (e.id == buku.id) {
        e.stok -= 1;
        return;
      }
    });
    state.keranjang.push(buku);
  },
  hapusItemKeranjang(state, itemId) {
    state.kumpulanBuku.find((e) => {
      if (e.id == itemId) {
        e.stok += 1;
      }
    });
    const sisa = state.keranjang.filter((e) => e.id != itemId);
    state.keranjang = sisa;
  },
};

export const getters = {
  getBuku(state) {
    return state.kumpulanBuku;
  },
  find: (state) => (id) => {
    return state.kumpulanBuku.find((i) => i.id == id);
  },
  getKeranjang: (state) => {
    return state.keranjang;
  },
};

export const actions = {
  reset({ commit }) {
    commit("resetAkun");
  },
  setBuku({ commit }, buku) {
    commit("setBuku", buku);
  },
  updateKeranjang({ commit, state }, buku) {
    if (state.keranjang.find((e) => e.id == buku.id)) {
      return false;
    }
    commit("updateKeranjang", buku);
  },
  resetKeranjang({ commit }) {
    commit("resetKeranjang");
  },
};
