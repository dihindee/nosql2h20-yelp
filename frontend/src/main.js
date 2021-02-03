import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import DataComponent from "@/components/DataComponent";
import StatisticComponent from "@/components/StatisticComponent";
import ResponseComponent from "@/components/ResponseComponent";
import BusinessComponent from "@/components/BusinessComponent";
import UserComponent from "@/components/UserComponent";
import indexComponent from "./components/indexComponent";

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: indexComponent
  }
  ,{
    name: 'data',
    path: '/data',
    component: DataComponent
  },
  {
    path: '/statics',
    name: 'statics',
    component: StatisticComponent},
  {
    name: 'search_category',
    path: '/search/categories=:categories',
    component: ResponseComponent,
  },
  {
    name: 'search_name',
    path: '/search/name=:name',
    component: ResponseComponent,
  },
  {
    name: 'search_place',
    path: '/search/place=:place',
    component: ResponseComponent,
  },
  {
    name: 'search_name_&_place',
    path: '/search/name=:name&place=:place',
    component: ResponseComponent,
  },
  {
    name: 'business',
    path: '/business/business_id=:business_id',
    component: BusinessComponent
  },
  {
    name: 'user',
    path: '/user/user_id=:user_id',
    component: UserComponent
  },
  {
    name: 'filter_business',
    path: '/filter/state=:state&city=:city&categories=:categories&stars=:stars&reviews=:reviews&is_open=:is_open',
    component: ResponseComponent
  },
  {
    name: 'filter_analytics',
    path: '/filter_analytics/state=:state&city=:city&categories=:categories&stars=:stars&reviews=:reviews&is_open=:is_open',
    component: StatisticComponent
  }
]

const router = new VueRouter({
  routes: routes
});

new Vue({

  router,
  // el:'#app',
  // template:'<App/>',
  // components: {App}
   render: h => h(App),
}).$mount('#app')
