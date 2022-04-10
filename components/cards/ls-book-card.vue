<template>
  <nuxt-link
    :to="{
      name: 'admin-permintaan-buku',
      params: { buku: buku.id, data: buku },
    }"
  >
    <div
      class="relative flex justify-between h-full px-2 pt-4 pb-2 shadow hover:shadow-2xl cursor-pointer rounded-lg"
    >
      <img class="h-56" :src="image" loading="lazy" alt="" />
      <div class="p-2 leading-none min-w-0 flex flex-col flex-1 h-full">
        <div class="font-bold truncate">{{ buku.judul }}</div>
        <span class="opacity-80 text-xs">{{ buku.pengarang }}</span>
        <div class="text-xs mb-2">
          {{ buku.kontributor.email }}
        </div>
        <span class="opacity-80 text-xs">sinopsis :</span>
        <p class="opacity-80 flex-1 text-xs">
          {{ sinopsis }}
        </p>
      </div>
      <span
        v-if="!buku.status"
        class="absolute right-0 top-0 text-red-600 text-xs font-bold"
        >PENDING</span
      >
      <span
        v-else
        class="absolute right-0 top-0 text-green-600 text-xs font-bold"
        >RILIS</span
      >
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: ["buku"],
  computed: {
    image() {
      return "http://localhost:8083/images/covers/" + this.buku.gambar;
    },
    sinopsis() {
      return this.buku.sinopsis.substring(0, 200) + " ...";
    },
  },
};
</script>
