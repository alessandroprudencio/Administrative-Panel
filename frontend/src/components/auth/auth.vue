<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img v-if="!mostraLogin" src="@/assets/user.svg" width="140" height="140" alt="Login"/>
            <img v-else src="@/assets/new-user.svg" width="142" height="142" alt="Cadastar"/>

            <hr/>

            <div class="auth-title">{{mostraLogin ? "Cadastro":"Login"}} </div>
            
            <b-form-input type="text" v-if="mostraLogin" v-model="user.name" placeholder="Nome:"/>
            <b-form-input  type="email" name="email" v-model="user.email" placeholder="Email:"/>
            <b-form-input  type="password" name="password" v-model="user.password" placeholder="Senha:"/>
            <b-form-input  v-if="mostraLogin" type="password" v-model="user.confirmaSenha" placeholder="Confirme Senha:"/>
                
             <b-button  variant="primary" v-if="mostraLogin" @click="cadastrar">Cadastrar</b-button>
             <b-button  variant="primary" v-if="!mostraLogin" @click="entrar">Entrar</b-button>

             <a href @click.prevent="mostraLogin = !mostraLogin">
                 <span v-if="mostraLogin">Já tem cadastro? Faça login</span>
                 <span v-else>Não tem cadastro? Registre-se aqui</span>
             </a>

            
        </div>
    </div>
</template>

<script>
import {apiUrl, mostraErro, userKey } from '@/global'
import axios from 'axios'

export default {
    name:'auth',
    data:function(){
        return{
            mostraLogin : false,
            user:{}
        }
    },
    methods:{
        entrar(){
            axios.post(`${apiUrl}/auth`,this.user)
            .then(resp => {
                this.$store.commit('setUser', resp.data)
                localStorage.setItem(userKey, JSON.stringify(resp.data))
                this.$router.push({ path : '/' })
            })
            .catch(mostraErro)
        },
        cadastrar(){
            axios.post(`${apiUrl}/auth/cadastro`, this.user)
            .then(()=>{
                this.$toasted.global.defaultSuccess()
                this.user = {}
                this.mostraLogin = false
            }).catch(mostraErro)
        }
        
    }
}
</script>

<style>
    .auth-content{
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .auth-modal{
        background-color: #ffffff;
        width: 350px;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .auth-title{
        font-size: 1.2rem;
        font-weight: 100;
        margin-bottom: 15px;
    }
    .auth-modal input{
        border: 1px solid #bbb;
        width: 100%;
        margin-bottom:12px;
    }
    .auth-modal button{
        color: #fff;
        padding: 5px 15px;
        text-decoration: none;
    }
    .auth-modal a{
        text-decoration: none;
        color: #009ADB;
        padding-top: 12px;
    }
    .auth-modal hr{
        border:0;
        width:100%;
        height: 1px;
        background-image: linear-gradient(to right,  rgba(120,120,120,0), rgba(120,120,120,0.75),rgba(120,120,120,0))
    }
</style>
