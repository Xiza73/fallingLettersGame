<template>
  <div>
    <h1>{{ title }}</h1>
    <NewComponent title="New Comp" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const title = 'Home Page';
    return {
      title,
    };
  },
});
</script>
