<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "Content"
}
</script>

<style>
    .content{
        grid-area: content;
        padding:20px;
        margin-left:0.30%; 
        z-index:-1;        
    }
</style>
