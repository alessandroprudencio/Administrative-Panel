<template>
	<div id="app" :class="{'hide-menu':!isMenuVisible}"> <!-- SE NÃO ESTIVER VISIVEL APLICA O CSS-->
		<Header title="Alessandro - ADM de artigos" :escondeToogle="false"/>
		<Menu/>
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
	computed: mapState(['isMenuVisible'])
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
</style>