<template>
  <div
      class="w3-container">
    <h4>Отзывы</h4>
    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <ul class="w3-ul">
          <li
              v-for="item in reviews_list"
              v-bind:key="item.review_id"
              class="w3-bar w3-round">
            <div class="w3-bar-item">
              <p class="w3-left-align">
                Имя пользователя:
                <span v-on:click="$emit('click',item.user_id)">test_user_name{{item.user_name}}</span>
              </p>
              <p class="w3-left-align">Дата: {{item.date}}</p>
              <p class="w3-left-align">{{item.text}}</p>
              <p class="w3-left-align">Звёзды: {{item.stars}}</p>
              <p class="w3-left-align">Реакции пользователей: полезно: {{item.useful}}; смешно:{{item.funny}};
                прохладно:{{item.cool}}</p>
<!--/TODO  НАЗВАНИЕ ЗАВЕДЕНИЯ-->
            </div>
          </li>
        </ul>
      </div>
    </section>

  </div>
</template>

<script>
import axios from "axios";

export default {
name: "UserReviewsList",
  data(){
    return{
      loading: false,
      errored: null,
      info:null,
      reviews_list:[]
    }
  },
  props:{
    user_id:{
      type: String,
      required: true
    }
  },
  created() {
    this.fetchData()
  },
  watch:{
    $route: 'fetchData'
  },
  methods:{
    fetchData() {
      //  this.$route.params.business_id
      this.error = this.post = null
      this.loading = true
      axios
          .get('http://localhost:3000/users/reviews/'+this.user_id)
          .then(response => {
            this.reviews_list = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
            this.errored = true
          })
          .finally(() => (this.loading = false));
    }
  },
}
</script>

<style scoped>

</style>