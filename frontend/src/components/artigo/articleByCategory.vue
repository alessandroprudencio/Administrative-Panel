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
import {apiUrl} from '@/global'
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
            carregarMais:false
        }
    },
    methods:{
        getCategoria(){
            const url = `${apiUrl}/categoria/${this.categoria.id}`
            axios(url).then(res => this.categoria = res.data )
        },
        getArtigos(){
            const url =  `${apiUrl}/categoria/${this.categoria.id}/artigos?page=${this.page}`
            axios(url).then(res => {
                this.artigos = this.artigos.concat(res.data)
                this.page++
                if(res.data == 0 ){
 this.carregarMais = false
                }else{
 this.carregarMais = true
                }
            })
        }
    },
    watch:{
        //monitora a rota e chama a rota e zera o componente para exibir nova categoria
        $route(to){
            this.categoria.id = to.params.id
            this.artigos = []
            this.page=1
            this.carregarMais = true;
            this.getCategoria();
            this.getArtigos();
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
