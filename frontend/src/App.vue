<template>
	<div id="app" :class="{'hide-menu':!isMenuVisible || !user}"> <!-- SE NÃO ESTIVER VISIVEL APLICA O CSS-->
		<Header title="Alessandro - ADM de artigos" 
		:escondeToogle="!user"
		:escondeUserDropDown="!user"
		/>
		<Menu v-if="user"/>
		<AntesDeTudo v-if="validandoToken"/>
		<Content v-else/>
		<Footer/>
	</div>
</template>

<script>
import axios from 'axios'
import {apiUrl, userKey} from '@/global'
import { mapState } from 'vuex'
import  Header  from "@/components/template/Header";
import  Content  from "@/components/template/Content";
import  Footer  from "@/components/template/Footer";
import  Menu  from "@/components/template/Menu";
import  AntesDeTudo from "@/components/template/antesDeTudo"

export default {
	name: "App",
	components:{ Header, Content, Footer, Menu ,AntesDeTudo},
	computed: mapState(['isMenuVisible','user']),
	data:function(){
		return	{
			validandoToken:true
		}
	},
	methods:{
		async validaToken(){
			this.validandoToken = true
			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)
			
			if(!userData){
				this.validandoToken = false
				return this.$router.push({name:'Auth'})
			}
			const res = await axios.post(`${apiUrl}/validaToken`,userData)
			if(res.data){
				this.$store.commit('setUser', userData)
			}else{
				localStorage.removeItem(userKey)
				this.$router.push({name:"Auth"})
			}

				this.validandoToken  = false

		}
	},
	mounted(){
		this.validaToken();
	}
}
</script>

<style>
	*{
		font-family:'Raleway','sans-serif ';
		
	}
	body{
		margin:0;
	}
	#app {
		-webkit-font-smoothing:antialised;
		-moz-osx-font-smoothing:grayscale;

		height: 100vh; 
		display: grid;
		grid-template-rows: 50px 1fr 40px;
		grid-template-columns:300px 1fr;

		grid-template-areas: 
		"menu header"
		"menu content"
		"menu footer"
	}
	#app.hide-menu{
		grid-template-areas: 
			"header header"
			"content content"
			"footer footer"

	}
	tbody .btn-prymary{
		margin-top:4px;
		margin-bottom:4px;
		padding: 5px 10px 3px 10px;
	}
    tbody .btn-danger{
		padding: 5px 10px 3px 10px;
	}
	thead .sorting{
		font-family:'Raleway','sans-serif ';
        font-weight: 100;
	}
	thead th{
		font-family:'Raleway','sans-serif ';
        font-weight: 100;
	}
</style>