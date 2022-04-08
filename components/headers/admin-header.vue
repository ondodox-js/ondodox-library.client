<template>
  <header class="flex justify-between py-4 sticky top-0 bg-white z-10 border-b">
    <div class="self-center">
      <span class="font-bold text-5xl">Ondodox</span>
      <span class="text-sm">admin</span>
    </div>
    <div class="self-center gap-4 flex">
      <div class="p-2 cursor-pointer font-bold">
        <span class="opacity-50 hover:opacity-100" @click="keluarAdmin"
          >Keluar</span
        >
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["keluarAdmin"]),
  },
};
</script>

<style scoped>
.this-active {
  opacity: 1 !important;
}
</style>
