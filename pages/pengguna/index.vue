<template>
  <div class="mb-16">
    <section class="grid grid-flow-row mb-4">
      <h2 class="font-bold text-2xl mb-2">Buku terbaru</h2>
      <div class="grid grid-cols-4 gap-2">
        <nuxt-link
          :to="{ name: 'pengguna-buku', params: { buku: buku.id } }"
          v-for="buku of kumpulanBuku"
          :key="buku.id"
        >
          <book-card :buku="buku" />
        </nuxt-link>
      </div>
    </section>
    <section class="grid grid-flow-row mb-4">
      <h3 class="font-bold text-2xl mb-2">Buku terpopuler</h3>
      <div class="grid grid-cols-4 gap-2">
        <nuxt-link
          :to="{ name: 'pengguna-buku', params: { buku: buku.id } }"
          v-for="buku of kumpulanBuku"
          :key="buku.id"
        >
          <book-card :buku="buku" />
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import bookCard from "../../components/cards/book-card.vue";
export default {
  data() {
    return {
      kumpulanBuku: [],
    };
  },
  beforeMount() {
    this.kumpulanBuku = this.$store.getters["pengguna/getBuku"];
  },
  components: { bookCard },
  computed: {
    check() {
      return this.kumpulanBuku;
    },
  },
};
</script>

<style></style>
