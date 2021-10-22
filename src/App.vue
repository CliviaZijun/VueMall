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
      res:{}
    }
  },
  mounted(){
    
    /*
    //本地加载请求静态Json文件的形式实现数据mock
    //这个地址在后期联调的时候是需要改动的，要改成/user/login
    this.axios.get('/mock/user/login.json').then((res)=>{
      this.res = res;
    });
    */
 
    /*
    //通过easy-mock平台实现数据mock
    //先把main.js的baseURL改成easy-mock源地址
    //地址后期无需改动
    this.axios.get('/user/login').then((res)=>{
      this.res = res;
    });
    */

    ///*
    //本地集成mockjs实现数据mock
    //先加载mockjs
    //地址后期无需改动
    this.axios.get('/user/login').then((res)=>{
      this.res = res;
    });
    //*/

    /*
    //storage.setItem('a',1);
    //storage.setItem('user',{a:1});
    //storage.setItem('abc',{a:1},'user');
    //storage.clear('a');
    storage.clear('sex','user');
    */

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
