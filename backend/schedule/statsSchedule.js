const schedule = require('node-schedule')

module.exports = app =>{
    schedule.scheduleJob('*/1 * * * *',async function () {
            const totalUsuarios = await app.db('users').count('id').first()
            const totalCategorias = await app.db('categories').count('id').first()
            const totalArtigos = await app.db('articles').count('id').first()


            const { Stat } =  app.api.estatistica //pega o modelo 

            const ultimaEstatistica = await Stat.findOne({},{},
                {sort: {'createdAt': -1 }})//pega a ultima

                const stat = new Stat({ //nova estatistica
                    users:totalUsuarios.count,
                    categories :totalCategorias.count,
                    articles :totalArtigos.count,
                    createdAt:new Date()
         })

         
         const mudouUsuario = !ultimaEstatistica || stat.users !==ultimaEstatistica.users
         const mudouCaterogoria = !ultimaEstatistica || stat.categories !==ultimaEstatistica.categories
         const mudouArtigo = !ultimaEstatistica || stat.articles !==ultimaEstatistica.articles

         if(mudouUsuario || mudouCaterogoria || mudouArtigo){
             stat.save().then(()=>console.log(`Estatistica atualizada`))
         }

    })
}