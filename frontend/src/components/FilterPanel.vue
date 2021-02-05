<template>
  <div
    class="w3-container w3-margin-right">
    <h5>Фильтры</h5>
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
        <select v-model="selected_city">
          <option value="">Выберите город</option>
          <option v-for="opt in cities_of_current_state" v-bind:key="opt">
            {{opt}}
          </option>
        </select>
      </div>

      <div>
        <p> Категории заведения:</p>
        <select v-model="selected_cat"
          v-on:change="add_new_categories">
          <option disabled value="">Выберите категорию</option>
          <option v-for="opt in categories_list" v-bind:key="opt" >
            {{opt}}
          </option>
        </select>

        <div v-if="selected_categories.length">
          <p>Выбранные категории:</p>
          <ul>
            <li
                v-for="(el,index) in selected_categories"
                v-bind:key="el.title">
              {{el.title}}
              <button v-on:click="selected_categories.splice(index,1)">X</button>
            </li>
          </ul>
        </div>


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


      <button
          v-on:click="filter_business"
          class="w3-button w3-round w3-teal"
      > Искать по фильтру</button>
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
      selected_city:"",
      selected_cat:"",
      selected_categories: [],
      reviews_count: 0,
      stars_count:3,
      is_open: true
    }
  },
  props:{
    router_name:{
      type: String,
      required: true
    }
  },
  created() {

  },
  methods:{
    add_new_categories(){
      for (var i = 0; i < this.selected_categories.length; i++) {
        if (this.selected_categories[i].title === this.selected_cat)
          return
      }
      this.selected_categories.push({title:this.selected_cat});
    },
    filter_business(){
      let str_categories = '';

        for (var i = 0; i < this.selected_categories.length; i++) {
          str_categories+=this.selected_categories[i].title+';';
        }
      str_categories = str_categories.substring(0,str_categories.length-1)

      console.log(this.router_name)
        this.$router.push({
          name: this.router_name,
          params:{
            state: (this.selected_state !== "")?this.selected_state:"NULL",
            city: (this.selected_city !== "")?this.selected_city:"NULL",
            categories: (this.selected_categories.length > 0)? str_categories:"NULL",
            stars: this.stars_count,
            reviews: this.reviews_count,
            is_open: this.is_open
          }})

        console.log('search business with filter: ' )
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