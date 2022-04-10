<template>
  <div>
    <section class="grid grid-flow-row gap-4">
      <div>
        <input-search @search="search" :pencarian="pencarian" />
      </div>
      <div class="grid grid-cols-4 gap-2 mb-16">
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
import BookCard from "../../../components/cards/book-card.vue";
import inputSearch from "../../../components/inputs/input-search.vue";
export default {
  data() {
    return {
      pencarian: "",
      kumpulanBuku: [],
    };
  },
  methods: {
    searchData(pencarian) {
      return this.kumpulanBuku.filter((e) => e.judul.includes(pencarian));
    },
    search(data) {
      console.log(data);
    },
  },
  beforeMount() {
    this.kumpulanBuku = this.$store.getters["pengguna/getBuku"];
  },
  components: { inputSearch, BookCard },
};
</script>

<style></style>
