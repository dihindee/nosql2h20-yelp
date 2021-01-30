<template>
  <div
      class="w3-container">
    <h3>Импорт и экспорт данных</h3>
    <div>
      <section v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </section>

      <section v-else>
        <div v-if="loading">Loading...</div>
        <div v-else>
          <p>Дата последнего обновления данных: {{update_date}}</p>
        </div>
      </section>

    </div>

    <div
    class="w3-row-padding">
      <div
          class="w3-third">
        <button
            v-on:click="check_data"
            class=" w3-round w3-teal w3-button w3-round"
        >Проверить обновление данных</button>
      </div>
      <div
          class="w3-third">
        <button
            v-on:click="export_data"
            class=" w3-round w3-teal w3-button w3-round">
          Экспортировать данные</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "ImportComponent",
  data(){
    return{
      update_date: "Данные ещё не загружены в БД",
      loading: false,
      errored: null
    }
  },
  created() {
    this.fetchData();
  },
  watch:{
    $route: 'fetchData'
  },
  methods:{
    check_data(){
      console.log('Проверка данных')
      this.fetchData()
    },

    export_data(){
      console.log('Экспортировать данные')
    },
    fetchData(){

      //TODO GET запрос на время последнего обновления БД

      this.error = this.post = null
      this.loading = true
      axios
          .get('http://localhost:3000/test')
          .then(response => {
            this.update_date = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
            this.errored = true
          })
          .finally(() => (this.loading = false));
    }
  },
  computed:{
  }
}
</script>

<style scoped>

</style>