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
        background-image: linear-gradient(to right, #56c5cd, #2fabd8);
        box-shadow: 2px 1px 5px #666;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
</style>
