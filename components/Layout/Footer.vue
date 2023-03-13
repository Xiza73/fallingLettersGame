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
  background-color: darken($bsecondary, 10%);
  color: $lighter;
  font-weight: 600;
  padding: 1rem;
  text-align: center;
}
.theme-dark {
  footer {
    background-color: darken($bsecondary-dark, 9%);
    color: $darker;
  }
}
</style>
