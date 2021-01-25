<template>
  <div class="w3-container w3-padding">
    <NavigationButton
      button_title="Статистика"
      class="w3-button w3-round w3-teal w3-margin-right"
      v-on:click="go_to_page_statics"
    />
    <NavigationButton
        button_title="Данные"
        class="w3-button  w3-round w3-teal "
        v-on:click="go_to_page_data"
    />

  </div>
</template>

<script>
import NavigationButton from "@/components/NavigationButton";
export default {
  name: "AdditionalBar",
  components: {NavigationButton},
  methods:{
    go_to_page_statics(){
      console.log('переход на страницу статистики')
    },
    go_to_page_data(){
      console.log('переход на страницу импорта')
    }
  }
}
</script>

<style scoped>

</style>