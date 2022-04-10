<template>
  <div class="p-4" v-if="check">
    <div class="p-4 shadow bg-black bg-opacity-10 rounded-lg">
      <div class="mb-4">
        <span class="text-xl font-bold">Yay!, Buku berhasil di rilis</span>
      </div>
      <div class="mb-4">
        <span
          >Buku dari yang berjudul
          <span class="italic">{{ buku.judul }}</span> dari
          <span class="font-bold">{{ buku.kontributor.email }}</span> baru saja
          kita rilis, informasi ini akan langsung diterima oleh email
          kontributor yang bersangkutan!</span
        >
      </div>
      <div class="text-right">
        <span>terimakasih admin..</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buku: {},
    };
  },
  computed: {
    check() {
      return this.buku;
    },
  },
  beforeMount() {
    this.buku = this.$route.params.buku;
  },
};
</script>

<style></style>
