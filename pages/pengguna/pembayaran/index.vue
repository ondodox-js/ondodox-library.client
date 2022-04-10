<template>
  <div class="p-2 bg-gray-200 rounded-lg">
    <div class="grid grid-flow-row text-sm">
      <div
        class="font-bold mb-4 grid grid-cols-4 gap-2 w-full justify-items-center"
      >
        <div>Pengembalian</div>
        <div>Judul</div>
        <div>Lama</div>
        <div>Harga</div>
      </div>
      <div class="grid grid-cols-4 gap-2" v-for="item of items" :key="item.id">
        <div class="text-center">
          {{ new Date(item.tanggalKembali).toLocaleDateString("id-ID") }}
        </div>
        <div class="truncate">{{ item.judul }}</div>
        <div>{{ transaksi(item).jumlahHari }} hari</div>
        <div>Rp. {{ transaksi(item).harga }}</div>
      </div>
      <div class="grid grid-cols-4 gap-2 mt-4 bg-gray-300 py-2 rounded-md">
        <div class="text-center">Total harga</div>
        <div class="truncate"></div>
        <div></div>
        <div>Rp. {{ totalHarga(items) }}</div>
      </div>
      <div class="grid grid-cols-1 mt-2">
        <form-button
          class="hover:bg-amber-300"
          name="accept"
          text="Konfirmasi"
          type="button"
          @action="konfirmasi"
        />
      </div>
    </div>
  </div>
</template>

<script>
import formButton from "../../../components/buttons/form-button.vue";
import Swal from "sweetalert2";
export default {
  components: { formButton },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    transaksi(item) {
      let jarak = item.tanggalKembali - new Date().getTime();
      let jumlahHari = Math.ceil(jarak / (1000 * 3600 * 24));
      return { jumlahHari, harga: jumlahHari * 1500 };
    },
    totalHarga(items) {
      let k = items.reduce((i, j) => {
        return (i += this.transaksi(j).harga);
      }, 0);
      return k;
    },
    konfirmasi() {
      Swal.fire({
        title: "Silahkan tunggu sesaat...",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      let totalPembayaran = this.totalHarga(this.items);
      let peminjamans = [];
      this.items.forEach((e) => {
        let data = {
          buku: {
            id: e.id,
          },
          tanggalKembali: new Date(e.tanggalKembali).toLocaleDateString(
            "en-CA"
          ),
          jumlah: 1,
        };
        peminjamans.push(data);
      });
      let pengguna = {
        id: this.$store.state.user.data.id,
      };

      const dataRequest = {
        totalPembayaran,
        peminjamans,
        pengguna,
      };

      this.$axios
        .post("/buku/peminjaman", dataRequest)
        .then((result) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Pemesanan berhasil!, terimakasih.",
            showConfirmButton: false,
            timer: 2000,
          });
          this.$router.push({ name: "pengguna" });
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Pemesanan gagal!",
            showConfirmButton: false,
            timer: 2000,
          });
          this.$router.push({ name: "pengguna" });
        });
    },
  },
  beforeMount() {
    this.items = this.$store.getters["pengguna/getKeranjang"];
  },
};
</script>
