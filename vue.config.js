module.exports = {
    devServer:{
        host:'localhost',
        port:8080,
        proxy:{
            '/activity':{
                target:'https://www.imooc.com',
                //是否要将主机头的原点更改为目标的url地址
                changeOrigin:true,
                pathRewrite:{
                    '/activity':'/activity'
                }
            }
        }
    }
}