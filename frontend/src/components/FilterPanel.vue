<template>
  <div
    class="w3-container">
    <h5>Фильтры</h5>
    <form>
      <div>
        <p>Страна или американский штат:</p>
        <select v-model="selected_state">
          <option value="">Выберите страну или штат</option>
          <option v-for="opt in states_list" v-bind:key="opt">
            {{opt}}
          </option>
        </select>
      </div>

      <div v-if="selected_state !== ''">
        <p>Город в выбранной стране:</p>
        <select v-model="selected_cities">
          <option value="">Выберите город</option>
          <option v-for="opt in cities_of_current_state" v-bind:key="opt">
            {{opt}}
          </option>
        </select>
      </div>

      <div>
        <p> Категории заведения:</p>
        <select v-model="selected_cat">
          <option disabled value="">Выберите категорию</option>
          <option v-for="opt in categories_list" v-bind:key="opt" v-on:click="add_new_categories">
            {{opt}}
          </option>
        </select>

        <ul>
          <li
              v-for="(el,index) in selected_categories" v-bind:key="el"
              v-on:remove="selected_categories.splice(index,1)">
            {{el}} <button v-on:click="$emit('remove')">Удалить</button>
          </li>
        </ul>
      </div>

      <div>
        <p>Минимальное количество звёзд {{stars_count}}:</p>
        <input type="range" v-model.number="stars_count" min="0" max="5" step="1" >
      </div>

      <div>
        <p>Минимальное количество отзывов {{reviews_count}}:</p>
        <input type="range" v-model.number="reviews_count" min="0" max="100" step="5" >
      </div>

      <div>
        <p>Бизнес работает: <input type="checkbox" id="checkbox" v-model="is_open"></p>

      </div>


      <button type="submit"> Искать по фильтру</button>
    </form>
  </div>

</template>

<script>
import j_states from '../docs/states.json'
import j_cities from '../docs/cities.json'
import j_categories from '../docs/categories.json'
export default {
  name: "FilterPanel",
  data(){
    return{
      states_list: j_states.state,
      cities_list: j_cities,
      categories_list: j_categories,
      selected_state:"",
      selected_cities:"",
      selected_cat:"",
      selected_categories: [],
      reviews_count: 0,
      stars_count:3,
      is_open: true
    }
  },
  created() {

  },
  methods:{
    add_new_categories(){
      console.log(this.selected_cat);
      this.selected_categories.push(this.selected_cat);

    }
  },
  computed:{
    cities_of_current_state: function (){

      if (this.selected_state === ""){
        return []
      }

     return this.cities_list[this.selected_state]
    }
  }

}
</script>

<style scoped>

</style>