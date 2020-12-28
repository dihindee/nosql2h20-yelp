<template>
  <div
      class="w3-container w3-row">
    <div class="w3-col" style="width: 20%">
      <FilterPanel>

      </FilterPanel>
    </div>
    <div class="w3-col" style="width: 60%">
      <RestaurantList>
      </RestaurantList>
    </div>
    <div class="w3-col" style="width: 20%">
      <p>Карта</p>
    </div>
  </div>
</template>

<script>
import FilterPanel from "@/components/FilterPanel";
import RestaurantList from "@/components/BusinesstList";
export default {
  name: "ResponseComponent",
  components: {RestaurantList, FilterPanel}
}
</script>

<style scoped>

</style>