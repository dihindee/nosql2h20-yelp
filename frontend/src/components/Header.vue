<template>
  <div
    class="w3-container w3-light-gray w3-row">
    <div
      class="w3-container">
      <div class="w3-twothird">
        <div class="w3-row-padding w3-container w3-light-gray w3-padding">
          <div class="w3-third">
            <BaseInputText
                v-model="input_name"
                placeholder="Название бизнеса"
                @keydown.enter="search_name"
            />
          </div>
          <div class="w3-third">
            <BaseInputText
                v-model="input_place"
                placeholder="Местоположение"
                @keydown.enter="search_place"
            />
          </div>
          <div class="w3-third">
            <NavigationButton
                button_title="Искать"
                class=" w3-hover-red w3-round w3-teal"
                v-on:click="search_business_and_place"
                link_to="/search/all">
            </NavigationButton>
          </div>
        </div>
      </div>

      <div class="w3-third w3-container ">

            <NavigationButton
                button_title="Статистика"
                class="w3-button w3-round w3-teal w3-margin-right"
                v-on:click="go_to_page_statics">
            </NavigationButton>
            <NavigationButton
                button_title="Данные"
                class="w3-button  w3-round w3-teal "
                v-on:click="go_to_page_data">
            </NavigationButton>
      </div>
    </div>

    <div class="w3-row-padding w3-container w3-light-gray w3-padding">
      <div class="w3-quarter">
        <NavigationButton
            button_title="Рестораны"
            class="w3-teal"
            v-on:click="filter_business"
            button_filter="restaurant"
            link_to="/search/restaurant">
        </NavigationButton>
      </div>
      <div class="w3-quarter">
        <NavigationButton
            button_title="Услуги на дому"
            class="w3-teal"
            v-on:click="filter_business"
            button_filter="home"
            link_to="/search/home">
        </NavigationButton>
      </div>
      <div class="w3-quarter">
        <NavigationButton
            button_title="Авто сервисы"
            class="w3-teal"
            v-on:click="filter_business"
            button_filter="car"
            link_to="/search/car">
        </NavigationButton>
      </div>
      <div class="w3-quarter">
        <NavigationButton
            button_title="Остальное"
            class="w3-teal"
            v-on:click="filter_business"
            button_filter="other"
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
      this.$router.push({path: '/statics'})
      console.log('переход на страницу статистики')
    },
    go_to_page_data(){
      this.$router.push({path: '/data'})
      console.log('переход на страницу импорта')
    },

    filter_business(filter){
      this.$router.push({
        name: 'search_category',
        params:{
          categories: filter
        }})
      console.log('filter business by categories: ' + filter)

    },
    search_name(){
      this.$router.push({
        name: 'search_name',
        params:{
          name: this.input_name
        }})
      console.log('search business with name: ' + this.input_name);
    },
    search_place(){
      this.$router.push({
        name: 'search_place',
        params:{
          place: this.input_place
        }})
      console.log('search business with place: ' + this.input_place)
    },
    search_business_and_place(){
      this.$router.push({
        name: 'search_name_&_place',
        params:{
          name: this.input_name,
          place: this.input_place
        }})

      console.log('search business with name: ' + this.input_name + ' and with place: '+ this.input_place)
    }
  },

  data(){
    return{
      input_name: '',
      input_place: '',
    }
  },
}
</script>

<style scoped>

</style>