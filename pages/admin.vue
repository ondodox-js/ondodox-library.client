<template>
  <div class="w-full max-w-screen-lg m-auto">
    <admin-header />
    <section class="py-4">
      <div class="grid grid-cols-12">
        <div class="col-span-3 my-16">
          <sidebar-admin
            :permintaan="permintaan"
            :rilis="rilis"
            :peminjaman="peminjaman"
          />
        </div>
        <div class="col-span-9 border-l">
          <div class="mb-2 px-2">
            <span class="text-lg opacity-50 font-bold">{{ $route.path }}</span>
          </div>
          <Nuxt-Child />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AdminHeader from "../components/headers/admin-header.vue";
import sidebarAdmin from "../components/sidebar/sidebar-admin.vue";
export default {
  components: { sidebarAdmin, AdminHeader },
  async beforeMount() {
    const kumpulanBuku = await this.$axios
      .get("/buku")
      .then((result) => result.data)
      .catch((err) => {
        console.log(err.response);
      });

    const kumpulanTransaksi = await this.$axios
      .get("/transaksi")
      .then((result) => result.data)
      .catch((err) => err.response);

    this.$store.commit("admin/setBuku", kumpulanBuku);
    this.$store.commit("admin/setTransaksi", kumpulanTransaksi);
  },
  computed: {
    permintaan() {
      return this.$store.getters["admin/getBukuPending"].length;
    },
    rilis() {
      return this.$store.getters["admin/getBukuRilis"].length;
    },
    peminjaman() {
      return this.$store.getters["admin/getTransaksi"].length;
    },
  },
};
</script>
