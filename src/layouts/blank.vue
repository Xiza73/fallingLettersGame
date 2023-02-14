<template>
  <section class="layout">
    <router-view />
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  padding: 3rem 0;
}
</style>
