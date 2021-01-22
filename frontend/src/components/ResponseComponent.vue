<template>
  <div
      class="w3-container w3-row">

      <div class="w3-col" style="width: 20%">
        <FilterPanel>

        </FilterPanel>
      </div>
      <div class="w3-col" style="width: 60%">
        <section v-if="errored">
          <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
        </section>

        <section v-else>
          <div v-if="loading">Loading...</div>
          <div v-else>
            <RestaurantList>
            </RestaurantList>

            <p>{{$router.params.filter}}</p>
            <h1>Bitcoin Price Index</h1>

            <div
                v-for="currency in info"
                :key="currency.code">
              {{currency.description}} : {{currency.rate_float}}
            </div>

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
import RestaurantList from "@/components/BusinesstList";
import axios from "axios";
export default {
  name: "ResponseComponent",
  components: {RestaurantList, FilterPanel},
  data(){
    return{
      loading: false,
      errored: null,
      info:null
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

      axios
          .get('https://api.coindesk.com/v1/bpi/currentprice.json')
          .then(response => {
            this.info = response.data.bpi
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