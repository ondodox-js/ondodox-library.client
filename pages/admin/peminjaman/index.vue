<template>
  <div v-if="cekData">
    <div class="flex justify-between relative px-2 mb-4">
      <input
        type="text"
        class="w-full max-w-lg p-2 rounded-lg border"
        placeholder="Pencarian..."
      />
    </div>
    <div class="p-2 grid grid-cols-1 text-center">
      <table class="">
        <thead class="border-b-2">
          <th class="p-2">Keterangan</th>
          <th class="p-2">Kode pembayaran</th>
          <th class="p-2">Tanggal transaksi</th>
          <th class="p-2">Jumlah buku</th>
        </thead>
        <tbody>
          <tr
            v-for="transaksi of kumpulanTransaksi"
            :key="transaksi.idTransaksi"
            @click="
              $router.push({
                name: 'admin-peminjaman-transaksi',
                params: { transaksi: transaksi.idTransaksi },
              })
            "
            class="hover:opacity-100 opacity-50 cursor-pointer hover:shadow"
          >
            <td
              v-if="transaksi.status"
              class="text-center text-green-500 font-bold p-2"
            >
              LUNAS
            </td>
            <td v-else class="text-center font-bold p-2 text-red-500">
              BELUM LUNAS
            </td>
            <td class="text-left font-bold p-2">
              {{ transaksiId(transaksi.idTransaksi) }}
            </td>
            <td class="p-2">
              {{ tanggalTransaksi(transaksi.tanggalTransaksi) }}
            </td>
            <td class="p-2">{{ jumlahBuku(transaksi.peminjamans) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else class="h-full flex flex-col items-center mt-8">
    <div class="font-bold opacity-50">
      <span>Tidak ada permintaan dari peminjaman untuk saat ini...</span>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.kumpulanTransaksi = this.$store.getters["admin/getTransaksi"];
  },
  data() {
    return {
      kumpulanTransaksi: [],
    };
  },
  methods: {
    jumlahBuku(peminjamans) {
      let jumlah = 0;
      peminjamans.forEach((element) => {
        jumlah += element.jumlah;
      });
      return jumlah;
    },
    tanggalTransaksi(date) {
      const date1 = new Date(date);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date1.toLocaleDateString("id-ID", options);
    },
    transaksiId(id) {
      return "TRS" + id.toString().padStart(4, "0");
    },
  },
  computed: {
    cekData() {
      if (this.kumpulanTransaksi.length != 0) {
        return true;
      }
      return false;
    },
  },
};
</script>
