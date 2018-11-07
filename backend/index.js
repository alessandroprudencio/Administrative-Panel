const app = require('express')()
const  consign  =require('consign') 
const db  = require('./config/db')
const mongoose =  require('mongoose')

require('./config/mongodb')

app.mongoose = mongoose
app.db = db

consign()
.include('./config/passport.js')
.then('./config/middlewares.js')
.then('./api/validacoes.js')
.then('./api')
.then('./schedule/statsSchedule.js')
.then('./config/routes.js')
.into(app)

app.listen(3000, ()=>{
    console.log('Backend executando')
})