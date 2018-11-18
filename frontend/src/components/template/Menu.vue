<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="Digite para buscar..." v-model="treeFilter" class="filter-field"/>
        </div>
        <Tree :data="treeDados" :options="treeOpcoes" ref="tree" :filter="treeFilter"/>
    </aside>
</template>

<script>
import { mapState } from 'vuex' //mapea o atributo computed da store
import Tree from 'liquor-tree'
import {apiUrl} from '@/global'
import axios from 'axios'

export default {
    name : "Menu",
    components:{Tree},
    computed: mapState(['isMenuVisible']),
    data:function(){
        return{
            treeFilter:'',
            treeDados: this.getDadosArvore(),
            treeOpcoes:{
                //muda o nome que sera exibido na arvore
                propertyNames:{
                    'text':'name'
                },
                filter:{
                    emptyText:"Categoria não encontrada"
                }
            }
        }
    },
    methods:{
        getDadosArvore(){
            const url = `${apiUrl}/categoria/tree`
            return axios(url).then(res => res.data)
        },
        onNodeSelect(node){
            //pega o id do node e seta na rota 
            this.$router.push({
                name:'ArticleByCategory',
                params:{id:node.id}
            })
        }
    },
    mounted(){
        this.$refs.tree.$on('node:selected',this.onNodeSelect)
    }
}
</script>

<style>
    .menu{
        grid-area: menu;
        background-image: linear-gradient(to right, #59a5f7, #007BFF);
        box-shadow: 0px 8px 16px rgba(0, 0, 0.2);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .menu a ,
    .menu a:hover{
        color: #fff;
        text-decoration: none;
        font-size: 1rem;

    }
    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2)
    }
    .tree-arrow.has-child{
        filter:brightness(0)
    }
    .menu .menu-filter{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px;
        padding-bottom: 8px;
        border-bottom:1px solid #AAA;
    
    }
    .menu .menu-filter i {
        margin-right: 10px;
    }
    .menu input{
        color: #fff;
        font-size: 1rem;
        border:none;
        outline: 0;
        width: 100%;
        background: transparent;
    }
    .tree-filter-empty{
        font-size: 1rem;
        color: white;
        margin-left:20px;
    }
    ::-webkit-input-placeholder {
   color: white;
}

</style>
