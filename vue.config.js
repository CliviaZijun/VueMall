module.exports = {
    devServer:{
        host:'localhost',
        port:8080,
        proxy:{
            //接口文档给出的每个接口地址都不一样，拦截时很难拦截到，所以为了方便前端管理接口，这里统一虚拟成/api
            '/api':{
                //接口地址
                target:'http://mall-pre.springboot.cn',
                //是否要将主机头的原点更改为目标的url地址
                changeOrigin:true,
                
                pathRewrite:{//再通过pathRewrite把虚拟地址去掉
                    '/api':''
                }
            }
        }
    }
}