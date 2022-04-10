<template>
  <div class="p-4">
    <div class="grid grid-flow-row p-4 shadow-md">
      <div class="text-center font-bold text-base">
        <span class="text-lg border-b-2"> Transaksi </span>
      </div>
      <div class="flex justify-between">
        <span
          >Kode : <span class="font-bold">{{ convertKode }}</span></span
        >
        <span>{{ tanggalTransaksi }}</span>
      </div>
      <div class="border-b-2 text-right">
        <span
          >a.n
          <span class="font-bold text-sm">{{
            pengguna.namaLengkap
          }}</span></span
        >
      </div>

      <div class="mt-4 grid grid-flow-row">
        <table>
          <thead>
            <th>Judul buku</th>
            <th>Jumlah</th>
            <th>Tanggal kembali</th>
            <th>Harga</th>
          </thead>
          <tbody>
            <tr
              v-for="pinjam of peminjaman"
              :key="pinjam.idPeminjaman"
              class="text-center"
            >
              <td class="p-2">
                {{ pinjam.buku.judul }}
              </td>
              <td class="p-2">
                {{ pinjam.jumlah }}
              </td>
              <td class="p-2">
                {{ pinjam.tanggalKembali }}
              </td>
              <td class="p-2">
                {{ getHarga(transaksi, pinjam) }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-8">
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    const kode = this.$route.params.transaksi;
    this.convertKode = await this.$store.dispatch(
      "admin/getKodeTransaksi",
      kode
    );
    let transaksi = this.$store.getters["admin/getTransaksi"];
    this.transaksi = transaksi.filter((e) => e.idTransaksi == kode)[0];
    this.tanggalTransaksi = await this.$store.dispatch(
      "admin/tanggalTransaksi",
      this.transaksi.tanggalTransaksi
    );
    this.pengguna = this.transaksi.pengguna;
    this.peminjaman = this.transaksi.peminjamans;
  },
  data() {
    return {
      transaksi: {},
      convertKode: "",
      tanggalTransaksi: "",
      pengguna: {},
      peminjaman: [],
    };
  },
  methods: {
    click() {
      console.log(this.transaksi);
    },
    getHarga(transaksi, pinjam) {
      let { tanggalTransaksi } = transaksi;
      let { tanggalKembali, jumlah } = pinjam;

      let jarak =
        new Date(tanggalKembali).getTime() -
        new Date(tanggalTransaksi).getTime();
      let jumlahHari = Math.ceil(jarak / (1000 * 3600 * 24));
      return jumlahHari * jumlah * 1500;
    },
  },
};
</script>

<style></style>
