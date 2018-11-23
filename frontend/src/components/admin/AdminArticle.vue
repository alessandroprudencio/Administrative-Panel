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
                        <vue-upload-multiple-image
                        @upload-success="uploadImageSuccess"
                        @before-remove="beforeRemove"
                        v-model="artigo.imageUrl"
                        :readonly="modo==='remove'" 
                        id="article-imagem" class="mb-3" 
                        dragText="Arraste a imagen"
                        browseText="(ou) Selecione"
                        :primaryText="nomeImg"
                        :multiple="false"
                        popupText="Formatos aceitos > /gif/jpeg/png/bmp/jpg"
                        accept="image/gif,image/jpeg,image/png,image/bmp,image/jpg"
                        ></vue-upload-multiple-image>  
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
import {apiUrl, mostraErro} from '@/global'

import VueUploadMultipleImage from 'vue-upload-multiple-image'


export default {
    name:"AdminArticle",
    components:{VueEditor,VueUploadMultipleImage},
    data:function(){
        return{
            nomeImg:'',
            modo:'save',
            artigo:{},
            data:"",
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
            uploadImageSuccess(formData, index, fileList) {    
                this.nomeImg = fileList[0].name
                this.data = fileList[0].path  
                //console.log(fileList[0].path)
            },
            beforeRemove (index, done, fileList) {
                return done()
            },
            //  editImage (index, fileList, formData) {
            //     console.log('EDITAR', 'form data:' , formData,'index:', index,'filelist',  fileList)
            //     this.nomeImg= formData[0].name

            //      console.log(formData[0].name)
                
            //     this.nomeImg= formData[0].name

            // },
    

        getArtigos(){
            const url = `${apiUrl}/artigo?page=${this.page}`
            axios.get(url).then(resp => {
                this.artigos = resp.data.data 
                this.limit = resp.data.limit 
                this.count = resp.data.count
            }) 
        },
         getCategorias(){
            const url = `${apiUrl}/categoria`
            axios.get(url).then( resp => {
               this.categorias = resp.data.map(categoria => {
                    return {... categoria, value:categoria.id, text:categoria.path}
                })
            })
        },
        getUsuarios(){
            const url = `${apiUrl}/users`
            axios.get(url).then( resp => {
               this.usuarios = resp.data.map(usuario => {
                    return {value:usuario.id, text:`${usuario.name} - ${usuario.email}`}
                })
            })
        },
         cancelar(){
            this.modo = 'save'
            this.$router.push({name:'Auth'})
        },
        save(){
            const metodo = this.artigo.id ? "put" : "post"
            const id = this.artigo.id ? `${this.artigo.id}` : ''
            this.artigo.imageUrl =  this.data

            axios[metodo](`${apiUrl}/artigo/${id}`, this.artigo)
                .then(()=>{
                    this.$toasted.global.defaultSuccess()
                    this.cancelar();
                }).catch(mostraErro)
        },
         carregaArtigo(artigo, modo= 'save'){
            this.modo = modo
            //this.artigo = {...artigo}
             axios.get(`${apiUrl}/artigo/${artigo.id}`)
                   .then(res => this.artigo = res.data)    
        },
         remove(){
            const id = this.artigo.id
            axios.delete(`${apiUrl}/artigo/${id}`)
            .then(()=>{
                this.$toasted.global.defaultSuccess()
                this.cancelar()
            }).catch(mostraErro)
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
    .image-icon-edit{
        display: none;
    }
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
    .table{
        padding-bottom: 10px;
    }
</style>
