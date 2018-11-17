const queries = require('./queries')

module.exports = app =>{
    const {existeOuErro} = app.api.validacoes

    const save =(req,res) =>{
        const artigo = {...req.body}

        if(req.params.id) artigo.id = req.params.id

        try{
            existeOuErro(artigo.name, 'Nome não informado')
            existeOuErro(artigo.description, "Descrição não informada")
            existeOuErro(artigo.categoryId, "Categoria não informada")
            existeOuErro(artigo.userId, "Autor não informado")
            existeOuErro(artigo.content, "Conteudo não inormado")
        }catch(msg){
            res.status(400).send(msg)
        }

        if(artigo.id){
            app.db('articles')
            .update(artigo)
            .where({  id: artigo.id})
            .then(_=> res.status(204).json(artigo))
            .catch(erro =>  res.status(500).send(erro))
        }else{
            app.db('articles')
            .insert(artigo)
            .then(_ => res.json(artigo))
            .catch(erro => res.status(500).send(erro))
        }
        
    }

    const remove = async (req,res)=>{
        try{
            const linhasExcluidas = await app.db('articles')
                .where({id: req.params.id})
                .del()
                try {
                    existeOuErro(linhasExcluidas, "Artigo não foi encontrado")//linhas não excluir
                } catch(msg) {
                    return res.status(400).send(msg)    
                }
            res.status(204).json(linhasExcluidas)
        }catch(msg){
            res.status(500).send(msg)
        }
    }

    const limit = 3 // usada para paginação
    const get = async (req,res)=>{
        const page = req.query.page || 1

        const result = await app.db('articles').count('id').first()
        const count = parseInt(result.count)

        app.db({a:'articles',u:'users'})
            .select('a.id','a.name', 'a.description', {autor:'u.name'})
            .limit(limit)
            .offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId']) //ENCONTRA QUEM POSTO SE NÃO COLOCAR FICA LOOP
            .then(artigos => res.json({data:artigos, count, limit}))
            .catch(erro => res.status(500).send(erro))
    }
    const getById = (req,res)=>{
        app.db('articles')
        .where({id: req.params.id})
        .first()
        .then(artigo =>{
            artigo.content = artigo.content.toString() //artigo vem em formato binario
            return res.json(artigo)
        })
        .catch(erro => res.status(500).send(erro))
    }

    const getByCategoria = async (req,res)=>{
        const categoriaId =  req.params.id
        const page = req.query.page  || 1 
        const categorias = await app.db.raw(queries.categoriaComFilho, categoriaId) //retorna todas as categoria com respectivos ids
        const ids = categorias.rows.map(c => c.id)//obtendo array de ids  das categorias pais mais categoria filho

            //consulta que obtem artigos
        await app.db({a:'articles',u:'users'})
            .select('a.id','a.name', 'a.description', 'a.imageUrl', {autor:'u.name'})
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])//iguala as duas tabelas, para encontrar quem o autor do artigo
            .whereIn('categoryId',ids)
            .orderBy('a.id','desc')//do maior id para o menor, ou seja do mais novo para o mais antigo
            .then(artigo => res.json(artigo))
            .catch(erro => res.status(500).send(erro))
    }


    return {save, remove, get, getById, getByCategoria}
}