<template>
  <div>
    <div class="p-2 cursor-pointer font-bold">
      <nuxt-link
        class="opacity-50 hover:opacity-100"
        :to="{ name: 'kontributor' }"
        >Beranda</nuxt-link
      >
    </div>
    <div class="p-2 cursor-pointer font-bold">
      <nuxt-link
        class="opacity-50 hover:opacity-100"
        :to="{ name: 'kontributor-buku-saya' }"
        >Buku saya</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.this-active {
  opacity: 1 !important;
}
</style>
