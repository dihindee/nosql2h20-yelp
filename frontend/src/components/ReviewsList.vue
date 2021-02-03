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
        <p>{{reviews_list}}</p>

        <ul class="w3-ul">
          <li
            class="w3-bar w3-round"
            >
            <div class="w3-bar-item">

            </div>
          </li>
<!--          <FeedbackItem-->
<!--              v-for="item in feedback_list"-->
<!--              :key="item.id"-->
<!--              :feedback="item"-->
<!--              @click="go_to_user"-->
<!--          >-->
<!--          </FeedbackItem>-->
        </ul>
      </div>
    </section>

  </div>
</template>

<script>
// import FeedbackItem from "@/components/FeedbackItem";
import axios from "axios";
export default {
name: "FeedbackList",
  components: {},
  data(){
    return{
      loading: false,
      errored: null,
      info:null,
      reviews_list:[]
    }
  },
  props:{
    business_id:{
      type: String,
      required: true
    }
  },
  created() {
   // this.fetchData()
  },
  watch:{
    $route: 'fetchData'
  },
  methods:{
    go_to_user(id){
      this.$router.push({
        name: 'user',
        params:{
          user_id: id,
        }})
      console.log("go to user with id: "+id)
    },

    fetchData() {
      //  this.$route.params.business_id
      this.error = this.post = null
      this.loading = true
      axios
          .get('http://localhost:3000/business/reviews/'+this.business_id)
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