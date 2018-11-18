import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticleByCategory from '@/components/artigo/articleByCategory'
import ArticleById from  '@/components/artigo/articleById'
import Auth from  '@/components/auth/auth'


const routes =[{
    name:'home',
    path:'/',
    component:Home
    },
    {
     name:'AdminPages',
     path:'/admin',
     component:AdminPages
    },
    {
    name:'ArticleByCategory',
    path:'/categoria/:id/artigos',
    component:ArticleByCategory
    },
    {
    name:'ArticleById',
    path:'/artigo/:id',
    component:ArticleById
    },
    {
    name:'Auth',
    path:'/auth',
    component:Auth
    }
]

export default new VueRouter({
    mode:'history',
    routes
})

