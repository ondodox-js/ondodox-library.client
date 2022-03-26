<template>
  <div
    class="flex flex-col w-full max-w-lg md:p-8 p-4 my-16 mx-auto items-center md:shadow rounded-xl"
  >
    <div class="mb-8">
      <span class="font-bold text-2xl mb-8" @click="cek">Ondodox</span>
    </div>
    <div class="flex flex-col text-center w-full" v-if="resp.status">
      <span class="text-lg mb-2" v-text="resp.pesan"></span>
      <span class="mb-6"
        >Alamat email <span class="font-bold">{{ resp.data.email }}</span> sudah
        berhasil diaktifkan, anda sudah dapat masuk dengan menggunakan alamat
        email ini.</span
      >
      <form-anchor
        text="Berikutnya"
        :to="{ name: 'auth', params: { user: resp.data } }"
        class="bg-sky-600 hover:bg-sky-700 text-white"
      />
    </div>
    <div class="flex flex-col text-center w-full" v-else>
      <span class="text-lg mb-6" v-text="resp.pesan"></span>
      <form-anchor
        text="Berikutnya"
        :to="{ name: 'auth' }"
        class="bg-sky-600 hover:bg-sky-700 text-white"
      />
    </div>
  </div>
</template>

<script>
import formAnchor from "../../../components/buttons/form-anchor.vue";
export default {
  data() {
    return {
      resp: {},
    };
  },
  methods: {
    cek() {
      console.log(this.resp);
    },
  },
  components: { formAnchor },
  async mounted() {
    const token = this.$route.params.token;
    const response = await this.$axios
      .post(`/users/verified/${token}`)
      .then((result) => result.data)
      .catch((err) => err.response.data);
    this.resp = response;
  },
};
</script>
