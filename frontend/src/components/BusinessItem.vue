<template>
  <li
    class="w3-bar w3-round">
    <div class="w3-bar-item w3-container">
      <div class="w3-col w3-left w3-container" style="width:50px"></div>
      <div class="w3-col w3-right w3-container " style="width:50px"></div>
      <div class="w3-rest w3-container">
        <h3
            v-on:click.left="get_click"
            class="w3-center"
        >{{ business.name }}</h3>
        <p class="w3-left-align">Адрес: {{full_address}}</p>
        <p class="w3-left-align">Категории: {{business.categories }}</p>
        <p class="w3-left-align">Время работы: {{work_time }}</p>
        <p class="w3-left-align">Рейтинг: {{ business.stars }} / 5.0</p>
        <p class="w3-left-align">Количество рецензий: {{business.review_count}}</p>
        <p class="w3-left-align">Статус заведения: {{is_open}}</p>
      </div>
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
  methods:{
    get_click(){
      if( getSelection().toString().length === 0){
        this.$emit('click',this.business.business_id)
      }
    }
  },
  computed:{
    full_address(){
      return ''+ this.business.state + ', '+ this.business.city+', '+ this.business.address+', '
          +this.business.postal_code;
    },
    work_time(){
      if (this.business.hours == null)
        return "не указано"
      else{
        return "Понедельник: " + this.business.hours.Monday + ", Вторник: " + this.business.hours.Tuesday
            + ", Среда: " + this.business.hours.Wednesday + ", Четверг: " + this.business.hours.Thursday
            + ", Пятница: " + this.business.hours.Friday
            + ", Суббота: " + (this.business.hours.Saturday ? this.business.hours.Saturday : "-")
            + ", Воскресенье: " + (this.business.hours.Sunday ? this.business.hours.Sunday : "-")
      }
    },
    is_open(){
      return this.business.is_open === 1 ? "открыто": "Закрыто";
    }
  }
}
</script>

<style scoped>

</style>