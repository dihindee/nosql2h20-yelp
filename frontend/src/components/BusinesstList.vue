<template>
  <ul
  class="w3-ul"
  v-if="business_list.length">
    <BusinessItem
      v-for="item in business_list"
      :key="item.id"
      :business="item"
      @click="go_to_rest"
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
    business_list:[
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
  methods:{
    go_to_rest(rest_id){
      console.log(rest_id)
    }
  }
}
</script>

<style scoped>

</style>