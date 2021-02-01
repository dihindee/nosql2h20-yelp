<template>
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

            <BusinesstList :business_list="info">
            </BusinesstList>


<!--            <p>{{this.info}}</p>-->
<!--            <div-->
<!--                v-for="currency in info"-->
<!--                :key="currency.code">-->
<!--              {{currency.description}} : {{currency.rate_float}}-->
<!--            </div>-->

          </div>

        </section>

      </div>
      <div class="w3-col" style="width: 20%">
        <p>Карта</p>
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
      b_router_name: "filter_business"
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
      console.log(this.$route.params);
      this.error = this.post = null
      this.loading = true
      let query = ''
      let query_delim = '?'
      // this.$route.params.name передаваемый параметр от кнопки
      if( this.$route.params.name !==undefined) {
        query += query_delim + 'name=' + this.$route.params.name;
        if (query_delim === '?')
          query_delim = '&'
      }
      // this.$route.params.category передаваемый параметр от кнопки
      if( this.$route.params.categories !==undefined) {
        query += query_delim + 'categories=' + this.$route.params.categories;
        if (query_delim === '?')
          query_delim = '&'
      }
      if( this.$route.params.city !== undefined){
        query += query_delim + 'city=' + this.$route.params.city;
        if (query_delim === '?')
          query_delim = '&'
      }
      if( this.$route.params.state !== undefined){
        query += query_delim + 'state=' + this.$route.params.state;
        if (query_delim === '?')
          query_delim = '&'
      }
      if( this.$route.params.stars !== undefined){
        query += query_delim + 'stars=' + this.$route.params.stars;
        if (query_delim === '?')
          query_delim = '&'
      }
      if( this.$route.params.reviews !== undefined){
        query += query_delim + 'reviews=' + this.$route.params.reviews;
        if (query_delim === '?')
          query_delim = '&'
      }
      if( this.$route.params.is_open !== undefined){
        query += query_delim + 'is_open=' + this.$route.params.is_open;
        if (query_delim === '?')
          query_delim = '&'
      }
      // this.$route.params.place передаваемый параметр от кнопки
      // местоположение название размытое, надо изменить поле ввода

      axios
          .get('http://localhost:3000/business/search/'+query)
          .then(response => {
            this.info = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
            this.errored=true
          })
          .finally(() => (this.loading = false));
    },

    }
}

</script>

<style scoped>

</style>