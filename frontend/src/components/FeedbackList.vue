<template>
  <ul
      class="w3-ul"
      v-if="feedback_list.length">
    <FeedbackItem
      v-for="item in feedback_list"
      :key="item.id"
      :feedback="item"
      @click="go_to_user"
    >
    </FeedbackItem>
  </ul>
  <p v-else> Ничего не найдено. Повторите запрос</p>
</template>

<script>
import FeedbackItem from "@/components/FeedbackItem";
export default {
name: "FeedbackList",
  components: {FeedbackItem},
  methods:{
    go_to_user(id){
      console.log('go to user: '+ id)
    }
  },
  data(){
    return{
      feedback_list:[
        {
          id: 1,
          user_id: 121,
          user_name: "Serega",
          text: "this rest very good",
          date: "11/11/2011",
          rating: 5
        },
        {
          id: 2,
          user_id: 123,
          user_name: "Artem",
          text: "this rest very good",
          date: "11/11/2011",
          rating: 5
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>