<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastro & Cia"/>

        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs pills card>
                    <b-tab title="Artigos">
                        <AdminArticle/>
                    </b-tab>
                    <b-tab title="Categorias">
                        <AdminCategory/>
                    </b-tab>
                    <b-tab title="Usuários" active>
                        <AdminUser/>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'

import AdminArticle from './AdminArticle'
import AdminCategory from './AdminCategory'
import AdminUser from './AdminUser'

export default {
    name:"AdminPages",
    components:{PageTitle, AdminArticle, AdminCategory, AdminUser}
}
</script>

<style>

</style>
