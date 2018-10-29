module.exports = {
    categoriaComFilho: `
    WITH RECURSIVE subCategoria (id) as (
        select id FROM categories WHERE id = ?
        UNION ALL
        SELECT c.id FROM subCategoria, categories c 
        WHERE "parentId" = subCategoria.id
    )
    SELECT id FROM subCategoria
    `
}

//consulta que traz todos os id das categorias pais e filhas  