const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const {existeOuErro, naoExisteOuErro, igualOuErro} = app.api.validacoes

    const encryptSenha = senha =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha, salt)
    } 

    const save = async (req, res)=>{
            const usuario = { ...req.body }
            if(req.params.id) usuario.id =req.params.id

            try {
                existeOuErro(usuario.nome, "Nome não informado")
                existeOuErro(usuario.email, "E-mail não informado")
                existeOuErro(usuario.senha, "Senha não informada")
                existeOuErro(usuario.confirmaSenha, "Senha não confirmada")
                igualOuErro(usuario.senha, usuario.confirmaSenha,"Senhas não conferem")
                
                const usuarioFromDB = await app.db('users')
                .where({ email : usuario.email }).first()
                    if(!usuario.id){
                        naoExisteOuErro(usuarioFromDB, "Usuario já cadastrado")                
                    }
            } catch (msg) {
                return res.status(400).send(msg)
            }
            usuario.senha = encryptSenha(usuario.senha) 
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
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
            }
    }

    const get = (req, res) => {
        app.db ('users')
        .select('id','nome','email', 'admin')
        .then(users => res.json(users))
        .catch(err => res.status(500).send(err))
    }

    return { save, get }
}