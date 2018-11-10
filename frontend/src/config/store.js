import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        isMenuVisible : true
    },
    mutations : {
        //alternar o estado do menu
        toogleMenu(state, isVisible){
            // SE ISVISIBLE NÃO FOI PASSADO ELE FICA ALTERNANDO O MENU
            if(isVisible === undefined){
                state.isMenuVisible  = !state.isMenuVisible // SE TIVER VERDADEIRO ELE ATRIBUI FALSO E VICE VERSA
            }else{
                //CASO PASSE O IS VISIBLE TRUE OU FALSE 
                state.isMenuVisible = isVisible
            }
            console.log('toogle menu', state.isMenuVisible)
        }
    }
})