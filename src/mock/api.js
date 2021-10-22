//用于定义mock文件（集成Mock API的方式）
import Mock from 'mockjs'

//第一个参数是地址，第二个参数就是返回值（login.json里）
Mock.mock('/api/user/login',{
    "status": 0,
    "data": {
      "id|10001-11000": 0,
      "username": "@cname",
      "email": "admin@51purse.com",
      "phone": null,
      "role": 0,
      "createTime": 1479048325000,
      "updateTime": 1479048325000
    }
});