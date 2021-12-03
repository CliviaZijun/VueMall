/* 
    mutations就直接export default就好
    商城Vuex-mutations
*/
export default{
    //TODO：一些方法
    saveUserName(state,username){ //到了mutation就需要去改变状态了，所以这里的context改成state
        state.username = username;
    },
    saveCartCount(state,count){ //到了mutation就需要去改变状态了，所以这里的context改成state
        state.cartCount = count;//state.xxx 的xxx要与index.js中的状态名一致
    }
}
