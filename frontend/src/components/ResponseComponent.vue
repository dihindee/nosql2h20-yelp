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

            <BusinesstList>
            </BusinesstList>

            <h1>Bitcoin Price Index</h1>

            <p>{{this.info}}</p>
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
      this.error = this.post = null
      this.loading = true

          // this.$route.params.category передаваемый параметр от кнопки
      // this.$route.params.name передаваемый параметр от кнопки
      // this.$route.params.place передаваемый параметр от кнопки

      axios
          .get('http://localhost:3000/test')
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