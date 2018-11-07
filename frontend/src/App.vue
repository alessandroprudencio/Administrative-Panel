<template>
	<div id="app">
		<Header/>
		<Menu/>
		<Content/>
		<Footer/>
	</div>
</template>

<script>
import  Header  from "@/components/template/Header";
import  Content  from "@/components/template/Content";
import  Footer  from "@/components/template/Footer";
import  Menu  from "@/components/template/Menu";

export default {
	name: "App",
	components:{ Header, Content, Footer, Menu }
}
</script>

<style>
	*{
		font-family:'Lato','sans-serif ';
	}
	body{
		margin:0;
	}
	#app {
		-webkit-font-smoothing:antialised;
		-moz-osx-font-smoothing:grayscale;

		height: 100vh;

		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns:300px 1fr;

		grid-template-areas: 
		"header header"
		"menu content"
		"menu footer"
	}
</style>