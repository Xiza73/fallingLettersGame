<template>
  <div class="new-component">
    <h1 @click="setKey">{{ title }}</h1>
    <p>Key: {{ primaryKey }}</p>
    <v-alert type="success">Hola</v-alert>
    <ul>
      <li v-for="poke in pokes" :key="poke.name" @click="addFilter(poke.name)">
        {{ poke.name }}
      </li>
    </ul>
    <!-- filters -->
    <div>
      <h2>Filters</h2>
      <ul>
        <li
          v-for="filter in filtersList"
          :key="filter"
          @click="removeFilter(filter)"
        >
          {{ filter }}
        </li>
      </ul>
    </div>
    <!-- /filters -->
    <div>
      <h2>Reverse</h2>
      <ul>
        <li
          v-for="filter in reverseFiltersList"
          :key="filter"
          @click="removeFilter(filter)"
        >
          {{ filter }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFiltersStore } from '../store/new-store';

defineProps<{
  title: string;
}>();

const config = useRuntimeConfig();
console.log(config.apiSecret); // undefined
console.log('config', config.public.apiUrl);
console.log({ config });

const filterStore = useFiltersStore();
const { addFilter, removeFilter, setFiltersList, setPrimaryKey, fetchPokemon } =
  filterStore;

await fetchPokemon();

const filtersList = computed(() => filterStore.filtersList);
const reverseFiltersList = computed(() => filterStore.reverseFiltersList);
const primaryKey = computed(() => filterStore.primaryKey);
const pokes = computed(() => filterStore.pokes);

setFiltersList(['a', 'b', 'c']);

const setKey = () => {
  // set first filter as primary key
  setPrimaryKey(filtersList.value[0]);
};
setKey();
</script>

<style scoped>
.new-component {
  color: #2c3e50;
}
</style>
