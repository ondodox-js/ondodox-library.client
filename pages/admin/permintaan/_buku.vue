<template>
  <div class="grid grid-cols-1">
    <div class="px-2 mb-4" v-if="check">
      <div
        class="relative flex justify-between h-full px-2 pt-4 pb-2 shadow cursor-pointer rounded-lg"
      >
        <img class="h-56" :src="image" loading="lazy" alt="" />
        <div class="p-2 leading-none min-w-0 flex flex-col flex-1 h-full">
          <div class="font-bold truncate">{{ buku.judul }}</div>
          <span class="opacity-80 text-xs">{{ buku.pengarang }}</span>
          <div class="text-xs mb-2">
            {{ buku.kontributor.email }}
          </div>
          <span class="opacity-80 text-xs">sinopsis :</span>
          <p class="opacity-80 flex-1 text-xs">
            {{ buku.sinopsis }}
          </p>
          <button
            type="button"
            v-if="!statusRilis"
            class="px-4 md:text-base text-sm py-2 rounded-lg hover:bg-slate-400 h-10 hover:text-white font-bold"
            name="button"
            @click="rilis"
          >
            Rilis buku
          </button>
        </div>
        <span
          v-if="!buku.status"
          class="absolute right-0 top-0 text-red-600 text-xs font-bold"
          >PENDING</span
        >
        <span
          v-else
          class="absolute right-0 top-0 text-green-600 text-xs font-bold"
          >RILIS</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import FormButton from "../../../components/buttons/form-button.vue";
import lsBookCard from "../../../components/cards/ls-book-card.vue";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      buku: "",
    };
  },
  mounted() {
    this.buku = this.$route.params.data;
  },
  components: { lsBookCard, FormButton },
  computed: {
    check() {
      if (this.buku) {
        return true;
      }
      return false;
    },
    image() {
      return "http://localhost:8083/images/covers/" + this.buku.gambar;
    },
    statusRilis() {
      return this.buku.status;
    },
  },
  methods: {
    async rilis() {
      this.buku.status = !this.buku.status;
      //request
      Swal.fire({
        title: "Silahkan tunggu sesaat...",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await this.$axios
        .post("/buku/rilis-buku", this.buku)
        .then((result) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Yay, perilisan berhasil!",
            showConfirmButton: false,
            timer: 1500,
          });

          this.$router.push({
            name: "admin-permintaan-success",
            params: { buku: this.buku },
          });
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Buku gagal di rilis!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  },
};
</script>

<style></style>
