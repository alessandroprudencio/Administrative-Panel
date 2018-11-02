const { chaveSecreta } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app =>{
    const signin = async  (req,res)=>{
        if(!req.body.email || !req.body.password){
            return res.status(400).send('Informe usuario e senha')
        }
        const user = await app.db(' ') //get no usuario do banco
            .where({email: req.body.email})
            .first()

        if(!user) return status(400).send('Usuário não encontrado')

        const SenhaSaoIguais = bcrypt.compareSync(req.body.password, user.password)
        if(!SenhaSaoIguais) res.status(401).send('Email ou senha inválidos')

        const DataAtual = Math.floor(Date.now()/1000) //pega o valor em segundos

        const dadosToken = {
            iat : DataAtual,
            exp : DataAtual + (60 * 60)
        }
        res.json({
            ...dadosToken, 
            token : jwt.encode(dadosToken, chaveSecreta) 
        })
    }

        const validaToken = async(req,res) =>{
            const userData =  req.body || null
               try {
                   if(userData){
                       const token = jwt.decode(userData.token, chaveSecreta)
                       if(new Date(token.exp * 1000) > new Date()){
                            return res.send(true) //token            valido
                       }

                   }
               } catch (error) {
                ///
               }
               res.send(false) //token invalido
        }
        return {signin, validaToken}
}