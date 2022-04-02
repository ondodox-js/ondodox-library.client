<template>
  <div
    class="flex flex-col w-full max-w-lg md:p-8 p-4 my-16 mx-auto items-center md:shadow rounded-xl"
  >
    <div class="mb-8">
      <span class="font-bold text-2xl mb-8">Ondodox</span>
    </div>
    <div class="flex flex-col text-center w-full">
      <span class="text-lg mb-2">Daftar akun</span>
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
            :to="{ name: 'auth' }"
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
import FormAnchor from "../../components/buttons/form-anchor.vue";
import FormButton from "../../components/buttons/form-button.vue";
import formInput from "../../components/inputs/form-input.vue";
export default {
  components: { formInput, FormButton, FormAnchor },
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

      const data = {
        namaDepan: form.data.get("nDepan"),
        namaBelakang: form.data.get("nBelakang"),
        email: form.data.get("email"),
        kataSandi: form.data.get("kataSandi"),
      };
      await this.$axios
        .post("/users/daftar", data)
        .then((resp) => {
          const result = resp.data;
          alert(result.pesan);
          this.$router.push({ name: "auth", params: { user: result.data } });
        })
        .catch((err) => {
          const error = err.response.data;
          alert(error.pesan);
          form.el.reset();
          form.el.nDepan.focus();
          this.$router.push({ name: "auth-buat-akun" });
        });
    },
  },
};
</script>
