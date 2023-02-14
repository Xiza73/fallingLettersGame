<template>
  <div>
    <nav>
      <NuxtLink to="/">Main</NuxtLink> | <NuxtLink to="/home">Home</NuxtLink> |
    </nav>
    <router-view />
    <footer>
      <p>&copy; DiXtra - {{ date }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const date = new Date().getUTCFullYear();
</script>
