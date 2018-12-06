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
    
INCLUIR ARQUIVO .ENV
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
