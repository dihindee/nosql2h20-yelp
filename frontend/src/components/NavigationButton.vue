<template>

    <button
      class="w3-button w3-round"
      v-on:click="$emit('click',button_filter)">
    {{button_title}}
    </button>

</template>

<script>
export default {
  name: "NavigationButton",
  props:{
    button_title:{
      type: String,
      default: 'unknown button',
    },
    button_filter:{
      type: String,
      default: '',
    }
  },
  computed:{
  },

}
</script>

<style scoped>
</style>