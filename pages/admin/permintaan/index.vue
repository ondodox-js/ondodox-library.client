<template>
  <div v-if="semuaBuku.length != 0">
    <div class="flex justify-between relative px-2 mb-8">
      <input
        type="text"
        class="w-full max-w-lg p-2 rounded-lg border"
        placeholder="Pencarian..."
      />
    </div>
    <div class="grid grid-cols-2">
      <div class="px-2 mb-4" v-for="buku of semuaBuku" :key="buku.id">
        <ls-book-card :buku="buku" />
      </div>
    </div>
  </div>
  <div v-else class="h-full flex flex-col items-center mt-8">
    <div class="font-bold opacity-50">
      <span>Tidak ada permintaan dari kontributor...</span>
    </div>
  </div>
</template>

<script>
import LsBookCard from "../../../components/cards/ls-book-card.vue";

export default {
  components: { LsBookCard },
  data() {
    return {
      semuaBuku: [],
    };
  },
  mounted() {
    this.semuaBuku = this.$store.getters["admin/getBukuPending"];
  },
};
</script>
