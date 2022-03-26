<template>
  <nuxt-link :to="to" class="px-4 md:text-base text-sm py-2 rounded-lg">
    {{ text }}
  </nuxt-link>
</template>

<script>
export default {
  props: ["text", "to"],
};
</script>
