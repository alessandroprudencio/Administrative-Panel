<template>
    <div class="article-item">
        <router-link :to="{name:'ArticleById', params:{id:artigo.id}}">

            <div class="article-item-image d-none d-sm-block">
                <img v-if="artigo.imageUrl" :src="artigo.imageUrl" height="150" width="145" alt="Artigo">
                <img v-else src="@/assets/article.png" height="150" width="150" alt="Artigo">
            </div>

            <div class="article-item-info">
                <h2>{{artigo.name}}</h2>
                <p>{{artigo.description}}</p>
                <span class="article-item-author">
                    <strong>Autor: {{artigo.autor}}</strong>
                </span>
            </div>

        </router-link>
    </div>
</template>

<script>
export default {
    name:"articleItem",
    props:['artigo']
}
</script>

<style>
    .article-item{
        border-radius:8px;
        border-bottom:20px;
        background-color: #fff;
        padding:20px;
        border:1px solid rgb(0, 0, 0,0.2);
        box-shadow: 0 1px 5px rgba(0,0,0, 0.15);
        margin-top: 20px;
    }
     .article-item a{
         display:flex;
         text-decoration: none;
         align-items: flex-start;
         color: #000;
     }
     .article-item-info h2{
         font-size: 1.7rem;
     }
     .article-item-image{
         margin-right: 20px;
         padding-right: 20px;
         border-right:1px solid #aaa;
     }
     .article-item-image img{
         border-radius:5px;
     }
      .article-item-info{
          display: flex;
          align-self: stretch;
          flex-direction: column;
      }
      .article-item-info p{
        flex:1;
        color:#555;
        font-size: 1.1rem;
      }
</style>
