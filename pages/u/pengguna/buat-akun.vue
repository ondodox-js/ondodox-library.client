<template>
  <div
    class="relative flex flex-col w-full max-w-screen-lg md:p-8 p-4 my-6 mx-auto items-center md:shadow rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500"
  >
    <div class="grid grid-cols-2 w-full">
      <div class=""></div>
      <div class="flex flex-col items-center">
        <div
          class="flex flex-col text-center w-full bg-white md:p-8 p-4 rounded-lg"
        >
          <span class="font-bold text-2xl mb-8">Ondodox</span>
          <span class="text-lg mb-2">Daftar akun</span>
          <span class="mb-6">Gunakan email yang belum terdaftar</span>
          <form
            @submit.prevent="handleSubmit()"
            id="form-daftar"
            class="flex flex-col md:shadow p-4 rounded-lg"
          >
            <div class="grid grid-cols-2 md:gap-x-4 gap-x-2">
              <form-input
                class=""
                placeholder="Nama depan..."
                type="text"
                name="nDepan"
              />
              <form-input
                class=""
                placeholder="Nama belakang..."
                type="text"
                name="nBelakang"
              />
            </div>
            <form-input name="email" placeholder="Email..." type="email" />
            <form-input
              name="kataSandi"
              placeholder="Kata sandi ..."
              type="password"
            />
            <div class="flex justify-between mt-12">
              <form-anchor
                text="Kembali"
                :to="{ name: 'u-pengguna' }"
                class="hover:bg-slate-300"
              />
              <form-button
                class="bg-sky-600 hover:bg-sky-700 text-white"
                text="Berikutnya"
                type="submit"
                name="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormAnchor from "../../../components/buttons/form-anchor.vue";
import FormButton from "../../../components/buttons/form-button.vue";
import FormInput from "../../../components/inputs/form-input.vue";

import Swal from "sweetalert2";
export default {
  components: { FormInput, FormAnchor, FormButton },
  middleware: "auth",
  methods: {
    async handleSubmit() {
      const form = {
        el: document.querySelector("#form-daftar"),
        data: new FormData(document.querySelector("#form-daftar")),
      };

      form.el.submit.setAttribute("disabled", "on");
      const namaDepan = form.data.get("nDepan");
      const namaBelakang = form.data.get("nBelakang");
      const namaLengkap = namaDepan.concat(" ", namaBelakang);
      const email = form.data.get("email");
      const kataSandi = form.data.get("kataSandi");

      const data = {
        namaLengkap,
        email,
        kataSandi,
      };
      await this.$axios
        .post("/pengguna", data)
        .then((resp) => {
          const result = resp.data;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Akun berhasil terdaftar!",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push({
            name: "u-pengguna",
            params: { user: result.data },
          });
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Akun gagal terdaftar!",
            showConfirmButton: false,
            timer: 1500,
          });
          form.el.reset();
          form.el.nDepan.focus();
          form.el.submit.removeAttribute("disabled");
        });
    },
  },
};
</script>

<style></style>
