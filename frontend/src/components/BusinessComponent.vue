<template>
  <div>
    <div>

      <p>{{this.$route.params.business_id}}</p>
    // тут надо добавлять get запрос для бизнеса и компонента с отзывами
<!--      <h2>{{ business.name }}</h2>-->
<!--      <p>{{full_address}}</p>-->
<!--      <p>{{ 'Категория: ' + business.categories }}</p>-->
<!--      <p>{{ 'Время работы: ' + business.hours }}</p>-->
<!--      <p>Рейтинг: {{ business.rating }}</p>-->
    </div>

    <div>
      <p>Предоставляемые услуги</p>

<!--      Добавить услуги-->
    </div>

    <div>
      <p>Отзывы</p>

      <FeedbackList/>
    </div>
  </div>
</template>

<script>
import FeedbackList from "@/components/FeedbackList";
export default {
name: "RestaurantComponent",
  components: {FeedbackList, },
  props:{
    // business:{
    //   type: Object,
    //
    // }
  },
  computed:{
    full_address(){
      return 'Address: '+ this.business.state + ', '+ this.business.city+', '+ this.business.address
    }
  }
}
</script>

<style scoped>

</style>