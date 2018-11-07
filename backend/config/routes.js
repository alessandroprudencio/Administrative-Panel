const admin = require('../config/admin')


module.exports = app =>{

    app.post('/cadastrar', app.api.user.save)
    app.post('/auth',app.api.auth.signin)
    app.post('/validaToken',app.api.auth.validaToken) 

    app.route('/users')
        .all(app.config.passport.autenticacao())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.autenticacao())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))

    app.route('/categoria')
        .all(app.config.passport.autenticacao())
        .post(admin(app.api.categorias.save))
        .get(admin(app.api.categorias.get))

    app.route('/categoria/tree')
        .all(app.config.passport.autenticacao())
        .get(app.api.categorias.getTree)

    app.route('/categoria/:id')
        .all(app.config.passport.autenticacao())
        .get(app.api.categorias.getById)
        .put(admin(app.api.categorias.save))
        .delete(admin(app.api.categorias.remove))

    app.route('/artigo/')
        .all(app.config.passport.autenticacao())
        .get(admin(app.api.artigos.get))
        .post(admin(app.api.artigos.save))

    app.route('/artigo/:id')
        .all(app.config.passport.autenticacao())
        .get(app.api.artigos.getById)
        .put(admin(app.api.artigos.save))
        .delete(admin(app.api.artigos.remove))

    app.route('/categorias/:id/artigos') //pega o artigo da categoria tal
        .all(app.config.passport.autenticacao())
        .get(app.api.artigos.getByCategoria)

    app.route('/stats')
     .get(app.api.estatistica.get)
}