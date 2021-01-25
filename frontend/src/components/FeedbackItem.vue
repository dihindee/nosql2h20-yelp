<template>
  <li
    class="w3-bar">
    <div
      class="w3-container">

    <router-link to='url'>
      <p> v-on:click="$emit('click',feedback.user_id)">
      {{feedback.user_name}}
      </p>
    </router-link>
    <p>{{feedback.date}}</p>
    <p>{{feedback.text}}</p>
    <p>Рейтинг: {{feedback.rating}}</p>
    </div>
  </li>

</template>

<script>
export default {
  name: "FeedbackItem",
  props: {
    feedback: {
      type: Object,
      required: true
    }
  },
  computed:{
    url(){
      return '/user/'+this.feedback.user_id
    }
  }
}
</script>

<style scoped>

</style>