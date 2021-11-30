<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
//import jsonp from 'jsonp'
//import storage from './storage/index'
export default {
  name: 'App',
  components: {
    
  },
  data(){
    return{
    
    }
  },
  mounted(){
    this.getUser();
    this.getCartCount();
  },
  // 数据的拉取
  methods:{
    getUser(){//因为这里是App.vue是根组件，我们唯一能做的就是把这个数据保存下来，存储到vuex中去，然后再到NavHeader中把数据读出来就可以了
      this.axios.get('/user').then(()=>{
        //TODO: 保存到vuex里面
      })
    },
    getCartCount(){
      this.axios.get('/carts/products/sum').then(()=>{
        //TODO: 保存到vuex里面
      })
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';
</style>
