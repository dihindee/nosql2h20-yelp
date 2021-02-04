<template>
  <div class="w3-row">
    <div class="w3-col w3-left w3-container" style="width:100px"></div>
    <div class="w3-col w3-right w3-container " style="width:100px"></div>
    <div class="w3-rest w3-container">
      <section v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </section>

      <section v-else>
        <div v-if="loading">Loading...</div>
        <div v-if="notfound">Пользователь не найден!</div>
        <div v-else>

          <h3 class="w3-left-align">Информация о пользователе</h3>
          <p class="w3-left-align">Имя: {{this.user.name}}</p>
          <p class="w3-left-align">Количество отзывов: {{user.review_count}}</p>
          <p class="w3-left-align">На yelp c  {{user.yelping_since}}</p>
          <p class="w3-left-align">Оценки: полезно:{{user.yelping_since}}, смешно:{{user.funny}}, прохладно:{{user.cool}}</p>
          <p class="w3-left-align">Элита: {{user.elite}}</p>
          <p class="w3-left-align">Друзья:
            <FriendsList
                v-for="item in this.slice_friends"
                v-bind:key="item.user_id"
                :user_id="item.user_id"></FriendsList>
          </p>
          <p class="w3-left-align">Количество фанатов: {{user.fans}}</p>
          <p class="w3-left-align">Средняя оценка: {{user.average_stars}}</p>
          <p class="w3-left-align">История комплиментов</p>

          <table class="w3-table-all">
            <caption>История комплиментов</caption>
            <tr>
              <th>hot</th>
              <th>more</th>
              <th>profile</th>
              <th>cute</th>
              <th>list</th>
              <th>note</th>
              <th>plain</th>
              <th>cool</th>
              <th>funny</th>
              <th>writer</th>
              <th>photos</th>
            </tr>
            <tr>
              <td>{{user.compliment_hot}}</td>
              <td>{{user.compliment_more}}</td>
              <td>{{user.compliment_profile}}</td>
              <td>{{user.compliment_cute}}</td>
              <td>{{user.compliment_list}}</td>
              <td>{{user.compliment_note}}</td>
              <td>{{user.compliment_plain}}</td>
              <td>{{user.compliment_cool}}</td>
              <td>{{user.compliment_funny}}</td>
              <td>{{user.compliment_writer}}</td>
              <td>{{user.compliment_photos}}</td>
            </tr>

          </table>
        </div>
        <UserTipsList
            :user_id="this.user.user_id"
        ></UserTipsList>
        <UserReviewsList
        :user_id="this.user.user_id"></UserReviewsList>
      </section>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import FriendsItem from "./FriendsItem";
import UserTipsList from "./UserTipsList";
import UserReviewsList from "./UserReviewsList";

export default {
  name: "UserComponent",
  components: {UserReviewsList, UserTipsList, FriendsList: FriendsItem},
  data(){
    return{
      loading: false,
      errored: null,
      user:null,
      notfound: false,
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
      this.errored = this.post = null
      this.loading = true
      this.notfound = false
      axios
          .get('http://localhost:3000/users/profile/'+this.$route.params.user_id)
          .then(response => {
            this.user = response.data
            console.log("ЗАгружено: ");
            console.log(response.data.length);
          })
          .catch(error => {
            console.log(error);
            this.errored = true
          })
          .finally(() => {
            this.loading = false;
            if(this.user.length === 0){
              this.notfound = true;
            }
          });
    },
    go_to_user(user_id){
      this.$router.push({
        name: 'user',
        params:{
          user_id: user_id,
        }})
      console.log("go to user with id: "+user_id)
    },
    },
    computed:{
      slice_friends(){
        let temp = this.user.friends.replaceAll(" ","").split(",")
        let arr = [];
        for (let i =0; i< temp.length; i++){
          arr.push({user_id: temp[i]})
        }
        console.log("Порезанный массив")
        console.log(arr)
        return arr
      }
  }

}
</script>

<style scoped>

</style>