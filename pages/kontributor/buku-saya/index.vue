<template>
  <div v-if="semuaBuku.length != 0">
    <div class="flex justify-between relative px-2 mb-8">
      <input
        type="text"
        class="w-full max-w-lg p-2 rounded-lg border"
        placeholder="Pencarian..."
      />
      <form-anchor
        text="Buku baru"
        :to="{ name: 'kontributor-buku-saya-tambah-buku' }"
        class="bg-slate-300 hover:bg-slate-500 hover:text-white"
      />
    </div>
    <div class="grid grid-cols-3">
      <div class="px-2 mb-4" v-for="buku of semuaBuku" :key="buku.id">
        <book-card :buku="buku" />
      </div>
    </div>
  </div>
  <div v-else class="h-full flex flex-col items-center mt-8">
    <div class="font-bold opacity-50">
      <span>Ups! belum ada satu pun buku yang anda upload...</span>
    </div>
    <form-anchor
      text="Buku baru"
      :to="{ name: 'kontributor-buku-saya-tambah-buku' }"
      class="hover:text-green-600 font-bold"
    />
  </div>
</template>

<script>
import formAnchor from "../../../components/buttons/form-anchor.vue";
import BookCard from "../../../components/cards/book-card.vue";
import FormInput from "../../../components/inputs/form-input.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      semuaBuku: [],
    };
  },
  methods: {
    ...mapActions(["getBuku"]),
  },
  components: { formAnchor, FormInput, BookCard },
  async mounted() {
    this.semuaBuku = await this.getBuku();
  },
};
</script>

<style></style>
