# Administrative-Panel

Languages and frameworks used:

  -> BACKEND 
    ->NODE JS - FRAMEWORKS => EXPRESS.JS 
    ->MIDDLEWARE => PASSPORT JS     
    
  -> FRONTEND 
    ->VUE JS 
    ->BOOTSTRAP V4
    
  -> DATABASE
    -> MONGO DB - BIBLIOTECA NODEJS => MONGOOSE 
    
    -> POSTGRE SQL - BIBLIOTECA NODEJS => KNEX 
###############################################################################################################################
PARA TER ACESSO AO SISTEMA SIGA OS PASSOS ABAIXO....

INCLUIR NO ARQUIVO .ENV
module.exports=>{
	authSecret: 'adminpanel',
	db:{
	host:'127.0.0.1',
	port:5432,
	database:'knowldge',
	user:'postgres',
	password:'123	
	}
}

#PASSO A PASSO
1º INSTALAR NODEJS GIT POSTGRESSQL E/OU PGADMIN
3º CRIAR USUARIO E BANCO NO POSTGRESSQL
4º INSTALAR GLOBALMENTE O KNEX COM O COMANDO NPM INSTALL -G KNEX 
4º CRIAR NO BACKEND ARQUIVO .ENV E COLOCAR O CÓDIGO ACIMA...
5º RODAR NO BACKEND COMANDO KNEX MIGRATE:LATEST
