import axios from 'axios'

    const success = res => res

    const erro = err =>{
        if(401 === err.response.status){
            window.location = '/auth'
            alert('Sessão expirada faça login novamente')
            
        }else{
            return Promise.reject(err)

        }
    }

    axios.interceptors.response.use(success,erro)