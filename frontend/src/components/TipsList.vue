<template>
  <div
    class="w3-container">
    <h4>Полезные советы</h4>
    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <ul class="w3-ul">
          <li
              v-for="item in tips_list"
              v-bind:key="item._id"
              class="w3-bar w3-round">
            <div class="w3-bar-item">
              <p class="w3-left-align">
                Имя пользователя:
                <span v-on:click="$emit('click',item.user_id)">{{item.user[0].name}}</span>
              </p>
              <p class="w3-left-align">Дата: {{item.date}}</p>
              <p class="w3-left-align">{{item.text}}</p>
              <p class="w3-left-align">Количество комплиментов: {{item.compliment_count}}</p>

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
  name: "TipsList",
  data(){
    return{
      loading: false,
      errored: null,
      business:null,
      tips_list: [],
      user_name_list: Map
    }
  },
  props: {
    business_id:{
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
          .get('http://localhost:3000/business/tips/'+this.business_id)
          .then(response => {
            this.tips_list = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
            this.errored = true
          })
          .finally(() => (this.loading = false));

    },
  },
  computed: {
  }

}
</script>
<style scoped>

</style>