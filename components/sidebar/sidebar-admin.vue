<template>
  <div>
    <div class="p-2 cursor-pointer font-bold">
      <nuxt-link class="opacity-50 hover:opacity-100" :to="{ name: 'admin' }"
        >Beranda</nuxt-link
      >
    </div>
    <div class="relative p-2 cursor-pointer font-bold">
      <nuxt-link
        class="opacity-50 hover:opacity-100"
        :to="{ name: 'admin-buku-rilis' }"
        >Buku rilis</nuxt-link
      >
      <span
        class="text-green-400 w-6 text-center rounded-full bg-opacity-50 absolute right-4"
        >{{ rilis }}</span
      >
    </div>
    <div class="relative p-2 cursor-pointer font-bold">
      <nuxt-link
        class="opacity-50 hover:opacity-100"
        :to="{ name: 'admin-peminjaman' }"
        >Peminjaman</nuxt-link
      >
      <span
        class="text-yellow-400 w-6 text-center rounded-full bg-opacity-50 absolute right-4"
        >{{ peminjaman }}</span
      >
    </div>
    <div class="relative p-2 cursor-pointer font-bold">
      <nuxt-link
        class="opacity-50 hover:opacity-100"
        :to="{ name: 'admin-permintaan' }"
        >Permintaan</nuxt-link
      >
      <span
        class="text-red-400 w-6 text-center rounded-full bg-opacity-50 absolute right-4"
        >{{ permintaan }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["permintaan", "rilis", "peminjaman"],
};
</script>

<style scoped>
.this-active {
  opacity: 1 !important;
}
</style>
