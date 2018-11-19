import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        isMenuVisible : false,
        user:null
    },
    mutations : {
        //alternar o estado do menu
        toogleMenu(state, isVisible){
            if(!state.user){
                state.isMenuVisible = false
                return
            }

            // SE ISVISIBLE NÃO FOI PASSADO ELE FICA ALTERNANDO O MENU
            if(isVisible === undefined){
                state.isMenuVisible  = !state.isMenuVisible // SE TIVER VERDADEIRO ELE ATRIBUI FALSO E VICE VERSA
            }else{
                //CASO PASSE O IS VISIBLE TRUE OU FALSE 
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user){
            state.user = user
            //if se tiver usuario, seta o token no cabeçalho
            if(user) {
                axios.defaults.headers.common['Authorization'] =  `Bearer ${user.token}`
                state.isMenuVisible = true
            }else{
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }

        }
    }
})