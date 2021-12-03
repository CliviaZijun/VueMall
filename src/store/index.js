/* 
    用于管理入口，包括管理状态的入口
 */
// 入口肯定要导入vue
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'//引入自己的模块时一定要加./ ，否则会被当作插件，去node_modules模块中查找。
import actions from './actions'
Vue.use(Vuex);

// 用完后要导出，通过export default导入一个变量

// 2. 定义state
const state = {
    username:'',//登录用户名
    cartCount:0 //购物车商品数量
}

// 1. new一个Vuex.Store，把 state, mutations, actions 都填充进去
export default new Vuex.Store({
    state,
    mutations,//如果名称不同就mutations:a
    actions
});