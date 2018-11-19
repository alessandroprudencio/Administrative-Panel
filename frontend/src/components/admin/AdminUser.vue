<template>
    <div class="admin-user">
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id"/>  

            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" :readonly="modo==='remove'" type="text" v-model="user.name" required placeholder="Informe o nome de usuário..."/>
                    </b-form-group>
                </b-col>
                 <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" :readonly="modo==='remove'" type="text" v-model="user.email" required placeholder="Informe o e-mail de usuário..."/>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-form-checkbox id="user-admin" :disabled="modo==='remove'" v-model="user.admin" class="mt-2 mb-3">Administrador ?</b-form-checkbox>
             
             <b-row v-show="modo ==='save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Senha:" label-for="user-senha">
                        <b-form-input id="user-senha" type="password" v-model="user.password" required placeholder="Informe a senha do usuário..."/>
                    </b-form-group>
                </b-col>
                 <b-col md="6" sm="12">
                    <b-form-group label="Confirme Senha:" label-for="user-confirmPassword">
                        <b-form-input id="user-confirmPassword" type="password" v-model="user.confirmaSenha" required placeholder="Confirme a senha do usuário..."/>
                    </b-form-group>
                </b-col>
            </b-row>
            
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="modo==='save'" @click="save"> Salvar </b-button>
                    <b-button variant="danger" v-if="modo==='remove'" @click="remove"> Excluir </b-button>
                    <b-button class="ml-2" @click="cancelar" > Cancelar </b-button>
                </b-col>
            </b-row>

            </b-form>

            <hr>

            <b-table dark :items="users" :fields="fields">
                <template slot="actions" slot-scope="data">
                    <b-button variant="prymary" @click="carregaUser(data.item)" class="mr-2"><i class="fa fa-pencil"></i></b-button>   
                    <b-button variant="danger" @click="carregaUser(data.item, 'remove')"><i class="fa fa-trash"></i> </b-button>   
                </template>
            </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit"></b-pagination>

    </div>
</template>

<script>
import { apiUrl, mostraErro }  from '@/global'
import axios from 'axios'

export default {
    name:"AdminUser",
    data:function(){
        return{
            modo:'save',
            user:{},
            users:[],
            page:1,
            count:0,
            limit:0,
            fields:[
                //{   key: 'id', label:'Código', sortable:true},
                {   key: 'name', label:'Nome', sortable:true},
                {   key: 'email', label:'E-mail', sortable:true},
                {   key: 'admin', label:'Administrador', sortable:true, formatter: value => value  ? 'Sim':'Não'},
                {   key: 'actions', label:"Ações"}

            ]
        }
    },
    methods:{
        getUsuarios(){
            const url = `${apiUrl}/users?page=${this.page}`
            axios.get(url).then(resp => {
                this.users = resp.data.data 
                this.limit = resp.data.limit   
                this.count = resp.data.count 
               
            })
        },
        cancelar(){
            this.modo = 'save'
            this.user = {}
            this.getUsuarios()
        },
        save(){
            const metodo = this.user.id ? "put" : "post"
            const id = this.user.id ? `/${this.user.id}` : ''

            axios[metodo](`${apiUrl}/users${id}`, this.user)
                .then(()=>{
                    this.$toasted.global.defaultSuccess()
                    this.cancelar();
                }).catch(mostraErro)
        },
        remove(){
            const id = this.user.id
            axios.delete(`${apiUrl}/users/${id}`)
            .then(()=>{
                this.$toasted.global.defaultSuccess()
                this.cancelar()
            }).catch(mostraErro)
        },
        carregaUser(user, modo= 'save'){
            this.modo = modo
            this.user = {...user}
        }
    },
     watch:{
        page(){
            this.getUsuarios()
        }
    },
            
    mounted(){
        this.getUsuarios()
    }
}
</script>

<style>
    .admin-user{
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
