<template>
  <div
      class="w3-container w3-row">
    <div class="w3-col" style="width: 20%">
    <FilterPanel
      router_name="filter_analytics">

    </FilterPanel>
    </div>
    <div class="w3-col" style="width: 60%">
      <h3>Графики</h3>
    </div>
  </div>
</template>

<script>

import FilterPanel from "./FilterPanel";
export default {
name: "StatisticComponent",
  components: {FilterPanel},
  date() {
    return{
      image: "",
      router_name: "filter_analytics"
    }
  }
}
</script>

<style scoped>

</style>