<template>
  <router-link :to='link_to'>
    <button
      class="w3-button w3-round"
      v-on:click="$emit('click',button_title)">
    {{button_title}}
    </button>
  </router-link>

</template>

<script>
export default {
  name: "NavigationButton",
  props:{
    button_title:{
      type: String,
      default: 'unknown button',
    },
    link_to:{
      type:String,
      required: true,
    }
  },
  computed:{
    test(){
      return 'stic';
    }
  }
}
</script>

<style scoped>

</style>