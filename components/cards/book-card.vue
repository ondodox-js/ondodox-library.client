<template>
  <div
    class="relative flex flex-col justify-between h-full items-center px-2 pt-4 pb-2 shadow hover:shadow-2xl cursor-pointer rounded-lg"
  >
    <img class="w-40" :src="image" loading="lazy" alt="" />
    <div class="leading-none mt-2 w-full">
      <div class="font-bold truncate">{{ buku.judul }}</div>
      <span class="opacity-80 text-xs">{{ buku.pengarang }}</span>
    </div>
    <span
      v-if="!buku.status"
      class="absolute right-0 top-0 text-red-600 text-xs font-bold"
      >PENDING</span
    >
    <span v-else class="absolute right-0 top-0 text-green-600 text-xs font-bold"
      >RILIS</span
    >
  </div>
</template>

<script>
export default {
  props: ["buku"],
  computed: {
    image() {
      return "http://localhost:8083/images/covers/" + this.buku.gambar;
    },
  },
};
</script>
