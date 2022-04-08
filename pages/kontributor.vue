<template>
  <div class="w-full max-w-screen-lg m-auto">
    <kontributor-header />
    <section class="py-4">
      <div class="grid grid-cols-12">
        <div class="col-span-3 my-16">
          <sidebar-kontributor />
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
import KontributorHeader from "../components/headers/kontributor-header.vue";
import SidebarKontributor from "../components/sidebar/sidebar-kontributor.vue";
export default {
  components: { KontributorHeader, SidebarKontributor },
  middleware: "kontributor-auth",
};
</script>
