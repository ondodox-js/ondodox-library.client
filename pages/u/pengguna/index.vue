<template>
  <div
    class="relative flex flex-col w-full max-w-screen-lg md:p-8 p-4 my-6 mx-auto items-center md:shadow rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500"
  >
    <div class="grid grid-cols-2 w-full">
      <div class=""></div>
      <div class="flex flex-col items-center">
        <div
          class="flex flex-col text-center w-full bg-white md:p-8 p-4 rounded-lg"
        >
          <span class="font-bold text-2xl mb-8">Ondodox</span>
          <span class="text-lg mb-2">Login</span>
          <span class="mb-6">Gunakan akun yang sudah terdaftar</span>
          <form
            @submit.prevent="handleSubmit()"
            id="form-login"
            class="flex flex-col md:shadow p-4 rounded-lg"
          >
            <form-input name="email" placeholder="Email..." type="email" />
            <form-input
              name="kataSandi"
              placeholder="Kata sandi ..."
              type="password"
            />

            <form-anchor
              text="Masuk sebagai kontributor"
              :to="{ name: 'u-kontributor' }"
              class="hover:bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:text-white"
            />
            <div class="flex justify-between mt-12">
              <form-anchor
                text="Daftar akun"
                :to="{ name: 'u-pengguna-buat-akun' }"
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
      Swal.fire({
        title: "Silahkan tunggu sesaat...",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const form = {
        el: document.querySelector("#form-login"),
        data: new FormData(document.querySelector("#form-login")),
      };

      form.el.submit.setAttribute("disabled", "on");

      const data = {
        email: form.data.get("email"),
        kataSandi: form.data.get("kataSandi"),
      };

      await this.$axios
        .post("/pengguna/login", data)
        .then((resp) => {
          const result = resp.data;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Upaya untuk login berhasil!",
            showConfirmButton: false,
            timer: 1500,
          });
          //store -> user loginr
          this.$store.state.user = result;
          this.$router.push({ name: "pengguna" });
        })
        .catch((err) => {
          const error = err.response;
          console.log(error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Upaya untuk login gagal!",
            showConfirmButton: false,
            timer: 1500,
            didDestroy: () => {
              form.el.email.focus();
              form.el.submit.removeAttribute("disabled");
            },
          });
        });
    },
  },
  mounted() {
    const form = {
      el: document.querySelector("#form-login"),
      data: new FormData(document.querySelector("#form-login")),
    };
    const user = this.$route.params.user;
    if (user != undefined) {
      form.el.email.value = user.email;
    }
  },
};
</script>

<style></style>
