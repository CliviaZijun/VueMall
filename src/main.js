//插件
import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
/*
import VueAxios from 'vue-axios'
*/
//组件
import App from './App.vue'
//import env from './env'//自己的文件一定要写./ 否则会被认为是插件

//根据环境变量获取不同的请求地址
//axios.defaults.baseURL = env.baseURL;

//集成mockjs的开关
const mock = true;
//想mock的话
if(mock){
    //require和import的区别：
    //  import是预编译加载，在编译的时候import的文件就会被加载进来，写入到内存中，这样的话mock就会永远被拦截，而我们希望的是mock开关打开时才被拦截；
    //  而require不会，它是在执行过程中才加载，也就说如果mockjs的开关为fasle mock是不会被加载的
    require('./mock/api');
}

//⭐在发请求的时候要设置一些基础值

//根据前端的跨域方式做调整
//接口代理：当前接口域名与前端域名相同，'/api'（依具体情况而定）
//cors或者jsonp：前后端域名不同时，基础要写成比如'http://www.baidu.com'的形式

/*
//easy-mock用↓(还没验证，easy-mock太容易挂了T-T)
axios.defaults.baseURL = 'http://www.easy-mock.com/mock/5b012c1fe6e1035843cd3aff/mimall';
*/

///*使用本地创建JSON和easy-mock的mock形式时要注释掉或者更换baseURL

// /a/b : /api/a/b => /a/b因为有时候后端会觉得麻烦不想设置api
axios.defaults.baseURL = '/api';//见vue.config.js
//*/

//⭐为了用户体验，最好或者说一定要设置超时时间
axios.defaults.timeout = 8000;

//接口错误拦截
//错误拦截:商城系统没有像后台管理系统那么多的表单，更多地是对返回值进行处理，所以这里只做错误拦截(response拦截器)不做请求的拦截（request拦截器）
axios.interceptors.response.use(function(response){
    let res = response.data;//注意区分axios封装的response.data和我们自己的res.data
    if(res.status == 0){//未报错
        return res.data;
    }else if(res.status == 10){//未登录的错误码
        //由于我们是哈希路由（带＃），所以路径要写带＃的完整路由
        window.location.href = '/#/login';//注意这里要用window，this取不到只有在每个页面里才能用this
    }else{
        alert(res.msg);
    }
});

//注册
//挂载到原型，这样在其他组件内部就可以使用this.axios进行访问了
Vue.prototype.axios = axios
/*
Vue.use(VueAxios,axios);
*/
//加载插件,类似NodeJS里面的APP.use,它可以应用一个中间件
Vue.use(VueLazyLoad,{
    loading:'/imgs/loading-svg/loading-bars.svg'
})

//生产环境的提示，默认false，开启后会展示vue底层的一些info信息
Vue.config.productionTip = false

new Vue({
    router,//如果是import routers from './router' 这里就是router:routers
    render:h=>h(App),
}).$mount('#app')
