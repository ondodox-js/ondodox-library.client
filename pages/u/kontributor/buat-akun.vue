<template>
  <div
    class="flex flex-col w-full max-w-lg md:p-8 p-4 my-16 mx-auto items-center md:shadow rounded-xl"
  >
    <div class="mb-8">
      <span class="font-bold text-2xl mb-8">Ondodox</span>
    </div>
    <div class="flex flex-col text-center w-full">
      <span class="text-lg mb-2"
        >Daftar akun - <span class="font-bold">Kontributor</span></span
      >
      <span class="mb-6">Gunakan email yang belum terdaftar</span>
      <form
        @submit.prevent="handleSubmit()"
        id="form-daftar"
        class="flex flex-col"
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
        <form-input placeholder="Email..." type="email" name="email" />
        <form-input
          placeholder="Kata sandi ..."
          type="password"
          name="kataSandi"
        />
        <div class="flex justify-between mt-4 md:mt-6">
          <form-anchor
            text="Kembali"
            :to="{ name: 'u-kontributor-masuk' }"
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
</template>
<script>
import FormAnchor from "../../../components/buttons/form-anchor.vue";
import FormButton from "../../../components/buttons/form-button.vue";
import FormInput from "../../../components/inputs/form-input.vue";
import Swal from "sweetalert2";
export default {
  components: { FormInput, FormButton, FormAnchor },
  middleware: "auth",
  data() {
    return {};
  },
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
        .post("/kontributor", data)
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
            name: "u-kontributor-masuk",
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
