<template>
  <div
    class="flex flex-col w-full max-w-lg md:p-8 p-4 my-16 mx-auto items-center md:shadow rounded-xl"
  >
    <div class="mb-8">
      <span class="font-bold text-2xl mb-8">Ondodox</span>
    </div>
    <div class="flex flex-col text-center w-full">
      <span class="text-lg mb-2"
        >Login - <span class="font-bold">Admin</span></span
      >
      <form
        @submit.prevent="handleSubmit()"
        id="form-login"
        class="flex flex-col"
      >
        <form-input
          name="namaPengguna"
          placeholder="Nama pengguna..."
          type="text"
        />
        <form-input
          name="kataSandi"
          placeholder="Kata sandi ..."
          type="password"
        />
        <div class="flex justify-end mt-12">
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
        .post("/kontributor/login", data)
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
          this.$router.push({ name: "kontributor" });
        })
        .catch((err) => {
          const error = err.response;
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
