<template>
  <span v-on:click="go_to_user(this.user_id)">
    <span v-if="errored">
      <p>Взлом базы не удался, попробуйте позже</p>
    </span>

    <span v-else>
      <span v-if="loading">Взламываю пользователя {{this.user_id}},</span>
      <span v-if="notfound">Пользователь не найден или удалён,</span>
      <span v-else
            v-on:click="click_user"
            >
          {{this.user_name}},
      </span>
    </span>
  </span>
</template>

<script>
import axios from "axios";

export default {
name: "FriendsList",
  data(){
    return{
      loading: false,
      errored: null,
      notfound: false,
      hidden: true,
      friends_names:null,
      user_name:"Скрыто"
    }
  },
  props:{
    user_id: {
      type: String,
      required: true
    }
  },
  created() {
    this.fetchData();
  },
  watch:{
    $route: 'fetchData'
  },
  methods:{
    fetchData() {
      this.errored = null
      this.loading = true
      this.notfound = false

      console.log("user_id:" + this.user_id)

      axios
            .get('http://localhost:3000/users/mini/'+this.user_id)
            .then(response => {
                this.user_name = response.data.name
              console.log("result")
              console.log(response.data)

            })
            .catch(error => {
              console.log(error);
              this.errored = true
            })
            .finally(() => {
              this.loading=false
              this.user_name+=""
              if(this.user_name.length === 0 || !this.user_name|| this.user_name === "undefined"){
                this.notfound = true
              }
              this.hidden = false
            });

    },
    click_user(){
      console.log('Наведено')
      if( this.user_name === "Скрыто" && this.loading === false && this.hidden=== true){
        this.fetchData()
      }else {
        this.go_to_user(this.user_id)
      }

    },
    go_to_user(user_id){
      console.log("click")
      this.$router.push({
        name: 'user',
        params:{
          user_id: user_id,
        }})
      console.log("go to user with id: "+user_id)
    },
  },

}
</script>

<style scoped>

</style>