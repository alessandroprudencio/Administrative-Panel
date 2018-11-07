const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/estatistica', {useNewUrlParser: true})
.then(msg => {
    msg = "Conectado com sucesso ao banco!"
    console.log(msg)
})
.catch(error => {
    const msg = "Não foi possivel conectar ao banco!"
    console.log('\x1b[33m%s\x1b[0m', msg); 
})