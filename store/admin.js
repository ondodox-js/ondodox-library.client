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
  getBuku(state) {
    return state.kumpulanBuku;
  },
};

export const actions = {
  getKodeTransaksi(ex, id) {
    return "TRS" + id.toString().padStart(4, "0");
  },
  tanggalTransaksi(ex, date) {
    const date1 = new Date(date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date1.toLocaleDateString("id-ID", options);
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
