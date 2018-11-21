const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const {existeOuErro, naoExisteOuErro, igualOuErro} = app.api.validacoes

    const encryptSenha = password =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    } 

    const save = async (req, res)=>{
            const usuario = { ...req.body }
            if(req.params.id) usuario.id =req.params.id
        
            if(!req.originalUrl.startsWith('/users')) usuario.admin = false //se na requisicao não tiver /usuarios
            if(!req.usuario || !req.usuario.admin) usuario.admin = false
        
            try {
                existeOuErro(usuario.name, "Nome não informado")
                existeOuErro(usuario.email, "E-mail não informado")
                existeOuErro(usuario.password, "Senha não informada")
                existeOuErro(usuario.confirmaSenha, "Senha não confirmada")
                igualOuErro(usuario.password, usuario.confirmaSenha,"Senhas não conferem")
                
                const usuarioFromDB = await app.db('users')
                .where({ email : usuario.email })
                .first()
                    if(!usuario.id){
                        naoExisteOuErro(usuarioFromDB, "Usuario já cadastrado")                
                    }
                    
                } catch (msg) {
                    return res.status(400).send(msg)
                }
            usuario.password = encryptSenha(usuario.password) 
            delete usuario.confirmaSenha

            if(usuario.id){
                app.db('users')
                    .update(usuario)
                    .where({id:usuario.id})
                    .then(_=> res.status(204).json(usuario))
                    .catch(err => res.status(500).send(err))
            }else{
                app.db('users')
                .insert(usuario)
                .then(_=> res.json(usuario))
                .catch(err => res.status(500).send(err))
            }
    }

    const get =  (req, res) => {
         app.db('users')
            .select('id', 'name', 'email', 'admin', 'deletedAt')
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin', 'deletedAt')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles')
                .where({ userId: req.params.id })
            naoExisteOuErro(articles, 'Usuário possui artigos.')

            const rowsUpdated = await app.db('users')
                .update({deletedAt: new Date()})
                .where({ id: req.params.id })
            existeOuErro(rowsUpdated, 'Usuário não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}