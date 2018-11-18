<template>
    <div class="article-by-id">
        <PageTitle icon="fa fa-file-o" :main="artigo.name" :sub="artigo.description"/>
        <div class="article-content" v-html="artigo.content">
        </div>
    </div>
</template>

<script>
import {apiUrl} from  "@/global"
import axios from 'axios'
import PageTitle from '../template/PageTitle' 

export default {
    name:'articleById',
    components:{PageTitle},
    data:function(){
        return{
            artigo:{}
        }
    },
    mounted(){
        const url = `${apiUrl}/artigo/${this.$route.params.id}`
        axios.get(url).then(resp => {
            this.artigo = resp.data
        })
    }
}
</script>

<style>
    .article-content{
        background-color: #fff;
        border-radius: 8px;
        padding:25px;
    }
    .article-content pre{
        padding:20px;
        border-radius:8px;
        font-size: 1.2rem;
    }
    .article-content img{
        max-width: 100%;
    }
    .article-content :last-child{
        margin-bottom: 0px;
    }
    .ql-syntax{
        color: #fff;
        background-color: #23241F;
    }
</style>
