<template>
    <div class="admin-user">
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id"/>
            
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text" v-model="user.name" required placeholder="Informe o nome de usuário..."/>
                    </b-form-group>
                </b-col>
                 <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text" v-model="user.email" required placeholder="Informe o e-mail de usuário..."/>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-form-checkbox id="user-admin" v-model="user.admin" class="mt-2 mb-3">Administrador ?</b-form-checkbox>
             <b-row>
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
            
            <b-button variant="primary" v-if="modo==='save'" @click="save"> Salvar </b-button>
            <b-button variant="danger" v-if="modo==='remove'" @click="remove"> Excluir </b-button>
            <b-button class="ml-2" @click="cancelar"> Cancelar </b-button>

            </b-form>
            <hr>
        <b-table hover striped :items="users" :fields="fields"></b-table>
    </div>
</template>

<script>
import { ApiUrl, mostraErros }  from '@/global'
import axios from 'axios'

export default {
    name:"AdminUser",
    data:function(){
        return{
            modo:'save',
            user:{},
            users:[],
            fields:[
                {   key: 'id', label:'Código', sortable:true},
                {   key: 'name', label:'Nome', sortable:true},
                {   key: 'email', label:'E-mail', sortable:true},
                {   key: 'admin', label:'Administrador', sortable:true,     formatter: value => value  ? 'Sim':'Não'},
                {   key: 'action', label:"Ações"}

            ]
        }
    },
    methods:{
        getUsuarios(){
            const url = `${ApiUrl}/users`
            axios.get(url).then(resp => {
                this.users = resp.data
            })
        },
        cancelar(){
            this.mode = 'save'
            this.user = {}
            this.getUsuarios()

        },
        save(){
            const metodo = this.user.id ? "put" : "post"
            const id = this.user.id ? `/${this.user.id}` : ''

            axios[metodo](`${ApiUrl}/users${id}`, this.user)
                .then(()=>{
                    this.$toasted.global.defaultSuccess()
                    this.cancelar();
                }).catch(mostraErros)
        },
        remove(){
            const id = this.user.id
            axios.delete(`${ApiUrl}/users/${id}`)
            .then(()=>{
                this.$toasted.global.defaultSuccess()
            }).catch(mostraErros)
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
</style>
