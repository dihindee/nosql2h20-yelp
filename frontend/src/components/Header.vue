<template>
  <div
    class="w3-container w3-light-gray w3-row">
    <div
      class="w3-container">
      <div class="w3-twothird">
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
            <NavigationButton
                button_title="Искать"
                class=" w3-hover-red w3-round w3-teal"
                v-on:click="search_business_and_place"
                link_to="/search/all">
<!--                ВОТ ТУТ НАДО ДОБАВИТЬ ПЕРДАЧУ дАННЫХ В ЗАПРОС, ЧТО БЫЛО, ЧТО ИСКАТЬ-->
            </NavigationButton>
          </div>
        </div>
      </div>

      <div class="w3-third w3-container ">

            <NavigationButton
                button_title="Статистика"
                class="w3-button w3-round w3-teal w3-margin-right"
                v-on:click="go_to_page_statics"
                link_to="/statics">
            </NavigationButton>
            <NavigationButton
                button_title="Данные"
                class="w3-button  w3-round w3-teal "
                v-on:click="go_to_page_data"
                link_to="/data">
            </NavigationButton>
      </div>
    </div>

    <div class="w3-row-padding w3-container w3-light-gray w3-padding">
      <div class="w3-quarter">
        <NavigationButton
            button_title="Рестораны"
            class="w3-teal"
            v-on:click="filter_restaurant"
            link_to="/search/restaurant">
        </NavigationButton>
      </div>
      <div class="w3-quarter">
        <NavigationButton
            button_title="Услуги на дому"
            class="w3-teal"
            v-on:click="filter_car"
            link_to="/search/home">
        </NavigationButton>
      </div>
      <div class="w3-quarter">
        <NavigationButton
            button_title="Авто сервисы"
            class="w3-teal"
            v-on:click="filter_services"
            link_to="/search/car">
        </NavigationButton>
      </div>
      <div class="w3-quarter">
        <NavigationButton
            button_title="Остальное"
            class="w3-teal"
            v-on:click="filter_other"
            link_to="/search/other">
        </NavigationButton>
      </div>
    </div>

  </div>
</template>

<script>
import NavigationButton from "@/components/NavigationButton";
import BaseInputText from "@/components/BaseInputText";
export default {
name: "Header",
  components: {BaseInputText, NavigationButton},
  methods:{
    go_to_page_statics(){
      console.log('переход на страницу статистики')
    },
    go_to_page_data(){
      console.log('переход на страницу импорта')
    },
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
    search_business(){
      console.log('search: ' + this.input_business);
    },
    search_place(){
      console.log('search: ' + this.input_place)
    },
    search_business_and_place(){
      console.log('search: ' + this.input_business + ' | '+ this.input_place)
    }
  },

  data(){
    return{
      input_business: '',
      input_place: '',
    }
  },
}
</script>

<style scoped>

</style>