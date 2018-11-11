<template>
    <header class="header">

        <a class="toggle" @click="escondeMenu" v-if="!escondeToogle">
            <i class="fa fa-lg" :class="icon"></i>    
        </a>

        <h1 class="title"><router-link to="/"> {{title}}</router-link></h1>

        <UserDropDown v-if="!escondeDropDown"/>

    </header>
</template>

<script>
import UserDropDown from './UserDropDown'
export default {
    name:"Header",
    components:{UserDropDown},

    props:{
        title:String,
        escondeToogle: Boolean,
        escondeDropDown:Boolean
    },
    computed:{
        icon(){
            return this.$store.state.isMenuVisible ? 'fa-angle-left' : 'fa-angle-down ' //se for verdadeito retorna 'fa-angle-left'
        }
    },
    methods:{
        escondeMenu(){
            this.$store.commit('toogleMenu')
        }
    }
}
</script>

<style>
    .header{
        grid-area: header;
        margin-left:0.10%; 
        display: flex;
        justify-content: center;
        align-items:center;
        border-bottom: 1px solid #ccc;
    }

    .title{
        font-size: 1.1rem;
        color: black;
        font-weight: 100;
        flex-grow: 1;
        text-align: center; 
        margin-top:0.5%;
    }
    .title a{
        color:#000;
        text-decoration: none;
    } 
    .title a:hover{
        color:#000;
        text-decoration: none;
    }
    header.header > a.toggle {
        cursor: pointer;
        width: 60px;
        height: 100%;
        color: #000;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    header.header > a.toggle:hover {
        background-color: #e0dede;
    }
    .fa-lg{
            font-size: 1.1rem;
            margin-right: 5%;
    }

</style>
