<template>
    <div class="admin-category">
        <b-form>
            <input id="category-id" type="hidden" v-model="categoria.id"/>
    
                    <b-form-group label="Nome:"  label-for="category-name">
                        <b-form-input id="category-name" :disabled="modo==='remove'" type="text" v-model="categoria.name" required placeholder="Insira o nome da Categoria..."/>
                    </b-form-group>
    
            
                    <b-form-group label="Categoria Pai" label-for="category-dad">
                        <b-form-select  :disabled="modo==='remove'" id="category-dad" class="mb-3" :options="categorias" v-model="categoria.parentId"/>
                    </b-form-group>
         

                    <b-button variant="primary" v-if="modo==='save'" @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="modo==='remove'" @click="remove">Excluir</b-button>
                    <b-button  class="ml-2" @click="cancelar">Cancelar </b-button>
        
        </b-form>

        <hr>

        <b-table dark :items="categorias" :fields="fields">
            <template slot="actions" slot-scope="data">
                 <b-button variant="prymary" @click="carregaCategoria(data.item)" class="mr-2"><i class="fa fa-pencil"></i></b-button>   
                 <b-button variant="danger" @click="carregaCategoria(data.item, 'remove')" class="mr-2"><i class="fa fa-trash"></i></b-button>               
            </template>
        </b-table>
    </div>
</template>

<script>
import axios from 'axios'
import {apiUrl, mostraErro} from '@/global'

export default {
    name:"AdminCategory",
    data:function(){
        return{
            modo:'save',
            categoria:{},
            categorias:[],
            fields:[
                //{key:'id', label:"Código", sortable:"true"},
                {key:'name', label:"Nome", sortable:"true"},
                {key:'path',label:"Caminho", sortable:"true"},    
                {key:'actions', label:"Ações"}
            ]
        }
    },
    methods:{
        getCategorias(){
            const url = `${apiUrl}/categoria`
            axios.get(url).then(resp => {
                //this.categorias =resp.data
                this.categorias = resp.data.map(categoria => {
                    return {... categoria, value:categoria.id, text:categoria.path}
                })
            })
        },
         cancelar(){
            this.modo = 'save'
            this.categoria = {}
            this.getCategorias()
        },
        remove(){
            const id = this.categoria.id
            axios.delete(`${apiUrl}/categoria/${id}`)
            .then(()=>{
                this.$toasted.global.defaultSuccess()
                this.cancelar()
            }).catch(mostraErro)
        },
        save(){
            const metodo = this.categoria.id ? "put" : "post"
            const id = this.categoria.id ? `${this.categoria.id}` : ''

            axios[metodo](`${apiUrl}/categoria/${id}`, this.categoria)
                .then(()=>{
                    this.$toasted.global.defaultSuccess()
                    this.cancelar();
                }).catch(mostraErro)
        },
        carregaCategoria(categoria, modo= 'save'){
            this.modo = modo
            this.categoria = {...categoria}
        }
    },
    mounted(){
        this.getCategorias()
    }
}
</script>

<style>
 .admin-category{
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
