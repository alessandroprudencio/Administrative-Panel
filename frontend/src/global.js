import Vue from 'vue'

//
export const userKey = '__user'
export const apiUrl = 'http://localhost:3000'

export function mostraErro(erros){
    if(erros && erros.response && erros.response.data){
        Vue.toasted.global.defaultError({ msg: erros.response.data })
    }else if(typeof erros === 'string') {
        Vue.toasted.global.defaultError({msg:erros}) 
    }else{
        Vue.toasted.global.defaultError()
    }
}

export default { apiUrl, mostraErro, userKey}