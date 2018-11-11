<template>
    <div class="estatistica">

        <div class="estatistica-icon">
            <i :class="icon" :style="style"></i>
        </div>

        <div class="estatistica-info">
            <span class="estatistica-title">{{title}}</span>
            <span class="estatistica-value">{{value}}</span>    
        </div>

    </div>
</template>

<script>
export default {
    name:'Estatistica',
    props:['title','value','icon','color'],
    computed:{
        style(){
            return 'color:' + (this.color || "#000")
        }
    }
}
</script>

<style>
    .estatistica{
        flex:1;
        display: flex;
        border-radius: 8px;
        margin-right:20px;
        margin-bottom: 20px;
        background-color: #fff;
        padding: 15px;
        border:1px solid rgba(0, 0, 0, 0.2);
         box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    }
    .estatistica-icon{
        display: flex;
        align-items: center;
    }
    .estatistica-icon i{
        font-size:3rem;
    }
    .estatistica-info{
        flex: 1;
        display: flex;  
        flex-direction: column;
        align-items: flex-end;
    }
    .estatistica-title{
        font-size: 1.1rem;
    }
    .estatistica-value{
        font-size: 1.8rem;
    }
</style>
