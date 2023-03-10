<template>
  <header>
    <div class="title">{{ title }}</div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 6rem;
  .title {
    text-shadow: 0.03em -0.06em 0 darken($bprimary, 20%),
      0 1px 1px lighten($bprimary, 6%);
    color: darken($bprimary, 10%);
    background: linear-gradient(
      to top,
      saturate(lighten($bprimary, 2%), 35%) 0%,
      saturate(lighten($bprimary, 5%), 15%) 26%,
      $bprimary 100%
    );
    box-shadow: 2px 2px 9px 2px $primary-shade;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 3rem;
    padding: 0.7rem 2.5rem;
    /* border-width: 0 2px 2px 2px; */
    border-color: $darker;
    border-radius: 0 0 11px 11px;
    /* box-shadow: 2px 2px 0px 2px rgba($primary, 0.5); */
    background-color: $primary;
  }
  /* 768px 1024px */
  @media (min-width: 768px) {
    height: 8rem;
    .title {
      font-size: 3.8rem;
      line-height: 4.5rem;
      padding: 1rem 3.5rem;
    }
  }
}

.theme-dark {
  header {
    .title {
      text-shadow: 0.03em -0.06em 0 darken($bprimary-dark, 20%),
        0 1px 1px lighten($bprimary-dark, 6%);
      color: darken($bprimary-dark, 10%);
      background: linear-gradient(
        to top,
        saturate(lighten($bprimary-dark, 2%), 35%) 0%,
        saturate(lighten($bprimary-dark, 5%), 15%) 26%,
        $bprimary-dark 100%
      );
    }
  }
}
</style>
