<template>
  <input
    type="text"
    class="w3-input w3-border w3-round"
    :value="value"
    v-on="listeners"
  >
</template>

<script>
export default {
  name: "BaseInputText",
  props:{
    value:{
      type: String,
      default: '',
    }
  },
  computed:{
    listeners () {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: event => this.$emit('input', event.target.value)
      }
    }
  }
}
</script>

<style scoped>
@import '../style/w3.css';

.input{

}

</style>