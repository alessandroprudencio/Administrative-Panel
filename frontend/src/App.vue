<template>
	<div id="app" :class="{'hide-menu':!isMenuVisible || !user}"> <!-- SE NÃO ESTIVER VISIVEL APLICA O CSS-->
		<Header title="Alessandro - ADM de artigos" 
		:escondeToogle="!user"
		:escondeUserDropDown="!user"
		/>
		<Menu v-if="user"/>
		<Content/>
		<Footer/>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import  Header  from "@/components/template/Header";
import  Content  from "@/components/template/Content";
import  Footer  from "@/components/template/Footer";
import  Menu  from "@/components/template/Menu";

export default {
	name: "App",
	components:{ Header, Content, Footer, Menu },
	computed: mapState(['isMenuVisible','user'])
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