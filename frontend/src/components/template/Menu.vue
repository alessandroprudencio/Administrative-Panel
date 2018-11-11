<template>
    <aside class="menu" v-show="isMenuVisible"></aside>
</template>

<script>
import { mapState } from 'vuex' //mapea o atributo computed da store
export default {
    name : "Menu",
    computed: mapState(['isMenuVisible'])
}
</script>

<style>
    .menu{
        grid-area: menu;
        background:#323641; 
        background-image: linear-gradient(to right, #59a5f7, #007BFF);
        box-shadow: 0px 8px 16px rgba(0, 0, 0.2);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
</style>
