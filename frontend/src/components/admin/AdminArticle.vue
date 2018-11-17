<template>
    <div class="admin-article">
        <b-form>
            <input id="article-id" type="hidden" v-model="artigo.id"/>
    
                    <b-form-group label="Nome:"  label-for="article-name">
                        <b-form-input id="article-name" :disabled="modo==='remove'" type="text" v-model="artigo.name" required placeholder="Insira o nome do Artigo..."/>
                    </b-form-group>

                    <b-form-group  label="Descrição:" label-for="article-description">
                        <b-form-input  :readonly="modo==='remove'" id="article-description" class="mb-3" v-model="artigo.description" placeholder="Insira uma descrição do Artigo"/>
                    </b-form-group>

                    <b-form-group  v-if="modo==='save'" label="Imagem (URL)" label-for="article-imagem">
                        <b-form-input  :readonly="modo==='remove'" id="article-imagem" class="mb-3" v-model="artigo.imageUrl" placeholder="Informe a URL da Imagem"/>
                    </b-form-group>

                    <b-form-group  v-if="modo==='save'" label="Categoria:" label-for="article-category">
                        <b-form-select :readonly="modo==='remove'" id="article-category" class="mb-3" :options="categorias" v-model="artigo.categoryId"/>
                    </b-form-group>

                    <b-form-group  v-if="modo==='save'" label="Autor:" label-for="usuario-id">
                        <b-form-select :readonly="modo==='remove'" id="usuario-id" class="mb-3" :options="usuarios" v-model="artigo.userId"/>
                    </b-form-group>

                     <b-form-group  v-if="modo==='save'" label="Conteúdo:" label-for="category-content">
                         <vue-editor v-model="artigo.content" placeholder="Informe o conteúdo do artigo"></vue-editor>
                    </b-form-group>

                    <b-button variant="primary" v-if="modo==='save'" @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="modo==='remove'" @click="remove">Excluir</b-button>
                    <b-button  class="ml-2" @click="cancelar">Cancelar </b-button>
        
        </b-form>

        <hr>

        <b-table dark :items="artigos" :fields="fields" >
            <template slot="actions" slot-scope="data">
                 <b-button variant="prymary" @click="carregaArtigo(data.item)" class="mr-2"><i class="fa fa-pencil"></i></b-button>   
                 <b-button variant="danger" @click="carregaArtigo(data.item, 'remove')"><i class="fa fa-trash"></i></b-button>               
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit"></b-pagination>
    </div>
</template>

<script>
import {VueEditor} from 'vue2-editor'
import axios from 'axios'
import {ApiUrl, mostraErros} from '@/global'

export default {
    name:"ArticleAdmin",
    components:{VueEditor},
    data:function(){
        return{
            modo:'save',
            artigo:{},
            artigos:[],
            categorias:[],
            usuarios:[],
            page:1,
            limit:0,
            count:0,
            fields:[
                //{key:'id', label:"Código", sortable:"true"},
                {key:'name', label:"Titulo", sortable:"true"},
                {key:'description',label:"Descrição",class:"tamanhoDescricao", sortable:"true"},
                {key:'autor',label:"Autor", sortable:"true"},
                {key:'actions', label:"Ações"}
            ]
        }
    },
    methods:{
        getArtigos(){
            const url = `${ApiUrl}/artigo?page=${this.page}`
            axios.get(url).then(resp => {
                this.artigos = resp.data.data 
                this.limit = resp.data.limit 
                this.count = resp.data.count
            }) 
        },
         getCategorias(){
            const url = `${ApiUrl}/categoria`
            axios.get(url).then( resp => {
               this.categorias = resp.data.map(categoria => {
                    return {... categoria, value:categoria.id, text:categoria.path}
                })
            })
        },
        getUsuarios(){
            const url = `${ApiUrl}/users`
            axios.get(url).then( resp => {
               this.usuarios = resp.data.map(usuario => {
                    return {value:usuario.id, text:`${usuario.name} - ${usuario.email}`}
                })
            })
        },
         cancelar(){
            this.modo = 'save'
            this.artigo = {}
            this.getArtigos()
        },
       
        save(){
            const metodo = this.artigo.id ? "put" : "post"
            const id = this.artigo.id ? `${this.artigo.id}` : ''

            axios[metodo](`${ApiUrl}/artigo/${id}`, this.artigo)
                .then(()=>{
                    this.$toasted.global.defaultSuccess()
                    this.cancelar();
                }).catch(mostraErros)
        },
         carregaArtigo(artigo, modo= 'save'){
            this.modo = modo
            //this.artigo = {...artigo}
             axios.get(`${ApiUrl}/artigo/${artigo.id}`)
                   .then(res => this.artigo = res.data)                  
        },
         remove(){
            const id = this.artigo.id
            axios.delete(`${ApiUrl}/artigo/${id}`)
            .then(()=>{
                this.$toasted.global.defaultSuccess()
                this.cancelar()
            }).catch(mostraErros)
        }
    },
    watch:{
        page(){
            this.getArtigos()
        }
    },
    mounted(){
        this.getArtigos()
        this.getUsuarios()
        this.getCategorias()
    }
}
</script>

<style>
    .tamanhoDescricao{
        width: 48%;
    }
    .admin-article{
        font-size: 0.9rem;
    }
    #__BVID__24{
        margin:0px;
    }
    #tbody .table th, .table td {
        vertical-align:0;
        padding: 1px;
        padding-left:1% ;
    }
</style>
