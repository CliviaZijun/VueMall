import Vue from 'vue'
import Router from 'vue-router'
//引用页面
import Home from './pages/home'// './pages/Home.vue'  .vue可以省略
import Index from './pages/index'
/* import Product from './pages/product'
import Detail from './pages/detail'
import Login from './pages/login'
import Cart from './pages/cart'
import Order from './pages/order'
import OrderConfirm from './pages/orderConfirm'
import OrderList from './pages/orderList'
import OrderPay from './pages/orderPay'
import AliPay from './pages/alipay' */

//加载插件
Vue.use(Router);

export default new Router({
    //配置一系列子路由
    routes:[
        {
            //首先要加载'/'
            //因为首页、产品栈、商品详情是共用一个大的副路由
            //因此它门做路由的嵌套
            path:'/',
            //所以这里要定义一个组件
            name:'home',
            //把Home组件加载进来
            component:Home,
            //重定向
            redirect:'/index',
            //加载子路由，也是一个列表
            children:[
                //首页
                {
                    path:'/index',
                    name:'index',
                    component:Index
                },
                //产品站
                {
                    //每个商品都要有一个商品ID，因此子路由还是一个动态路由
                    path:'/product/:id',//←动态定义路由的一种语法，冒号后面的名字可以随意起 不一定是id
                    name:'product',
                    // component:Product
                    // 第一种按需加载方式
                    component: resolve => require(['./pages/product.vue'],resolve)
                },
                //商品详情
                {
                    path:'/detail/:id',
                    name:'detail',
                    // component:Detail
                    // 第一种按需加载方式
                    component: resolve => require(['./pages/detail.vue'],resolve)
                }
            ]
        },
        //由于购物车、订单等不需要nav-header&footer，所以不需要上面的根结构，需要另外的结构
        // 登录
        {
            path:'/login',
            name:'login',
            // component:Login
            // 第一种按需加载方式
            // component: resolve => require(['./pages/login.vue'],resolve)
            // 第二种按需加载方式
            component: () => import('./pages/login.vue')
        },
        //购物车
        {
            path:'/cart',
            name:'cart',
            // component:Cart
            // 第一种按需加载方式
            component: resolve => require(['./pages/cart.vue'],resolve)
        },
        //订单
        {
            path:'/order',
            name:'order',
            // component:Order,
            // 第一种按需加载方式
            // component: resolve => require(['./pages/order.vue'],resolve),
            // 第二种按需加载方式
            component: () => import('./pages/order.vue'),
            children:[
                {
                    path:'list',
                    name:'order-list',
                    // component:OrderList
                    // 第一种按需加载方式
                    // component: resolve => require(['./pages/orderList.vue'],resolve)
                    // 第二种按需加载方式
                    component: () => import('./pages/orderList.vue')
                },
                {
                    path:'confirm',
                    name:'order-confirm',
                    // component:OrderConfirm
                    // 第一种按需加载方式
                    component: resolve => require(['./pages/orderConfirm.vue'],resolve)
                },
                {
                    path:'pay',
                    name:'order-pay',
                    // component:OrderPay
                    // 第一种按需加载方式
                    component: resolve => require(['./pages/orderPay.vue'],resolve)
                },
                //alipay只是一个中间页，可以暂时作为order的一个子路由
                {
                    path:'alipay',
                    name:'alipay',
                    // component:AliPay
                    // 第一种按需加载方式
                    component: resolve => require(['./pages/alipay.vue'],resolve)
                }
            ]
        }
    ]

});