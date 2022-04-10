<template>
  <div class="w-full max-w-screen-sm m-auto relative min-h-screen">
    <pengguna-header/>
    <main class="p-4">
    <nuxt-child />
    </main>
    <pengguna-footer :active="1" @changeActive="activeMenu"/>
    
  </div>
</template>

<script>
import PenggunaFooter from '../components/footers/pengguna-footer.vue';
import penggunaHeader from '../components/headers/pengguna-header.vue';
export default {
  middleware: 'pengguna-auth',
  components: { penggunaHeader, PenggunaFooter, }
  ,data(){
      return {
          active: 1
      }
  },methods:{
      activeMenu(active){
          this.active = active
      }
  },
  async beforeMount(){
    await this.$axios.get('buku')
    .then((result) => {
      let kumpulanBuku = result.data.filter(e => e.status)
     this.$store.dispatch('pengguna/setBuku', kumpulanBuku);
    }).catch((err) => {
      console.log(err.response)
    });
  }
};
</script>

<style>
