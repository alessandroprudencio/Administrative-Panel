//quando receber .catch 
import Vue from 'vue'

export const ApiUrl = 'http://localhost:3000'

export function mostraErros(erros){
    if(erros && erros.response && erros.response.data){
        Vue.toasted.global.defaultError({ msg: erros.response.data })
    }else if(typeof erros === 'string') {
        Vue.toasted.global.defaultError({msg:erros}) 
    }else{
        Vue.toasted.global.defaultError()
    }
}

export default { ApiUrl, mostraErros}