<template>
  <ul
  class="w3-ul"
  v-if="business_list.length">
    <BusinessItem
      v-for="item in business_list"
      :key="item.id"
      :business="item"
      @click="go_to_business"
    ></BusinessItem>
  </ul>
  <p v-else> Ничего не найдено. Повторите запрос</p>
</template>

<script>
import BusinessItem from "@/components/BusinessItem";
export default {
name: "RestaurantList",
  components: {BusinessItem},
  data(){
  return{
    business_list:[ // тестовые данные для простого выводы
      {
        id:1,
        name: 'test 1',
        address: 'dfdf',
        city: 'SAint',
        state: 'sdfs',
        categories: 'live meat',
        hours:'12-3/00',
        rating: 1,
      },
      {
        id:2,
          name: 'test 1',
          address: 'dfdf',
          city: 'SAint',
          state: 'sdfs',
          categories: 'live meat',
          hours:'12-3/00',
          rating: 1,
      }
      ]
    }
  },
  props:{
    // business_list:{
    //   type: Object,
    //   required: true
    // },
  },
  methods:{
    go_to_business(business_id){
      console.log('go to buseness with id: '+business_id)
      this.$router.push({
        name: 'business',
        params:{
          business_id: business_id
        }})
    }
  }
}
</script>

<style scoped>

</style>