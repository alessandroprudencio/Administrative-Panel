
exports.up = function(knex, Promise) {
   return knex.schema.alterTable('users', function (table){
        table.timestamp('deletedAt')
   })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('users', function(table){
        table.dropColum('deletedAt')
    })
};
