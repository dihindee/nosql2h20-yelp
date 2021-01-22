<template>
  <div
      class="w3-container">
    <h3>Импорт и экспорт данных</h3>
    <p>Дата последнего обновления данных: {{update_date}}</p>
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
          v-on:click="import_data"
          class="w3-round w3-teal w3-button w3-round"
        >Импортировать данные</button>
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
export default {
name: "ImportComponent",
  methods:{
    check_data(){
      console.log('Проверка данных')
      this.update_date = Date.now();
    },
    import_data(){
      console.log('Импортирвоать данные')
    },
    export_data(){
      console.log('Экспортировать данные')
    }
  },
  data(){
    return{
      update_date: 'не обновлялось'
    }
  },
  computed:{
  }
}
</script>

<style scoped>

</style>