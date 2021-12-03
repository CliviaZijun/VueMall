/* 
    商城Vuex-actions
*/
export default{
    //TODO：一些方法
    // 保存用户信息
    saveUserName(context,username){ //需要暴露context上下文对象，因为actions要触发mutations; 参数，就是payload,这里是username
        context.commit('saveUserName', username);
    },
    // 保存购物车数量
    saveCartCount(context,count){ //需要暴露context上下文对象，因为actions要触发mutations; 参数，就是payload,这里是count
        context.commit('saveCartCount', count);
    }
}