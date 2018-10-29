module.exports = app => {
    const { existeOuErro, naoExisteOuErro } = app.api.validacoes

    const save = (req, res) => {
        const categoria = {...req.body}
        
        if(req.params.id) categoria.id = req.params.id

        try {
            existeOuErro(categoria.name, 'Nome não informado')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(categoria.id) {
            app.db('categories')
                .update(categoria)
                .where({ id: categoria.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('categories')
                .insert(categoria)
                .then(_ => res.json(categoria))
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            existeOuErro(req.params.id, 'Código da Categoria não informado.')

            const subCategoria = await app.db('categories')
                .where({ parentId: req.params.id })
            naoExisteOuErro(subCategoria, 'Categoria possui subcategorias.')

            const artigos = await app.db('articles')
                .where({ categoriaId: req.params.id })
            naoExisteOuErro(artigos, 'Categoria possui artigos.')

            const rowsDeleted = await app.db('categories')
                .where({ id: req.params.id }).del()
            existeOuErro(rowsDeleted, 'Categoria não foi encontrada.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const comCaminho = categorias => {
        const getCategoriaPai = (categorias, parentId) => {
            const parent = categorias.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }

        const categoriesWithPath = categorias.map(categoria => {
            let path = categoria.name
            let parent = getCategoriaPai(categorias, categoria.parentId)

            while(parent) {
                path = `${parent.name} > ${path}`
                parent = getCategoriaPai(categorias, parent.parentId)
            }

            return { ...categoria, path }
        })

        categoriesWithPath.sort((a, b) => {
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1
            return 0
        })

        return categoriesWithPath
    }

    const get = (req, res) => {
        app.db('categories')
            .then(categorias => res.json(comCaminho(categorias)))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('categories')
            .where({ id: req.params.id })
            .first()
            .then(categoria => res.json(categoria))
            .catch(err => res.status(500).send(err))
    }

    const toTree = (categorias, tree) =>{ // tranforma array em estrutura de arvore
        if(!tree) tree = categorias.filter(c =>  !c.parentId)
        tree = tree.map(parentNode =>{
            const isChild = node => node.parentId == parentNode.id
            parentNode.children = toTree(categorias, categorias.filter(isChild))
            return parentNode 
        })
        return tree
    }

    const getTree = (req,res) =>{
        app.db('categories')
            .then(categorias => res.json(toTree(comCaminho(categorias))))//gera todas as categorias com caminho o resultado vai ser recebido pela funcao toTree que converte em arvore
            .catch(error => res.status(500).send(error))
        }


    return { save, remove, get, getById, getTree}
}