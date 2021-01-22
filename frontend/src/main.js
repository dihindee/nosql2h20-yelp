import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import DataComponent from "@/components/DataComponent";
import StatisticComponent from "@/components/StatisticComponent";
import ResponseComponent from "@/components/ResponseComponent";
import BusinessComponent from "@/components/BusinessComponent";
import UserComponent from "@/components/UserComponent";

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  {path: '/data', component: DataComponent},
  {path: '/statics', component: StatisticComponent},
  {
    path: '/search/:filter',
    component: ResponseComponent,
    props:{
      id: 'dsfdf'
    }
  },
  {path: '/business/:id', component: BusinessComponent},
  {path: '/user/:id',component: UserComponent}
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
