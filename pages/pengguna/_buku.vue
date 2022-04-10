<template>
  <div>
    <section class="mb-2">
      <form-button
        class="hover:bg-amber-500"
        name="kembali"
        text="kembali"
        type="button"
        @action="$router.go(-1)"
      />
    </section>
    <section class="flex bg-gray-200 rounded-md mb-4">
      <img :src="image" alt="" class="w-48" />
      <div class="p-4 w-full">
        <h3 class="text-xl font-bold">{{ buku.judul }}</h3>
        <div class="text-sm mb-4 italic">
          <span class="font-bold">{{ buku.pengarang }}</span> ,
          <span class="">{{ buku.penerbit }}</span>
          <span class="">{{ buku.tahunTerbit }}</span>
        </div>
        <p class="text-sm text-justify">
          {{ buku.sinopsis }}
        </p>
      </div>
    </section>
    <section
      class="bg-gray-200 rounded-md mb-4 items-center gap-2 grid grid-cols-3 p-4"
    >
      <div class="flex justify-between">
        <span>Stok :</span>
        <span>{{ buku.stok }}</span>
      </div>
      <select class="p-2 rounded-lg" v-model="tanggal">
        <option :value="tk" v-for="(tk, index) of tanggalKembali" :key="index">
          {{ new Date(tk).toLocaleDateString("id-ID") }}
        </option>
      </select>
      <div class="focus:outline-none">
        <form-button
          class="hover:bg-amber-500"
          name="simpan"
          text="masukkan keranjang"
          type="button"
          @action="beforeUpdate(buku)"
        />
      </div>
    </section>
  </div>
</template>

<script>
import formButton from "../../components/buttons/form-button.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      buku: {},
      tanggalKembali: [],
      tanggal: "",
    };
  },
  beforeMount() {
    this.buku = this.$store.getters["pengguna/find"](this.$route.params.buku);

    let waktu = [];
    const now = new Date();
    const seminggu =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7).getTime() -
      now.getTime();
    let timeNow = now.getTime();
    for (let i = 1; i <= 4; i++) {
      timeNow += seminggu;
      let lanjut = new Date(timeNow);
      waktu.push(lanjut.getTime());
    }
    this.tanggalKembali = waktu;
    this.tanggal = waktu[0];
  },
  computed: {
    image() {
      return "http://localhost:8083/images/covers/" + this.buku.gambar;
    },
  },
  methods: {
    ...mapActions({ updateKeranjang: "pengguna/updateKeranjang" }),
    beforeUpdate(data) {
      data.jumlah = 1;
      data.tanggalKembali = this.tanggal;
      this.updateKeranjang(data);
    },
  },
  components: { formButton },
};
</script>

<style></style>
