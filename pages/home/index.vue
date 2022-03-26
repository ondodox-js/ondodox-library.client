<template>
  <div
    class="flex flex-col w-full max-w-lg md:p-8 p-4 my-16 mx-auto items-center md:shadow rounded-xl"
  >
    <div class="mb-8">
      <span class="font-bold text-2xl mb-8">Ondodox</span>
    </div>
    <div class="flex flex-col text-center w-full">
      <span class="text-lg mb-2">Yay! Selamat, Anda sudah bergabung..</span>
      <span class="mb-6"
        >Halo
        <span class="font-bold">{{ $store.state.user.namaLengkap }}</span> ,
        bagaimana harimu?
      </span>
      <form-anchor
        text="Keluar"
        :to="{ name: 'auth' }"
        class="hover:bg-slate-300"
      />
    </div>
  </div>
</template>

<script>
import formAnchor from "../../components/buttons/form-anchor.vue";
export default {
  middleware: ["masuk-auth"],
  components: { formAnchor },
};
</script>

<style></style>
