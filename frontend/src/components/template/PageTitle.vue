<template>
    <div class="page-title">
        <h1><i v-if="icon" :class="icon"></i>{{main}}</h1>
        <h2>{{sub}}</h2>
        <hr>
    </div>
</template>

<script>
export default {
    name:'PageTitle',
    props:['icon','main','sub'] 
}
</script>

<style>
    .page-title h1{
        margin:0px;
        font-size:2.0rem;
    }
    .page-title h2{
        color: #777;
        margin-top:3px;
        font-size:1.3rem;
    }
</style>
