//据存储的工具箱。如何存、取、删除值
//在存储、封装storage的时候，我们希望全局只有一个名字
//由于希望站点内的数据随着浏览器的关闭而自动关闭，本项目做SessionStorage

/**
 * Storage封装
 */
const STORAGE_KEY = 'mall';
//封装几个API
export default{
    //存储值，可以是任意类型的值
    //设置模块
    setItem(key,value,module_name){
        if(module_name){
            let val = this.getItem(module_name);
            val[key] = value;
            this.setItem(module_name,val);
        }else{
            let val = this.getStorage();
            val[key] = value;
            //重新写入storage信息里
            //因为是面向模块编程，sessionStorage这个模块可能在上下文里找不到，即便它是个全局对象，所以只写seesionStorage的话ES6可能检查不通过，报错。
            //而window是可以通过的
            window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val));//由于val是个JSON对象，所以这里要转回字符串
        }
    },
    //获取值
    //获取某一个模块下面的属性 e.g. user下的userName
    getItem(key,module_name){
        //如果传了module_name，就先获取module_name
        //比如要获取user下的username, 则key为username,module_name为user
        if(module_name){
            //递归获取
            let val = this.getItem(module_name);
            if(val) return val[key];

        }
        return this.getStorage()[key];
    },
    //获取整个浏览器里的缓存信息
    getStorage(){
        //因为是统一放在mall里面的，所以先把mall里面的信息获取了
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
    },
    //清空所有值
    clear(key,module_name){
        let val = this.getStorage();
        if(module_name){
            delete val[module_name][key];
        }else{
            delete val[key];
        }
        //删掉后把值重新写入
        window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val));
    }

}