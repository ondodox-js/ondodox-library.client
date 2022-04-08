export const state = () => {
  return {
    kumpulanBuku: [],
    kumpulanTransaksi: [],
  };
};

export const getters = {
  getBukuPending(state) {
    return state.kumpulanBuku.filter((e) => !e.status);
  },
  getBukuRilis(state) {
    return state.kumpulanBuku.filter((e) => e.status);
  },
  getTransaksi(state) {
    return state.kumpulanTransaksi;
  },
};

export const actions = {
  getKodeTransaksi(ex, id) {
    return "TRS" + id.toString().padStart(4, "0");
  },
};

export const mutations = {
  setBuku(state, buku) {
    state.kumpulanBuku = buku;
  },
  setTransaksi(state, transaksi) {
    state.kumpulanTransaksi = transaksi;
  },
  // getBuku(state) {
  //   return state.kumpulanBuku;
  // },
};
