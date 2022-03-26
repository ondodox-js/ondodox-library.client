<template>
  <div
    class="flex flex-col w-full max-w-lg md:p-8 p-4 my-16 mx-auto items-center md:shadow rounded-xl"
  >
    <div class="mb-8">
      <span class="font-bold text-2xl mb-8">Ondodox</span>
    </div>
    <div class="flex flex-col text-center w-full">
      <span class="text-lg mb-2">Login</span>
      <span class="mb-6">Gunakan akun yang sudah terdaftar</span>
      <form
        @submit.prevent="handleSubmit()"
        id="form-login"
        class="flex flex-col"
      >
        <form-input name="email" placeholder="Email..." type="email" />
        <form-input
          name="kataSandi"
          placeholder="Kata sandi ..."
          type="password"
        />
        <div class="flex justify-between mt-12">
          <form-anchor
            text="Buat akun"
            :to="{ name: 'auth-buat-akun' }"
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
  methods: {
    async handleSubmit() {
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
        .post("/users/masuk", data)
        .then((result) => {
          const resultData = result.data;
          alert(resultData.pesan);
          this.$store.state.user = resultData.data;
          console.log(this.$store.state.user);
          this.$router.push("/home");
        })
        .catch((err) => {
          const errorData = err.response.data;
          alert(errorData.pesan);
        });

      form.el.reset();
      form.el.email.focus();
      form.el.submit.removeAttribute("disabled");
    },
  },
  mounted() {
    this.$store.commit("reset");
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
