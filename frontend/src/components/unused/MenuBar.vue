<template>
  <div class="w3-row-padding w3-container w3-light-gray w3-padding">
    <div class="w3-quarter">
      <NavigationButton
          button_title="Рестораны"
          class="w3-teal"
          v-on:click="filter_restaurant">
      </NavigationButton>
    </div>
    <div class="w3-quarter">
      <NavigationButton
          button_title="Услуги на дому"
          class="w3-teal"
          v-on:click="filter_car">
      </NavigationButton>
    </div>
    <div class="w3-quarter">
      <NavigationButton
          button_title="Авто сервисы"
          class="w3-teal"
          v-on:click="filter_services">
      </NavigationButton>
    </div>
    <div class="w3-quarter">
      <NavigationButton
          button_title="Остальное"
          class="w3-teal"
          v-on:click="filter_other">
      </NavigationButton>
    </div>





  </div>
</template>

<script>
import NavigationButton from "@/components/NavigationButton";
export default {
  name: "MenuBar",
  components: {NavigationButton},
  methods:{
    filter_restaurant(){
      console.log('restaraunt');
    },
    filter_services(){
      console.log('services');
    },
    filter_car(){
      console.log('car services');
    },
    filter_other(){
      console.log('other');
    },
  }
}
</script>

<style scoped>

</style>