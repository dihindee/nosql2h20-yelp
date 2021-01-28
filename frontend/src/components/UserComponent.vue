<template>
  <div>
    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <h3>Информация о пользователе</h3>
        <p>Имя: {{this.user.name}}</p>
        <!--    аналогично другие данные-->
      </div>
    </section>

    <p>Отзывы пользователя</p>
<!--    Тут добавить компонет для коментариев пользователя-->
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "UserComponent",
  data(){
    return{
      loading: false,
      errored: null,
      info:null,
      user:[]
    }
  },
  props:{
  },
  created() {
    this.fetchData();
  },
  watch:{
    $route: 'fetchData'
  },
  methods:{
    fetchData() {
      //  this.$route.params.user_id
      this.error = this.post = null
      this.loading = true
      axios
          .get('http://localhost:3000/test')
          .then(response => {
            this.user = response.data
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