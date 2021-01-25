<template>
  <div class="w3-row-padding w3-container w3-light-gray w3-padding">
    <div class="w3-third">
      <BaseInputText
          v-model="input_business"
          placeholder="Business"
          @keydown.enter="search_business"
      />
    </div>
    <div class="w3-third">
      <BaseInputText
          v-model="input_place"
          placeholder="Place"
          @keydown.enter="search_place"
      />
    </div>
    <div class="w3-third">
      <button
          class="w3-button w3-hover-red w3-round w3-teal"
          v-on:click="search_business_and_place"
      >Искать</button>
    </div>
  </div>
</template>

<script>
import BaseInputText from "@/components/BaseInputText";


export default {
name: "SearchBar",
  components: {BaseInputText},
  data(){
    return{
      input_business: '',
      input_place: '',
    }
  },
  methods:{
    search_business(){
      console.log('search: ' + this.input_business);
    },
    search_place(){
      console.log('search: ' + this.input_place)
    },
    search_business_and_place(){
      console.log('search: ' + this.input_business + ' | '+ this.input_place)
    }

  }
}
</script>

<style scoped>

</style>