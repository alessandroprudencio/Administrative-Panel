module.exports = app =>{
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)
    
    app.route('/categoria')
        .post(app.api.categorias.save)
        .get(app.api.categorias.get)

    app.route('/categoria/tree')
        .get(app.api.categorias.getTree)

    app.route('/categoria/:id')
        .get(app.api.categorias.getById)
        .put(app.api.categorias.save)
        .delete(app.api.categorias.remove)

    app.route('/artigo/')
        .get(app.api.artigos.get)
        .post(app.api.artigos.save)

    app.route('/artigo/:id')
        .get(app.api.artigos.getById)
        .put(app.api.artigos.save)
        .delete(app.api.artigos.remove)

    app.route('/categorias/:id/artigos') //pega o artigo da categoria tal
        .get(app.api.artigos.getByCategoria)
}