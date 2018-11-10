<template>
    <footer class="footer">
        <span>© Alessandro Prudencio - 2018</span>
    </footer>
</template>

<script>
export default {    
    name: "Footer"
}
</script>

<style>
    .footer{
        grid-area: footer;
        color:#333;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
        z-index:-1;
        border-top: 1px solid #ccc;

    }
</style>
