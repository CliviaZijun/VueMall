let baseURL;
//获取当前nodeJS进程里面的一些环境变量，这些环境变量最终会写入NodeJS里面去
switch(process.env.NODE_ENV) {
    case 'development':
        baseURL = 'http://dev-mall-pre.springboot.cn/api'//开发阶段
        break;
    case 'prev':
        baseURL = 'http://prev-mall-pre.springboot.cn/api'//预发布阶段
        break;
    case 'test':
        baseURL = 'http://test-mall-pre.springboot.cn/api'//测试阶段
        break;
    case 'prod':
        baseURL = 'http://mall-pre.springboot.cn/api'//线上的
        break;
    default:
        baseURL = 'http://mall-pre.springboot.cn/api'
        break;
}


export default {
    //导出成一个对象，方便管理
    baseURL
}