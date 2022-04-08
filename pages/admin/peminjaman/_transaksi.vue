<template>
  <div class="grid"></div>
</template>

<script>
export default {
  async mounted() {
    const kode = this.$route.params.transaksi;
    const convertKode = await this.$store.dispatch(
      "admin/getKodeTransaksi",
      kode
    );
    console.log(convertKode);
  },
};
</script>

<style></style>
