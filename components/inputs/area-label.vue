<template>
  <div>
    <label :for="name" class="opacity-50">{{ text }}</label>
    <textarea
      class="border p-2 w-full rounded-lg"
      :name="name"
      :id="name"
      cols="30"
      rows="5"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: ["text", "name"],
};
</script>

<style></style>
