<template>
  <div class="w3-container">

<!--    <p>{{this.$route.params.state}}</p>-->
<!--    <p>{{this.$route.params.city}}</p>-->
<!--    <p>{{this.$route.params.categories}}</p>-->
<!--    <p>{{this.$route.params.stars}}</p>-->
<!--    <p>{{this.$route.params.reviews}}</p>-->
<!--    <p>{{this.$route.params.is_open}}</p>-->

    <div
        class="w3-container w3-row">

      <div class="w3-col" style="width: 20%">
        <FilterPanel
            :router_name="b_router_name">

        </FilterPanel>
      </div>
      <div class="w3-col" style="width: 60%">
        <section v-if="errored">
          <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
        </section>

        <section v-else>
          <div v-if="loading">Loading...</div>
          <div v-else>
            <div
            class="w3-container">
              <p class="w3-right-align"> Сортировка:
                <select v-model="selected_sort">
                  <option
                      v-for="opt in options"
                      v-bind:value="opt.value"
                      v-bind:key="opt.text"
                      v-on:click="update_sort">
                    {{ opt.text }}
                  </option>
                </select>
              </p>
            </div>

            <BusinesstList
                :business_list="info">
            </BusinesstList>
          </div>

        </section>

      </div>
      <div class="w3-col" style="width: 20%">
        <p>Карта</p>
      </div>
    </div>
  </div>

</template>

<script>
import FilterPanel from "@/components/FilterPanel";
import BusinesstList from "@/components/BusinesstList";
import axios from "axios";
export default {
  name: "ResponseComponent",
  components: {BusinesstList, FilterPanel},
  data(){
    return{
      loading: false,
      errored: null,
      info:null,
      b_router_name: "filter_business",
      selected_sort: 'name_asc',
      options: [
        { text: 'Название', value: 'name_asc' },
        { text: 'Название обратная', value: 'name_desc' },
        { text: 'Рейтинг', value: 'stars_asc' },
        { text: 'Рейтинг обратная', value: 'stars_desc' },
        { text: 'Отзывы', value: 'reviews_asc' },
        { text: 'Отзывы обратная', value: 'reviews_desc' },
      ]
    }
  },
  props:{
    id: String,
  },
  created() {

    this.fetchData()
  },
  watch:{
    $route: 'fetchData'
  },
  methods:{
    fetchData: function () {
      this.error = this.post = null
      this.loading = true
      let query = ''
      let query_delim = '?'
      // this.$route.params.name передаваемый параметр от кнопки
      if( this.$route.params.name !==undefined) {
        query += query_delim + 'name=' + this.$route.params.name
        if (query_delim === '?')
          query_delim = '&'
      }
      // this.$route.params.category передаваемый параметр от кнопки
      if( this.$route.params.category !==undefined) {
        query += query_delim + 'categories=' + this.$route.params.category
        if (query_delim === '?')
          query_delim = '&'
      }

      query += query_delim + 'sortby=' + this.selected_sort
        if (query_delim === '?')
          query_delim = '&'

      // this.$route.params.place передаваемый параметр от кнопки
      // местоположение название размытое, надо изменить поле ввода

      axios
          .get('http://localhost:3000/business/search/'+query)
          .then(response => {
            this.info = response.data
          })
          .catch(error => {
            console.log(error);
            this.errored=true
          })
          .finally(() => (this.loading = false));
    },

    update_sort(){
      this.fetchData()
      console.log("Новая сортировка:" + this.selected_sort)
    }
    }
}

</script>

<style scoped>

</style>