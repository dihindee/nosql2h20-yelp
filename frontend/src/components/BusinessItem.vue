<template>
  <li
    class="w3-bar">
    <div>
        <h2
            v-on:click="$emit('click',business.id)"
        >{{ business.name }}</h2>
      <p>{{full_address}}</p>
      <p>{{ 'Категория: ' + business.categories }}</p>
      <p>{{ 'Время работы: ' + business.hours }}</p>
      <p>Рейтинг: {{ business.rating }}</p>
    </div>
  </li>
</template>

<script>
export default {
name: "BusinessItem",
  props:{
  business:{
    type: Object,
    required: true
}
  },
  computed:{
    full_address(){
      return 'Adress: '+ this.business.state + ', '+ this.business.city+', '+ this.business.address
    },
    url(){
      return '/business/'+this.business.id
    }
  }
}
</script>

<style scoped>

</style>