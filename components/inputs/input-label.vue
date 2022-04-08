<template>
  <div>
    <label :for="name" class="opacity-50">{{ text }}</label>
    <input
      :name="name"
      :id="name"
      class="border p-2 w-full rounded-lg"
      :type="type"
    />
  </div>
</template>

<script>
export default {
  props: ["text", "type", "name"],
};
</script>

<style></style>
