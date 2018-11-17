<template>
    <div class="article-by-category">
        <PageTitle icon="fa fa-folder-o" :main="categoria.name" sub="Categoria"/>
        <ul>
            <li v-for="artigo in artigos" :key="artigo.id">
                <ArticleItem :artigo="artigo"></ArticleItem>
            </li>
        </ul>
        <div class="load-more">
            <button v-if="carregarMais" class="btn btn-lg btn-outline-primary" @click="getArtigos">Carregar Mais</button>
        </div>
    </div>
</template>

<script>
import {ApiUrl} from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import ArticleItem from './articleItem'

export default {
    name: 'articleByCategory',
    components:{PageTitle, ArticleItem},
    data: function(){
        return{
            categoria:{},
            artigos:[],
            page:1,
            carregarMais:true
        }
    },
    methods:{
        getCategoria(){
            const url = `${ApiUrl}/categoria/${this.categoria.id}`
            axios(url).then(res => this.categoria = res.data )
        },
        getArtigos(){
            const url =  `${ApiUrl}/categoria/${this.categoria.id}/artigos?page=${this.page}`
            axios(url).then(res => {
                this.artigos = this.artigos.concat(res.data)
                this.page++

                if(res.data.lenght === 0 ) this.carregarMais = false
            })
        }
    },
    mounted(){
        this.categoria.id = (this.$route.params.id)
        this.getCategoria()
        this.getArtigos()
    }
}
</script>

<style>
    .article-by-category ul{
        list-style: none;
        padding: 0;
    }
     .article-by-category .load-more{
        display: flex;  
        flex-direction: column;
        align-items: center;
        margin-top:25px;
    }
</style>
