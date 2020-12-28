<template>
  <div id="app">
    <!--    <img alt="Vue logo" src="./assets/logo.png">-->

    <Header></Header>


<!--    <RestaurantComponent-->
<!--        :data="        {-->
<!--          name: 'Ресторан у деда',-->
<!--          address: 'Мухосранск',-->
<!--          city: 'SAint',-->
<!--          state: 'sdfs',-->
<!--          categories: 'live meat',-->
<!--          hours:'12-3/00',-->
<!--          rating: 1,-->
<!--    }"-->
<!--    ></RestaurantComponent>-->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: 'App',

  components: {
    Header,
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
