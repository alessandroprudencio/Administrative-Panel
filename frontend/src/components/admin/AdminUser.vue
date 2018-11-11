<template>
    <div class="admin-user">
        <b-table hover striped :items="users" :fields="fields"></b-table>
    </div>
</template>

<script>
import { ApiUrl }  from '@/global'
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
        }
    },
    mounted(){
        this.getUsuarios()
    }
}
</script>

<style>

</style>
