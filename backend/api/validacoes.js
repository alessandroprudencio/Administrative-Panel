module.exports = app => {

    function existeOuErro(value, msg){ //se exisitir ele continua sem não da msg de erro
        if(!value) throw msg
        if(Array.isArray(value) && value.lenght === 0 ) throw msg //verifica se é array e se esta vazio = exibibe msg
        if(typeof valuie  === 'string' && !value.trim()) throw msg
    }
    
    function naoExisteOuErro(value, msg){ // se existir ele da erro se não da msg 
        try {
            ExisteOuErro(value, msg)
        } catch (msg) {
            return
        }
        throw msg
    }
    
    function igualOuErro(valueA, valueB, msg){
        if(valueA !==valueB) throw msg
    }

    return {existeOuErro, naoExisteOuErro, igualOuErro}

}