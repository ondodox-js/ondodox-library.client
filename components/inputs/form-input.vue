<template>
  <input
    class="text-xs md:text-base p-2 border md:mb-4 mb-2 rounded-lg"
    :type="type"
    :placeholder="placeholder"
    autocomplete="on"
    :name="name"
  />
</template>

<script>
export default {
  props: ["placeholder", "type", "name"],
};
</script>
