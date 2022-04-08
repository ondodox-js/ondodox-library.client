<template>
  <form
    @submit.prevent="handleSubmit"
    id="form-tambah"
    class="grid grid-cols-2 mt-4 px-4"
  >
    <div class="text-center h-full" @drop="uploadFile($event)">
      <div
        class="h-full w-3/4 m-auto border rounded-lg flex flex-col justify-between items-center p-2"
      >
        <img :src="srcImg" alt="" />
        <div class="self-center w-full truncate">
          <input name="gambar" type="file" @change="onChangeImage($event)" />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 items-end gap-2">
      <input-label
        class="mb-2 col-span-2"
        name="judul"
        text="Judul"
        type="text"
      />
      <input-label class="mb-2" name="pengarang" text="Pengarang" type="text" />
      <input-label class="mb-2" name="penerbit" text="Penerbit" type="text" />
      <input-label
        class="mb-2"
        name="tahunTerbit"
        text="Tahun terbit"
        type="year"
      />
      <input-label class="mb-2" name="stok" text="Stok" type="number" />
      <area-label class="mb-2 col-span-2" name="sinopsis" text="Sinopsis" />
      <form-button
        class="hover:bg-slate-300 col-span-2"
        name="submit"
        text="Berikutnya"
        type="submit"
      />
    </div>
  </form>
</template>

<script>
import FormButton from "../../../components/buttons/form-button.vue";
import AreaLabel from "../../../components/inputs/area-label.vue";
import inputLabel from "../../../components/inputs/input-label.vue";
import Swal from "sweetalert2";

import { mapActions, mapMutations } from "vuex";
export default {
  components: { inputLabel, AreaLabel, FormButton },
  data() {
    return {
      srcImg: null,
    };
  },
  methods: {
    async handleSubmit() {
      Swal.fire({
        title: "Silahkan tunggu sesaat...",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const form = {
        el: document.querySelector("#form-tambah"),
        data: new FormData(document.querySelector("#form-tambah")),
      };
      const user = this.$store.state.user;
      form.data.append("idKontributor", user.data.id);
      form.el.submit.setAttribute("disabled", "on");
      await this.$axios
        .post("/buku", form.data)
        .then((resp) => {
          const result = resp.data.data;
          Swal.fire({
            position: "center",
            icon: "success",
            title:
              "Buku berhasil di daftarkan, silahkan tunggu konfirmasi!, terimakasih.",
            showConfirmButton: false,
            timer: 2000,
          });
          //isi state
          this.pushBuku(result);
          this.$router.push({ name: "kontributor-buku-saya" });
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Buku gagal ditambahkan!",
            showConfirmButton: false,
            timer: 2000,
            didDestroy: () => {
              form.el.judul.focus();
              form.el.submit.removeAttribute("disabled");
            },
          });
        });
    },
    uploadFile(e) {
      console.log(e);
    },
    onChangeImage(e) {
      const file = e.target.files[0];
      try {
        this.srcImg = URL.createObjectURL(file);
      } catch (e) {
        this.srcImg = require("~/assets/image/covers/5.jpg");
      }
    },
    ...mapActions(["pushBuku"]),
  },
};
</script>

<style></style>
