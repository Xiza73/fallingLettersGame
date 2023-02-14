import { Ref } from 'nuxt/dist/app/compat/capi';
import { defineStore } from 'pinia';

export const useFiltersStore = defineStore('new-store', () => {
  const filtersList: Ref<string[]> = ref([]);
  const primaryKey: Ref<string> = ref('id');
  const pokes: Ref<any[]> = ref([]);

  const addFilter = (filter: string) => {
    filtersList.value.push(filter);
  };

  const removeFilter = (filter: string) => {
    const index = filtersList.value.indexOf(filter);
    if (index <= -1) return;
    filtersList.value.splice(index, 1);
  };

  const setFiltersList = (list: string[]) => {
    filtersList.value = list;
  };

  const setPrimaryKey = (key: string) => {
    primaryKey.value = key;
  };

  // Fetch data from poke api
  const fetchPokemon = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      const data = await response.json();
      pokes.value = data.results;
    } catch (error) {
      console.error(error);
    }
  };

  const reverseFiltersList = computed(() =>
    filtersList.value.slice().reverse()
  );

  return {
    addFilter,
    removeFilter,
    filtersList,
    primaryKey,
    reverseFiltersList,
    setPrimaryKey,
    setFiltersList,
    pokes,
    fetchPokemon,
  };
});
