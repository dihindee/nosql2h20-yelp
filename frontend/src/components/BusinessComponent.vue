<template>
  <div>
    <div>
      <section v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </section>

      <section v-else>
        <div v-if="loading">Loading...</div>

        <div v-else>
          <div class="w3-row">
            <div class="w3-col w3-left w3-container" style="width:100px"></div>
            <div class="w3-col w3-right w3-container " style="width:100px"></div>
            <div class="w3-rest w3-container">
              <h3>{{ business.name }}</h3>
              <p class="w3-left-align">Адрес: {{full_address}}</p>
              <p class="w3-left-align">Категории: {{business.categories }}</p>
              <p class="w3-left-align">Координаты: широта: {{business.latitude}}, долгота: {{business.longitude}}</p>
              <p class="w3-left-align">Время работы: {{work_time }}</p>
              <p class="w3-left-align">Рейтинг: {{ business.stars }} / 5.0</p>
              <p class="w3-left-align">Количество рецензий: {{business.review_count}}</p>
              <p class="w3-left-align">Статус заведения: {{is_open}}</p>

              <p class="w3-left-align">Дополнительные атрибуты:</p>
              <table class="w3-table-all w3-centered">
                <tr class=""><th>Атрибут</th><th>Значение</th></tr>
                <tr
                    v-for="item in extra_attributes"
                    v-bind:key="item.atr">
                  <td>{{item.atr}}</td>
                  <td class="">{{item.value}}</td>
                </tr>
              </table>

            </div>
          </div>
        </div>
      </section>

    </div>

    <TipsList
        :business_id="business.business_id">
    </TipsList>

    <ReviewsList
        :business_id="business.business_id">
    </ReviewsList>

  </div>
</template>

<script>
// import FeedbackList from "@/components/";
import ReviewsList from "./ReviewsList";
import TipsList from "./TipsList";
import axios from "axios";


export default {
name: "RestaurantComponent",
  components: {TipsList, ReviewsList,},
  data(){
    return{
      loading: false,
      errored: null,
      business:null,
    }
  },
  created() {
    this.fetchData();
  },
  watch:{
    $route: 'fetchData'
  },
  computed:{
    full_address(){
      return 'Address: '+ this.business.state + ', '+ this.business.city+', '+ this.business.address
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
    },
    extra_attributes(){
      let arr = []
      for (let i in this.business.attributes){
        let value = this.business.attributes[i]
        if (i === "BusinessParking" && value !== "None"){
          let temp = this.business.attributes[i]
          temp = temp.replace("{","").replace("}","").replaceAll(" ","").replaceAll("'","")
          temp = temp.split(',')
          for (let i2 in temp){
            let v = temp[i2].split(":")
            arr.push({atr : i+": "+v[0], value: v[1]})
          }
          continue
        }

        if(value.includes('u\'')){
          arr.push({atr : i, value: value.substr(2, value.length -3)})
        }else if(value.includes('\'')){
          arr.push({atr : i, value: value.substr(1,value.length-2)})
        }else {
          arr.push({atr : i, value: value})
        }
      }
      return arr;
    }
  },
  methods: {
    fetchData() {
      this.error = this.post = null
      this.loading = true
      axios
          .get('http://localhost:3000/business/profile/'+this.$route.params.business_id)
          .then(response => {
            this.business = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
            this.errored = true
          })
          .finally(() => (this.loading = false));
    }
  }
}
</script>

<style scoped>

</style>