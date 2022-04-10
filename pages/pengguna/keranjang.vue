<template>
  <div>
    <section class="grid grid-flow-row gap-4">
      <div class="flex justify-between items-center">
        <h3 class="font-bold text-xl">Keranjang anda</h3>
      </div>
      <template v-if="keranjang.length != 0">
        <table class="w-full text-center p-2 rounded-lg">
          <thead>
            <th>Kode</th>
            <th>Judul</th>
            <th>Jumlah</th>
            <th>Kembali</th>
            <th>aksi</th>
          </thead>
          <tbody>
            <tr v-for="item of keranjang" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.judul }}</td>
              <td>{{ item.jumlah }}</td>
              <td>
                {{ new Date(item.tanggalKembali).toLocaleDateString("id-ID") }}
              </td>
              <td
                @click="hapus(item.id)"
                class="cursor-pointer hover:bg-red-500"
              >
                -
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right">
          <form-button
            name="bayar"
            text="berikutnya"
            type="button"
            @action="$router.push({ name: 'pengguna-pembayaran' })"
            class="font-bold hover:bg-green-500"
          />
        </div>
      </template>
      <div v-else class="text-center">
        <span>Yah, keranjang anda masih kosong..</span>
      </div>
    </section>
  </div>
</template>

<script>
import formButton from "../../components/buttons/form-button.vue";
import { mapMutations } from "vuex";
export default {
  components: { formButton },
  computed: {
    keranjang() {
      return this.$store.getters["pengguna/getKeranjang"];
    },
  },
  methods: {
    ...mapMutations({ hapus: "pengguna/hapusItemKeranjang" }),
  },
};
</script>
