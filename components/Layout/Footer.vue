<template>
  <footer>
    <p>&copy; Xiza - {{ date }}</p>
  </footer>
</template>

<script setup lang="ts">
const date = new Date().getUTCFullYear();
</script>

<style scoped lang="scss">
footer {
  background-color: $darker;
  color: $lighter;
  padding: 1rem;
  text-align: center;
}
</style>
