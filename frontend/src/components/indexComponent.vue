<template>
  <div
  class="w3-container  w3-row">
    <div class="w3-third w3-container">
      <FilterPanel
          router_name="filter_business">

      </FilterPanel>
    </div>
    <div class="w3-third w3-container">
      <h3>Добро пожаловать в поисковик по бизнесам YELP!</h3>
      <p>Для поиска по названию используете соответствующее меню</p>
      <p> Для поиска по общим категориям используете категории</p>
      <p>Для перехода к графикам и другой статистике используйте меню "Статистика"</p>
      <p>Для проверки обновления датасета или его импорта используйте меню "Данные"</p>
      <p>Для поиска по категориям используйте фильтры</p>
    </div>
    <div class=" w3-third w3-container">

    </div>


  </div>
</template>

<script>
import FilterPanel from "./FilterPanel";
export default {
name: "indexComponent",
  components: {FilterPanel}
}
</script>

<style scoped>

</style>