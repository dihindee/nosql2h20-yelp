<template>
  <div>
    <div>
      <section v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </section>

      <section v-else>
        <div v-if="loading">Loading...</div>

        <div v-else>
          <p>business_id{{this.$route.params.business_id}}</p>
<!--          тут надо добавлять get запрос для бизнеса и компонента с отзывами-->
          <!--      <h2>{{ business.name }}</h2>-->
          <!--      <p>{{full_address}}</p>-->
          <!--      <p>{{ 'Категория: ' + business.categories }}</p>-->
          <!--      <p>{{ 'Время работы: ' + business.hours }}</p>-->
          <!--      <p>Рейтинг: {{ business.rating }}</p>-->
        </div>
      </section>

    </div>

    <div>
      <h3>Предоставляемые услуги</h3>

<!--      Добавить услуги-->
    </div>

    <div>
      <h3>Отзывы</h3>

      <FeedbackList
        :business_id="this.$route.params.business_id">

      </FeedbackList>
    </div>
  </div>
</template>

<script>
import FeedbackList from "@/components/FeedbackList";
import axios from "axios";
export default {
name: "RestaurantComponent",
  components: {FeedbackList, },
  data(){
    return{
      loading: false,
      errored: null,
      business:null,
    }
  },
  created() {
    this.fetchData();
  },
  watch:{
    $route: 'fetchData'
  },
  computed:{
    full_address(){
      return 'Address: '+ this.business.state + ', '+ this.business.city+', '+ this.business.address
    }
  },
  methods: {
    fetchData() {
      //  this.$route.params.business_id
      this.error = this.post = null
      this.loading = true
      axios
          .get('http://localhost:3000/test')
          .then(response => {
            this.business = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
            this.errored = true
          })
          .finally(() => (this.loading = false));
    }
  }
}
</script>

<style scoped>

</style>