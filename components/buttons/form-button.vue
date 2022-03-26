<template>
  <button
    :type="type"
    class="px-4 md:text-base text-sm py-2 rounded-lg"
    :name="name"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: ["text", "type", "name"],
};
</script>
