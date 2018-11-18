<template>
    <div class="user-dropDown">
        <div class="user-button">
            <span class="d-none d-sm-block">{{user.name}}</span>
            <div class="user-dropdown-img">
                <Gravatar :email="user.email" alt="Imagem do Usuario"/>
            </div>
            <i class="fa fa-angle-down"></i>
        </div>

        <div class="user-DropDown-Content">
                <router-link to="/admin"><i class="fa fa-cogs"><span>Administração</span></i></router-link>
                <a href @click.prevent="sair"><i class="fa fa-sign-out"><span>Sair</span></i></a>

        </div>

    </div>
</template>

<script>
import { userKey } from '@/global'
//maper o usuario da store
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar' 

export default {
    name:'UserDropDown',
    components:{Gravatar},
    computed:mapState(['user']), //tenho acesso ao usuario da store,
    methods:{
        sair(){
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({name:'Auth'})
        }
    }
}
</script>

<style>
    .user-dropDown {
        height: 100%;
    }
    .user-button{
        display: flex;
        align-items: center;
        color: black;
        height: 100%;
        padding: 0px 20px;
    }
    .user-dropDown:hover{
        background-color: #e0dede
    }
    .user-dropdown-img{
       margin:0px 10px;
    }
     .user-dropdown-img > img{
         max-height: 37px;
         border-radius: 5px;
     }
     .user-DropDown-Content{
         position: absolute;
         right: 0px;
         background-color: #fff;
         min-width: 160px;
         box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
         padding:10px;
         z-index: 1;
         display: flex;
         flex-direction: column;
         flex-wrap: wrap;

         visibility: hidden;
         opacity: 0;
         transition: visibility 0s, opacity 0.5s linear;
     }
     .user-dropDown:hover .user-DropDown-Content {
         visibility: visible;
         opacity: 1;
     }
     .user-DropDown-Content a {
         color: black;
         padding: 8px;
     }
     .user-DropDown-Content a i:before {
         padding: 8px;
     }

     .user-DropDown-Content a:hover{
         color: black;
         background-color: #E0DEDE;
     }
     .user-DropDown-Content span{
		font-family:'Raleway','sans-serif ';
     }
</style>
