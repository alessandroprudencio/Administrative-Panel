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
                    .whereNull('selectedAt')
                    .then(_=> res.status(204).json(usuario))
                    .catch(err => res.status(500).send(err))
            }else{
                app.db('users')
                .insert(usuario)
                .then(_=> res.json(usuario))
                .catch(err => res.status(500).send(err))
            }
    }

    const get = (req, res) => {
        app.db('users')
        .select('id','name','email', 'admin')
        .whereNull('selectedAt')
        .then(usuario => res.json(usuario))
        .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
        .select('id','name','email', 'admin')
        .where({id:req.params.id})
        .whereNull('selectedAt')
        .first()
        .then(usuario => res.json(usuario))
        .catch(err => res.status(500).send(err))
    }

    //função que atualiza a coluna deleted_ad 
    const remove = async (req,res) =>{
            try {
                const artigos = await app.db('articles')
                .where({id:req.params.id})
                naoExisteOuErro(artigos, "Usuario tem um artigo publicado")

                const atualizaDelete_ad= await app.db('users')
                .update({deletedAt: new Date()})
                .where({id:req.params.id})
                existeOuErro(atualizaDelete_ad, "Usúario não encontrado")

                res.status(201).send()

            } catch (error) {
                res.status(400).send(error)
            }
    }

    return { save, get, getById, remove }
}