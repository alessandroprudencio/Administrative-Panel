module.exports = app => {
    function existeOuErro(value, msg) {
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }
    
    function naoExisteOuErro(value, msg) {
        try {
            existeOuErro(value, msg)
        } catch(msg) {
            return
        }
        throw msg
    }
    
    function igualOuErro(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    return { existeOuErro, naoExisteOuErro, igualOuErro }
}