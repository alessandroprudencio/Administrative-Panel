<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Painel de Controle" sub="Estatiscas dos Dados"/>
            <div class="estatisca">
                <Estatisca title = "Categorias" :value="estatistica.categories" icon="fa fa-folder" color="#d54d50" />
                <Estatisca title = "Artigos" :value="estatistica.articles" icon="fa fa-file" color="#3bc480" />
                <Estatisca title = "Usuários" :value="estatistica.users" icon="fa fa-user" color="#3282cd" />
            
            </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Estatisca from '../home/Estatisca'

import axios from 'axios'
import { ApiUrl }  from '@/global'

export default {
    name:"Home",
    components:{PageTitle, Estatisca},
    data:function(){
        return{
            estatistica:{}
        }
    },
    methods:{
        getEstatistica(){
            axios.get(`${ApiUrl}/stats`).then(res => this.estatistica = res.data)
        }
    },
    mounted(){
        this.getEstatistica()
    }
}
</script>

<style>
    .estatisca{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>
